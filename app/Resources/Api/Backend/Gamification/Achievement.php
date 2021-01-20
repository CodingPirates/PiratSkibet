<?php

namespace App\Resources\Api\Backend\Gamification;

use App\Models\Achievements\Achievement as Model;
use App\Operations\Content\GrantAchievement;
use App\Support\Enums\Rewardable;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Fields\Fields\EnumField;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Fields\Fields\RelationshipField;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Achievement extends CrudResource
{
    protected $model      = Model::class;

    public function operations()
    {
        return array_merge(parent::operations(), [
            'grant' => GrantAchievement::create()->model($this->model),
        ]);
    }

    protected function configureReadOperation(Read $read)
    {
        return $read->filters([
            Filter::create()->always(function (Builder $q) {
                $q->with('achievementItems');
            }),
        ]);
    }

    protected function getFields()
    {
        return [
            Field::create('name')->validates('required|string|max:191'),
            Field::create('description')->validates('nullable|string|max:191'),

            RelationshipField::create('achievement_items', true)->removeMissing()->fields([
                Field::create('item_id')->validates('required|integer', 'achievement_items.*.item_id'),
                EnumField::create('item_type')
                    ->validatorName('achievement_items.*.item_type')
                    ->from(Rewardable::class)
                    ->required(),
            ]),
        ];
    }

    protected function getFilters()
    {
        return [
            Search::create()->search([
                'name',
                'description',
            ]),

            Filter::create()->when('lockedForUser')->scope('lockedForUser'),
            Filter::create()->when('grantedToUser')->scope('grantedToUser'),

            Pagination::create(),
        ];
    }
}
