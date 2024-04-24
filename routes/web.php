<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\EventController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Show index
Route::get('/', [Controller::class, "index"]);

//Show profile pages
Route::get('/profile', [Controller::class, "profile"]);

//Show articles pages
Route::get('/articles', [ArticleController::class, "list"]);

//Show article detail pages
Route::get('/article/{id}/{slug}', [ArticleController::class, "detail"]);

//Show events pages
Route::get('/events', [EventController::class, "list"]);

//Show event detail pages
Route::get('/event/{id}/{slug}', [EventController::class, "detail"]);

/*User Controllers -> Group defined, operations:
    - Login -> POST -> authenticate function
    - Register -> POST -> store function
    - Logout -> GET -> logout function
*/
Route::controller(UserController::class)->group(function () {
    Route::post('/user/authenticate', "authenticate");
    Route::post('/user/register', "store");
    Route::get('/user/logout', "logout");
});
