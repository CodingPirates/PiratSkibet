<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetupContactSubmissionsTables extends Migration
{
    public function up()
    {
        Schema::create('contact_submissions', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('type')->default(\App\Support\Enums\ContactSubmissionType::GENERIC);
            $table->string('status')->default(\App\Support\Enums\ContactSubmissionStatus::DRAFT);

            $table->string('name')->nullable();
            $table->string('subject')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->longText('message')->nullable();
            $table->decimal('score', 2, 1)->nullable();

            $table->timestamps();
            $table->timestamp('recaptcha_at')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contact_submissions');
    }
}
