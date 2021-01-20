<?php

use Illuminate\Database\Seeder;

class demoNewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $news               = new \App\Models\News();
        $news->title        = 'Frivilligprojektet: Status på Frivilligmøder og opstartsguide';
        $news->subtext      = '<p>2. maj 2019 Frivilligmøderne er i godt i gang, og vi kan allerede nu se nogen af de samme tendenser på tværs af afdelingerne. Ida er startet som projektmedarbejder, og hendes første opgave bliver en opstartsguide. God energi til Frivilligmøderne</p>';
        $news->img          = 'https://codingpirates.dk/wp-content/uploads/2019/05/Frivilligm%C3%B8de_Rentemestervej.png';
        $news->theme        = 'yellow-pink';
        $news->link         = 'https://codingpirates.dk/frivilligprojektet-status-paa-frivilligmoeder-og-opstartsguide/';
        $news->publish_at   = \Carbon\Carbon::now();
        $news->status       = 'published';
        $news->save();

        //---------------------------------------------------------------------------------//

        $news               = new \App\Models\News();
        $news->title        = 'En dag på Sekretariatet i Coding Pirates';
        $news->subtext      = '<p>Klokken er 8.27, og solen skinner over Odense Havn, da jeg mandag morgen i påskeugen kommer cyklende fra byen og ned mod Coding Pirates-kontoret på havnen.</p>';
        $news->img          = 'https://codingpirates.dk/wp-content/uploads/2019/04/P1000148-2-1024x675.jpg';
        $news->theme        = 'pink-yellow';
        $news->link         = 'https://codingpirates.dk/en-dag-paa-sekretariatet-i-coding-pirates/';
        $news->publish_at   = \Carbon\Carbon::now();
        $news->status       = 'published';
        $news->save();

        //---------------------------------------------------------------------------------//

        $news               = new \App\Models\News();
        $news->title        = 'Ny besætning i cp billund (featured)';
        $news->subtext      = '<p>Coding Pirates Billund har netop afholdt ordinær generalforsamling. En ny besætning har derfor afløst den tiligere besætning på sørøverskibet CP Billund.</p>';
        $news->img          = 'https://codingpirates.dk/wp-content/uploads/2019/04/cpbillund-bestyrelse-e1555592451893-1080x675.jpg';
        $news->featured     = 1;
        $news->theme        = 'blue-yellow';
        $news->link         = 'https://codingpirates.dk/ny-besaetning-i-cp-billund/';
        $news->publish_at   = \Carbon\Carbon::now();
        $news->status       = 'published';
        $news->save();

        //---------------------------------------------------------------------------------//

        $news               = new \App\Models\News();
        $news->title        = 'Piraterne indtager Strynø';
        $news->subtext      = '<p>Mikael Kian Hansen søgte Landdistriktspuljens ø-støtte, som støtter initiativer og projekter, der kan skabe udvikling og arbejdspladser på småøerne.</p>';
        $news->img          = 'https://codingpirates.dk/wp-content/uploads/2019/04/Piraterne_indtager_Stryn%C3%B8.png';
        $news->theme        = 'yellow-pink';
        $news->link         = 'https://codingpirates.dk/piraterne-indtager-strynoe/';
        $news->publish_at   = \Carbon\Carbon::now();
        $news->status       = 'published';
        $news->save();

        //---------------------------------------------------------------------------------//

        $news               = new \App\Models\News();
        $news->title        = 'Piratskibet: Webbureauet Morning Train skal bygge Piratskibet';
        $news->subtext      = '<p>Udviklingen af Piratskibet får nu for alvor vind i sejlene, idet vi kan annoncere Morning Train som webbureauet, der skal udvikle online platformen.</p>';
        $news->img          = 'https://codingpirates.dk/wp-content/uploads/2019/04/test-1080x675.jpg';
        $news->theme        = 'grey-pink';
        $news->link         = 'https://codingpirates.dk/webbureauet-morning-train-skal-bygge-piratskibet/';
        $news->publish_at   = \Carbon\Carbon::now();
        $news->status       = 'published';
        $news->save();

        //---------------------------------------------------------------------------------//

        $news               = new \App\Models\News();
        $news->title        = 'unpublished';
        $news->subtext      = '<p>Udviklingen af Piratskibet får nu for alvor vind i sejlene, idet vi kan annoncere Morning Train som webbureauet, der skal udvikle online platformen.</p>';
        $news->img          = 'https://codingpirates.dk/wp-content/uploads/2019/04/test-1080x675.jpg';
        $news->theme        = 'pink-black';
        $news->link         = 'https://codingpirates.dk/webbureauet-morning-train-skal-bygge-piratskibet/';
        $news->publish_at   = \Carbon\Carbon::now()->addDays(5);
        $news->status       = 'draft';
        $news->save();

    }
}
