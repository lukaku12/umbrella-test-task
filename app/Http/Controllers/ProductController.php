<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Product::query()->with(['categories', 'images']);

        if ($request->has('categories')) {
            $query->whereHas('categories', function ($query) use ($request) {
                $query->whereIn('name', explode(',', $request->categories));
            });
        }

        $pageSize = $request->input('pageSize', 10);

        if ($request->has('sortBy') && $request->has('direction')) {
            $query->orderBy($request->sortBy, $request->direction);
        }

        $products = $query->paginate($pageSize);
        $categories = Category::all();
        $filters = $request->query();

        return Inertia::render(
            'Products/Index',
            compact('products', 'categories', 'filters')
        );
    }

}
