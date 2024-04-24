var collapse = 0;
var counter = 0;
var checkoutOn = 0;
var checkoutCountAddress = '';
var addressDefault = 0;
var minBasket = 0;
var orderPrice = 0;
var spedPrice = 0;
var sizeGadget = 0;

// $('#trumbowyg-demo').trumbowyg();

function animated_numbers(section_id, number_class){
    $(document).ready(function(){
        $.fn.isInViewport = function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();

            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            return elementBottom > viewportTop && elementTop < viewportBottom;
        };
        $(window).on('resize scroll', function() {
            if(counter == 0) {
                if ($(section_id).isInViewport()) {
                    counter = 1;
                    $(number_class).each(function(){
                        let dec = 0;
                        if($(this).text().includes('.')){
                            dec = 1;
                        }
                        $(this).prop('Counter',0).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function (now) {
                                if(dec == 1){
                                    $(this).text(now.toFixed(1));
                                } else {
                                    $(this).text(Math.ceil(now));
                                }
                            }
                        });
                    })
                }
            }
        });
    })
}

// function updateSelection(input_label_class, container){
//     $(document).ready(function(){
//         let id = '';
//         if(container != undefined){
//             $(container).find(input_label_class).each(function(){
//                 let label = $(this);
//                 let style = $(label).attr('style');
//                 if(style == undefined){
//                     id = '#' + $(label).attr('for');
//                     return false;
//                 }
//             });
//         } else {
//             $(input_label_class).each(function(){
//                 let label = $(this);
//                 let style = $(label).attr('style');
//                 if(style == undefined){
//                     id = '#' + $(label).attr('for');
//                     return false;
//                 }
//             });
//         }
//         $(id).trigger( "click" );
//     });
// }

// function addOrder(form){
//     var d = new Date();
//     var month = d.getMonth()+1;
//     var day = d.getDate();
//     var output = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
//     $('input[name="fields[order-date]"]').val(output);
//     $.ajax({
// 		type: "POST",
// 		data: $(form).serialize(),
// 		success: function(data) {
// 		},
// 		error: function(data) {
// 			error.log(data)
// 		}
// 	});
// };

function checkCollapse(id, trigger){
    $(document).ready(function(){
        if($(id).hasClass('collapsed')){
            collapse = 0;
            $(trigger).attr('data-bs-toggle', 'collapse');
        } else {
            collapse = 1;
            $(trigger).removeAttr('data-bs-toggle');
        }
    });
}

function addDisponibility(id){
    $(document).ready(function(){
        let solution = $(id).data('solution');
        let form = $(id).data('form');
        let order_form = $(id).data('order-form');
        let input_solution = $(id).data('input-solution');
        let input_amount = $(id).data('input-amount');
        let input_size = $(id).data('input-size');
        for(i=0;i<solution.length;i++){
            let solution_detail = solution[i].split('-');
            let solution_id = solution_detail[0];
            let solution_amount = '-' + solution_detail[1];
            let solution_size = '';
            if(solution_detail[2] != undefined){
                solution_size = solution_detail[2];
            }
            $(form).find('input[name="' + input_solution + '"]').val(solution_id);
            $(form).find('input[name="' + input_amount + '"]').val(solution_amount);
            $(form).find('input[name="' + input_size + '"]').val(solution_size);
            $.ajax({
                type: "POST",
                data: $(form).serialize(),
                success: function(data) {
                },
                error: function(data) {
                    error.log(data)
                }
            });
        }
        $(order_form).submit();
    });
}

function checkElemsInContainerInputs(elem, container, input){
    $(document).ready(function(){
        $(container).each(function(){
            let this_container = $(this);
            let this_elem = $(this_container).data(elem);
            let this_elem_qty = $(this_container).data(elem + '-qty');
            if(this_elem != ''){
                let this_elem_array = this_elem.split(',');
                let this_elem_qty_array = this_elem_qty.split(',');
                let this_elem_array_count = this_elem_array.length;
                let count_elem = 0;
                let count_available = 0;
                let array_size = [];
                $(input).each(function(){
                    let this_input = $(this);
                    let val = $(this_input).val();
                    if(val === ''){
                        count_elem++;
                    } else {
                        for(i=0; i<this_elem_array_count; i++){
                            let this_elem_array_content = this_elem_array[i];
                            let this_elem_array_qty = Number(this_elem_qty_array[i]);
                            if((val === this_elem_array_content)){
                                array_size.push(val);
                                count_elem++;
                                if(this_elem_array_qty > 0){
                                    count_available++;
                                }
                            }
                        }
                    }
                });
                console.log(count_available);
                $(input).find('.unselected').each(function(){
                    let this_option = $(this);
                    let val = $(this_option).val();
                    if(array_size.includes(String(val))){
                        $(this_option).addClass('d-none');
                    } else {
                        $(this_option).removeClass('d-none');
                    }
                });
                if(count_elem > 0){
                    if(count_elem >= 2){
                        $(container).find('.btn_remove_size').removeClass('d-none');
                    } else {
                        $(container).find('.btn_remove_size').addClass('d-none');
                    }
                    if(count_elem <= (this_elem_array_count - count_available)){
                        $(container).find('.btn_add_size').removeClass('d-none');
                    } else {
                        $(container).find('.btn_add_size').addClass('d-none');
                    }
                }
            }
        });

    });
}

function countTriggerStyle(count, element, style_success, style_failed){
    $(document).ready(function(){
        if(count > 0){
            $(element).attr('style', style_success);
        } else {
            $(element).attr('style', style_failed);
        }
    });
}

function countTriggerClass(count, element, class_success, class_failed){
    $(document).ready(function(){
        if(count > 0){
            $(element).addClass(class_success);
            $(element).removeClass(class_failed);
        } else {
            $(element).addClass(class_failed);
            $(element).removeClass(class_success);
        }
    });
}

function switchDisplayClass(class_name, count_success, count_failed){
    $(document).ready(function(){
        $(class_name).eq(count_success).removeClass('d-none');
        $(class_name).eq(count_failed).addClass('d-none');
    });
}

function checkCart(id, class_container, class_content){
    let cart_full = $(id).data('full');
    let cart_empty = $(id).data('empty');
    if($(class_container).find(class_content).length > 0){
		$(".circle_cart").attr({ "style": "border-color: #B439B0; transition: border-color .375s ease-out" });
        $(cart_full).removeClass('d-none');
        $(cart_empty).addClass('d-none');
        if($(class_container).find(class_content).find('.change_size').length > 0){
            let check = 1;
            $(class_container).find(class_content).find('.change_size').each(function(){
                if($(this).val() === ''){
                    check = 0;
                }
            });
            if(check === 1){
                switchDisplayClass('.title_checkout', 0, 1);
                countTriggerStyle($(class_container).find(class_content).length, '.btn_proceed_checkout', '', 'pointer-events:none;opacity:0.5;');
            } else {
                switchDisplayClass('.title_checkout', 1, 0);
                $('.btn_proceed_checkout').attr('style', 'pointer-events:none;opacity:0.5');
            }
        } else {
            countTriggerStyle($(class_container).find(class_content).length, '.btn_proceed_checkout', '', 'pointer-events:none;opacity:0.5;');
        }
    } else {
		$(".circle_cart").attr({ "style": "border-color: black; transition: border-color .375s ease-out" });
        $(cart_full).addClass('d-none');
        $(cart_empty).removeClass('d-none');
        countTriggerStyle($(class_container).find(class_content).length, '.btn_proceed_checkout', '', 'pointer-events:none;opacity:0.5;');

    }

}

function addOrder(form){
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output = d.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
    $('input[name="fields[order-date]"]').val(output);
    $.ajax({
		type: "POST",
		data: $(form).serialize(),
		success: function(data) {
		},
		error: function(data) {
			error.log(data)
		}
	});
};

function countOrder(num, order){
    if(num > 0){
        checkoutOn = 1;
        orderPrice = Number(order);
    }
}

function countAddress(input){
    let inputVal = $(input).val();
    checkoutCountAddress = inputVal;
}

function checkAddress(address_class, button){
    $(document).ready(function(){
        let address_count = $(address_class).length;
        if(address_count > 0){
            $(address_class).each(function(){
                let id = $(this).data('id');
                let default_val = $(this).data('default');
                if(default_val === 'on'){
                    addressDefault = id;
                    console.log(addressDefault);
                }
            });
        } else {
            switchDisplayClass(button);
        }
    });
}

function updateSpedPrice(class_name){
    $(document).ready(function(){
        minBasket = Number($(class_name).data('min-basket'));
        spedPrice = Number($(class_name).text());
    });
}

function updateSelectionCheckout(input_class){
    $(document).ready(function(){
        let id = '';
        $(input_class).each(function(){
            let input = $(this);
            if($(input).prop('checked') == true){
                id = '#' + $(input).attr('id');
                return false;
            }
        });
        $(id).trigger( "click" );
        countAddress();
        if(checkoutCountAddress != ''){
            if(checkoutOn > 0){
                $('.btn_checkout_proceed').attr('style', '');
                if(orderPrice >= minBasket){
                    $('.delivery_price').attr('style', 'text-decoration:line-through;opacity:0.5;');
                    let price = $('#price_tot_checkout').data('price');
                    $('#price_tot_checkout').text(Number(price).toFixed(2) + ' €');
                } else {
                    $('.delivery_price').attr('style', '');
                    let price = $('#price_tot_checkout').data('price');
                    let final_price = price + spedPrice;
                    $('#price_tot_checkout').text(Number(final_price).toFixed(2) + ' €');
                }
            }
        }
    });
};

function selectFirstVal(element, form, input){
    $(document).ready(function(){
        let val = $(element).find("option:first-child").val();
        $(form).find('input[name="' + input + '"]').val(val);
    });
}

function checkCartCheckout(class_container, class_content){
    $(document).ready(function(){
        if($(class_container).find(class_content).find('.change_size').length > 0){
            let check = 1;
            $(class_container).find(class_content).find('.change_size').each(function(){
                if($(this).val() === ''){
                    check = 0;
                }
            });
            if(check === 1){
                switchDisplayClass('.title_checkout', 0, 1);
                countTriggerStyle($(class_container).find(class_content).length, '.btn_proceed_checkout', '', 'pointer-events:none;opacity:0.5;');
            } else {
                switchDisplayClass('.title_checkout', 1, 0);
                $('.btn_proceed_checkout').attr('style', 'pointer-events:none;opacity:0.5');
            }
        } else {
            countTriggerStyle($(class_container).find(class_content).length, '.btn_proceed_checkout', '', 'pointer-events:none;opacity:0.5;');
        }
    });
};

function selectPrefix(country){
    $(document).ready(function(){
        let selected_flag = $('.iti__selected-flag').attr('aria-activedescendant');
        let country_code = selected_flag.split('-')[2];
        let prefix_length = $('.iti__selected-dial-code').length;
        for(i=0; i<prefix_length; i++){
            let prefix = $('.iti__selected-dial-code').eq(i).text();
            $('.tel_prefix').eq(i).val(prefix);
            $('.tel_prefix_country').eq(i).val(country_code);
        }
    });
}

function scrollPage(ref, partial_class){
    let margin = (ref - 1) * 100;
    let margintext = '-' + margin + 'vw';
    let prev_scroll = localStorage.getItem('steps');
    if(prev_scroll != null){
        let array = prev_scroll.split(',');
        let x = 0;
        for(i=0;i<array.length;i++){
            if(Number(array[i]) === Number(ref)){
                x = 1;
            }
        }
        if(x === 0){
            array.push(ref);
        }
        localStorage.setItem('steps', array);
    } else {
        localStorage.setItem('steps', ref);
    }
    $(partial_class).css({ "margin-left": margintext });
}

$(document).ready(function(){

    // $('#closeCart').on('click', function(){
    //     checkCollapse();
    // });

    // $('#cartButton').on('click', function(){
    //     checkCollapse();
    // });

    $("body").on('click', '.iti__country-list', function(){
        selectPrefix();
    });

    $('.phone').on('input', function(){
        selectPrefix();
    });

    $('.btn_toggler_open').on('click', function(){
        checkCollapse("#optionCounter", '.btn_add_soluzione');
    });

    $('.circle_cart').on('click', function(){
        checkCollapse('#optionCounter', '.btn_add_soluzione');
    });

    $('#closeCart').on('click', function(){
        checkCollapse('#optionCounter', '.btn_add_soluzione');
    });

    $('#sizeGadget').on('change', function(){
        let val = $(this).val();
        let form = $(this).data('form');
        let input = $(this).data('input');
        $(form).find('input[name="' + input + '"]').val(val);
    });

    $('.quantity_input').on('change', function(){
        let form = $(this).data('form');
        let input = $(this).data('input-amount');
        let val = $(this).val();
        $(form).find('input[name="' + input + '"]').val(val);
    });

    $('#addressDefaultAddress').on('input', function(){
        let form = $(this).data('form');
        let ref = $(this).data('ref');
        if(this.checked){
            $(form).find('input[name="' + ref + '"]').val('on');
        } else {
            $(form).find('input[name="' + ref + '"]').val('off');
        }
    });

    $('body').on('click', '.select_address', function(){
        let min_shipment_cost = $(this).data('min-shipment-cost-label');
        $(min_shipment_cost).addClass('d-none');
        let form = $(this).data('form');
        let input = $(this).data('input');
        let id = $(this).data('id');
        let spedition_area_id = $(this).data('spedition-area-id');
        let ref = $(this).data('ref');
        let ref_id = $(this).data('ref-id');
        let default_text = $(this).data('default-text');
        let chosen_text = $(this).data('chosen-text');
        let delivery_price = $(this).data('delivery');
        $(delivery_price).each(function(){
            let span = $(this);
            if($(span).attr('id') == spedition_area_id){
                let min_basket = $(span).data('min-basket');
                if(min_basket != 0){
                    let min_shipment_cost_label = $(min_shipment_cost).data('span');
                    $(min_shipment_cost).removeClass('d-none');
                    $(min_shipment_cost_label).html(min_basket + '€');
                }
                minBasket = min_basket;
                $(delivery_price).addClass('d-none');
                $(span).removeClass('d-none');
                spedPrice = Number($(span).text());
                if(orderPrice >= minBasket){
                    $(span).attr('style', 'text-decoration:line-through;opacity:0.5;');
                    let final_price = orderPrice;
                    $('#price_tot_checkout').text(Number(final_price).toFixed(2) + ' €');
                    $('#add_order').find('input[name="fields[final-price]"]').val(Number(final_price).toFixed(2));
                    $('#add_order').find('input[name="fields[order-cost]"]').val(Number(orderPrice).toFixed(2));
                    $('#add_order').find('input[name="fields[shipping-cost]"]').val('0');
                } else {
                    $(span).attr('style', '');
                    let final_price = orderPrice + spedPrice;
                    $('#price_tot_checkout').text(Number(final_price).toFixed(2) + ' €');
                    $('#add_order').find('input[name="fields[final-price]"]').val(Number(final_price).toFixed(2));
                    $('#add_order').find('input[name="fields[order-cost]"]').val(Number(orderPrice).toFixed(2));
                    $('#add_order').find('input[name="fields[shipping-cost]"]').val(spedPrice);
                }
            }
        });
        $(ref).removeClass('btn_bg_first').addClass('btn_color_first');
        $(ref_id).addClass('btn_bg_first');
        $(ref).text(default_text);
        $(ref_id).text(chosen_text);
        $(form).find('input[name="' + input + '"]').val(id);
        if(checkoutOn > 0){
            $('.btn_checkout_proceed').style('');
        }
    });

    $('body').on('click', '.btn_delete_address', function(){
        let form = $(this).data('form');
        let ref_id = $(this).data('ref-id');
        $(form).find('input[name="id"]').val(ref_id);
        $(form).submit();
    });

    $('body').on('click', '.btn_edit_address', function(){
        let form = $(this).data('form');
        $(form).removeClass('d-none');
        let ref = $(this).data('ref');
        let ref_id = $(this).data('ref-id');
        let info_address = $(this).data('info-address');
        if(ref_id == addressDefault){
            $('#addressDefaultAddress').prop('disabled', true);
            $('#addressDefaultAddress').prop('checked', true);
            $('#addressDefaultAddressInput').val('on');
        } else {
            $('#addressDefaultAddress').prop('disabled', true);
            $('#addressDefaultAddress').prop('checked', false);
            $('#addressDefaultAddressInput').val('off');
        }
        $(ref).find(info_address).each(function(){
            let info = $(this);
            let info_text = $(info).text();
            let info_ref = $(info).data('ref');
            if(info_ref == 'fields[spedition-area]'){
                $("#addressArea").val(info_text).change();

            } else {
                $(form).find('input[name="' + info_ref + '"]').val(info_text);
            }
            $(form).find('input[name="id"]').val(ref_id);
            $(form).find('input[name="fields[default]"]').prop('checked', true);
        });
    });

    $('body').on('change', '.change_size', function(){
        let this_change = $(this);
        let form = $(this).data('form');
        let val = $(this).val();
        let url = $(this).data('url');
        let input_notes = $(this).data('input-notes');
        let input_order = $(this).data('input-order');
        let input_amount = $(this).data('input-amount');
        let order_value = $(this).data('order');
        $(form).find('input[name="' + input_notes + '"]').val(val);
        $(form).find('input[name="' + input_order + '"]').val(order_value);
        $.ajax({
            type: "POST",
            data: $(form).serialize(),
            url: url,
            success: function(data) {
                checkCart('#optionCounter', '.cart_container', '.cart_product');
                $(form).find('input[name="' + input_notes + '"]').val('');
                console.log($('#' + order_value).find(input_amount).attr('max'));
                $(this_change).find('.selected').removeClass('selected').addClass('unselected');
                $(this_change).find('option').each(function(){
                    let this_option = $(this);
                    let option_val = $(this_option).val();
                    if(option_val === val){
                        $(this_option).removeClass('unselected').addClass('selected');
                        let amount = $(this_option).data('amount');
                        $('#' + order_value).find(input_amount).val(1).change();
                        $('#' + order_value).find(input_amount).attr('max', amount);
                    }
                })
                checkElemsInContainerInputs('elem', '.cart_product', '.change_size');
            },
            error: function(data) {
                $('#negativeText').html('loading error ' + url);
                $('#alertMessage').modal('show');
            }
        });
    });

    $('body').on('change', '.change_amount', function(){
        let form = $(this).data('form');
        let url = $(this).data('url');
        let cart_container = $(this).data('cart-container');
        let input_amount = $(this).data('input-amount');
        let amount_value = $(this).val();
        let input_order = $(this).data('input-order');
        let order_value = $(this).data('order');
        let input_price = $(this).data('input-price');
        let price = $(this).data('price');
        let price_checkout = $(this).data('price-checkout');
        let input_price_tot = $(this).data('input-price-tot');
        let price_tot_checkout = $(this).data('price-tot-checkout');
        let price_tot = Number(price) * Number(amount_value);
        $(form).find('input[name="' + input_order + '"]').val(order_value);
        $(form).find('input[name="' + input_amount + '"]').val(amount_value);
        $(form).find('input[name="' + input_price + '"]').val(price);
        $(form).find('input[name="' + input_price_tot + '"]').val(price_tot.toFixed(2));
        $.ajax({
            type: "POST",
            data: $(form).serialize(),
            url: url,
            success: function(data) {
                $(cart_container).html(data);
                let final_price = $(cart_container).find('.final_price').first().text();
                $(form).find('input[name="fields[additional-notes]"').val('');
                if(price_checkout != undefined){
                    orderPrice = Number(final_price);
                    if(orderPrice >= minBasket){
                        $('.delivery_price').attr('style', 'text-decoration:line-through;opacity:0.5;');
                        $(price_checkout).text(Number(orderPrice).toFixed(2) + ' €');
                        $(price_tot_checkout).text(Number(orderPrice).toFixed(2) + ' €');
                        $('#add_order').find('input[name="fields[final-price]"]').val(Number(orderPrice).toFixed(2));
                        $('#add_order').find('input[name="fields[order-cost]"]').val(Number(orderPrice).toFixed(2));
                        $('#add_order').find('input[name="fields[shipping-cost]"]').val('0');
                    } else {
                        $('.delivery_price').attr('style', '');
                        $(price_checkout).text(Number(orderPrice).toFixed(2) + ' €');
                        let final_price_spedition = Number(final_price) + spedPrice;
                        $(price_tot_checkout).text(final_price_spedition.toFixed(2) + ' €');
                        $('#add_order').find('input[name="fields[final-price]"]').val(Number(final_price_spedition).toFixed(2));
                        $('#add_order').find('input[name="fields[order-cost]"]').val(Number(orderPrice).toFixed(2));
                        $('#add_order').find('input[name="fields[shipping-cost]"]').val(spedPrice);
                    }
                }


            },
            error: function(data) {
                $('#negativeText').html('loading error ' + url);
                $('#alertMessage').modal('show');
            }
        });
    });

    $('body').on('click', '.btn_delete_soluzione', function(){
        let form = $(this).data('form');
        let url = $(this).data('url');
        let soluzione_id = $(this).data('soluzione');
        let btnId = 'btn' + soluzione_id;
        let btnIdCart = btnId + 'Cart';
        let sizeGadget = 'sizeGadget' + soluzione_id;
        let soluzione_class = $(this).data('soluzione-class');
        let cart_container = $(this).data('cart-container');
        let cart_order = $(this).data('cart-order');
        let order_class = $(this).data('order-class');
        let input_order = $(this).data('input-order');
        $(soluzione_class).each(function(){
            let soluzione = $(this);
            if($(soluzione).data('soluzione') == soluzione_id){
                $(soluzione).prop('disabled', false);
            }
        });
        $(cart_order).find(order_class).each(function(){
            let order_id = $(this).attr('id');
            $(form).find('input[name="' + input_order + '"]').val(order_id);
            $.ajax({
                type: "POST",
                data: $(form).serialize(),
                url: url,
                success: function(data) {
                    $(cart_container).html(data);
                    if($(cart_container).find('.cart_product').length === 0){
                        $('.btn_checkout_proceed').attr('style', 'pointer-events:none;opacity:0.5;');
                        $('.btn_pay').attr('style', 'pointer-events:none;opacity:0.5;');
                    }
                    let price = $(cart_container).find('.final_price').html();
                    orderPrice = Number(price);
                    if(orderPrice >= minBasket){
                        $('.delivery_price').attr('style', 'text-decoration:line-through;opacity:0.5;');
                        let final_price = orderPrice;
                        $('#price_checkout').text(Number(final_price).toFixed(2) + ' €');
                        $('#price_tot_checkout').text(Number(final_price).toFixed(2) + ' €');
                        $('#add_order').find('input[name="fields[final-price]"]').val(Number(final_price).toFixed(2));
                        $('#add_order').find('input[name="fields[order-cost]"]').val(Number(orderPrice).toFixed(2));
                        $('#add_order').find('input[name="fields[shipping-cost]"]').val('0');
                    } else {
                        $('.delivery_price').attr('style', '');
                        let final_price = orderPrice + spedPrice;
                        $('#price_checkout').text(Number(price).toFixed(2) + ' €');
                        $('#price_tot_checkout').text(Number(final_price).toFixed(2) + ' €');
                        $('#add_order').find('input[name="fields[final-price]"]').val(Number(final_price).toFixed(2));
                        $('#add_order').find('input[name="fields[order-cost]"]').val(Number(orderPrice).toFixed(2));
                        $('#add_order').find('input[name="fields[shipping-cost]"]').val(spedPrice);
                    }
                    $('#' + btnId).removeClass('d-none');
                    $('#' + btnIdCart).addClass('d-none');
                    $('.' + sizeGadget).attr('style', '');
                    checkCart('#optionCounter', cart_container, '.cart_product');
                },
                error: function(data) {
                    $('#negativeText').html('loading error ' + url);
                    $('#alertMessage').modal('show');
                }
            });
        });
    });

    $('body').on('click', '.btn_remove_size', function(){
        let form = $(this).data('form');
        let url = $(this).data('url');
        let soluzione_id = $(this).data('soluzione');
        let btnId = 'btn' + soluzione_id;
        let btnIdCart = btnId + 'Cart';
        let soluzione_class = $(this).data('soluzione-class');
        let cart_container = $(this).data('cart-container');
        let cart_order = $(this).data('cart-order');
        let order_class = $(this).data('order-class');
        let input_order = $(this).data('input-order');
        let last_order = $(this).data('last');
        $(soluzione_class).each(function(){
            let soluzione = $(this);
            if($(soluzione).data('soluzione') == soluzione_id){
                $(soluzione).prop('disabled', false);
            }
        });
        $(cart_order).find(order_class).each(function(){
            let order_id = $(this).attr('id');
            if(Number(order_id) === Number(last_order)){
                $(form).find('input[name="' + input_order + '"]').val(last_order);
                $.ajax({
                    type: "POST",
                    data: $(form).serialize(),
                    url: url,
                    success: function(data) {
                        $(cart_container).html(data);
                        if($(cart_container).find('.cart_product').length === 0){
                            $('.btn_checkout_proceed').attr('style', 'pointer-events:none;opacity:0.5;');
                            $('.btn_pay').attr('style', 'pointer-events:none;opacity:0.5;');
                        }
                        let price = $(cart_container).find('.final_price').html();
                        orderPrice = Number(price);
                        if(orderPrice >= minBasket){
                            $('.delivery_price').attr('style', 'text-decoration:line-through;opacity:0.5;');
                            let final_price = orderPrice;
                            $('#price_checkout').text(Number(final_price).toFixed(2) + ' €');
                            $('#price_tot_checkout').text(Number(final_price).toFixed(2) + ' €');
                            $('#add_order').find('input[name="fields[final-price]"]').val(Number(final_price).toFixed(2));
                            $('#add_order').find('input[name="fields[order-cost]"]').val(Number(orderPrice).toFixed(2));
                            $('#add_order').find('input[name="fields[shipping-cost]"]').val('0');
                        } else {
                            $('.delivery_price').attr('style', '');
                            let final_price = orderPrice + spedPrice;
                            $('#price_checkout').text(Number(price).toFixed(2) + ' €');
                            $('#price_tot_checkout').text(Number(final_price).toFixed(2) + ' €');
                            $('#add_order').find('input[name="fields[final-price]"]').val(Number(final_price).toFixed(2));
                            $('#add_order').find('input[name="fields[order-cost]"]').val(Number(orderPrice).toFixed(2));
                            $('#add_order').find('input[name="fields[shipping-cost]"]').val(spedPrice);
                        }
                        checkCart('#optionCounter', cart_container, '.cart_product');
                    },
                    error: function(data) {
                        $('#negativeText').html('loading error ' + url);
                        $('#alertMessage').modal('show');
                    }
                });
            }
        });
    });

    $('body').on('click', '.btn_add_soluzione', function(e){
        e.preventDefault();
        let btnId = $(this).attr('id');
        let btnIdCart = btnId + 'Cart';
        let check = 1;
        let button = $(this);
        $(button).prop('disabled', true);
        checkCollapse("#optionCounter", '.btn_add_soluzione');
        let form = $(button).data('form');
        let url = $(button).data('url');
        let cart_container = $(button).data('cart-container');
        let price = $(button).attr('data-price');
        let input_amount = $(button).data('input-amount');
        let input_amount_value = $(form).find('input[name="' + input_amount + '"]').val();
        let input_price = $(button).data('input-price');
        $(form).find('input[name="' + input_price + '"]').val(price);
        let input_price_tot = $(button).data('input-price-tot');
        let input_soluzione = $(button).data('input-soluzione');
        let soluzione_id = $(button).attr('data-soluzione');
        let sizeGadget = 'sizeGadget' + soluzione_id;
        let price_tot = Number(price) * Number(input_amount_value);
        $(form).find('input[name="' + input_soluzione + '"]').val(soluzione_id);
        $(form).find('input[name="' + input_price_tot + '"]').val(price_tot.toFixed(2));
        $(cart_container).find('.cart_product').each(function(){
            let id_soluzione = $(this).data('ref');
            let elem = $(this).data('elem');
            if(this_elem = ''){
                if(soluzione_id === id_soluzione){
                    check = 0;
                    $(button).prop('disabled', false);
                    checkCart('#optionCounter', cart_container, '.cart_product');
                }
            }
        });
        if(check != 0){
            $.ajax({
                type: "POST",
                data: $(form).serialize(),
                url: url,
                success: function(data) {
                    $(cart_container).html(data);
                    $(form).find('input[name="' + input_amount + '"]').val(1);
                    $(form).find('input[name="fields[additional-notes]"]').val('');
                    $('#' + btnId).addClass('d-none');
                    $('#' + btnIdCart).removeClass('d-none');
                    $('.' + sizeGadget).attr('style', 'display:none;');
                    checkCart('#optionCounter', cart_container, '.cart_product');
                    $(form).find('input[name="fields[additional-notes]"').val('');
                },
                error: function(data) {
                    $('#negativeText').html('loading error ' + url);
                    $('#alertMessage').modal('show');
                }
            });
        }
    });

    $("body").on('click', '.searchMonth', function(){
        $('.searchMonth').removeClass('month_active');
        $(this).addClass('month_active');
        let elemid = $(this).attr('data-elem');
        let url = $(elemid).attr('data-root');
        let start_date = $(this).attr('data-start-date');
        let year = $(elemid).attr('data-year');
        $(elemid).attr('data-start-date', start_date);
        url = url + '&start-date=' + year + start_date + '&type=' + $(elemid).attr('data-type');
        $(elemid).attr('data-url',url);
        let urldest = $(elemid).attr('data-url');
        let elem = $(elemid);
        htmltodiv(elem,urldest);
    });

    $("body").on('click', '.searchType', function(){
        $('.searchType').attr('style', '');
        $(this).attr('style', 'color: #B439B0; background-color: #ffffff; border-color: #B439B0;');
        let elemid = $(this).attr('data-elem');
        let url = $(elemid).attr('data-root');
        let type = $(this).attr('data-value');
        $(elemid).attr('data-type', type);
        let year = $(elemid).attr('data-year');
        if($(elemid).attr('data-start-date') != ''){
            url = url + '&start-date=' + year + $(elemid).attr('data-start-date') + '&type=' + type;
        } else {
            url = url + '&start-date=' + year + '-01-01' + '&type=' + type;
        }
        $(elemid).attr('data-url',url);
        let urldest = $(elemid).attr('data-url');
        let elem = $(elemid);
        htmltodiv(elem,urldest);
    });

    $('.calendar_year_btn').on('click', function(){
        let val = $(this).data('year');
        let elemid = $(this).attr('data-elem');
        $(elemid).attr('data-year', val);
        let url = $(elemid).attr('data-root');
        let month_class = $(this).data('month-class');
        $(month_class).removeClass('month_active');
        $(month_class).first().addClass('month_active');
        $('.calendar_year_btn').removeClass('year_active');
        $(this).addClass('year_active');
        $(elemid).attr('data-start-date', val + '-01-01');
        url = url + '&start-date=' + val + '-01-01' + '&type=' + $(elemid).attr('data-type');
        $(elemid).attr('data-url', url);
        let urldest = $(elemid).attr('data-url');
        let elem = $(elemid);
        htmltodiv(elem,urldest);
    });

    $('#searchCalendarName').on('click', function(){
        $('.searchMonth').removeClass('month_active');
        let input_val = $(this).data('title');
        let val = $(input_val).val();
        let new_val = val.replace(/ /g, '-');
        let url = $(this).data('url');
        url = url + '&title=' + new_val;
        let elemid = $(this).attr('data-elem');
        let elem = $(elemid);
        htmltodiv(elem,url);
    });

    $('.sso_microsoft').on('click', function(){
        let url = $(this).data("url");
        let entityid = $(this).data("entityid");
        let replyurl = $(this).data("replyurl");
        let saml = $(this).data("saml");
        $.ajax({
            type: "POST",
            url: url,
            data: {"entityId": entityid, "replyUrl": replyurl, "saml": saml},
            success: function(data) {
                console.log(data);
            },
            error: function(data) {
                
            }
        });
    });
});
