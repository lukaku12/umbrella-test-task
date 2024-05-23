<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Category;
use App\Models\ProductCategory;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::factory(10)->create();

        for ($i=0; $i < 100; $i++) {

            Product::factory(1000)->create()->each(function ($product) use ($categories) {

                ProductImage::factory(3)->create(['product_id' => $product->id]);

                $product->categories()->attach(
                    $categories->random(rand(1, 5))->pluck('id')->toArray()
                );
            });

        }
    }
}

