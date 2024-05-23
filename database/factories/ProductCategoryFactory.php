<?php

namespace Database\Factories;

use App\Models\ProductCategory;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductCategoryFactory extends Factory
{
    protected $model = ProductCategory::class;

    public function definition()
    {
        return [
            'product_id' => Product::factory(),
            'category_id' => Category::factory()
        ];
    }
}
