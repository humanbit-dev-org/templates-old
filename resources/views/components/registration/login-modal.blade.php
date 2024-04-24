<div class="reg_modal login_modal modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">

    <div class="reg_wrapper modal-dialog modal-dialog-centered">

        <div class="reg_content modal-content bg_color_gray border_color_second px-4 px-sm-5 py-5">
            <!-- Modal header -->
            <div class="reg_header modal-header d-flex align-items-center col-12 border-bottom mb-4 pb-2">
                <h3 class="reg_title modal-title fw_400 h4 color_black" id="loginModalLabel">
                    {{__("auth.already_registered")}}
                </h3>

                <button class="reg_close btn-close h4" type="button" data-bs-dismiss="modal" aria-label="Close" style="background-image: none;">
                    <i class="icon_close h4 color_black align-top fa-regular fa-xmark" ></i>
                </button>
            </div>

            <!-- Modal body -->
            <div class="reg_body modal-body px-0">
                <!-- Sign in header -->
                <div class="sign_in_wrapper d-flex justify-content-between align-items-center border border_color_third col-12 my-3 px-3 py-2">
                    <p class="sign_in_txt col-10 fw-400 mid_small color_black">
                        {{__("auth.login_credentials")}}
                    </p>

                    <figure class="figure_sign_in col-2 ms-auto">
                        <img class="img_sign_in img-fluid mx-auto w-100" src="{{ asset("images/logos/logo-humanbit-black.svg") }}" alt="Sign in icon" />
                    </figure>
                </div>

                <!-- Main form -->
                <div class="form_wrapper row justify-content-center mb-2 py-4">
                    <form class="reg_form" id="formLogin" action="/user/authenticate" method="post">
                        @csrf
                        <div class="reg_floating form-floating mb-4">
                            <input class="reg_control form-control" name="email" type="email" placeholder="Email" required="required" />

                            <label class="reg_label">
                                Email
                            </label>
                            @error("login")
                                @error('email')
                                    <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                                @enderror
                            @enderror
                        </div>

                        <div class="reg_floating form-floating mb-4 pb-2">
                            <input class="reg_control form-control" name="password" type="password" placeholder="Password" required="required" />

                            <label class="reg_label">
                                Password
                            </label>
                            @error("login")
                                @error('password')
                                    <p class="w-100 text-center mt-1" style="font-size:10px;color:red;">{{ $message }}</p>
                                @enderror
                            @enderror
                        </div>

                        <button class="btn_submit small text-uppercase btn_bg_second btn_reverse p-0 border w-100 p-3" type="submit" value="Submit">
                            {{__("auth.sign_in")}}
                        </button>
                    </form>

                    <!-- Login social - google facebook -->
                    <!-- <div class="social_wrapper d-flex flex-wrap justify-content-center my-4">
                        <form class="reg_form col-2 me-2" id="formLoginSocialGoogle" action="{$root}/google/" method="POST">
                            <input name="redirect" type="hidden" value="{$root}" />
                            <input name="member-google-action[login]" type="hidden" value="Login" />

                            <button class="btn_sign_in h4 btn_bg_white p-2 w-100" type="submit">
                                <i class="icon_sign_in h4 color_black fa-brands fa-google" />
                            </button>
                        </form>

                        <form class="reg_form col-2 ms-2" id="formLoginSocialFb" action="{$root}/facebook/" method="POST">
                            <input name="redirect" type="hidden" value="{$root}" />
                            <input name="member-facebook-action[login]" type="hidden" value="Login" />

                            <button class="btn_sign_in h4 btn_bg_white p-2 w-100" type="submit">
                                <i class="icon_sign_in h4 color_black fa-brands fa-facebook-f" />
                            </button>
                        </form>
                    </div> -->

                    <!-- Recover password -->
                    <div class="reg_forgot text-center row m-0 mt-4">
                        <p class="forgot_title small fw-300 mb-2">
                            {{__("auth.forgot_pw")}}
                        </p>

                        <div class="forgot_wrapper small fw-300">
                            <span class="pw_rec">
                                {{__("helper.click")}}
                            </span>

                            <button class="forgot_cta reg_fill text-lowercase fw-600 bg_color_white border-0 mx-1 p-0 fl-unset" data-bs-target="#forgotModal" data-bs-toggle="modal" data-bs-dismiss="modal">
                                {{__("helper.here")}}
                            </button>

                            <span class="pw_rec text-lowercase">
                                {{__("auth.to_recover")}}
                            </span>
                        </div>

                        <!-- <a href="{$root}/join/?forgot=yes/{$lanurl}">
                            <xsl:value-of select="/data/translate/entry[code='forgot']/*[local-name() = $lanextended]" />
                        </a> -->

                        <!-- <div class="row m-0 align-items-start justify-content-right">
                            <input name="connessione" type="radio" value="connesso" />

                            <span class="pl-2">Resta connesso</span>
                        </div> -->

                        <!-- <a href="{$root}/join/?forgot=yes">
                            <xsl:value-of select="/data/translate/entry[code='forgot']/*[local-name() = $lanextended]" />
                        </a> -->

                        <!-- <a class="btn small navbar-btn fb_btn text-uppercase pt-2" href="#registerModal" data-bs-toggle="modal">
                            <xsl:value-of select="/data/translate/entry[code='login_facebook']/*[local-name() = $lanextended]" />

                            <xsl:value-of select="/data/translate/entry[code='siteregistration']/*[local-name() = $lanextended]" />
                        </a> -->
                    </div>
                </div>
            </div>

            <!-- Modal footer -->
            <div class="reg_footer modal-footer row justify-content-between align-items-center border-top pt-4">
                <!-- Not registered yet? -->
                <h4 class="footer_title h4 color_black mb-4">
                    {{__("auth.not_yet_registered")}}
                </h4>

                <div class="toggle_wrapper">
                    <button class="modal_toggle small text-uppercase btn_bg_second btn_reverse p-0 border w-100 p-3" data-bs-target="#registerModal" data-bs-toggle="modal" data-bs-dismiss="modal">
                        {{__("helper.click_here")}}
                    </button>
                </div>
            </div>
        </div>

    </div>

</div>

@error("login")
    @push('scripts')
        <script>
            $(document).ready(function(){
                var loginModal = new bootstrap.Modal(document.getElementById("loginModal"), {});
                loginModal.show();
            });
        </script>
    @endpush
@enderror