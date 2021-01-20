<?php

use App\Models\Achievements\Achievement;
use App\Models\Rewards\UserReward;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ReworkUserRewards extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_rewards', function (Blueprint $table) {
            $table->string('description')->nullable()->after('achievement_id');
            $table->string('name')->nullable()->after('achievement_id');
        });

        Schema::table('user_reward_items', function (Blueprint $table) {
            $table->unsignedBigInteger('user_reward_id')->nullable()->after('user_id');

            $table->foreign('user_reward_id')
                ->references('id')
                ->on('user_rewards')
                ->onDelete('cascade');
        });

        DB::table('user_rewards as a')
            ->join('achievements as b', 'a.achievement_id', '=', 'b.id')
            ->select('a.*', 'b.name', 'b.description')
            ->update([
                'a.name'        => DB::raw('b.name'),
                'a.description' => DB::raw('b.description'),
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_rewards', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->dropColumn('name');
        });

        Schema::table('user_reward_items', function (Blueprint $table) {
            $table->dropForeign('user_reward_items_user_reward_id_foreign');
            $table->dropColumn('user_reward_id');
        });
    }
}
