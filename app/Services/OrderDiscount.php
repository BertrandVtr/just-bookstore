<?php

namespace App\Services;

use App\Models\OrderItem;
use Illuminate\Support\Collection;

class OrderDiscount
{
    private const DISCOUNTED_SAGAS = [
        'Harry Potter' => 7,
    ];

    public static function from(Collection $orderItems): self
    {
        return (new self($orderItems))->calculateDiscounts();
    }

    /**
     * @var OrderItem[]|Collection
     */
    public Collection $remainingItems;

    public Collection $pairedVolumesDiscountedItems;

    public Collection $completeSagaDiscountedItems;

    public Collection $orderItems;

    /**
     * @param Collection|OrderItem[] $orderItems
     */
    private function __construct(Collection $orderItems)
    {
        $this->orderItems = $orderItems;
        $this->remainingItems = collect();
        $this->pairedVolumesDiscountedItems = collect();
        $this->completeSagaDiscountedItems = collect();
    }

    private function calculateCompleteSagaDiscount(string $saga, int $maxVolume): void
    {
        $expectedVolumes = collect(range(1, $maxVolume));

        $items = $this
            ->remainingItems
            ->where('book.saga', $saga)
            ->whereIn('book.volume', $expectedVolumes)
            ->sortBy('book.volume');

        if (! $expectedVolumes->every(fn (int $volume) => $items->contains('book.volume', $volume))) {
            return;
        }

        $quantity = $items->min('quantity');

        $this->completeSagaDiscountedItems = $items->map(function ($item) use ($quantity) {
            $item->quantity -= $quantity;
            $newItem = $item->replicate();
            $newItem->quantity = $quantity;

            return $newItem;
        });
    }

    private function calculatePairedVolumesDiscount(string $saga, int $maxVolume): void
    {
        $expectedVolumes = collect(range(1, $maxVolume));

        $items = $this
            ->remainingItems
            ->where('book.saga', $saga)
            ->whereIn('book.volume', $expectedVolumes)
            ->sortBy('book.volume');

        $items->each(function ($item, $index) use ($maxVolume, $items) {
            $next = $items[$index + 1] ?? null;

            if (! $next instanceof OrderItem) {
                return;
            }

            $quantity = min($item->quantity, $next->quantity);

            if ($quantity < 1 || $item->book->volume !== ($next->book->volume - 1)) {
                return;
            }

            collect([$item, $next])->each(function ($item) use ($quantity) {
                $item->quantity -= $quantity;
                $pairDiscountedItem = $this->pairedVolumesDiscountedItems->where('book.id', $item->book->id)->first(null, $item->replicate(['quantity']));
                $pairDiscountedItem->quantity += $quantity;

                if (! $this->pairedVolumesDiscountedItems->contains('book.id', $pairDiscountedItem->book->id)) {
                    $this->pairedVolumesDiscountedItems->push($pairDiscountedItem);
                }
            });
        });
    }

    public function calculateDiscounts(): self
    {
        $this->remainingItems = $this->orderItems->map(fn ($item) => $item->replicate());
        $this->pairedVolumesDiscountedItems = collect();
        $this->completeSagaDiscountedItems = collect();

        foreach (self::DISCOUNTED_SAGAS as $saga => $maxVolume) {
            $this->calculateCompleteSagaDiscount($saga, $maxVolume);
            $this->calculatePairedVolumesDiscount($saga, $maxVolume);
        }

        return $this;
    }

    public function totalPrice(): float
    {
        return $this->orderItems->map(fn ($item) => $item->book->price * $item->quantity)->sum();
    }

    public function completeSagaDiscount(): float
    {
        return 20 / 100 * $this->completeSagaDiscountedItems->map(fn ($item) => $item->book->price * $item->quantity)->sum();
    }

    public function pairedVolumesDiscount(): float
    {
        return 10 / 100 * $this->pairedVolumesDiscountedItems->map(fn ($item) => $item->book->price * $item->quantity)->sum();
    }

    public function totalDiscount(): float
    {
        return $this->completeSagaDiscount() + $this->pairedVolumesDiscount();
    }

    public function totalDiscountedPrice(): float
    {
        return $this->totalPrice() - $this->totalDiscount();
    }
}
