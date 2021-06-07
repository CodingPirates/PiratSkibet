<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectCategoryVideoTable extends Migration
{
    public function up(): void
    {
        Schema::create('project_category_video', function (Blueprint $table) {
            $table->unsignedBigInteger('project_category_id');
            $table->unsignedBigInteger('video_id');

            $table->primary(['project_category_id', 'video_id']);

            $table->foreign('project_category_id')
                ->references('id')
                ->on('project_categories')
                ->onDelete('cascade');

            $table->foreign('video_id')
                ->references('id')
                ->on('videos')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_category_video');
    }
}
