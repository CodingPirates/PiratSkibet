<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateForumTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $this->down();

        Schema::create('forum_topics', function (Blueprint $table) {

            $table->bigIncrements('id');

            $table->string('name')->nullable();
            $table->string('slug')->nullable();
            $table->string('status')->nullable();
            $table->longText('description')->nullable();
            $table->bigInteger('parent_id')->unsigned()->nullable();
            //$table->bigInteger('upper_parent_id')->unsigned()->nullable();

        });

        Schema::create('forum_topic_ancestry', function (Blueprint $table) {
            $table->bigInteger('topic_id')->unsigned()->nullable();
            $table->bigInteger('ancestor_id')->unsigned()->nullable();

            $table->foreign('topic_id')
                ->references('id')
                ->on('forum_topics')
                ->onDelete('cascade');

            $table->foreign('ancestor_id')
                ->references('id')
                ->on('forum_topics')
                ->onDelete('cascade');

        });

        Schema::create('forum_threads', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('subject')->nullable();
            $table->string('status')->default(\App\Support\Enums\SystemStatus::ACTIVE);
            $table->string('type')->default(\App\Support\Enums\ForumThreadType::DISCUSSION);

            $table->bigInteger('original_message_id')->unsigned()->nullable();
            $table->bigInteger('accepted_answer_id')->unsigned()->nullable();
            $table->bigInteger('most_popular_answer_id')->unsigned()->nullable();
            $table->bigInteger('topic_id')->unsigned()->nullable();

            $table->boolean('grownups_can_participate')->default(false);
            $table->boolean('is_embedded')->default(false);

            $table->float('sort_score')->default(80);

            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->boolean('blocked_user')->default(false);
            $table->timestamps();

            $table->softDeletes();

            $table->foreign('created_by')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('topic_id')
                ->references('id')
                ->on('forum_topics')
                ->onDelete('cascade');

        });

        Schema::create('forum_messages', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->timestamps();

            $table->longText('content');
            $table->bigInteger('thread_id')->unsigned()->nullable();
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->boolean('blocked_user')->default(false);
            $table->boolean('moderated')->default(false);

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('thread_id')
                ->references('id')
                ->on('forum_threads')
                ->onDelete('cascade');

        });

        Schema::create('forum_message_changes', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->timestamps();

            $table->longText('content');
            $table->string('reason');
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->bigInteger('message_id')->unsigned()->nullable();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('message_id')
                ->references('id')
                ->on('forum_messages')
                ->onDelete('cascade');

        });

        Schema::create('forum_message_reactions', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->timestamps();

            $table->string('type')->default(\App\Support\Enums\ReactionType::LIKE);

            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->bigInteger('message_id')->unsigned()->nullable();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('message_id')
                ->references('id')
                ->on('forum_messages')
                ->onDelete('cascade');

        });

        Schema::create('forum_message_mentions', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->timestamps();

            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->bigInteger('message_id')->unsigned()->nullable();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('message_id')
                ->references('id')
                ->on('forum_messages')
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
        Schema::dropIfExists('forum_message_mentions');
        Schema::dropIfExists('forum_message_reactions');
        Schema::dropIfExists('forum_message_changes');
        Schema::dropIfExists('forum_messages');
        Schema::dropIfExists('forum_threads');
        Schema::dropIfExists('forum_topic_ancestry');
        Schema::dropIfExists('forum_topics');
    }
}
