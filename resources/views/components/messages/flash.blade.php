@if (session()->has('success'))
    <div class="reg_modal msg_success_modal toast mt-10 d-block" aria-live="assertive" aria-atomic="true" tabindex="-1" role="alert" aria-labelledby="msgSuccessModalLabel" aria-hidden="true">
        <div class="reg_wrapper">
            <div class="reg_content text-center bg_color_gray row flex-wrap flex-row justify-content-center align-items-center align-content-center px-4 px-sm-4 py-2 border_color_second">
                <div class="reg_header toast-header">
                    <h5 class="reg_title h6 cooper_italic fw-500 text-success modal-title mx-auto mt-0 mb-0 text-uppercase" id="msgSuccessModalLabel">
                        Grazie
                    </h5>
                    <div class="reg_footer modal-footer position-absolute top-0 end-0">
                        <button class="reg_close h4 btn-close btn-close-dark p-0 p-3" type="button" data-bs-dismiss="toast" aria-label="Close" style="background-image: none;">
                            <i class="icon_close h6 color_black align-top fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>

                <div class="reg_body toast-body px-0 py-0">
                    <p class="msg_success_txt small roboto fw_400 text-uppercase color_black mb-0 mb-2 mt-2" id="positiveText">
                    {{ session('success') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
@endif
@if ($errors->any())
    <div class="reg_modal msg_success_modal toast mt-10 d-block" aria-live="assertive" aria-atomic="true" tabindex="-1" role="alert" aria-labelledby="msgSuccessModalLabel" aria-hidden="true">
        <div class="reg_wrapper">
            <div class="reg_content text-center bg_color_gray row flex-wrap flex-row justify-content-center align-items-center align-content-center px-4 px-sm-4 py-2 border_color_second">
                <div class="reg_header toast-header">
                    <h5 class="reg_title h6 title_error cooper_italic fw-500 text-success color_second modal-title mx-auto mt-0 mb-0 text-uppercase" id="msgSuccessModalLabel">
                        Errore
                    </h5>
                    <div class="reg_footer modal-footer position-absolute top-0 end-0">
                        <button class="reg_close h4 btn-close btn-close-dark p-0 p-3" type="button" data-bs-dismiss="toast" aria-label="Close" style="background-image: none;">
                            <i class="icon_close h6 color_black align-top fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>

                <div class="reg_body toast-body px-0 py-0">
                    <p class="msg_error_txt small roboto fw_400 text-uppercase color_black mb-0 mb-2 mt-2" id="positiveText">
                        Qualcosa è andato storto
                    </p>
                </div>
            </div>
        </div>
    </div>
@endif
