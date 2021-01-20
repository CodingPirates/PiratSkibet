<?php

namespace App\Support\Traits;


use Illuminate\Database\Eloquent\Model;

trait HasUserGeneratedContent
{
    protected static function bootHasUserGeneratedContent()
    {
        static::saving(function (Model $model) {
            $model->cleanAllUserContent();
        });
    }

    protected function cleanAllUserContent()
    {
        foreach ($this->userGeneratedColumns() as $attribute) {
			if (isset($this->attributes[$attribute])) {
				$this->attributes[$attribute] = $this->cleanUserContent($this->attributes[$attribute]);
			}
        }
    }

    public function cleanUserContent(string $content = null): string
    {
        return clean($content, $this->purifierConfig());
    }

    public function correctUserContent(string $content = null): string {
        return preg_replace('/(<a\b[^><]*)>/i', '$1 rel="noopener noreferrer" target="_blank">', $content);
    }

    public function userGeneratedColumns(): array
    {
        return $this->userGeneratedContent ?? [];
    }

    public function purifierConfig(): string
    {
        return defined('static::PURIFIER_CONFIG') ? static::PURIFIER_CONFIG : 'default';
    }

}
