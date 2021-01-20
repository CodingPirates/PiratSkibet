<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTitlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_titles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('title_id')->nullable()->after('birthday');

            $table->foreign('title_id')
                ->references('id')
                ->on('user_titles')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('users', 'title_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropForeign(['title_id']);
                $table->dropColumn('title_id');
            });
        }

        Schema::dropIfExists('user_titles');
    }
}
