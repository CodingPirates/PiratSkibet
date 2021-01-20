<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetupProjectsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('owner_id')->unsigned();
            $table->string('title');
            $table->unsignedBigInteger('thread_id')->nullable();
            $table->bigInteger('cover_image_id')->unsigned()->nullable();
            $table->bigInteger('thumbnail_id')->unsigned()->nullable();
            $table->longText('description')->nullable();
            $table->string('status')->default(\App\Support\Enums\GenericStatus::DRAFT);
            $table->string('system_status')->default(\App\Support\Enums\SystemStatus::ACTIVE);
            $table->float('sort_score')->default(80);
            $table->boolean('blocked_user')->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('owner_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->foreign('thread_id')
                ->references('id')->on('forum_threads')
                ->onDelete('set null');

            $table->foreign('cover_image_id')
                ->references('id')->on('files')
                ->onDelete('set null');

            $table->foreign('thumbnail_id')
                ->references('id')->on('files')
                ->onDelete('set null');
        });

        Schema::create('project_user', function (Blueprint $table) {
            $table->bigInteger('project_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->boolean('accepted')->default(false);

            $table->primary(['project_id', 'user_id']);

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->foreign('project_id')
                ->references('id')->on('projects')
                ->onDelete('cascade');
        });

        Schema::create('project_files', function (Blueprint $table) {
            $table->bigInteger('project_id')->unsigned();
            $table->bigInteger('file_id')->unsigned();

            $table->primary(['project_id', 'file_id']);

            $table->foreign('project_id')
                ->references('id')->on('projects')
                ->onDelete('cascade');
            $table->foreign('file_id')
                ->references('id')->on('files')
                ->onDelete('cascade');
        });

        Schema::create('project_reactions', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->timestamps();
            $table->string('type')->default(\App\Support\Enums\ReactionType::LIKE);
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->bigInteger('project_id')->unsigned()->nullable();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('project_id')
                ->references('id')
                ->on('projects')
                ->onDelete('cascade');
        });


        Schema::create('project_project_categories', function (Blueprint $table) {
            $table->bigInteger('project_id')->unsigned();
            $table->bigInteger('category_id')->unsigned();

            $table->primary(['project_id', 'category_id']);

            $table->foreign('category_id')
                ->references('id')->on('project_categories')
                ->onDelete('cascade');

            $table->foreign('project_id')
                ->references('id')->on('projects')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_project_categories');
        Schema::dropIfExists('project_reactions');
        Schema::dropIfExists('project_user');
        Schema::dropIfExists('project_files');
        Schema::dropIfExists('projects');
    }
}
