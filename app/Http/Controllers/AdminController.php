<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\StoreProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function index(): Response
    {
        $categories = Category::all();
        return Inertia::render('Admin/Index', compact('categories'));
    }

    public function createProduct(StoreProductRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $product = Product::create($validated);

        $product->categories()->attach($validated['categories']);

        for ($i = 0; $i < count($validated['images']); ++$i) {
            $product
                ->images()
                ->create([
                    'image_url' => url('/') . '/storage/' . $validated['images'][$i]
                            ->store('products/' . $product->id, 'public')
                ]);
        }

        return redirect()->back();
    }

    public function createCategory(StoreCategoryRequest $request): RedirectResponse
    {
        Category::create($request->validated());

        return redirect()->back();
    }

    public function deleteProduct($id): RedirectResponse
    {
        $product = Product::findOrFail($id);

        Storage::disk('public')->deleteDirectory("products/{$product->id}");

        $product->delete();

        return redirect()->back();
    }
}
