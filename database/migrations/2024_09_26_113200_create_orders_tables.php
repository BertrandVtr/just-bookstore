<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->unsignedBigInteger('cart_id');
            $table->float('total_price')->default(0);
            $table->float('discount')->default(0);
            $table->float('discount_price')->default(0);
            $table->float('complete_saga_discount')->default(0);
            $table->float('paired_volumes_discount')->default(0);

            $table->foreign('cart_id')->references('id')->on('carts')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
