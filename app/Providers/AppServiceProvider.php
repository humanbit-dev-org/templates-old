<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(Request $request): void
    {
        $languages= ["en"];
        $lan = "it";
        $lanurl = "";
        if(empty($request->lan)){
            App::setLocale("it");
        } elseif((isset($request->lan)) && (in_array($request->lan, $languages))){
            App::setLocale($request->lan);
            $lan = $request->lan;
            $lanurl = "?lan=$request->lan";
        } else {
            abort(400);
        }
        View::share('lan', $lan);
        View::share('lanurl', $lanurl);
    }
}
