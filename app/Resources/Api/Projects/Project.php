<?php

namespace App\Resources\Api\Projects;

use App\Models\Projects\Project as Model;
use App\Operations\Interactions\Reaction;
use App\Operations\Interactions\Reply;
use App\Operations\Moderation\RequestModeration;
use App\Support\Enums\CommonPermissions;
use App\Support\Enums\CustomPermissions;
use App\Support\Enums\GenericOrderType;
use App\Support\Enums\GenericStatus;
use App\Support\Enums\ReactionType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Image;
use Intervention\Image\Exception\NotReadableException;
use MorningTrain\Laravel\Fields\Fields\EnumField;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Fields\Fields\SyncManyField;
use MorningTrain\Laravel\Fields\Files\FilesField;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Delete;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Operations\Crud\Store;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Project extends CrudResource
{
    protected $model = Model::class;

    public function operations()
    {
        return [
            Index::create()->model($this->model)->filters($this->getFilters())->appends(['thumbnail_url']),
            Read::create()->model($this->model)->filters($this->getReadFilters())->appends(['all_users', 'cover_image_url']),
            Delete::create()->model($this->model),

            'newest' => Index::create()->model($this->model)->filters($this->getNewestFilters())->appends(['thumbnail_url']),

            'store'  => Store::create()->model($this->model)->fields($this->getFields())->successMessage('Ændringerne på dit projekt er blevet gemt!'),
            'create' => Store::create()->model($this->model)->fields($this->getFields()),

            'like'    => Reaction::create()->type(ReactionType::LIKE)->model($this->model),
            'endorse' => Reaction::create()->type(ReactionType::ENDORSEMENT)->model($this->model),

            'resolve_invite' => Reply::create()->model($this->model)->trigger('resolveInvitation'),
            'flag'           => RequestModeration::create()->model($this->model),
        ];
    }

    protected function getFields()
    {
        return [
            // TODO - more specific validation & max file sizes
            FilesField::create('cover_image')
                ->validates('file|mimes:jpeg,png')
                ->manipulates(function (string $path) {
                    try {
                        Image::make($path)->fit(1300, 500, function ($constraint) {
                            $constraint->upsize();
                        })->save();
                    } catch (NotReadableException $e) {
                    }
                }),

            FilesField::create('thumbnail')
                ->validates('file|mimes:jpeg,png')
                ->manipulates(function (string $path) {
                    try {
                        Image::make($path)->fit(300, 300, function ($constraint) {
                            $constraint->upsize();
                        })->save();
                    } catch (NotReadableException $e) {
                    }
                }),

            FilesField::create('files')
                ->validates('file|mimes:jpeg,png,pdf')
                ->manipulates(function (string $path) {
                    try {
                        Image::make($path)->resize(1000, null, function ($constraint) {
                            $constraint->aspectRatio();
                            $constraint->upsize();
                        })->save();
                    } catch (NotReadableException $e) {
                    }
                }),

            Field::create('title')->validates('required|string|max:191'),
            Field::create('description')->validates('nullable|string|max:500000'),
            EnumField::create('status')->from(GenericStatus::class)->required(),

            SyncManyField::create('categories')
                ->relation('categories')
                ->validates('required|integer|exists:project_categories,id', 'categories.*.id'),

            SyncManyField::create('users')
                ->can(CustomPermissions::MANAGE_PROJECT_MEMBERS)
                ->relation('users')
                ->validates('required|integer|exists:users,id', 'users.*.id'),
        ];
    }

    protected function getBaseFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                $q->public();
                $q->withCount('likes');
                $q->withCount('my_likes');
                $q->withCount('threadMessages');
                if(Gate::allows(CommonPermissions::ENDORSE_PROJECTS)) {
                    $q->withCount('endorsements');
                    $q->withCount('my_endorsements');
                }
            }),
        ];
    }

    protected function getReadFilters()
    {
        return array_merge($this->getBaseFilters(), [
            Filter::create()->always(function (Builder $q) {
                $q->with('categories.parent');
                $q->with('owner:id,username,user_avatar_id,title_id');
                $q->with('members:id,username,user_avatar_id,title_id');

                $q->with('images');
                $q->with('files');
                $q->with('coverImage');
                $q->with('thumbnail');
            }),
        ]);
    }

    protected function getFilters()
    {
        return array_merge($this->getBaseFilters(), [

            // Always limit projects to PUBLISHED or User Related
            Filter::create()->always(function (Builder $q) {
                $q->where(function ($q) {
                    $q->published();

                    if (Auth::check()) {
                        $q->orWhere(function ($q) {
                            return $q->relatedToUser(Auth::id());
                        });
                    }
                });
            }),


            Search::create()->search([
                'title',
                'description',
                'owner'   => ['username'],
                'members' => ['username'],
            ]),

            Filter::create()->when('user', function (Builder $q, $user) {
                return $q->relatedToUser($user, false);
            }),

            Filter::create()->when('invitations', function (Builder $q) {
                $q->awaitingResponse(Auth::id());
            }),

            Filter::create()->when('categories', function (Builder $q, $categories) {
                return $q->forCategories((array)$categories);
            }),

            Order::create()
                ->scopes(GenericOrderType::values())
                ->defaultValue(GenericOrderType::MOST_POPULAR),

            Pagination::create()->default('$per_page', 18)
        ]);
    }

    protected function getNewestFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                $q->public();
                $q->published();
            }),

            Order::create()
                ->only('published_at')
                ->defaultValue(['published_at' => 'DESC']),

            Pagination::create()->shows(3),
        ];
    }
}
