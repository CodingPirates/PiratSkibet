<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CourseTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {


        Schema::create('course_categories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('slug');
            $table->string('title');
            $table->boolean('active')->default(true);
            $table->text('description')->nullable();
            $table->string('color')->nullable();
            $table->bigInteger('logo_id')->unsigned()->nullable();
            $table->bigInteger('thumbnail_id')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('logo_id')
                ->references('id')->on('files')
                ->onDelete('set null');

            $table->foreign('thumbnail_id')
                ->references('id')->on('files')
                ->onDelete('set null');
        });

        Schema::create('courses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('slug');
            $table->bigInteger('category_id')->unsigned()->nullable();
            $table->integer('level');
            $table->text('description');
            $table->integer('position');
            $table->timestamps();


            $table->foreign('category_id')
                ->references('id')
                ->on('course_categories')
                ->onDelete('set null');
        });

        Schema::create('course_resources', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('course_id')->unsigned()->nullable();
            $table->integer('position')->default(0);
            $table->string('type');
            $table->longText('meta')->nullable();
            $table->timestamps();

            $table->foreign('course_id')
                ->references('id')
                ->on('courses')
                ->onDelete('cascade');
        });

        Schema::create('course_progress', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('course_category_id')->unsigned()->nullable();
            $table->bigInteger('course_id')->unsigned()->nullable();
            $table->bigInteger('course_resource_id')->unsigned()->nullable();
            $table->bigInteger('user_id')->unsigned();
            $table->longText('meta')->nullable();
            $table->string('status');
            $table->timestamps();

            $table->foreign('course_category_id')
                ->references('id')
                ->on('course_categories')
                ->onDelete('cascade');

            $table->foreign('course_id')
                ->references('id')
                ->on('courses')
                ->onDelete('cascade');

            $table->foreign('course_resource_id')
                ->references('id')
                ->on('course_resources')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
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
        Schema::dropIfExists('course_progress');
        Schema::dropIfExists('course_resources');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('course_categories');
    }
}
