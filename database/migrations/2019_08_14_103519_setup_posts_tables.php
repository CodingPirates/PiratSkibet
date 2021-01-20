<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetupPostsTables extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('parent_id')->nullable();
            $table->unsignedInteger('version')->default(1);

            $table->string('type')->default(\App\Support\Enums\PostType::PAGE);
            $table->string('status')->default(\App\Support\Enums\GenericStatus::DRAFT);

            $table->string('path');
            $table->string('title');
            $table->longText('content');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
