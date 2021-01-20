<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'                 => ':Attribute skal accepteres.',
    'active_url'               => ':Attribute er ikke en gyldig URL.',
    'after'                    => ':Attribute skal være en dato efter :date.',
    'after_or_equal'           => ':Attribute skal være en dato efter eller lig med :date.',
    'alpha'                    => ':Attribute må kun bestå af bogstaver.',
    'alpha_dash'               => ':Attribute må kun bestå af bogstaver, tal, bindestreger og underscores.',
    'alpha_num'                => ':Attribute må kun bestå af bogstaver og tal.',
    'array'                    => ':Attribute skal være et array.',
    'before'                   => ':Attribute skal være en dato før :date.',
    'before_or_equal'          => ':Attribute skal være en dato før eller lig med :date.',
    'between'                  => [
        'numeric' => ':Attribute skal være mellem :min og :max.',
        'file'    => ':Attribute skal være mellem :min og :max kilobytes.',
        'string'  => ':Attribute skal være mellem :min og :max tegn.',
        'array'   => ':Attribute skal indeholde mellem :min og :max elementer.',
    ],
    'boolean'                  => ':Attribute skal være sand eller falsk.',
    'confirmed'                => ':Attribute er ikke det samme som bekræftelsesfeltet.',
    'date'                     => ':Attribute er ikke en gyldig dato.',
    'date_equals'              => ':Attribute skal være en dato lig med :date.',
    'date_format'              => ':Attribute matcher ikke formatet :format.',
    'different'                => ':Attribute og :other skal være forskellige.',
    'digits'                   => ':Attribute skal have :digits cifre.',
    'digits_between'           => ':Attribute skal have mellem :min og :max cifre.',
    'dimensions'               => ':Attribute har forkerte billeddimensioner.',
    'distinct'                 => ':Attribute har en duplikatværdi.',
    'email'                    => ':Attribute skal være en gyldig e-mailadresse.',
    'ends_with'                => ':Attribute skal ende med en af følgende værdier: :values',
    'exists'                   => 'Valgte :attribute er ugyldig.',
    'file'                     => ':Attribute skal være en fil.',
    'filled'                   => ':Attribute skal udfyldes.',
    'gt'                       => [
        'numeric' => ':Attribute skal være større end :value.',
        'file'    => ':Attribute skal være større end :value kilobytes.',
        'string'  => ':Attribute skal være mere end :value tegn.',
        'array'   => ':Attribute skal være mere end :value elementer.',
    ],
    'gte'                      => [
        'numeric' => ':Attribute skal være større end eller lig med :value.',
        'file'    => ':Attribute skal være større end eller lig med :value kilobytes.',
        'string'  => ':Attribute skal være mere end eller lig med :value tegn.',
        'array'   => ':Attribute skal have :value elementer eller mere.',
    ],
    'image'                    => ':Attribute skal være et billede.',
    'in'                       => 'Valgte :attribute er ugyldig.',
    'in_array'                 => ':Attribute eksisterer ikke i :other.',
    'integer'                  => ':Attribute skal være et heltal.',
    'ip'                       => ':Attribute skal være en gyldig IP adresse.',
    'ipv4'                     => ':Attribute skal være en gyldig IPv4 adresse.',
    'ipv6'                     => ':Attribute skal være en gyldig IPv6 adresse.',
    'json'                     => ':Attribute skal være en gyldig JSON streng.',
    'lt'                       => [
        'numeric' => ':Attribute skal være mindre end :value.',
        'file'    => ':Attribute skal være mindre end :value kilobytes.',
        'string'  => ':Attribute skal være mindre end :value tegn.',
        'array'   => ':Attribute skal have mindre end :value items.',
    ],
    'lte'                      => [
        'numeric' => ':Attribute skal være mindre eller lig med :value.',
        'file'    => ':Attribute skal være mindre eller lig med :value kilobytes.',
        'string'  => ':Attribute skal være mindre eller lig med :value tegn.',
        'array'   => ':Attribute må ikke have mere end :value elementer.',
    ],
    'max'                      => [
        'numeric' => ':Attribute må ikke være større end :max.',
        'file'    => ':Attribute må ikke være større end :max kilobytes.',
        'string'  => ':Attribute må ikke være mere end :max tegn.',
        'array'   => ':Attribute må ikke indeholde mere end :max elementer.',
    ],
    'mimes'                    => ':Attribute skal være en fil af typen: :values.',
    'mimetypes'                => ':Attribute skal være en fil af typen: :values.',
    'min'                      => [
        'numeric' => ':Attribute skal være mindst :min.',
        'file'    => ':Attribute skal være mindst :min kilobytes.',
        'string'  => ':Attribute skal være mindst :min tegn.',
        'array'   => ':Attribute skal indeholde mindst :min elementer.',
    ],
    'not_in'                   => 'Valgte :attribute er ugyldig.',
    'not_regex'                => 'Formatet for :attribute er ugyldigt.',
    'numeric'                  => ':Attribute skal være et tal.',
    'present'                  => ':Attribute skal være tilstede.',
    'regex'                    => ':Attribute formatet er ugyldigt.',
    'required'                 => ':Attribute skal udfyldes.',
    'required_if'              => ':Attribute skal udfyldes når :other er :value.',
    'required_unless'          => ':Attribute er påkrævet med mindre :other findes i :values.',
    'required_with'            => ':Attribute skal udfyldes når :values er udfyldt.',
    'required_with_all'        => ':Attribute skal udfyldes når :values er udfyldt.',
    'required_without'         => ':Attribute skal udfyldes når :values ikke er udfyldt.',
    'required_without_all'     => ':Attribute skal udfyldes når ingen af :values er udfyldt.',
    'same'                     => ':Attribute og :other skal være ens.',
    'size'                     => [
        'numeric' => ':Attribute skal være :size.',
        'file'    => ':Attribute skal være :size kilobytes.',
        'string'  => ':Attribute skal være :size tegn lang.',
        'array'   => ':Attribute skal indeholde :size elementer.',
    ],
    'starts_with'              => ':Attribute skal starte med én af følgende: :values.',
    'string'                   => ':Attribute skal være en streng.',
    'timezone'                 => ':Attribute skal være en gyldig tidszone.',
    'unique'                   => ':Attribute er allerede taget.',
    'uploaded'                 => ':Attribute fejlede i upload.',
    'url'                      => ':Attribute formatet er ugyldigt.',
    'uuid'                     => ':Attribute skal være en gyldig UUID.',

    // Custom
    'alpha_dash_dot'           => ':Attribute må kun bestå af bogstaver, tal, bindestreger, underscores og punktummer.',
    'filled_html'              => ':Attribute skal udfyldes.',
    'avatar_item_is_available' => 'Dette Avatar element er ikke tilgængelig.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'password' => [
            'confirmed' => 'Adgangskoden er ikke gentaget korrekt.',
        ],
        'zipcode' => [
            'integer' => 'Postnummeret er ikke gyldig.',
        ],

        'parent_email' => [
            'in' => 'Du kan ikke ændre :attribute efter bekræftelse.',
        ],

        'vows' => [
            'size' => 'Der skal være :size :Attribute.',
        ],

        'vows.vow_1'  => [
            'accepted' => 'Du skal aflægge det første piratløfte',
        ],
        'vows.vow_2'  => [
            'accepted' => 'Du skal aflægge det andet piratløfte',
        ],
        'vows.vow_3'  => [
            'accepted' => 'Du skal aflægge det tredje piratløfte',
        ],
        'vows.vow_4'  => [
            'accepted' => 'Du skal aflægge det fjerde piratløfte',
        ],
        'vows.vow_5'  => [
            'accepted' => 'Du skal aflægge det femte piratløfte',
        ],
        'vows.vow_6'  => [
            'accepted' => 'Du skal aflægge det sjette piratløfte',
        ],

        'files.*' => [
            'mimes' => ':Attribute skal være af typen: :values.',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        // People
        'name'          => 'navn',
        'age'           => 'alder',
        'parent_email'  => 'forældre e-mail',
        'zipcode'       => 'postnummer',
        'birthday'      => 'fødselsdag',
        'username'      => 'brugernavn',
        'password'      => 'adgangskoden',
        'vows'          => 'piratløfter',

        // Content
        'text'          => 'tekst',
        'title'         => 'titel',
        'description'   => 'beskrivelse',
        'subtext'       => 'beskrivelse',
        'content'       => 'indhold',
        'slug'          => 'sti',
        'path'          => 'sti',
        'message'       => 'besked',
        'subject'       => 'emne',
        'img'           => 'billede',

        // Files
        'cover_image'   => 'cover billede',
        'cover_image.*' => 'cover billede',

        'thumbnail'     => 'thumbnail',
        'thumbnail.*'   => 'thumbnail',

        'files'         => 'projekt fil',
        'files.*'       => 'alle projekt filer',

        // Dates
        'publish_at'    => 'udgivelses dato',
        'start_at'      => 'start dato',
        'end_at'        => 'slut dato',

        // Custom
        'theme'         => 'tema',
        'featured'      => 'fremhævet',

        // Nested
        'children'      => [
            '*' => [
                'name'        => 'navn',
                'slug'        => 'sti',
                'description' => 'beskrivelse',
            ],
        ],

        'reminders' => [
            '*' => [
                'remind_at' => 'dato for påmindelse',
            ],
        ],

        'regions' => [
            '*' => [
                'id' => 'region',
            ],
        ],

        'achievement_items' => [
            '*' => [
                'item_type' => 'type',
            ],
        ],

        'resources' => [
            '*' => [
                'type' => 'type',
            ],
        ],
    ],

];
