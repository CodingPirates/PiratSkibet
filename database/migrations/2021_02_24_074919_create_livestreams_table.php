<?php

use App\Support\Enums\LivestreamTypes;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLivestreamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('livestreams', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('type')->default(LivestreamTypes::YOUTUBE);
            $table->string('livestream_id');
            $table->boolean('is_live')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('livestreams');
    }
}
