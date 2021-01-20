<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetupModerationTables extends Migration
{
    public function up()
    {
        Schema::create('moderation_cases', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('moderateable_id');
            $table->string('moderateable_type');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('status')->default(\App\Support\Enums\ModerationCaseStatus::PENDING);

            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');
        });

        Schema::create('moderation_actions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('moderation_case_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('type')->default(\App\Support\Enums\ModerationActionType::SYSTEM);
            $table->string('action_class');
            $table->string('note')->nullable();
            $table->longText('meta')->nullable();
            $table->timestamps();

            $table->foreign('moderation_case_id')
                ->references('id')->on('moderation_cases')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('set null');
        });

        Schema::create('moderation_requests', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('moderation_case_id');
            $table->unsignedBigInteger('reporter_id')->nullable();
            $table->string('reason');
            $table->text('comment')->nullable();

            $table->timestamps();
            $table->timestamp('resolved_at')->nullable();

            $table->foreign('moderation_case_id')
                ->references('id')->on('moderation_cases')
                ->onDelete('cascade');

            $table->foreign('reporter_id')
                ->references('id')->on('users')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('moderation_requests');
        Schema::dropIfExists('moderation_actions');
        Schema::dropIfExists('moderation_cases');
    }
}
