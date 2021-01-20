<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetupTwitchTables extends Migration
{
    public function up()
    {
        Schema::create('twitch_channels', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('channel_name');
            $table->string('collection');
            $table->boolean('is_live')->default(false);
            $table->dateTime('stream_checked_at')->nullable();
            $table->dateTime('stream_started_at')->nullable();
            $table->string('stream_title')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('twitch_channels');
    }
}
