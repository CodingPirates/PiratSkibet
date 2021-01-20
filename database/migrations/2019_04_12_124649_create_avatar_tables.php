<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAvatarTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('avatar_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('category');
            $table->longText('content');
            $table->string('meta')->nullable();
            $table->boolean('is_public');
            $table->boolean('is_default');
            $table->boolean('is_featured')->default(false);
            $table->string('status');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('user_avatars', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->bigInteger('user_avatar_id')->unsigned()->nullable()->after('id');

            $table->foreign('user_avatar_id')
                ->references('id')
                ->on('user_avatars')
                ->onDelete('set null');
        });

        Schema::create('user_avatar_items',
            function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->bigInteger('user_avatar_id')->unsigned();
                $table->bigInteger('avatar_item_id')->unsigned();
                $table->string('category');
                $table->timestamps();

                $table->foreign('user_avatar_id')
                    ->references('id')
                    ->on('user_avatars')
                    ->onDelete('cascade');

                $table->foreign('avatar_item_id')
                    ->references('id')
                    ->on('avatar_items')
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
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['user_avatar_id']);
        });

        Schema::dropIfExists('user_avatar_items');
        Schema::dropIfExists('user_avatars');
        Schema::dropIfExists('avatar_items');
    }
}
