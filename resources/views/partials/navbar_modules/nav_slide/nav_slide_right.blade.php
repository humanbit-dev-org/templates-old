<div class="nav_partial">

    <nav class="nav_slide_right navbar scrollbar_spacing">

        <div class="navbar_container_full container_humanbit_1 color_white container-fluid row justify-content-between align-items-center py-0">

            {{-- Navbar. <<IN>> --}}

            {{-- Navbar toggler. --}}
            {{-- Add or remove the class `.d-none` at the end of this level depending on the desired model. --}}
            <div class="menu_navbar container_max_width_1 row justify-content-between align-items-center">
                {{-- Toggler and logo. --}}
                {{-- Avoid changing the columns! --}}
                <div class="menu_box box_left color_white row justify-content-start align-items-center col-auto col-lg-3">
                    <div class="toggle_wrapper col-1 me-4 me-xl-5">
                        {{-- Change `data-bs-target` and `aria-controls` values to the `id` of the intended collapse. --}}
                        <button class="btn_toggler_open navbar-toggler border-0 align-middle p-0 w-auto collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBasicContent" aria-controls="navbarBasicContent" aria-expanded="false" aria-label="Toggle navigation" id="navTogglerBasic">
                            <span class="span_toggler color_white" ></span>
                            <span class="span_toggler color_white" ></span>
                            <span class="span_toggler color_white" ></span>
                        </button>
                    </div>

                    {{-- Uncomment block for extra slot version. --}}
                    {{-- <a class="menu_box box_center color_white row justify-content-center align-items-center col-auto" href="{$root}/{$lanurl}">
                        <figure class="figure_logo">
                            <img class="img_logo img-fluid" src="{{ asset("images/logos/logo-humanbit-white.svg") }}" alt="Logo" />
                        </figure>
                    </a> --}}
                </div>

                {{-- Comment block for extra slot version. --}}
                {{-- Avoid changing the columns! --}}
                <a class="menu_box box_center color_white row justify-content-center align-items-center col-auto col-md-4 me-auto mx-sm-auto" href="/{{ $lanurl }}">
                    <figure class="figure_logo text-center mx-auto">
                        <img class="img_logo img-fluid" src="{{ asset("images/logos/logo-humanbit-white.svg") }}" alt="Logo" />
                    </figure>
                </a>

                {{-- Uncomment block for extra slot version. --}}
                {{-- Avoid changing the columns! --}}
                {{-- <div class="menu_box box_center nav_extra_wrapper text-center col-12 col-lg-auto mx-auto order-1 order-lg-0 mt-4 mt-lg-0">
                    <p class="nav_extra_content h3 fw_300">Primiero San Martino di Castrozza</p>
                </div> --}}

                {{-- Buttons row. --}}
                {{-- Avoid changing the columns! --}}
                <div class="menu_box box_right text-uppercase color_white row justify-content-end align-items-center col-auto col-lg-3 order-0 order-lg-1">
                    {{-- Uncomment div if the cart collapse is being used. --}}
                    {{-- <button class="menu_link circle_1 menu_steps color_white me-2 me-md-3 collapsed" type="button" id="optionCounter" data-bs-toggle="collapse" data-bs-target="#menuOptions" aria-controls="menuOptions" aria-expanded="false" aria-label="Toggle cart">0</button> --}}

                    @if(Request::is('/checkout'))
                        <div class="color_black text-end w-auto">
                            @auth
                                <a class="menu_link menu_steps me-1 circle_cart collapsed" type="button" id="optionCounter" data-bs-toggle="collapse" data-bs-target="#menuOptions" aria-controls="menuOptions" aria-expanded="false" aria-label="Toggle cart" data-empty=".empty_cart" data-full=".full_cart">
                                    <i class="full_cart coll_white fa-solid fa-bag-shopping color_second text-start d-none" ></i>
                                    <i class="empty_cart coll_white fa-regular fa-bag-shopping text-start" ></i>
                                    {{-- <i class="full_cart coll_white fa-solid fa-bag-shopping color_second text-start" /> --}}
                                </a>
                                {{-- empty cart --}}
                                {{-- <a class="menu_link menu_steps me-1 collapsed" type="button" id="optionCounter" data-bs-toggle="collapse" data-bs-target="#menuOptions" aria-controls="menuOptions" aria-expanded="false" aria-label="Toggle cart">
                                    <i class="empty_cart coll_white fa-regular fa-bag-shopping text-start" />
                                </a> --}}

                                {{-- full cart --}}
                                {{-- <a class="menu_link menu_steps ms-1 collapsed" type="button" id="optionCounter" data-bs-toggle="collapse" data-bs-target="#menuOptions" aria-controls="menuOptions" aria-expanded="false" aria-label="Toggle cart">
                                    <i class="full_cart coll_white fa-solid fa-bag-shopping color_second text-start" />
                                </a> --}}
                            @else
                                <a class="menu_link me-1 circle_cart collapsed" type="button" data-bs-toggle="modal" data-bs-target="#loginModal">
                                    <i class="full_cart coll_white fa-solid fa-bag-shopping color_second text-start d-none" ></i>
                                    <i class="empty_cart coll_white fa-regular fa-bag-shopping text-start" ></i>
                                    {{-- <i class="full_cart coll_white fa-solid fa-bag-shopping color_second text-start" /> --}}
                                </a>
                            @endauth
                        </div>
                    @endif
                    @if($lan != "it")
                        @if(request()->page)
                            <a class="menu_link circle_1 text-uppercase color_white" href="{{ request()->route }}?page={{ request()->page }}&lan=">
                                IT
                            </a>
                        @else
                            <a class="menu_link circle_1 text-uppercase color_white" href="{{ request()->route }}?lan=">
                                IT
                            </a>
                        @endif
                    @else
                        @if(request()->page)
                            <a class="menu_link circle_1 text-uppercase color_white" href="{{ request()->route }}?page={{ request()->page }}&lan=en">
                                EN
                            </a>
                        @else
                            <a class="menu_link circle_1 text-uppercase color_white" href="{{ request()->route }}?lan=en">
                                EN
                            </a>
                        @endif
                    @endif

                    @auth
                        <form action="/user/logout" method="get">
                            @csrf
                            <button class="btn" type="submit">Logout</button>
                        </form>
                        <a class="menu_link ms-2 ms-md-3" href="/profile{{ $lanurl }}">
                            <i class="icon_profile color_white fa-solid fa-user" ></i>
                        </a>
                    @else
                        <button class="login_modal circle_1 ms-2 ms-md-3" data-bs-toggle="modal" data-bs-target="#loginModal">
                            <i class="icon_profile color_white fa-solid fa-user" ></i>
                        </button>
                    @endauth

                    <a class="menu_link_sponsor d-none d-xl-block ps-4 col-4" href="/{{ $lanurl }}">
                        <figure class="figure_logo figure_logo_sponsor">
                            <img class="img_logo img_logo_sponsor img-fluid" src="{{ asset("images/logos/logo_humanbit.png") }}" alt="Humanbit"/>
                        </figure>
                    </a>
                </div>
            </div>

            {{-- Navbar extra large. --}}
            {{-- Add or remove the class `.d-none` at the end of this level depending on the desired model. --}}
            <div class="menu_navbar container_max_width_1 row justify-content-between align-items-center d-none">
                {{-- Toggler and logo. --}}
                {{-- Avoid changing the columns! --}}
                <div class="menu_box box_left color_white row justify-content-start align-items-center col-auto col-lg-3 col-xl-2">
                    <div class="toggle_wrapper d-block d-xl-none col-1 me-4 me-xl-5">
                        {{-- Change `data-bs-target` and `aria-controls` values to the `id` of the intended collapse. --}}
                        <button class="btn_toggler_open navbar-toggler border-0 align-middle p-0 w-auto collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSectionsContent" aria-controls="navbarSectionsContent" aria-expanded="false" aria-label="Toggle navigation" id="navTogglerSections">
                            <span class="span_toggler color_white" ></span>
                            <span class="span_toggler color_white" ></span>
                            <span class="span_toggler color_white" ></span>
                        </button>
                    </div>

                    <a class="menu_box box_center color_white row justify-content-center align-items-center col-auto" href="/{{ $lanurl }}">
                        <figure class="figure_logo">
                            <img class="img_logo img-fluid" src="{{ asset("images/logos/logo-humanbit-white.svg") }}" alt="Logo" />
                        </figure>
                    </a>
                </div>

                {{-- Menu items. --}}
                {{-- Avoid changing the columns! --}}
                <div class="menu_box box_center d-none d-xl-flex row justify-content-start align-self-end col-12 col-xl-8 order-1 order-xl-0 mt-4 mt-xl-0">

                    <ul class="menu_items navbar-nav flex-row flex-wrap col-auto">
                        <li class="landmark text-center d-flex align-items-end">
                            <a class="menu_item color_white px-1 opacity-100-hover" href="{$root}/lista-corsi/corsi" title="Courses">Courses</a>

                            <span class="vbar px-1 px-xxl-3">|</span>
                        </li>

                        {{-- Collapse Impianti trigger. --}}
                        <li class="landmark text-center d-flex align-items-end li_menu_installations">
                            <a class="menu_item color_white px-1 opacity-100-hover" href="#collapseInstallations" role="button" title="Installations" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapseInstallations">Installations</a>

                            <span class="vbar px-1 px-xxl-3">|</span>
                        </li>

                        {{-- Collapse Sport trigger. --}}
                        <li class="landmark text-center d-flex align-items-end li_menu_sport">
                            <a class="menu_item color_white px-1 opacity-100-hover" href="#collapseSport" role="button" title="Sport" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapseSport">Sport</a>

                            <span class="vbar px-1 px-xxl-3">|</span>
                        </li>

                        {{-- Collapse Acquista trigger. --}}
                        <li class="landmark text-center d-flex align-items-end gray li_menu_buy">
                            <a class="menu_item color_third px-1 opacity-100-hover" href="#collapseBuy" role="button" title="Ticket office" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapseBuy">Purchase</a>

                            <span class="vbar px-1 px-xxl-3">|</span>
                        </li>

                        <li class="landmark text-center d-flex align-items-end">
                            <a class="menu_item color_third px-1 opacity-100-hover" href="{$root}/istituzionali/orari-norme/" title="Timetables and info">Info</a>

                            <span class="vbar px-1 px-xxl-3">|</span>
                        </li>

                        <li class="landmark text-center d-flex align-items-end">
                            <a class="menu_item color_eighth px-1 opacity-100-hover" href="{$root}/lista-eventi" title="Events">Events</a>

                            <span class="vbar px-1 px-xxl-3">|</span>
                        </li>

                        <li class="landmark text-center d-flex align-items-end gray li_menu_cerca">
                            <a class="menu_item color_eighth px-1 opacity-100-hover" href="{$root}/lista-news" title="News">News</a>
                        </li>
                    </ul>

                </div>

                {{-- Buttons row. --}}
                {{-- Avoid changing the columns! --}}
                <div class="menu_box box_right text-uppercase color_white row justify-content-end align-items-center col-auto col-lg-3 col-xl-2 order-0 order-xl-1 ms-auto">
                    {{-- Uncomment div if the cart collapse is being used. --}}
                    {{-- <button class="menu_link circle_1 menu_steps color_white me-2 me-md-3 collapsed" type="button" id="optionCounter" data-bs-toggle="collapse" data-bs-target="#menuOptions" aria-controls="menuOptions" aria-expanded="false" aria-label="Toggle cart">0</button> --}}

                    @if($lan != "it")
                        @if(request()->page)
                            <a class="menu_link circle_1 text-uppercase color_white" href="{{ request()->route }}?page={{ request()->page }}&lan=">
                                IT
                            </a>
                        @else
                            <a class="menu_link circle_1 text-uppercase color_white" href="{{ request()->route }}?lan=">
                                IT
                            </a>
                        @endif
                    @else
                        @if(request()->page)
                            <a class="menu_link circle_1 text-uppercase color_white" href="{{ request()->route }}?page={{ request()->page }}&lan=en">
                                EN
                            </a>
                        @else
                            <a class="menu_link circle_1 text-uppercase color_white" href="{{ request()->route }}?lan=en">
                                EN
                            </a>
                        @endif
                    @endif

                    @auth
                        <a class="menu_link ms-2 ms-md-3" href="/profile{{ $lanurl }}">
                            <i class="icon_profile color_white fa-solid fa-user" ></i>
                        </a>
                    @else
                        <button class="login_modal circle_1 ms-2 ms-md-3" data-bs-toggle="modal" data-bs-target="#login">
                            <i class="icon_profile color_white fa-solid fa-user" ></i>
                        </button>
                    @endauth
                </div>
            </div>

            {{-- Navbar. <<OUT>> --}}


            {{-- Collapse. <<IN>> --}}

            {{-- Collapse navbar background. --}}
            {{-- `.col-*` classes should match the ones on the `.collapse_contents` div in use for animation effect. --}}
            <div class="cont_ghost_bg nav_ghost_bg col-12 position-fixed top-0 start-0" ></div>

            {{-- Collapse (basic). --}}
            {{-- If inner `width` is changed with `.col-*` classes, simply remove `background-color` from this level`. --}}
            <div class="menu_collapse bg_color_second navbar-collapse collapse" id="navbarBasicContent">

                {{-- Sets dimension and compensates for the hidden scrollbar with padding. --}}
                <div class="collapse_wrapper scrollbar_spacing h-auto min-vw-100 mw-100">

                    {{-- Centers content vertically and keeps dimensions set on higher levels. --}}

                    {{-- To change overall `width`:
                    1. Replace `.w-100` with `.col-*` classes.
                    2. Add `.p*-*-0` according to the chosen breakpoint.
                    3. Set the block's top level parent's `background-color` to `transparent`.
                    4. Assign `background-color` to the following level. --}}
                    
                    <div class="collapse_contents row align-items-center container_humanbit_1 py-0 w-100">

                        {{-- Controls `width`, fixes `max-width` (as `mw-100` breaks layout) and positions content horizontally. --}}
                        <div class="basic container_sizing container_max_width_1 row justify-content-between align-items-start">

                            {{-- Edit only from this point onwards. --}}

                            <div class="collapse_nav navbar-nav row flex-row col-12 col-lg-6 py-4 pe-lg-4">
                                <a @class(["collapse_link", "nav-link", "h2", "text-uppercase", "border-bottom", "border-2", "py-2", "pe-0", "show-search", "active_link" => Request::is("/")]) href="/{{ $lanurl }}">

                                    Home
                                </a>

                                <a @class(["collapse_link", "nav-link", "h2", "text-uppercase", "border-bottom", "border-2", "py-2", "pe-0", "show-search", "active_link" => Request::is("eventi")]) href="/eventi{{ $lanurl }}">

                                    Eventi
                                </a>

                                <a @class(["collapse_link", "nav-link", "h2", "text-uppercase", "border-bottom", "border-2", "py-2", "pe-0", "show-search", "active_link" => Request::is("impianto")]) href="/impianto{{ $lanurl }}">

                                    L'Impianto
                                </a>

                                <a @class(["collapse_link", "nav-link", "h2", "text-uppercase", "border-bottom", "border-2", "py-2", "pe-0", "show-search", "active_link" => Request::is("chi-siamo")]) href="/chi-siamo{{ $lanurl }}">

                                    Chi Siamo
                                </a>

                                <a @class(["collapse_link", "nav-link", "h2", "text-uppercase", "border-bottom", "border-2", "py-2", "pe-0", "show-search", "active_link" => Request::is("contatti")]) href="/contatti{{ $lanurl }}">

                                    Contatti
                                </a>

                                <a @class(["collapse_link", "nav-link", "h2", "text-uppercase", "border-bottom", "border-2", "py-2", "pe-0", "show-search", "active_link" => Request::is("profile")]) href="/profile{{ $lanurl }}">

                                    Area Riservata
                                </a>
                            </div>

                            <div class="collapse_nav navbar-nav row flex-row col-12 col-lg-6 py-4 ps-lg-4">
                                <a @class(["collapse_link", "nav-link", "h2", "text-uppercase", "border-bottom", "border-2", "py-2", "pe-0", "show-search", "active_link" => Request::is("/")]) href="/{{ $lanurl }}">

                                    Home
                                </a>

                                <a @class(["collapse_link", "nav-link", "h2", "text-uppercase", "border-bottom", "border-2", "py-2", "pe-0", "show-search", "active_link" => Request::is("eventi")]) href="/eventi{{ $lanurl }}">

                                    Eventi
                                </a>

                                <a @class(["collapse_link", "nav-link", "h2", "text-uppercase", "border-bottom", "border-2", "py-2", "pe-0", "show-search", "active_link" => Request::is("impianto")]) href="/impianto{{ $lanurl }}">

                                    L'Impianto
                                </a>

                                <a @class(["collapse_link", "nav-link", "h2", "text-uppercase", "border-bottom", "border-2", "py-2", "pe-0", "show-search", "active_link" => Request::is("chi-siamo")]) href="/chi-siamo{{ $lanurl }}">

                                    Chi Siamo
                                </a>

                                <a @class(["collapse_link", "nav-link", "h2", "text-uppercase", "border-bottom", "border-2", "py-2", "pe-0", "show-search", "active_link" => Request::is("contatti")]) href="/contatti{{ $lanurl }}">

                                    Contatti
                                </a>

                                <a @class(["collapse_link", "nav-link", "h2", "text-uppercase", "border-bottom", "border-2", "py-2", "pe-0", "show-search", "active_link" => Request::is("profile")]) href="/profile{{ $lanurl }}">

                                    Area Riservata
                                </a>
                            </div>

                            {{-- Edit only from this point backwards. --}}

                        </div>

                    </div>

                </div>

            </div>

            {{-- Collapse (sections). --}}
            {{-- If inner `width` is changed with `.col-*` classes, simply remove `background-color` from this level`. --}}
            <div class="menu_collapse navbar-collapse collapse" id="navbarSectionsContent">

                {{-- Sets dimension and compensates for the hidden scrollbar with padding. --}}
                <div class="collapse_wrapper scrollbar_spacing h-auto min-vw-100 mw-100">

                    {{-- Centers content vertically and keeps dimensions set on higher levels. --}}

                    {{-- To change overall `width`:
                    1. Replace `.w-100` with `.col-*` classes.
                    2. Add `.p*-*-0` according to the chosen breakpoint.
                    3. Set the block's top level parent's `background-color` to `transparent`.
                    4. Assign `background-color` to the following level. --}}

                    <div class="collapse_contents bg_color_second row align-items-center container_humanbit_1 col-12 col-lg-9 pe-lg-0">

                        {{-- Controls `width`, fixes `max-width` (as `mw-100` breaks layout) and positions content horizontally. --}}
                        <div class="sections container_sizing container_max_width_1 row justify-content-between align-items-start">

                            {{-- Edit only from this point onwards. --}}

                            <div class="collapse_nav navbar-nav row flex-row justify-content-between mb-4">
                                <div class="wrapper_outer row align-items-center col-12 pt-5 pb-4 border-bottom">
                                    <div class="wrapper_inner text-sm-end text-md-start align-self-start col-12 col-md-6 my-3">
                                        <h3 class="collapse_title h5">
                                            Ti stai trasferendo in una nuova città?
                                        </h3>

                                        <p class="collapse_body p fw_200 about_us mt-3">
                                            Affidati a noi, troveremo insieme la casa perfetta per te.
                                        </p>
                                    </div>

                                    <div class="wrapper_inner d-flex flex-wrap justify-content-start justify-content-sm-end align-items-center col-12 col-md-6 col-lg-5 ps-md-4 ps-lg-3">
                                        <a class="collapse_link h2 text-uppercase btn_bg_third btn_reverse my-3 my-md-2 w-auto" href="{$root}/landing-user/?lan={$lan}">
                                            Come funziona?
                                        </a>

                                        <a class="collapse_link h2 text-uppercase btn_color_white my-3 my-md-2 ms-3 w-auto" href="{$root}/landing-user/?lan={$lan}">
                                            FAQ
                                        </a>
                                    </div>
                                </div>

                                <div class="wrapper_outer col-12 col-md-8 navbar-nav row flex-row border-end-md border-bottom mb-md-4 py-4 pe-md-4">
                                    <div class="wrapper_inner align-self-start col-12 mb-4">
                                        <h3 class="collapse_title h5">
                                            Sei un'azienda e vuoi organizzare il tuo campus?
                                        </h3>
                                    </div>

                                    <a class="collapse_link h2 text-uppercase btn_color_white border border-2 me-3 mb-2 w-auto" href="{$root}/institutional/41439/partner/{$lanurl}">
                                        Chi lavora con noi
                                    </a>

                                    <a class="collapse_link h2 text-uppercase btn_color_white border border-2 mb-2 w-auto" href="{$root}/landing-campus/{$lanurl}">
                                        Il campus
                                    </a>
                                </div>

                                <div class="wrapper_outer navbar-nav row flex-row col-12 col-md-4 mb-4 py-4 justify-content-md-center border-bottom">
                                    <div class="wrapper_inner align-self-center col-12 mb-4">
                                        <h3 class="collapse_title h5 text-sm-end text-md-center">
                                            O un'agenzia?
                                        </h3>
                                    </div>

                                    <a class="collapse_link h2 text-uppercase btn_color_white align-self-end border border-2 mb-2 ms-sm-auto ms-md-0 w-auto" href="{$root}/institutional/41439/partner/{$lanurl}">
                                        Collaboriamo!
                                    </a>
                                </div>

                                <div class="wrapper_outer row align-items-center col-12 border-bottom mb-4 pb-4">
                                    <div class="wrapper_inner align-self-start col-12 col-md-6 my-3">
                                        <h3 class="collapse_title h5 mb-2">
                                            Sei un proprietario di appartamento?
                                        </h3>

                                        <p class="collapse_body p fw_200 about_us mt-3">
                                            Con noi puoi affittare il tuo appartamento in modo semplice, veloce e sicuro
                                        </p>
                                    </div>

                                    <div class="wrapper_inner d-flex flex-wrap col-12 col-md-5 align-items-center justify-content-md-center my-3 ps-md-4 ps-lg-3">
                                        <a class="collapse_link h2 text-uppercase btn_bg_third btn_reverse w-auto" href="{$root}/landing-landlord/?lan={$lan}">Ce ne occupiamo noi!
                                        </a>
                                    </div>
                                </div>

                                <div class="collapse_nav navbar-nav d-flex flex-wrap flex-row justify-content-sm-center justify-content-md-start pt-2">
                                    <a @class(["about_us", "collapse_link", "h2", "text-uppercase", "btn_reset w-auto" => !Request::is("/"), "me-3", "mb-3", "btn_color_white border border-2 border_color_white active_link" => Request::is("/")]) href="/institutional/about/{{ $lanurl }}">

                                        About us
                                    </a>

                                    <a @class(["about_us", "collapse_link", "h2", "text-uppercase", "btn_reset w-auto" => !Request::is("eventi"), "me-3", "mb-3", "btn_color_white border border-2 border_color_white active_link" => Request::is("eventi")]) href="/institutional/terms-and-conditions/{{ $lanurl }}">

                                        Terms and Conditions
                                    </a>

                                    <a @class(["about_us", "collapse_link", "h2", "text-uppercase", "btn_reset w-auto" => !Request::is("eventi"), "me-3", "mb-3", "btn_color_white border border-2 border_color_white active_link" => Request::is("eventi")]) href="/institutional/privacy-policy/{{ $lanurl }}">

                                        Privacy Policy
                                    </a>
                                </div>
                            </div>

                            {{-- Edit only from this point backwards. --}}

                            {{-- Footer --}}
                            {{-- <xsl:call-template name="footer_nav" /> --}}

                        </div>

                    </div>

                </div>

            </div>

            {{-- Collapse. <<OUT>> --}}


            {{-- Cart (ecommerce). <<IN>> --}}

            {{-- Cart navbar background. --}}
            {{-- Uncomment div if the cart toggle is being used (necessary for the JS animation). --}}
            {{-- <div class="cont_ghost_bg coll_ghost_bg position-fixed top-0 end-0" /> --}}

            {{-- Cart. --}}
            {{-- Delete block if element is not needed on current project for safety and performance reasons. --}}
            <div class="menu_options bg_color_white border border-end-md-0 border_color_second navbar-collapse h-100 collapse" id="menuOptions" dir="rtl">

                <div class="options_wrapper scrollbar_spacing overflow-y-auto" dir="ltr">
                    {{-- Close button. --}}
                    <button id="closeCart" class="btn_toggler navbar-toggler p bg_color_third position-absolute border-0 px-3 pt-4 pb-2" type="button" data-bs-toggle="collapse" data-bs-target="#menuOptions" aria-controls="menuOptions" aria-expanded="false" aria-label="Close" data-ref=".btn_add_soluzione">
                        <i class="icon_toggler color_white align-bottom fa-solid fa-xmark" ></i>
                    </button>

                    <div class="option_items container_humanbit_1">

                        <div class="position_wrapper position-relative py-5">

                            <div class="container_choices row justify-content-between align-items-center mt-3 mb-4">
                                @auth
                                    <a class="btn_book_option p text-uppercase fw-500 btn_bg_third d-block col-12 mb-4 mx-auto mt-2 px-2 px-md-5 py-3 option_unsaved btn_proceed_checkout" href="/checkout">
                                        proceed_order
                                    </a>
                                @else
                                    <button class="btn_book_option p login_modal smaller text-uppercase fw-500 btn_bg_third d-block col-12 mb-4 mx-auto mt-2 px-2 px-md-5 py-3 option_unsaved" data-bs-toggle="modal" data-bs-target="#loginModal" data-login-form="#formNew">
                                        proceed_order
                                    </button>
                                @endauth
                            </div>


                            <h4 class="option_title mid_small fw-700 color_second border-bottom border-2 border_color_grayer mb-4 pb-3 title_checkout">
                                <span class="smaller d-block fw_400 color_black mb-2">or</span>
                                change_your_opt
                            </h4>
                            <h4 class="option_title mid_small fw-700 color_second border-bottom border-2 border_color_grayer mb-4 pb-3 title_checkout d-none">
                                <span class="d-block smaller fw_400 color_black">prima_procedere</span>
                                seleziona_taglie
                            </h4>

                            @if(!Request::is("checkout"))

                                <div class="body_wrapper color_first row justify-content-between mb-3 pb-4 cart_container">
                                    {{-- <xsl:choose>
                                        <xsl:when test="count(/data/member-order-open-detail/solution) &gt; 0">
                                            <xsl:for-each select="/data/member-order-open-detail/solution">
                                                <xsl:variable name="idSolution" select="@link-id"/>
                                                <xsl:variable name="countSize" select="count(/data/member-order-open-detail-solution/entry[@id = $idSolution]/size/item)"/>
                                                <xsl:variable name="priceSolution" select="/data/member-order-open-detail-solution/entry[@id = $idSolution]/price"/>
                                                <xsl:variable name="typeSolution" select="/data/member-order-open-detail-solution/entry[@id = $idSolution]/type/@handle"/>
                                                <xsl:variable name="idCategory" select="/data/member-order-open-detail-solution/entry[@id = $idSolution]/category/item/@id"/>
                                                <xsl:variable name="salesMethodSolution" select="/data/member-order-open-detail-solution/entry[@id = $idSolution]/sales-method/item"/>
                                                <xsl:variable name="typeCategory" select="/data/member-order-open-detail-solution-category/entry[@id = $idCategory]/type/item/@handle"/>
                                                <xsl:variable name="nameCategory" select="/data/member-order-open-detail-solution-category/entry[@id = $idCategory]/type/item"/>

                                                <div id="cart_product_{$idSolution}" class="cart_product mt-4 pb-3 border-bottom border_color_second" data-ref="{$idSolution}">
                                                    <xsl:attribute name="data-elem">
                                                        <xsl:for-each select="/data/member-order-open-detail-solution/entry[@id = $idSolution]/size/item"><xsl:value-of select="."/><xsl:if test="position() != last()">,</xsl:if></xsl:for-each>
                                                    </xsl:attribute>
                                                    <xsl:attribute name="data-elem-qty">
                                                        <xsl:for-each select="/data/member-order-open-detail-solution/entry[@id = $idSolution]/size/item"><xsl:variable name="elem_size" select="."/><xsl:value-of select="sum(/data/member-order-open-detail-solution-disponibility/entry[solution/item/@id = $idSolution][size = $elem_size]/amount)"/><xsl:if test="position() != last()">,</xsl:if></xsl:for-each>
                                                    </xsl:attribute>
                                                    <div class="higher_row justify-content-between mb-3 clearfix">
                                                        <a class="option_title smaller fw-500 pe-5 pe-lg-1 pe-xl-0" href="{$root}/{$typeCategory}/{$idCategory}/{/data/member-order-open-detail-solution/entry[@id = $idSolution]/name-italian/@handle}"><xsl:value-of select="/data/member-order-open-detail-solution/entry[@id = $idSolution]/*[local-name() = $namelan]"/> - <xsl:value-of select="$nameCategory"/></a>

                                                        <button class="btn_toggler trash_option smaller lh-1 bg_color_grayer border-0 rounded-circle p-2 opacity-75-hover btn_delete_soluzione float-end" type="button" data-form="#form_delete_soluzione" data-cart-container=".cart_container" data-cart-order="#cart_order_{$idSolution}" data-order-class=".order_detail" data-input-order="id" data-soluzione="{$idSolution}" data-soluzione-class=".btn_add_soluzione"  data-url="{$root}/action/?order-detail=yes">
                                                            <i class="icon_toggler smaller color_white fa-regular fa-trash align-middle"/>
                                                        </button>
                                                    </div>

                                                    <div id="cart_order_{$idSolution}">
                                                        <xsl:for-each select="entry">
                                                            <xsl:variable name="idOrderDetail" select="@id"/>
                                                            <xsl:variable name="additionalNotes" select="additional-notes"/>
                                                            <xsl:variable name="additionalNotesHandle" select="additional-notes/@handle"/>
                                                            <xsl:variable name="amountSoluzioneSelected">
                                                                <xsl:choose>
                                                                    <xsl:when test="$countSize &gt; 0">
                                                                        <xsl:value-of select="sum(/data/member-order-open-detail-solution-disponibility/entry[solution/item/@id = $idSolution][size = $additionalNotes]/amount)"/>
                                                                    </xsl:when>
                                                                    <xsl:otherwise>
                                                                        <xsl:value-of select="sum(/data/member-order-open-detail-solution-disponibility/entry[solution/item/@id = $idSolution]/amount)"/>
                                                                    </xsl:otherwise>
                                                                </xsl:choose>
                                                            </xsl:variable>
                                                            <div id="{$idOrderDetail}" class="order_detail lower_row text-center justify-content-between row mb-3">
                                                                <xsl:if test="/data/member-order-open-detail-solution/entry[@id = $idSolution][size]">
                                                                    <div class="option_box row justify-content-center align-items-start align-content-start col-2">
                                                                        <p class="smaller mb-2 color_grayer">Size</p>
                                                                        <select class="smaller center py-1 w-100 change_size color_second border_color_second" data-form="#form_edit_notes" data-input-notes="fields[additional-notes]" data-input-amount=".change_amount" data-order="{$idOrderDetail}" data-input-order="id" data-url="{$root}/action/?order-detail=yes">
                                                                            <option class="selected" value="{$additionalNotes}" data-amount="{$amountSoluzioneSelected}"><xsl:value-of select="$additionalNotes"/><xsl:if test="($amountSoluzioneSelected &lt;= 5) and ($amountSoluzioneSelected &gt; 0)"> (<xsl:value-of select="$amountSoluzioneSelected"/> disponibili)</xsl:if></option>
                                                                            <xsl:for-each select="/data/member-order-open-detail-solution/entry[@id = $idSolution]/size/item[(@handle != $additionalNotesHandle) or (not($additionalNotesHandle))]">
                                                                                <xsl:variable name="size" select="."/>
                                                                                <xsl:variable name="amountSoluzione" select="sum(/data/member-order-open-detail-solution-disponibility/entry[solution/item/@id = $idSolution][size = $size]/amount)"/>
                                                                                <option class="unselected" value="{$size}" data-amount="{$amountSoluzione}">
                                                                                    <xsl:if test="$amountSoluzione = 0">
                                                                                        <xsl:attribute name="disabled">disabled</xsl:attribute>
                                                                                        <xsl:attribute name="style">color:lightgray;</xsl:attribute>
                                                                                    </xsl:if>
                                                                                    <xsl:value-of select="$size"/><xsl:if test="($amountSoluzione &lt;= 5) and ($amountSoluzione &gt; 0)"><span style="font-size:2px;"> (<xsl:value-of select="$amountSoluzione"/> disponibili)</span></xsl:if>
                                                                                </option>
                                                                            </xsl:for-each>
                                                                        </select>
                                                                    </div>
                                                                </xsl:if>
                                                                <div class="option_box row justify-content-center align-items-start align-content-start col-2">
                                                                    <p class="smaller mb-2 color_grayer">
                                                                        <xsl:value-of select="/data/translate/entry[code = 'qty']/*[local-name() = $lanextended]"/>
                                                                    </p>
                                                                    <input class="form-control smaller text-center py-1 w-100 change_amount" type="number" min="1" max="{$amountSoluzioneSelected}" value="{amount}" data-form="#form_edit_soluzione" data-cart-container=".cart_container" data-price="{$priceSolution}" data-input-amount="fields[amount]" data-input-price="fields[price]" data-input-price-tot="fields[price-tot]" data-order="{$idOrderDetail}" data-input-order="id" data-price-checkout="#price_checkout" data-price-tot-checkout="#price_tot_checkout" data-url="{$root}/action/?order-detail=yes">
                                                                        <xsl:if test="$salesMethodSolution = 'Abbonamento'">
                                                                            <xsl:attribute name="style">pointer-events:none;opacity:0.5;</xsl:attribute>
                                                                        </xsl:if>
                                                                    </input>
                                                                </div>


                                                                <div class="option_box col-3">
                                                                    <p class="smaller mb-2 color_grayer">
                                                                        <xsl:value-of select="/data/translate/entry[code = 'price']/*[local-name() = $lanextended]"/>
                                                                    </p>

                                                                    <span class="smaller color_grayer">€<xsl:value-of select="price"/></span>
                                                                </div>



                                                                <div class="option_box col-3">
                                                                    <p class="smaller mb-2 fw-700 color_second">
                                                                        <xsl:value-of select="/data/translate/entry[code = 'total']/*[local-name() = $lanextended]"/>
                                                                    </p>

                                                                    <span class="smaller color_second">€<xsl:value-of select="price-tot"/></span>
                                                                </div>
                                                            </div>
                                                        </xsl:for-each>
                                                    </div>

                                                    <xsl:if test="/data/member-order-open-detail-solution/entry[@id = $idSolution][size]">
                                                        <button class="add_address_button smaller text-uppercase btn_bg_white border border_color_second rounded-0 my-3 btn_label_select_address btn_color_second me-2 py-1 btn_add_size btn_add_soluzione d-none" style="font-size: 10px;" type="button" data-form="#form_add_soluzione" data-cart-container=".cart_container" data-price="{$priceSolution}" data-input-price="fields[price]" data-input-price-tot="fields[price-tot]" data-input-amount="fields[amount]" data-soluzione="{$idSolution}" data-input-soluzione="fields[solution]" data-url="{$root}/action/?order-detail=yes&amp;lan={$lanextended}">Aggiungi una taglia</button>
                                                        <button class="add_address_button smaller text-uppercase btn_bg_white border border_color_second rounded-0 my-3 btn_label_select_address btn_color_second py-1 btn_remove_size d-none" style="font-size: 10px;" type="button" data-form="#form_delete_soluzione" data-cart-container=".cart_container" data-cart-order="#cart_order_{$idSolution}" data-order-class=".order_detail" data-input-order="id" data-soluzione="{$idSolution}" data-soluzione-class=".btn_add_soluzione" data-last="{/data/member-order-open-detail/solution[@link-id = $idSolution]/entry[position() = last()]/@id}" data-url="{$root}/action/?order-detail=yes">Rimuovi una taglia</button>
                                                    </xsl:if>

                                                </div>

                                            </xsl:for-each>
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <p class="option_title smaller" href="" style="color:black;"><xsl:value-of select="/data/translate/entry[code = 'empty_cart']/*[local-name() = $lanextended]" /></p>
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </div> --}}
                            @endif
                        </div>

                    </div>

                </div>

            </div>

            {{-- Cart (ecommerce). <<OUT>> --}}

        </div>

    </nav>

</div>
