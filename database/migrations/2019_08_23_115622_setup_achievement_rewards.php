<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetupAchievementRewards extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('achievements', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('name')->nullable();
            $table->string('description')->nullable();

            $table->timestamps();
        });

        Schema::create('achievement_items', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('achievement_id');

            $table->unsignedBigInteger('item_id');
            $table->string('item_type');

            $table->timestamps();
        });

        Schema::create('user_rewards', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('achievement_id');

            $table->timestamps();
            $table->timestamp('opened_at')->nullable();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->unique(['user_id', 'achievement_id']);
        });


        Schema::create('user_reward_items', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('user_id');

            $table->unsignedBigInteger('item_id');
            $table->string('item_type');

            $table->timestamps();

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
        Schema::dropIfExists('achievement_items');
        Schema::dropIfExists('user_rewards');
        Schema::dropIfExists('achievements');
        Schema::dropIfExists('user_reward_items');
    }
}
