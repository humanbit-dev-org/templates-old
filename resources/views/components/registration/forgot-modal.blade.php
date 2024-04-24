<!-- Password recovery -->
<div class="reg_modal forgot_modal modal fade" id="forgotModal" tabindex="-1" aria-labelledby="forgotModalLabel" aria-hidden="true">

    <div class="reg_wrapper modal-dialog modal-dialog-centered">

        <div class="reg_content modal-content bg_color_gray border_color_second px-4 px-sm-5 py-5">
            <!-- Modal header -->
            <div class="reg_header modal-header d-flex align-items-center col-12 p-0 border-bottom mb-4 pb-2">
                <h3 class="reg_title h4 color_black modal-title" id="forgotModalLabel">
                    {{__("auth.rec_pw")}}
                </h3>

                <button class="reg_close h4 btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" style="background-image: none;">
                    <i class="icon_close h4 color_black align-top fa-regular fa-xmark" ></i>
                </button>
            </div>

            <!-- Modal body -->
            <div class="reg_body modal-body px-0">
                <p class="forgot_txt small roboto fw-400 color_black my-3">
                    {{__("auth.reset_pw")}}
                </p>

                <form class="reg_form" id="formchangepass1" action="/user/recoverpw" method="post" autocomplete='off'>
                    @csrf
                    <div class="floating_wrapper form-floating mb-4 pb-2">
                        <input name="fields[lan]" type="hidden" value="{$lanextended}" />
                        <input name="xsrf" type="hidden" value="{$cookie-xsrf-token}" />

                        <input class="reg_control form-control" id="recModalEmail" name="fields[email]" type="email" placeholder="Email*" required="required" />

                        <label class="reg_label" for="recModalEmail">
                            Email*
                        </label>
                    </div>

                    <button class="btn_submit small text-uppercase btn_bg_second btn_reverse p-0 border w-100 p-3" id="recModalSubmit" value="Submit">
                        confirm
                    </button>
                </form>
            </div>
        </div>

    </div>

</div>