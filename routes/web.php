<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;

Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
Route::post('/admin/products', [AdminController::class, 'createProduct'])->name('admin.products.create');
Route::post('/admin/categories', [AdminController::class, 'createCategory'])->name('admin.categories.create');
Route::delete('/admin/products/{id}', [AdminController::class, 'deleteProduct'])->name('admin.products.delete');

Route::get('/', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
