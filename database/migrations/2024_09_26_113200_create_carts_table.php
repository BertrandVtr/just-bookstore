<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->boolean('is_archived')->default(false);
        });

        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('cart_id');
            $table->unsignedBigInteger('book_id');
            $table->unsignedInteger('quantity')->default(0);

            $table->foreign('cart_id')->references('id')->on('carts')->onDelete('cascade');
            $table->foreign('book_id')->references('id')->on('books')->onDelete('restrict');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('cart_id');
            $table->foreign('cart_id')->references('id')->on('carts')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropConstrainedForeignId('cart_id');
        });

        Schema::dropIfExists('cart_items');
        Schema::dropIfExists('carts');
    }
};
