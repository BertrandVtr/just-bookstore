<?php

namespace App\Http\Requests;

use App\Models\Book;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Illuminate\Validation\Validator;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'items' => 'required|array',
            'items.*.book_id' => 'required|exists:books,id',
            'items.*.quantity' => [
                'required',
                'integer',
                'min:1',
                function (string $attribute, mixed $value, callable $fail, Validator $validator) {

                    $bookId = data_get($validator->attributes(), str($attribute)->replace('quantity', 'book_id'));
                    $book = Book::find($bookId);

                    if (! $book instanceof Book) {
                        return;
                    }

                    if ($value > $book->stock) {
                        $fail("La quantité demandée pour le livre ID $bookId dépasse le stock disponible ($book->stock).");
                    }
                },
            ],
        ];
    }
}
