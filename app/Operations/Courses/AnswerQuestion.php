<?php

namespace App\Operations\Courses;


use App\Models\Course\CourseProgress;
use App\Models\Course\CourseResource;
use App\Support\Enums\ResourceProgress;
use App\Support\Enums\ResourceTypes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Resources\Support\Contracts\EloquentOperation;
use MorningTrain\Laravel\Resources\Support\Pipes\Validates;
use MorningTrain\Laravel\Resources\Support\Traits\HasRules;

class AnswerQuestion extends EloquentOperation
{
    use HasRules;

    const ROUTE_METHOD = 'post';

    public function __construct()
    {
        $this->filters([
            Filter::create()->always(function (Builder $q) {
                $q->whereType(ResourceTypes::QUESTIONNAIRE);
            }),
        ]);

        $this->rules([
            'question' => 'required|string',
            'answer'   => 'required|string',
        ]);
    }

    protected function beforePipes()
    {
        return array_merge([
            Validates::create()->rules($this->rules),
        ], parent::beforePipes());
    }

    public function handle($data)
    {

        $answer_was_correct = false;

        if ($data && $data->checkAnswer(request()->question, request()->answer)) {
            $answer_was_correct = true;
        }
        $progress = CourseProgress::query()->mine()->where('course_resource_id', '=', $data->id)->first();

        if($progress === null) {
            $progress = new CourseProgress();
            $progress->user_id = Auth::id();
            $progress->course_resource_id = $data->id;
        }

        $progress_meta = array_merge(
            (is_array($progress->meta)?$progress->meta:[]),
            [
                request()->question => [
                    'answer' => request()->answer,
                    'correct' => $answer_was_correct
                ]
            ]
        );

        $progress->meta = $progress_meta;
        $progress->status = ResourceProgress::COMPLETED;
        $progress->save();

        return $data;
    }
}
