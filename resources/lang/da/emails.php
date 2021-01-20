<?php

return [

    /*
    |--------------------------------------------------------------------------
    | WARNING !!
    |--------------------------------------------------------------------------
    |
    | Content of this file is used in markdown emails.
    | Be careful about formatting and whitespaces.
    |
    */

    'greetings'   => [
        'casual' => 'Hi!',
        'polite' => 'Kære :title',
    ],

    'salutation' => 'De bedste hilsner fra

Piratskibets besætning  
Coding Pirates Denmark',


    // ResetPassword Notification

    'reset_password' => [
        'subject' => 'Nulstilling af kodeord',
        'action'  => 'Nulstil kodeord',

        'line_1'  => 'Ups! Du har glemt dit kodeord. Men frygt ej - der er hjælp at hente.',
        'line_2'  => 'Følg dette link og indtast et nyt kodeord:',
        'line_3'  => 'Vi glæder os til, at du kommer tilbage på Piratskibet!',
    ],

    // VerifyEmail Notification

    'verify_parent_email' => [
        'subject' => 'Verificeringsemail',
        'action'  => 'Verificer email',

        'line_1'  => 'Dit barn vil gerne opgraderes fra Landkrabbe til Pirat på Piratskibet.dk.',
        'line_2'  => 'Du læse mere om Piratskibet [her](:url).',
        'line_3'  => 'Dit barns brugernavn er **:username**, og deres Piratskibet-profil kan du finde [her](:url).',
        'line_4'  => 'Forskellen på en Landkrabbe og en Pirat er simpel. Landkrabber kan ikke lægge ting op på Piratskibet, eller skrive i Piratsnak. Det kan Pirater.',
        'line_5'  => 'For at blive Pirat skal vi bruge din hjælp. Udover at du bekræfter denne mail som forældremail, så vil vi også bede dig indtaste dit barns alder og postnummer, hvis det mangler. Informationerne bruger vi til at sikre, at vores aktiviteter retter sig mod den rigtige aldersgruppe, og at vores fysiske events bliver tilgængelige for flest mulige deltagere.',
        'line_6'  => 'Log ind og følg dette link for at verificere og indtaste informationerne:',
    ],

    // SignupReminder Mail

    'signup_reminder' => [
        'greeting' => 'Ohøj Landkrabbe!',

        'subject' => 'Husk at opgradere dig til Pirat!|Vi savner dig på Piratskibet!',
        'heading' => 'Vi er simpelthen så glade for, at du er kommet ombord på Piratskibet.|For et par uger siden kom du ombord på Piratskibet – og det er vi vildt glade for!',
    ],

    // WeeklyNewsletter Mail

    'weekly_newsletter' => [
        'subject'  => 'Nyt fra Piratskibet',
        'greeting' => 'Ohøj Pirat!',

        'projects_highlight' => '{0} :user har liket dit projekt [:project](:link).|{1} :user og 1 anden har liket dit projekt [:project](:link).|[2,*] :user og :count andre har liket dit projekt [:project](:link).',
        'projects_summary'   => '{1} Der har også været aktivitet på ét af dine andre projekter.|[2,*] Der har også været aktivitet på :count af dine andre projekter.',

        'threads_highlight' => '{0} :user har :actions [din chat](:link).|{1} :user og 1 anden har :actions [din chat](:link).|[2,*] :user og :count andre har :actions [din chat](:link).',
        'threads_summary'   => '{1} Der har også været aktivitet på én af dine andre chats.|[2,*] Der har også været aktivitet på :count af dine andre chats.',

        'unsubscribe' => 'Hvis du ikke længere ønsker at modtage Piratskibsnyt, kan du afmelde det i "NOTIFIKATIONSINDSTILLINGER" under "RET PROFIL", når du er logget ind på [www.piratskibet.dk](https://www.piratskibet.dk).',
        'questions'   => 'Har du spørgsmål, så kontakt os på [piratskibet@codingpirates.dk](mailto:piratskibet@codingpirates.dk)',
    ],
];
