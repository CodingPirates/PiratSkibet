<?php

use Illuminate\Database\Seeder;
use App\Models\Forum\Thread;
use App\Models\Forum\Message;
use App\Models\User\User;

class ForumTestSeeder extends Seeder
{
    public function run()
    {

        $cats = \App\Models\Forum\Topic::query()->get();

        $pirates = User::query()->role('pirate')->get()->keyBy('id');

        if ($cats) {
            foreach ($cats as $category) {

                $user = $pirates->random();

                $thread_data = [
                    'created_by' => $user->id,
                    'topic_id' => $category->id,
                    'created_at' => \Carbon\Carbon::now()->subDays(rand(1, 20))
                ];

                $number_of_threads = rand(1, 3);
                if($category->id === 1) {
                    $number_of_threads = 1;
                }

                factory(Thread::class, $number_of_threads)
                    ->create($thread_data)
                    ->each(function (Thread $thread) use($user, $pirates) {



                        $message = $thread->createMessage(
                            (($thread->id === 1)?
                                "<p>Aut nisi consectetur cumque eligendi. Sit possimus soluta ea ab sed esse officia. Provident ipsa qui repudiandae repudiandae sapiente sed voluptatem.</p><p><br></p><p><span class=\"ql-tenorblot\" data-id=\"5074481\" data-src=\"https://media.tenor.com/images/72c73b1f2b68e8c1a1cdcd1d8cb20b39/tenor.gif\">﻿<span contenteditable=\"false\"><img src=\"https://media.tenor.com/images/72c73b1f2b68e8c1a1cdcd1d8cb20b39/tenor.gif\"></span>﻿</span></p>"
                            :'In vel vehicula orci. Praesent vulputate pulvinar ante, a feugiat felis molestie non. Ut at magna consequat, luctus orci a, faucibus nulla. 
                            Duis metus velit, ullamcorper sed mauris eu, fermentum porta ante'),
                            $user, [
                                'created_at' => $thread->created_at
                        ]);

                        $thread->original_message_id = $message->id;
                        $thread->save();

                        $number_of_messages = rand(1, 5);
                        if($thread->id === 1) {
                            $number_of_messages = 100;
                        }

                        factory(Message::class, $number_of_messages)->create(['thread_id' => $thread->id])->each(function (Message $message) use ($pirates) {
                            $pirates->random(random_int(0, $pirates->count() * 0.3))->each(function (User $user) use ($message) {
                                $message->triggerReaction('like', true, $user);
                            });
                        });

                        $thread->updateMostPopularAnswer(true);
                    });


            }

            return true;
        }

    }
}
