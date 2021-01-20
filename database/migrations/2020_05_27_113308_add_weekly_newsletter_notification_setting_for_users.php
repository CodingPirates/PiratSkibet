<?php

use App\Models\User\UserMeta;
use App\Support\Enums\NotificationType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddWeeklyNewsletterNotificationSettingForUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\User\UserMeta::query()
            ->where('name', 'notification_settings')
            ->get()
            ->each(function (UserMeta $meta) {
                $value = $meta->value;
                $value->{NotificationType::WEEKLY_NEWSLETTER} = false;

                $meta->value = $value;
                $meta->save();
            });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \App\Models\User\UserMeta::query()
            ->where('name', 'notification_settings')
            ->get()
            ->each(function (UserMeta $meta) {
                $value = $meta->value;
                unset($value->{NotificationType::WEEKLY_NEWSLETTER});

                $meta->value = $value;
                $meta->save();
            });
    }
}
