<?php

namespace App\Support\Fields;


use App\Models\Avatar\UserAvatar;
use App\Support\Enums\AvatarCategory;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Fields\Fields\FieldCollection;

class AvatarField extends FieldCollection
{
    protected $categories;

    public function __construct(string $name, array $collection = null)
    {
        parent::__construct($name, $collection);

        $this->categories = AvatarCategory::values();
        $this->setCollection($this->getFields());
    }

    protected function getFields()
    {
        return collect($this->categories)->map(function ($category) {
            return Field::create($category)
                ->validates($this->getCategoryValidation($category))
                ->updates(function (UserAvatar $avatar, $category, $value) {
                    if (!is_null($value)) {
                        $avatar->setItem($category, $value);
                    }
                });
        })->all();
    }

    protected function getCategoryValidation(string $category)
    {
        return [
            $category => [
                'bail',
                'nullable',
                'int',
                Rule::exists('avatar_items', 'id')
                    ->where(function (Builder $q) use ($category) {
                        $q->where('category', $category);
                    }),
                'avatar_item_is_available',
            ],
        ];
    }

    protected function checkRequest(Request $request)
    {
        return $request->hasAny($this->categories);
    }
}
