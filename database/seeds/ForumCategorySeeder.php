<?php

use Illuminate\Database\Seeder;
use App\Models\Forum\Thread;
use App\Models\Forum\Message;
use App\Models\Forum\Topic;
use App\Models\User\User;
use Faker\Factory as Faker;

class ForumCategorySeeder extends Seeder
{
    public function run()
    {

        $structure  = [
            "Velkommen på Piratskibet" => [
                "Annonceringer" => 'Her kan du læse spændende nyheder og se de nyeste events.',
                "Er du ny Pirat?" => "Velkommen til Piratskibet. Vi er glade for at have dig med ombord! Her kan du finde en masse information om, hvordan du kommer godt i gang.",
            ],
            "Spørgsmål til de IT-kreative forløb" => [
                "Scratch" => "Her kan du stille spørgsmål til Kodehavet-forløbet om Scratch.",
                "Webprogrammering" => "Her kan du stille spørgsmål til Kodehavet-forløbet om webprogrammering.",
                "Javascript via p5.js" => "Her kan du stille spørgsmål til Kodehavet-forløbet om Javascript."
            ],
            "Spørgsmål til teknologi" => [
                "Spildesign" => "Kunne du tænke dig at lave dit helt eget spil, eller er du i fuld gang, men sidder med et spørgsmål? Så er det her, du kan stille spørgsmål eller fremvise dit projekt.",
                "Video og musik" => "Arbejder du med musik og/eller video, eller vil du gerne? Så stil dine spørgsmål her.",
                "Webudvikling" => "Kunne du tænke dig at lave din egen hjemmeside, eller er du allerede i gang og har spørgsmål? Så kan du starte en chat, hvor du kan stille spørgsmål eller vise dit projekt frem.",
                "Apps" => "Har du også fået øjnene op for AppInventor, eller laver du apps på en anden måde? Så kan du spørge om hjælp her, eller bare vise din nye app frem!",
                "Hardware" => "Sidder du og bakser med Arduino, Raspberry Pie, LEGO eller anden fysisk elektronik, så kan du stille spørgsmål eller fremvise dit projekt her.",
            ],
            "Andet" => [
                "Hyggesnak" => "Her kan du chatte om alle mulige ting: lige fra spændende projekter til hvilke gode film, der går i biografen.",
                "Bugs, glitches eller andre fejl på Piratskibet" => "Oplever du fejl på Piratskibet, så skriv dem her, så vi kan lappe skuden og få Piratskibet til at sejle for fulde sejl igen.",
            ],
        ];

        $faker = Faker::create();

        foreach ($structure as $category => $children)
        {
            $cat = new Topic();
            $cat->name = $category;
            $cat->slug = ForumCategorySeeder::createSlug($category, '_');

            $cat->save();

            foreach ($children as $topic => $description)
            {
                $child = new Topic();
                $child->name = $topic;
                $child->parent_id = $cat->id;
                $child->slug = ForumCategorySeeder::createSlug($topic, '_');
                $child->description = $description;

                $child->save();
            }

        }
    }

    public static function createSlug($str, $delimiter = '-'){

        $slug = strtolower(trim(preg_replace('/[\s-]+/', $delimiter, preg_replace('/[^A-Za-z0-9-]+/', $delimiter, preg_replace('/[&]/', 'and', preg_replace('/[\']/', '', iconv('UTF-8', 'ASCII//TRANSLIT', $str))))), $delimiter));
        return $slug;

    }
}
