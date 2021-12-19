<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResourceLinksTable extends Migration
{
    public function up(): void
    {
        Schema::create('resource_links', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('url');
            $table->string('text');
            $table->integer('position')->default(0);
            $table->unsignedBigInteger('course_category_id');
            $table->timestamps();

            $table->foreign('course_category_id')
                ->references('id')->on('course_categories')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resource_links');
    }
}
