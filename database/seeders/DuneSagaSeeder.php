<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class DuneSagaSeeder extends Seeder
{
    public function run(): void
    {
        collect([
            [
                'title' => 'Dune',
                'saga' => 'Dune',
                'volume' => 1,
                'image' => 'https://images.penguinrandomhouse.com/cover/9780593099322',
                'price' => 14.99,
            ],
            [
                'title' => 'Dune Messiah',
                'saga' => 'Dune',
                'volume' => 2,
                'image' => 'https://m.media-amazon.com/images/I/810sNAUlgxL._AC_UF1000,1000_QL80_.jpg',
                'price' => 12.99,
            ],
            [
                'title' => 'Children of Dune',
                'saga' => 'Dune',
                'volume' => 3,
                'image' => 'https://m.media-amazon.com/images/I/815GrZMJQcL._AC_UF1000,1000_QL80_.jpg',
                'price' => 13.99,
            ],
            [
                'title' => 'God Emperor of Dune',
                'saga' => 'Dune',
                'volume' => 4,
                'image' => 'https://images.penguinrandomhouse.com/cover/9780593201756',
                'price' => 15.99,
            ],
            [
                'title' => 'Heretics of Dune',
                'saga' => 'Dune',
                'volume' => 5,
                'image' => 'https://m.media-amazon.com/images/I/81xXSeko45L._AC_UF1000,1000_QL80_.jpg',
                'price' => 14.49,
            ],
            [
                'title' => 'Chapterhouse: Dune',
                'saga' => 'Dune',
                'volume' => 6,
                'image' => 'https://m.media-amazon.com/images/I/81+WLiObXqL._AC_UF1000,1000_QL80_.jpg',
                'price' => 16.99,
            ],
        ])
            ->each(function (array $book) {
                Book::updateOrCreate($book, ['stock' => 5]);
            });
    }
}
