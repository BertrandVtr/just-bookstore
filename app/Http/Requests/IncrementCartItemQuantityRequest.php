<?php

namespace App\Http\Requests;

use App\Models\Book;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class IncrementCartItemQuantityRequest extends FormRequest
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
            'quantity' => [
                'required',
                'integer',
                'min:1',
                function (string $attribute, mixed $value, callable $fail, Validator $validator) {

                    $book = $this->route()->parameter('book');

                    if ($value > $book->stock) {
                        $fail("La quantité demandée pour le livre ID $book->id dépasse le stock disponible ($book->stock).");
                    }
                },
            ],
        ];
    }
}
