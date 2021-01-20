<?php

use App\Models\Projects\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class ProjectCategorySeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->parents as $parent) {
            $id       = Category::create($parent)->id;
            $children = $this->getChildren($parent['slug'], $id);

            if (!empty($children)) {
                \DB::table('project_categories')->insert($children);
            }
        }

    }

    protected function getChildren(string $slug, int $id)
    {
        $children = Arr::get($this->children, $slug, []);

        return array_map(function ($child) use ($id) {
            $child['parent_id']  = $id;
            $child['created_at'] = now();
            $child['updated_at'] = now();

            return $child;
        }, $children);
    }

    protected $parents = [
        [
            'name' => 'Spil',
            'slug' => 'spil',
        ],
        [
            'name' => 'Web',
            'slug' => 'web',
        ],
        [
            'name' => 'Grafik',
            'slug' => 'grafik',
        ],
        [
            'name' => 'Apps',
            'slug' => 'apps',
        ],
        [
            'name' => 'Hardware',
            'slug' => 'hardware',
        ],
        [
            'name' => 'Robot',
            'slug' => 'robot',
        ],
        [
            'name' => 'Hacks',
            'slug' => 'hacks',
        ],
        [
            'name' => 'Lyd',
            'slug' => 'lyd',
        ],
        [
            'name' => 'Film',
            'slug' => 'film',
        ],
    ];

    protected $children = [
        'spil' => [
            [
                'name' => '2D',
                'slug' => 'spil_2d',
            ],
            [
                'name' => '3D',
                'slug' => 'spil_3d',
            ],
            [
                'name' => 'VR',
                'slug' => 'spil_vr',
            ],
            [
                'name' => 'Andet',
                'slug' => 'spil_andet',
            ],
        ],
        'web' => [
            [
                'name' => 'Front-end / client',
                'slug' => 'web_frontend',
            ],
            [
                'name' => 'Backend / server',
                'slug' => 'web_backend',
            ],
            [
                'name' => 'Andet',
                'slug' => 'web_andet',
            ],
        ],
        'grafik' => [
            [
                'name' => '2D',
                'slug' => 'grafik_2d',
            ],
            [
                'name' => '3D',
                'slug' => 'grafik_3d',
            ],
            [
                'name' => 'Pixelart',
                'slug' => 'grafik_pixelart',
            ],
            [
                'name' => 'Vektor',
                'slug' => 'grafik_vektor',
            ],
            [
                'name' => 'Andet',
                'slug' => 'grafik_andet',
            ],
        ],
        'apps' => [
            [
                'name' => 'Windows',
                'slug' => 'apps_windows',
            ],
            [
                'name' => 'iOs / MacOS',
                'slug' => 'apps_apple',
            ],
            [
                'name' => 'Linux',
                'slug' => 'apps_linux',
            ],
            [
                'name' => 'Andet',
                'slug' => 'apps_andet',
            ],
        ],
        'hardware' => [
            [
                'name' => 'Arduino',
                'slug' => 'hardware_arduino',
            ],
            [
                'name' => 'LEGO',
                'slug' => 'hardware_lego',
            ],
            [
                'name' => 'Raspberry Pi',
                'slug' => 'hardware_raspberry_pi',
            ],
            [
                'name' => 'Micro:bit / Ultra:bit',
                'slug' => 'hardware_microbit',
            ],
            [
                'name' => 'Andet',
                'slug' => 'hardware_andet',
            ],
        ],
    ];
}
