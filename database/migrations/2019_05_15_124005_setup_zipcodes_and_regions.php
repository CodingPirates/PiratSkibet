<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetupZipcodesAndRegions extends Migration
{

    public function up()
    {
        Schema::create('zipcodes', function (Blueprint $table) {
            $table->integer('zipcode')->unsigned();
            $table->string('city');
            $table->timestamps();

            $table->primary('zipcode');
        });

        Schema::create('regions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('region_zipcode', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('region_id')->unsigned();
            $table->integer('zipcode_zipcode')->unsigned();

            $table->foreign('region_id')
                ->references('id')->on('regions')
                ->onDelete('cascade');

            $table->foreign('zipcode_zipcode')
                ->references('zipcode')->on('zipcodes')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('region_zipcode');
        Schema::dropIfExists('regions');
        Schema::dropIfExists('zipcodes');
    }
}
