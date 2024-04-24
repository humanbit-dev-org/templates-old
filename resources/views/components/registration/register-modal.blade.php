<div class="reg_modal register_modal modal modal-lg fade scroll_registration" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">

    <div class="reg_wrapper modal-dialog modal-dialog-centered">

        <div class="reg_content modal-content bg_color_gray border_color_second px-4 px-sm-5 py-5">
            <!-- Modal header -->
            <div class="reg_header modal-header d-flex align-items-center col-12 border-bottom mb-4 pb-2">
                <h3 class="reg_title h4 color_black modal-title" id="registerModalLabel">
                    {{__("auth.not_yet_registered")}}
                </h3>

                <button class="reg_close h4 btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" style="background-image: none;">
                    <i class="icon_close h4 color_black align-top fa-regular fa-xmark" ></i>
                </button>
            </div>

            <!-- Modal body -->
            <div class="reg_body modal-body px-0">
                <!-- Sign up header -->
                <div class="sign_up_wrapper d-flex justify-content-between align-items-center col-12 border border_color_third my-3 px-3 py-2">
                    <p class="sign_up_txt mid_small col-10 color_black">
                        {{__("auth.register_now")}}
                    </p>

                    <figure class="sign_up_figure col-2">
                        <img class="sign_up_img w-100" src="{{ asset("images/logos/logo-humanbit-black.svg") }}" alt="Sign up icon" />
                    </figure>
                </div>

                <!-- <div class="col-12 col-md-11 mx-auto mb-4">
                    <a class="btn navbar-btn text-white fb_btn text-uppercase" data-bs-toggle="modal" data-bs-target="#registerModal">
                        <xsl:value-of select="/data/translate/entry[code='login_facebook']/*[local-name() = $lanextended]" />
                    </a>
                </div>

                <p class="separator p_login p-0 mb-3">
                    <xsl:value-of select="/data/translate/entry[code='or']/*[local-name() = $lanextended]" />
                </p> -->

                <!-- Data to be filled in -->
                <form class="reg_form row justify-content-center mb-3 py-4" id="formRegisterModal" action="/user/register" method="post" enctype="multipart/form-data">
                    @csrf
                    <div class="row">
                        <div class="col-4 pe-2">
                            <!-- Name -->
                            <div class="reg_floating form-floating mb-4">
                                <input class="reg_control form-control" name="firstname" type="text" placeholder="{{__("auth.firstname")}}*" required="required" value="{{ old("firstname") }}"/>

                                <label class="reg_label">
                                    {{__("auth.firstname")}}
                                </label>

                                @error('firstname')
                                    <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>

                        <div class="col-4 px-2">
                            <!-- Surname -->
                            <div class="reg_floating form-floating mb-4">
                                <input class="reg_control form-control" name="lastname" type="text" placeholder="{{__("auth.lastname")}}" required="required" value="{{ old("lastname") }}"/>

                                <label class="reg_label">
                                    {{__("auth.lastname")}}
                                </label>

                                @error('lastname')
                                    <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>

                        <div class="col-4 ps-2">
                            <!-- Birthdate -->
                            <div class="reg_floating form-floating mb-4">
                                <input class="reg_control form-control" name="birthdate" type="date" placeholder="{{__("auth.birthdate")}}" required="required" value="{{ old("birthdate") }}"/>

                                <label class="reg_label">
                                    {{__("auth.birthdate")}}
                                </label>

                                @error('birthdate')
                                    <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>

                        <!-- Tax Code -->
                        <div class="reg_floating form-floating mb-4">
                            <input class="reg_control form-control" name="tax-code" type="text" maxlength="16" placeholder="{{__("auth.tax_code")}}" required="required" value="{{ old("tax-code") }}"/>

                            <label class="reg_label">
                                {{__("auth.tax_code")}}
                            </label>

                            @error('tax-code')
                                <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Email -->
                        <div class="reg_floating form-floating mb-4">
                            <input class="reg_control form-control" name="email" type="email" placeholder="email*" required="required" value="@error('email', 'register') {{  old("email") }} @else "" @enderror"/>

                            <label class="reg_label">
                                Email
                            </label>
                            @error('email', 'register')
                                <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="col-6 pe-2">
                            <!-- Password -->
                            <div class="reg_floating form-floating mb-4">
                                <input class="reg_control form-control" name="password" type="Password" minlength="6" required="required" />

                                <label class="reg_label">
                                    Password
                                </label>

                                @error('password', 'register')
                                    <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>

                        <div class="col-6 ps-2">
                            <!-- Confirm password -->
                            <div class="reg_floating form-floating mb-4">
                                <input class="reg_control form-control" name="password_confirmation" type="password" required="required" />

                                <label class="reg_label">
                                    {{__("auth.confirm_password")}}
                                </label>

                                @error('password', 'register')
                                    <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>

                        <div class="col-4 pe-2">
                            <!-- Town -->
                            <div class="reg_floating form-floating mb-4">
                                <input class="reg_control form-control" name="town" type="text" placeholder="{{__("auth.town")}}*" required="required" value="{{ old("town") }}"/>

                                <label class="reg_label">
                                    {{__("auth.town")}}
                                </label>

                                @error('town')
                                    <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>

                        <div class="col-4 px-2">
                            <!-- Address -->
                            <div class="reg_floating form-floating mb-4">
                                <input class="reg_control form-control" name="address" type="text" placeholder="{{__("auth.address")}}*" required="required" value="{{ old("address") }}"/>

                                <label class="reg_label">
                                    {{__("auth.address")}}
                                </label>

                                @error('address')
                                    <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>  

                        <div class="col-4 ps-2">
                            <!-- Zip Code -->
                            <div class="reg_floating form-floating mb-4">
                                <input class="reg_control form-control" name="zip-code" type="number" placeholder="{{__("auth.zip_code")}}*" required="required" value="{{ old("zip-code") }}"/>

                                <label class="reg_label">
                                    {{__("auth.zip_code")}}
                                </label>

                                @error('zip-code')
                                    <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>
                        
                        <div class="col-2">
                            <!-- Address -->
                            <div class="reg_floating form-floating mb-4">
                                <input class="reg_control form-control prefix" type="text" />
                                <input class="reg_control form-control tel_prefix" name="area-code" type="hidden" value="{{ old("area-code") }}"/>
                                <input class="reg_control form-control tel_prefix_country" name="area-code-country" type="hidden" value="{{ old("area-code-country") }}"/>

                            </div>
                        </div>
                        
                        <div class="col-4 pe-2">
                            <!-- Phone -->
                            <div class="reg_floating form-floating mb-4">
                                <input class="reg_control form-control phone" name="phone" type="number" placeholder="{{__("auth.phone")}}*" required="required" value="{{ old("phone") }}"/>

                                <label class="reg_label">
                                    {{__("auth.phone")}}
                                </label>

                                @error('phone')
                                    <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                                @enderror
                            </div>
                        </div> 

                        <div class="col-6 ps-2">
                            <!-- Address -->
                            <div class="reg_floating form-floating mb-4">
                                <input class="reg_control form-control" name="company" type="text" placeholder="{{__("auth.company")}}*" required="required" value="{{ old("company") }}"/>

                                <label class="reg_label">
                                    {{__("auth.company")}}
                                </label>
                                @error('company')
                                    <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>  
                    </div>

                    <fieldset class="priv_and_terms_wrapper pb-4">
                        <!-- <div class="form-check mb-2">
                            <input class="form-check-input" id="check_register" name="connessione" type="checkbox" required="required">

                            <label class="form-check-label" for="exampleCheck1">
                                <xsl:value-of select="/data/translate/entry[code='privacy1']/*[local-name() = $lanextended]" />
                            </label />
                        </div> -->

                        <!-- Privacy & Terms -->
                        <div class="reg_check form-check mb-3">
                            <input class="reg_check_input form-check-input privacy_newsletter" id="privacy" type="checkbox" name="privacy" required="required" value="yes"/>

                            <label class="reg_check_label form-check-label small fw-300 color_black me-1" for="privacy"> {{__("auth.read_and_agree")}}</label>
                            <!--<a class="priv_and_terms reg_fill small fw-300 color_second label" href="{$root}/article/{/data/privacy/entry/@id}/{/data/privacy/entry/title/@handle}" target="_blank"><xsl:value-of select="/data/translate/entry[code='terms_and_conditions']/*[local-name() = $lanextended]" /></a>
                            <span class="label small fw-300 mx-1">e la</span>-->
                            <a class="priv_and_terms reg_fill label small fw-300 color_second" href="/institutional/privacy-policy{{ $lanurl }}" target="_blank">privacy policy</a>
                        </div>

                        <!-- Newsletter -->
                        <div class="reg_check form-check mb-2">
                            <input class="reg_check_input privacy_newsletter form-check-input"  id="newsletter" type="checkbox" name="newsletter" value="yes"/>

                            <label class="reg_check_label form-check-label small fw-300 color_black me-1" for="newsletter">
                                {{__("auth.agree_newsletter")}}
                            </label>

                            <a class="priv_and_terms reg_fill label fw-300 color_second" href="/istitutional/newsletter{{ $lanurl }}" target="_blank">newsletter</a>
                        </div>

                        <!-- <div class="text-center">
                            <a class="priv_and_terms" href="{$root}/istitutional/43/privacy/?lan=it" target="_blank">
                                <strong class="text-center">
                                    Terms &amp; Conditions / Privacy policy
                                </strong>
                            </a>
                        </div> -->
                    </fieldset>

                    <button class="btn_sign_up small text-uppercase btn_bg_second btn_reverse p-0 border w-100 p-3" type="submit" value="Submit">
                        <!-- Sign up -->
                        {{__("auth.sign_up")}}
                    </button>
                </form>

                <!-- Footer -->
                <div class="reg_footer modal-footer row justify-content-between align-items-center border-top pt-4">
                    <h4 class="footer_title h4 color_black mb-4">
                        {{__("auth.already_registered")}}
                    </h4>

                    <div class="toggle_wrapper">
                        <button class="modal_toggle small text-uppercase btn_bg_second btn_reverse p-0 border w-100 p-3" data-bs-target="#loginModal" data-bs-toggle="modal" data-bs-dismiss="modal">
                            {{__("helper.click_here")}}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>

@if($errors->hasBag("register"))
    @push('scripts')
        <script>
            $(document).ready(function(){
                var registerModal = new bootstrap.Modal(document.getElementById("registerModal"), {});
                registerModal.show();
            });
        </script>
    @endpush
@endif