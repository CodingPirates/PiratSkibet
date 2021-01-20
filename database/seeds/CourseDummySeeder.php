<?php

use Illuminate\Database\Seeder;
use App\Models\Course\Course;
use App\Models\Course\CourseResource;

class CourseDummySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $c                  = new Course();
        $c->level           = 0;
        $c->title           = 'Intro til Scratch';
        $c->slug            = str_replace(' ', '_', strtolower($c->title));
        $c->description     = 'Formålet med dette dyk er bare at vise de helt basale scratch komponenter og få børnene sat op.';
        $c->category_id     = 1;
        $c->position        = 1;
        $c->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 1;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Kom godt i gang","link":"Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 2;
                $crc->type          = 'text';
                $crc->meta          = ["text" =>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus varius euismod odio et suscipit. Nulla justo augue, auctor vel elit non, ultrices vulputate libero. In auctor turpis at metus ultrices, ac commodo tellus interdum. Aliquam pretium commodo rhoncus. Fusce maximus imperdiet laoreet. Duis vel dapibus nisl, a suscipit tortor. Aliquam erat volutpat.

Cras eu suscipit sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi eget pretium risus. Vestibulum convallis diam vitae sem malesuada, nec aliquet turpis fermentum. Suspendisse ante nisi, maximus nec neque id, pharetra tincidunt sem. Pellentesque nisl ante, auctor sit amet vulputate a, condimentum non velit. Sed a iaculis enim. Morbi id enim vestibulum, tempor sapien at, suscipit nunc.

Nullam rutrum justo purus, eget suscipit enim tempus ac. Nunc porttitor aliquam massa, at aliquam nibh. Sed fringilla tortor tortor. Mauris molestie purus sit amet lectus malesuada, sed vulputate diam venenatis. Nullam ultricies nunc sed diam rutrum tincidunt. Nulla at blandit mauris, ac fermentum purus. Mauris varius aliquam sagittis. Fusce commodo mi nulla, a elementum metus placerat id.

Donec leo felis, laoreet egestas sollicitudin eget, volutpat vitae quam. Integer volutpat fringilla orci, ac molestie arcu posuere ut. Maecenas tempor, nisl vel vulputate efficitur, elit orci consectetur leo, at pulvinar turpis ligula nec metus. Phasellus sed imperdiet nibh. Donec nulla dolor, facilisis ac porttitor id, semper in odio. Ut vel felis augue. Phasellus vel tellus egestas, sollicitudin risus vitae, lacinia velit. Mauris elementum pharetra commodo. Nulla ac aliquam nulla. Fusce efficitur molestie pretium. Quisque laoreet nec quam ac condimentum.

Donec tincidunt auctor dapibus. Vestibulum eu ultrices purus. Suspendisse nunc nibh, commodo vitae fermentum eu, molestie vel arcu. Aliquam in tempor nisl. Suspendisse lectus ante, blandit quis varius non, scelerisque at est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur volutpat sem quis consequat condimentum. Duis nec lorem id sem tincidunt scelerisque quis nec enim. Vestibulum convallis turpis id erat ultricies sollicitudin. Ut ullamcorper, quam vitae rutrum eleifend, lacus lectus semper nibh, aliquam interdum ipsum purus a dui. Ut in mollis dolor, sed interdum nisl. Curabitur metus ante, fermentum ut maximus ut, tempor ac urna. Maecenas aliquam dolor sed fermentum laoreet. Pellentesque vitae tincidunt eros. Morbi vulputate eget dui quis accumsan."];
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 3;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Gem projekter","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 4;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Udforsk og del projekter","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();





        $c                  = new Course();
        $c->level           = 0;
        $c->title           = 'Tegn med Scratch';
        $c->slug            = str_replace(' ', '_', strtolower($c->title));
        $c->description     = 'I dette dyk laver vi en tegning, hvor vi styrer spritens bevægelse med musen og dens størrelse med vores stemme.

Dette dyk er ment til at være en relativt simpel øvelse, der introducerer børnene til nogle af de grundlæggende komponenter (bevægelse, løkker, udseende, kostumer) og demonstrerer den fleksibilitet og kreativitet Scratch tilbyder.';
        $c->category_id     = 1;
        $c->position        = 2;
        $c->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 1;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Få spriten til at følge musen","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 2;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Skift spritens udseende: farve og kostume","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 3;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Pen udvidelse: Stempel/slet","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 4;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Ændr spritens størrelse med din stemme","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 5;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Lav dit eget kostume","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 6;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Gør det til dit eget","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();





        $c                  = new Course();
        $c->level           = 1;
        $c->title           = 'Samlespil';
        $c->slug            = str_replace(' ', '_', strtolower($c->title));
        $c->description     = 'I dette dyk laver vi et spil, hvor en fugl flyver på tværs af skærmen igen og igen, og prøver at fange krystaller, der flytter sig rundt.

Dette dyk er tænkt som en sjov og simpel øvelse, der introducerer nogle fundamentale koncepter: bevægelse og koordinater, hvis-brikken, berøring, og variabler til scores.';
        $c->category_id     = 1;
        $c->position        = 3;
        $c->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 1;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Få fuglen til at flyve","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 2;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Fang krystaller","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 3;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Score","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 4;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Gør det til dit eget","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 5;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Udvidelser","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();





        $c                  = new Course();
        $c->level           = 1;
        $c->title           = 'Tegnefilm';
        $c->slug            = str_replace(' ', '_', strtolower($c->title));
        $c->description     = 'I dette dyk laver vi en tegnefilm om en dreng og hans frø, der kommer på en mystisk tur, efter de finder en tryllestav. Det er meningen, at børnene kan fortsætte historien.

Dette dyk viser, hvordan Scratch kan bruges til at lave film og interaktioner og dækker nogle sjove og brugbare komponenter til den slags: snak sammen, send/modtag beskeder, lav brikker, lav dine egne kostumer, reager på baggrundsskift, og visuelle effekter.';
        $c->category_id     = 1;
        $c->position        = 4;
        $c->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 1;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Få sprites til at snakke sammen","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 2;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Animer en sprite","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 3;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Lav dine egne blokke","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 4;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Vilde effekter","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 5;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Gør det til dit eget","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();





        $c                  = new Course();
        $c->level           = 2;
        $c->title           = 'Gribespil';
        $c->slug            = str_replace(' ', '_', strtolower($c->title));
        $c->description     = 'I dette spil bruger vi musen til at styre en skål, for at fange jordbær, der falder fra himlen. Spillet ender når vi har misset 3 jordbær eller, hvis vi fanger en af de pindsvin, der også falder fra himlen.

 Dette dyk viser både velkendte og nye anvendelser af viden fra tidliger dyk. Vi genbruger i høj grad bevægelse, berøring og score-variabel fra samlespillet og begivenheder fra tegnefilmen, men anvender også principperne i en ny sammenhæng, fx med en ekstra, farlig sprite og en variabel til at holde styr på liv.';
        $c->category_id     = 1;
        $c->position        = 5;
        $c->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 1;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Få jordbær til at falde ned fra himlen","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 2;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Få skålen til at følge musen","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 3;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Tilføj en farlig sprite","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 4;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Tilføj liv","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 5;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Game over!","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 6;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Gør det til dit eget","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();





        $c                  = new Course();
        $c->level           = 2;
        $c->title           = 'Multi-player Pong';
        $c->slug            = str_replace(' ', '_', strtolower($c->title));
        $c->description     = 'Dette spil er det gode gamle multi-player pong spil. 

Dette dyk fokuserer ikke på at introducere nye koncepter, men viser i stedet en lidt mere avanceret brug af mange af de koncepter, de kender på dette tidspunkt. Det er også håbet, at det er sjovt (og øjenåbnende) for dem at lave et spil, de kan spille med deres venner eller familie. Og startskærmen er et generelt koncept, de kan bruge på mange sjove måder i deres andre spil.';
        $c->category_id     = 1;
        $c->position        = 6;
        $c->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 1;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Lav en hoppebold","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 2;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Indsæt paddle (1 spiller)","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 3;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Få bolden til at ramme paddlen","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 4;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Hold score","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 5;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Tilføj spiller 2","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 6;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Lav en startskærm","link":"https:\/\/www.youtube.com\/watch?v=Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

                $crc                = new CourseResource();
                $crc->course_id     = $c->id;
                $crc->position      = 7;
                $crc->type          = 'video';
                $crc->meta          = json_decode('{"title":"Gør det til dig eget","link":"Y7dpJ0oseIA","type":"youtube"}');
                $crc->save();

    }
}
