<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Support\Enums\EventStatus;

class AddEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('link');
            $table->string('img')->nullable();
            $table->text('description');
            $table->string('status')->default(EventStatus::DRAFT);

            $table->dateTime('start_at');
            $table->dateTime('end_at');
            $table->dateTime('publish_at');

            $table->timestamps();
        });

        Schema::create('event_reminders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('event_id')->unsigned();
            $table->dateTime('remind_at');
            $table->boolean('reminded')->default(false);
            $table->timestamps();

            $table->foreign('event_id')
                ->references('id')->on('events')
                ->onDelete('cascade');
        });

        Schema::create('event_region', function (Blueprint $table) {
            $table->bigInteger('event_id')->unsigned();
            $table->bigInteger('region_id')->unsigned();

            $table->foreign('event_id')
                ->references('id')->on('events')
                ->onDelete('cascade');

            $table->foreign('region_id')
                ->references('id')->on('regions')
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
        Schema::dropIfExists('event_reminders');
        Schema::dropIfExists('event_region');
        Schema::dropIfExists('events');
    }
}
