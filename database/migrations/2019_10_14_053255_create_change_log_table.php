<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChangeLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('changes', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('changed_by')->nullable();

            $table->unsignedBigInteger('changeable_id')->nullable();
            $table->string('changeable_type')->nullable();

            $table->timestamps();
            $table->timestamp('changed_at')->nullable();

            $table->string('column_name')->nullable();

            $table->mediumText('from_value')->nullable();
            $table->string('from_type')->nullable();

            $table->mediumText('to_value')->nullable();
            $table->string('to_type')->nullable();

            $table->index(['changeable_id', 'changeable_type']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('changes');
    }
}
