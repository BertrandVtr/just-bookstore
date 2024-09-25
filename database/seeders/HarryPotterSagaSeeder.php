<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class HarryPotterSagaSeeder extends Seeder
{
    public function run(): void
    {
        collect([
            [
                'title' => 'Harry Potter and the Philosopher\'s Stone',
                'saga' => 'Harry Potter',
                'volume' => 1,
                'image' => 'philosophers_stone.jpg',
                'price' => 9.99,
            ],
            [
                'title' => 'Harry Potter and the Chamber of Secrets',
                'saga' => 'Harry Potter',
                'volume' => 2,
                'image' => 'chamber_of_secrets.jpg',
                'price' => 9.99,
            ],
            [
                'title' => 'Harry Potter and the Prisoner of Azkaban',
                'saga' => 'Harry Potter',
                'volume' => 3,
                'image' => 'prisoner_of_azkaban.jpg',
                'price' => 9.99,
            ],
            [
                'title' => 'Harry Potter and the Goblet of Fire',
                'saga' => 'Harry Potter',
                'volume' => 4,
                'image' => 'goblet_of_fire.jpg',
                'price' => 9.99,
            ],
            [
                'title' => 'Harry Potter and the Order of the Phoenix',
                'saga' => 'Harry Potter',
                'volume' => 5,
                'image' => 'order_of_phoenix.jpg',
                'price' => 9.99,
            ],
            [
                'title' => 'Harry Potter and the Half-Blood Prince',
                'saga' => 'Harry Potter',
                'volume' => 6,
                'image' => 'half_blood_prince.jpg',
                'price' => 9.99,
            ],
            [
                'title' => 'Harry Potter and the Deathly Hallows',
                'saga' => 'Harry Potter',
                'volume' => 7,
                'image' => 'deathly_hallows.jpg',
                'price' => 9.99,
            ],
        ])
            ->each(function (array $book) {
                Book::firstOrCreate($book, ['stock' => 5]);
            });
    }
}
