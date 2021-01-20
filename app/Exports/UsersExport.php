<?php

namespace App\Exports;

use App\Models\User\User;
use App\Support\Enums\UserRoles;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Events\AfterSheet;

class UsersExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize, WithEvents
{
    use RegistersEventListeners;
    
    public function query()
    {
        return User::query()
            ->withoutGlobalScope('default_withs')
            ->with('roles')
            ->with(['metaAttributes' => function ($q) {
                $q->where('name', 'zipcode');
            }])
            ->withCount([
                'rewards',
                'projects',
                'participatingProjects',
                'courseProgresses',
                'moderationAccusations',
                'threads' => function ($q) {
                    $q->where('is_embedded', false);
                },
                'messages' => function ($q) {
                    $q->isNormalMessage();
                    $q->whereHas('thread', function ($q) {
                        $q->where('is_embedded', false);
                    });
                },
                'messages as project_messages_count' => function ($q) {
                    $q->whereHas('thread', function ($q) {
                        $q->has('project');
                    });
                },
            ]);
    }

    public function headings(): array
    {
        return [
            'Navn',
            'Brugernavn',
            'Email',
            'Forældre-email',
            'Alder',
            'Postnummer',
            'Rolle',
            'Dato for oprettelse',
            'Seneste aktivitet',
            'Projekter i Showcase',
            'Kommentarer i Showcase',
            'Chats i Piratsnak',
            'Kommentarer i Piratsnak',
            'Afsluttede forløb i Kodehavet',
            'Achievements',
            'Moderationssager',
        ];
    }

    public function map($user): array
    {
        return [
            $user->name,                                                    // 'Navn',
            $user->username,                                                // 'Brugernavn',
            $user->email,                                                   // 'Email',
            $user->parent_email,                                            // 'Forældre-email',
            $user->age,                                                     // 'Alder',
            $user->zipcode,                                                 // 'Postnummer',
            UserRoles::translate($user->role_name),                         // 'Rolle',
            static::formatDate($user->created_at),                          // 'Dato for oprettelse',
            static::formatDate($user->last_activity_at),                    // 'Seneste aktivitet',
            $user->projects_count + $user->participating_projects_count,    // 'Antal tilknyttede projekter',
            $user->project_messages_count,                                  // 'Kommentarer i Showcase',
            $user->threads_count,                                           // 'Antal chats i Piratsnak',
            $user->messages_count,                                          // 'Kommentarer i Piratsnak',
            $user->course_progresses_count,                                 // 'Antal gennemførte/afsluttede læringsforløb i Kodehavet',
            $user->rewards_count,                                           // 'Antal Achievements',
            $user->moderation_accusations_count,                            // 'Antal moderationssager',
        ];
    }

    public static function afterSheet(AfterSheet $event)
    {
        rescue(static function () use ($event) {
            $event->sheet->getDelegate()->freezePane('A2');
        });
    }

    public static function formatDate(Carbon $date = null)
    {
        return optional($date)->format('d/m/Y H:i:s');
    }
}
