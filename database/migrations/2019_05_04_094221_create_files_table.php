<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();

            $table->string('name')->nullable();
            $table->string('extension')->nullable();
            $table->string('description')->nullable();
            $table->string('uuid')->nullable();
            $table->string('location')->nullable();
            $table->string('disk')->nullable();

            $table->string('type')->nullable();
            $table->string('mime')->nullable();
            $table->integer('size')->nullable();

            $table->longText('meta')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files');
    }
}
