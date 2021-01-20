<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeMeetingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('meetings', function (Blueprint $table) {
            $table->renameColumn('is_active', 'banner_active');
            $table->boolean('meeting_active')->default(false)->after('meeting_room');
            $table->time('from')->change();
            $table->time('to')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('meetings', function (Blueprint $table) {
            $table->dateTime('from')->change();
            $table->dateTime('to')->change();
            $table->dropColumn('meeting_active');
            $table->renameColumn('banner_active', 'is_active');
        });
    }
}
