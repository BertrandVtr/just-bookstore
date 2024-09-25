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
                'image' => 'https://www.wizardingworld.com/images/products/books/UK/rectangle-1.jpg',
                'price' => 9.99,
            ],
            [
                'title' => 'Harry Potter and the Chamber of Secrets',
                'saga' => 'Harry Potter',
                'volume' => 2,
                'image' => 'https://www.wizardingworld.com/images/products/books/UK/rectangle-2.jpg',
                'price' => 9.99,
            ],
            [
                'title' => 'Harry Potter and the Prisoner of Azkaban',
                'saga' => 'Harry Potter',
                'volume' => 3,
                'image' => 'https://www.wizardingworld.com/images/products/books/UK/rectangle-3.jpg',
                'price' => 9.99,
            ],
            [
                'title' => 'Harry Potter and the Goblet of Fire',
                'saga' => 'Harry Potter',
                'volume' => 4,
                'image' => 'https://www.wizardingworld.com/images/products/books/UK/rectangle-4.jpg',
                'price' => 9.99,
            ],
            [
                'title' => 'Harry Potter and the Order of the Phoenix',
                'saga' => 'Harry Potter',
                'volume' => 5,
                'image' => 'https://www.wizardingworld.com/images/products/books/UK/rectangle-5.jpg',
                'price' => 9.99,
            ],
            [
                'title' => 'Harry Potter and the Half-Blood Prince',
                'saga' => 'Harry Potter',
                'volume' => 6,
                'image' => 'https://www.wizardingworld.com/images/products/books/UK/rectangle-6.jpg',
                'price' => 9.99,
            ],
            [
                'title' => 'Harry Potter and the Deathly Hallows',
                'saga' => 'Harry Potter',
                'volume' => 7,
                'image' => 'https://www.wizardingworld.com/images/products/books/UK/rectangle-7.jpg',
                'price' => 9.99,
            ],
        ])
            ->each(function (array $book) {
                Book::updateOrCreate($book, ['stock' => 5]);
            });
    }
}
