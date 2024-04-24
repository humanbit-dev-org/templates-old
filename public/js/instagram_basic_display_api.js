// Instagram Basic Display API <<IN>>
var instApi = window.instApi || {};
instApi.name = "FC Instagram";
instApi.version = "2.0.0";

// Utility for older browsers
if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() { }

        F.prototype = obj;
        return new F();
    };
}

window.onload = function ($, window, document, undefined) {
    var Instagram = {
        API_URL: "https://graph.instagram.com/me/media?fields=",
        API_FIELDS: "caption,media_url,media_type,permalink,timestamp,username",

        /**
         * Initializes the plugin.
         * @param {object} options
         * @param {jQuery Object} elem
         */
        initialize: function (options, elem) {
            this.elem = elem;
            this.$elem = $(elem);
            (this.accessToken = $.fn.instApi.accessData.accessToken),
                (this.options = $.extend({}, $.fn.instApi.options, options));

            this.messages = {
                defaultImageAltText: "Instagram Photo",
                notFound: "This user account is private or doesn't have any photos.",
            };

            this.getPhotos();
        },

        /**
         * Calls the fetch function and work with the response.
         */
        getPhotos: function () {
            var self = this;
            //   messages = null;

            self.fetch().done(function (results) {
                if (results.data) {
                    self.displayPhotos(results);
                } else if (results.error.message) {
                    $.error("instApi.js - Error: " + results.error.message);
                } else {
                    $.error("instApi.js - Error: user does not have photos.");
                }
            });
        },

        /**
         * Makes the ajax call and returns the result.
         */
        fetch: function () {
            var getUrl =
                this.API_URL + this.API_FIELDS + "&access_token=" + this.accessToken;

            return $.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: false,
                url: getUrl,
            });
        },

        /**
         * Appends the markup to the DOM with the images.
         * @param {object} results
         */
        displayPhotos: function (results) {
            var $element,
                $video,
                hasCaption,
                imageGroup = [],
                imageCaption,
                autoplay,
                max;

            max =
                this.options.max >= results.data.length
                    ? results.data.length
                    : this.options.max;

            if (results.data === undefined || results.data.length === 0) {

                this.$elem.append(this.messages.notFound);

                return;
            }

            for (var i = 0; i < max; i++) {
                if (
                    results.data[i].media_type === "IMAGE" ||
                    results.data[i].media_type === "CAROUSEL_ALBUM"
                ) {
                    hasCaption =
                        results.data[i].caption !== null ||
                        results.data[i].caption !== undefined;

                    imageCaption = hasCaption
                        ? $("<span>").text(results.data[i].caption).html()
                        : this.messages.defaultImageAltText;

                    $element = $("<a>", {
                        href: results.data[i].permalink,
                        target: "_blank",
                        title: imageCaption,
                        style:
                            "background:url(" +
                            results.data[i].media_url +
                            ") no-repeat center / cover;",
                        rel: "nofollow",
                    });

                    // Add item
                    imageGroup.push($element);

                } else if (results.data[i].media_type === "VIDEO") {
                    autoplay =
                        this.options.autoplay == true
                            ? "autoplay muted loop playsinline"
                            : "";

                    $source = $("<source>", {
                        src: results.data[i].media_url,
                        type: "video/mp4",
                    });

                    $video = $("<video " + autoplay + ">").append($source);

                    $element = $("<a>", {
                        href: results.data[i].permalink,
                        target: "_blank",
                        title: imageCaption,
                        rel: "nofollow",
                    }).append($video);

                    // Add item
                    imageGroup.push($element);

                }
            }

            this.$elem.append(imageGroup);

            if (typeof this.options.complete === "function") {
                this.options.complete.call(this);
            }
        },
    };

    /**
     * instApi Plugin Definition.
     */
    jQuery.fn.instApi = function (options) {
        if (jQuery.fn.instApi.accessData.accessToken) {
            this.each(function () {
                var instagram = Object.create(Instagram);

                instagram.initialize(options, this);
            });
        } else {
            $.error("You must define an accessToken on jQuery.instApi");
        }
    };

    // Plugin Default Options.
    jQuery.fn.instApi.options = {
        complete: null,
        max: 9,
        autoplay: false
    };

    // Instagram Access Data.
    jQuery.fn.instApi.accessData = {
        accessToken: null,
    };
}(jQuery, window, document);

jQuery.fn.instApi.accessData = {
    accessToken: "IGQVJVWm9kTlMyOWJ2SHRyVlJTTHRPSEJDbkV3ZA0ZAvZAmhQN2NZAV2t6alNKNUI0UW5KSDlfZAjhoMFJvdVFwQ3hNRWVtai1mRHJ3bGladmNvQ19qV1VJeHZAPRzRUTTJ3bHJxcWpwdmt3", // Token
};

var maxPics = 9;
if (window.innerWidth <= 991.98) {
    maxPics = 6;
}

$('#instaFeed').instApi({
    max: maxPics, // A number between 1 and 25 of photos to show. Default: 9
    autoplay: true, // Set autoplay video: true/false. Default: false
    complete: function () { // A callback function to execute after the display of the photos.
        // console.log('completed');
    }
});
// Instagram Basic Display API <<OUT>>




request.onerror = function () {
    // There was a connection error of some sort
};

request.send();

// cards begin


$(document).on('click', '.contactempty', function (e) {
    console.log('click');
    let ref = $(this).data('ref');
    let refemail = $(this).data('refemail');
    let name = $(this).data('name');
    $('#contact').modal('show');
    $('#askcontactname').html(name);
    $('#idreceiver').val(ref);
    $('#idreceiveremail').val(refemail);
});


$(document).on('click', '#askcontactsubmit', function (e) {
    e.preventDefault();
    $(this).prop("disabled", true);
    let urldest = $(this).data('url');
    let msg = $(this).data('msg');
    var ref = $('#idreceiver').val();
    $.ajax({
        type: "POST",
        url: urldest,
        data: $('#askcontactform').serialize(),
        success: function (data) {
            $('.modal').modal('hide');
            //successAlert(msg);
            $('.contact[data-ref=' + ref + ']').removeClass('contactempty');
            $('.contact[data-ref=' + ref + ']').addClass('contactwait');
            let textask = $('.contact[data-ref=' + ref + ']').data('wait');
            $('.contact[data-ref=' + ref + ']').html(textask);
        },
        error: function (data) {
            $('#negativeText').html('loading error ' + urldest);
            $('#alertMessage').modal('show');
        }
    });
});

$(document).on('click', '.contactwaitreceived', function (e) {
    let ref = $(this).data('ref');
    $('#wait' + ref).modal('show');
});

$(document).on('click', '#requestcontactformyes', function (e) {
    e.preventDefault();
    $(this).prop("disabled", true);
    let name = $(this).attr('name');
    $("#newstatus").val("yes");
    $("#actionname").attr("name", name);
    let urldest = $(this).data('url');
    let msg = $(this).data('msg');
    let ref = $(this).data('ref');
    $.ajax({
        type: "POST",
        url: urldest,
        data: $('#requestcontactform').serialize(),
        success: function (data) {
            $('.modal').modal('hide');
            //successAlert(msg);
            $('.contact[data-ref=' + ref + ']').removeClass('contactwaitreceived');
            $('.contact[data-ref=' + ref + ']').addClass('contactyes');
            let textask = $('.contact[data-ref=' + ref + ']').data('yes');
            $('.contact[data-ref=' + ref + ']').html(textask);
        },
        error: function (data) {
            $('#negativeText').html('loading error ' + urldest);
            $('#alertMessage').modal('show');
        }
    });
});

$(document).on('click', '#requestcontactformno', function (e) {
    e.preventDefault();
    $(this).prop("disabled", true);
    let name = $(this).attr('name');
    $("#actionname").attr("name", name);
    $("#newstatus").val("no");
    let urldest = $(this).data('url');
    let msg = $(this).data('msg');
    let ref = $(this).data('ref');
    $.ajax({
        type: "POST",
        url: urldest,
        data: $('#requestcontactform').serialize(),
        success: function (data) {
            $('.modal').modal('hide');
            //failedAlert(msg)
            $('.contact[data-ref=' + ref + ']').removeClass('contactwaitreceived');
            $('.contact[data-ref=' + ref + ']').addClass('contactbanned');
            let textask = $('.contact[data-ref=' + ref + ']').data('del');
            $('.contact[data-ref=' + ref + ']').html(textask);
        },
        error: function (data) {
            $('#negativeText').html('loading error ' + urldest);
            $('#alertMessage').modal('show');
        }
    });
});

$(document).on('click', '.contactyes', function (e) {
    let ref = $(this).data('ref');
    $.ajax({
        type: "POST",
        url: 'https://www.associazionedimorestoricheitaliane.it/embed-member/' + ref + '/',
        success: function (data) {
            $('.cardmemberbody').html(data);
            $('#cardmember').modal('show');
        },
        error: function (data) {
            $('#negativeText').html('loading error');
            $('#alertMessage').modal('show');
        }
    });
});

//cards end

$(document).on('click', '.calendarnavangel', function () {
    var year = $(this).attr('data-year');
    var month = $(this).attr('data-month');
    var root = $('#calendar').attr('data-url');
    var url = root + "&y=" + year + "&m=" + month;
    var loading = 'loading...';

    $.ajax({
        type: "POST",
        url: url,
        beforeSend: function () {
            $('#replace').html(loading);
        },
        success: function (data) {
            $('#calendar').html(data);
        }
    })
});

$("body").on('click', '.tabs_profile-search', function (e) {
    var search = $(this).data('search');
    $('.form_ricerca').removeClass('show');
    $(search).addClass('show');


});


// funzioni per efx viewport

// function scroll
$(window).scroll(function () {
    let top_of_element;
    let bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    let urldest;
    let elem;

    /*from_scroll abstract function ajax on scroll elem in viewport (carica in aix la url che hai messo nella data url nel momento in cui quell alemento è visibile) al from scroll non sostituisco niente*/
    $('.from_scroll').each(function () {
        top_of_element = $(this).offset().top + 50;
        urldest = $(this).data('url');
        elemname = $(this).data('elem');
        elem = $(elemname);
        if (bottom_of_screen > top_of_element) {
            htmltodiv(elem, urldest);
            $(this).remove();
        } else {
            // the element is not visible, do something else
        }
    });


    /*showing elementi in viewport*/



    $('.viewport').each(function () {
        top_of_element = $(this).offset().top + 50;
        if (bottom_of_screen > top_of_element) {
            // the element is visible, do something
            $(this).css({
                transform: " matrix(1, 0, 0, 1, 0, 0)",
                opacity: 1
            });
        } else {
            // the element is not visible, do something else
        }
    });
});

//button basket function for start
function buttonbasket() {
    var bottom_of_screen1 = $(window).scrollTop() + $(window).innerHeight();
    if ($('#nextstepcont').length > 0) {
        if ($(window).width() < 768) {
            var buttonpos = $('#nextstepcont').offset().top + 80;
            if (bottom_of_screen1 < buttonpos) {
                $('#nextstep').addClass('button-fix');
            } else {
                $('#nextstep').removeClass('button-fix');
            }
        }
    }
    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
        if ($('#nextstepcont').length > 0) {
            if ($(window).width() < 768) {
                var buttonpos = $('#nextstepcont').offset().top + 80;
                if (bottom_of_screen < buttonpos) {
                    $('#nextstep').addClass('button-fix');
                } else {
                    $('#nextstep').removeClass('button-fix');
                }
            }
        }
    }
}

function menuscroll() {
    // When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            $('.navbar_adsi').addClass('navbar_adsi_medium').removeClass('navbar_adsi_full');
        } else {
            $('.navbar_adsi').addClass('navbar_adsi_full').removeClass('navbar_adsi_medium');
        }
    }
}

function areas() {
    // AJAX call for autocomplete
    $(document).ready(function () {


        // efx on doc readu out
        $(".autocomp").keyup(function () {
            var urlbox = $(this).data('urlbox');
            var lan = $(this).data('lan');
            var keyword = $(this).data('keyword');
            var suggbox = $(this).data('box');
            if ($(this).val().length > 2) {
                $.ajax({
                    type: "GET",
                    url: urlbox,
                    data: keyword + '=' + $(this).val() + '&lan=' + lan,
                    beforeSend: function () {

                    },
                    success: function (data) {
                        $(suggbox).show();
                        $(suggbox).html(data);
                    }
                });
            }
        });
        //To select name

        $("body").on('click', '.suggest-box ul li', function () {
            var val = $(this).data('value');
            var input = $(this).parent().parent().data('input');
            $(input).val(val);
            var ref = $(input).attr('id');
            $(".suggest-box").hide();
            console.log(ref);
            $("i[data-ref='#" + ref + "']").trigger("click");
        });

        $("body").click(function (event) {
            if (event.target.class != "suggest-box") {
                $(".suggest-box").hide();
            }
        });
    });
}



// custom scroll to element
$("body").on('click', '.scroll-to', function (e) {

    // prevent default anchor click behavior
    e.preventDefault();

    var target = $(this).data('target');
    var scrolllen = $(target).offset().top + 100;
    // animate
    $('html, body').animate({
        scrollTop: scrolllen
    }, 500, function () {

        // when done, add hash to url
        // (default click behaviour)
        window.location.hash = target;
    });

});

// custom scroll to element
$("body").on('click', '.line-candidati', function (e) {
    let numax = parseInt($('#numvoto').data('num'));
    if ($(this).hasClass("selected")) {
        $(this).toggleClass("selected");
    } else {
        if ($('.line-candidati.selected').length == numax) {
            alert('hai raggiunto il numero massimo di preferenze');
        } else {
            $(this).toggleClass("selected");
        }
    }
    let cand;
    $('#candidatilist').html('');
    $('#candidatilistdelegate').html('');
    $(".line-candidati.selected").each(function () {
        cand = '<input name="fields[candidati][]" id="candidati" type="hidden" value="' + $(this).data("ref") + '"/>'
        $('#candidatilist').append(cand);
        $('#candidatilistdelegate').append(cand);
    });

});

// delegate vote
$("body").on('click', '.votedelegante', function (e) {
    let ref = $(this).data('ref');
    let valvoto = $('#codevoto').val();
    valvoto = valvoto + ref;
    $('#codevoto').val(valvoto);
    $('#submitdelegate').data('member', ref);
});

$("body").on('click', '.add_voto', function (e) {
    e.preventDefault();

    var now = new Date();
    var strDateTime = [[AddZero(now.getDate()),
    AddZero(now.getMonth() + 1),
    now.getFullYear()].join("/"),
    [AddZero(now.getHours()),
    AddZero(now.getMinutes())].join(":"),
    now.getHours() >= 12 ? "PM" : "AM"].join(" ");
    $('#datavoto').val(strDateTime);
    let member = $(this).data('member');
    let vota = $(this).data('vota');
    $.post('https://www.associazionedimorestoricheitaliane.it/action-candidati/', { "fields[member]": member, "fields[votazione]": vota, "fields[data]": strDateTime, "action[add-votante]": "submit" }, function (data) {
        $('#addvoto').submit();
    }).fail(function () {
        $('#negativeText').html('Errore nella votazione, riprova');
        $('#alertMessage').modal('show');
    });
});

$("body").on('click', '.add_voto_delegate', function (e) {
    e.preventDefault();

    var now = new Date();
    var strDateTime = [[AddZero(now.getDate()),
    AddZero(now.getMonth() + 1),
    now.getFullYear()].join("/"),
    [AddZero(now.getHours()),
    AddZero(now.getMinutes())].join(":"),
    now.getHours() >= 12 ? "PM" : "AM"].join(" ");
    $('#datavotodelegate').val(strDateTime);
    let member = $(this).data('member');
    let vota = $(this).data('vota');
    $.post('https://www.associazionedimorestoricheitaliane.it/action-candidati/', { "fields[member]": member, "fields[votazione]": vota, "fields[data]": strDateTime, "action[add-votante]": "submit" }, function (data) {
        $('#addvotodelegate').submit();
    }).fail(function () {
        $('#negativeText').html('Errore nella votazione, riprova');
        $('#alertMessage').modal('show');
    });
});

function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}


//custom dashboard click
// $("body").on('click', '.nav-dash-custom', function(){
// 	$('.nav-dash').removeClass('active');
// 	var idTarget = $(this).attr('href');
// 	var idArea = $(this).attr('data-next');
// 	var idbuttonnext = idTarget + '-tab';
// 	$(idbuttonnext).addClass('active');
// 	$('.tab-dash').removeClass('show');
// 	$('.tab-dash').hide();
// 	$(idTarget).show();
// 	$(idTarget).addClass('show');
// 	if (idTarget != '#v-pills-pagamento') {
// 		$('#nextstep').show();
// 		$('#nextstep').attr('href',idArea);
// 	} else {
// 		$('#nextstep').hide();
// 	}
// 	scroll_to('checkoutBlock');
// });

// $("body").on('click', '.nav-dash', function(){
// 	$('.nav-dash').removeClass('active');
// 	$(this).addClass('active');
// 	var idTarget = $(this).attr('href');
// 	var idArea = $(this).attr('data-next');
// 	$('.tab-dash').removeClass('show');
// 	$('.tab-dash').hide();
// 	$(idTarget).show();
// 	$(idTarget).addClass('show');
// 	if (idArea != 'out') {
// 		$('#nextstep').show();
// 		$('#nextstep').attr('href',idArea);
// 	} else {
// 		$('#nextstep').hide();
// 	}
// });


//scroll to id with class
$("body").on('click', '.scroll_to', function () {
    var idtoscroll = $(this).attr('data-scroll');
    scroll_to(idtoscroll);
});

//funzione scroll to
function scroll_to(id) {
    $('html,body').animate({
        scrollTop: $('#' + id).offset().top - 100
    }, 'slow');
}

// dismiss toggleClass

$('.dismiss_toggle').click(function () {
    $('.dismiss_toggle').toggleClass("fa-minus fa-plus");
});

$('.lista_ordini').click(function () {
    $(this).children().children('.dismiss_toggle_prenotazioni').toggleClass("fa-minus-circle fa-plus-circle");
});

function gridrefresh() {
    /* init Masonry

    var $grid = $('.grid').masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer',
      percentPosition: true,
      horizontalOrder: true
    });

    $grid.imagesLoaded().progress( function() {
      $grid.masonry();
    });
    */
}

//click on element to show other
$("body").on('click', '.showelem', function () {
    event.preventDefault();
    var elem = $(this).attr('data-ref');
    var elemhide = $(this).attr('data-hide');
    $('.' + elemhide).hide();
    $('.' + elem).show();
});

$("body").on('click', '.showelem-scroll', function () {
    event.preventDefault();
    var elem = $(this).attr('data-ref');
    var elemhide = $(this).attr('data-hide');
    $('.' + elemhide).hide();
    $('.' + elem).show();
    var target = $(this).data('target');
    var scrolllen = $(target).offset().top - 100;
    // animate
    $('html, body').animate({
        scrollTop: scrolllen
    }, 500, function () {

        // when done, add hash to url
        // (default click behaviour)
        window.location.hash = target;
    });
});

function videoimg() {
    var heightwin = $(window).height();
    var widthwin = $(window).width();
    if (heightwin >= widthwin) {
        $('#bg-video').style('height', '100%', 'important');
        $('#bg-video').style('width', 'auto', 'important');
    } else {
        $('#bg-video').style('width', 'auto', 'important');
        $('#bg-video').style('height', '150%', 'important');
    }
}





$(document).ready(function () {

    // efx on doc ready  in

    $(".fx_matrix_doc_ready").css({
        transform: " matrix(1, 0, 0, 1, 0, 0)",
        opacity: 1
    });

    /*Dropdown Menu*/
    $('.dropdown-cust').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.dropdown-cust').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });
    $('.dropdown-cust .dropdown-menu li').click(function () {
        $(this).parents('.dropdown-cust').find('span').text($(this).text());
        var elem = '#comp' + $(this).attr('id');
        $('.product_line_elemnone').css('display', 'none');
        $(elem).css('display', 'flex');

    });
    /*End Dropdown Menu*/

    /* background change */
    $(".changeBack").on("mouseover", function () {
        var imageUrl = $(this).data('bg');
        $(".areas-container").css('background-image', 'url(' + imageUrl + ')');
    });

    /*change icons on accordion*/
    $(".collapse.show").each(function () {
        $(this).prev(".card-header").find(".fas").addClass("fa-angle-down").removeClass("fa-angle-up");
    });

    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function () {
        $(this).prev(".card-header").find(".fas").removeClass("fa-angle-up").addClass("fa-angle-down");
    }).on('hide.bs.collapse', function () {
        $(this).prev(".card-header").find(".fas").removeClass("fa-angle-down").addClass("fa-angle-up");
    });

    // $("body").on('click', '.registrati_login', function(){
    // $('#login').modal('hide');
    // $('#login_user').modal('hide');
    // $('#login_intro').modal('hide');
    // });

    // $("body").on('click', '.gotologin', function(e){
    // e.preventDefault();
    // $('#login_intro').modal('show');
    // });

    // $("body").on('click', '.rec_pw', function(){
    // $('#login').modal('hide');
    // $('#login_user').modal('hide');
    // $('#login_intro').modal('hide');
    // });

    // $("body").on('click', '.gotologinuser', function(e){
    // e.preventDefault();
    // $('#login_user').modal('show');
    // });

    //per tutti gli elementi che caricano html da pagine esterne, classe .from_url
    $('.from_url').each(function () {
        var urldest = $(this).attr('data-url');
        var elem = $(this);
        htmltodiv(elem, urldest);
    });

    //per tutti gli elementi che caricano html da pagine esterne onclick, classe .fromurl_todiv
    $("body").on('click', '.fromurl_todiv', function () {
        var urldest = $(this).attr('data-url');
        var elemid = $(this).attr('data-elem');
        var elem = $(elemid);
        htmltodiv(elem, urldest);
    });

    // search abstract ajax
    $('.gotoAction').click(function () {
        var ref = $(this).data('ref');
        var value = $(ref).val();
        var url = $(ref).data('url') + value;
        var dest = $(this).data('dest');
        $.ajax({
            type: "GET",
            url: url,
            dataType: 'html',
            success: function (data) {
                $(dest).html(data);
                gridrefresh();
                //success();
            },
            error: function (request, status, error) {
                //error();
            }
        });
    });

    // aggiungi al carrello una voce
    $("body").on('click', '.addtobasket', function () {
        var elem = $(this);
        if (($('#checkship').attr('data-order') == 0) && ($('#addorder').attr('data-exec') != 'done')) {

            $.when(ajaxcall($('#addorder'), $('#addorder').attr('data-url'), 'no', 'errore')).done(function (result) {
                if (result) {
                    var resultid = result.split(']');
                    $('.product_line_all').attr('data-order', resultid[0]);
                    addprodtobasket(elem);

                }
            });

        } else {
            addprodtobasket(elem);
        }
    });

    //delete prod from basket
    $("body").on('click', '.delete_prod', function () {
        event.preventDefault();

        var elem = $(this).attr('data-ref');
        var prod = $(this).attr('data-prod');
        $('.' + prod).slideToggle("slow");
        $.when(ajaxcall($('.' + elem), $('.' + elem).attr('data-url'), $('.' + elem).attr('data-msg1'), $('.' + elem).attr('data-msg2'))).done(function (result) {
            if (result) {
                htmltodiv($('.right_checkout_1'), $('.right_checkout_1').attr('data-url'));
            }
        });
    });

    // aggiorna la spedizione
    $("body").on('click', '.updelivery', function (event) {
        event.preventDefault();
        $(this).prop('disabled', true);
        $(this).text('wait...');
        var elem = $(this).attr('data-ref');
        $.when(ajaxcall($('.' + elem), $('.' + elem).attr('data-url'), $('.' + elem).attr('data-msg1'), $('.' + elem).attr('data-msg2'))).done(function (result) {
            if (result) {
                htmltodiv($('.checkout_2'), $('.checkout_2').attr('data-url'));
            }
        });
    });

    // aggiorna la quantità
    $("body").on('change', '.quantita', function () {
        var ref = $(this).attr('data-ref');
        $('.aggiorna' + ref).show();
    });

    // aggiorna al carrello una quantità
    $("body").on('click', '.uptobasket', function (event) {
        event.preventDefault();
        var elem = $(this).attr('data-ref');
        $.when(ajaxcall($('.' + elem), $('.' + elem).attr('data-url'), $('.' + elem).attr('data-msg1'), $('.' + elem).attr('data-msg2'))).done(function (result) {
            if (result) {
                htmltodiv($('.checkout_1'), $('.checkout_1').attr('data-url'));
                htmltodiv($('.right_checkout_1'), $('.right_checkout_1').attr('data-url'));
            }
        });
    });

    // aggiorna al carrello una quantità
    $("body").on('click', '.paybon', function (event) {
        event.preventDefault();
        $(this).prop('disabled', true);
        $(this).text('wait...');
        var msgok = $(this).data('ok');
        var msgfail = $(this).data('fail');
        var amount = parseInt($('#sommario').data('check1') * 100);
        var spedition = $('#sommario').data('check3');
        var totalitem = $('#sommario').data('check4');
        $('#shop-total').val(totalitem);
        $('#shop-spedition').val(spedition);
        $('#shop-success').val('waiting');
        $('#shop-status').val('waiting');

        var url = rootstripe + "/action/";
        $.ajax({
            type: "POST",
            url: url,
            data: $("#formshop").serialize(),
            success: function (data) {
                $('.paybon').text(msgok);
            },
            error: function (data) {
                $('.paybon').text(msgfail);
            }

        })
    });

    //change pass click
    $("body").on('click', '.changepass', function () {
        $(this).hide();
        var htmlpass = "<div class='form_row_wrapper row mb-4 pb-3'><div class='form-floating col-12 col-lg-6 mb-4 mb-lg-0 pe-0 pe-lg-2'><input name='fields[password][password]' id='Password1' type='Password' placeholder='Password*' class='form-control' minlength='6'/><label for='Password1'>Password*</label></div><div class='form-floating col-12 col-lg-6 ps-0 ps-lg-2'><input name='fields[password][confirm]' type='password' id='Retype-password' placeholder='Retype password*' class='form-control' /><label for='Retype-password'>Retype password*</label></div></div>";
        $(".passhere").html(htmlpass);
    });

    //per tutti i form che vengono serializzati in ajax al click e poi chiamata ajax
    $("body").on('click', '.serializeandhtml', function () {
        event.preventDefault();
        var elem = $(this).attr('data-ref'); // elemento su cui fare ajax su html
        var formref = $(this).attr('data-form'); // forma di riferimento al submit
        $.when(ajaxcall($('.' + formref), $(this).attr('data-url'), $(this).attr('data-msg1'), $(this).attr('data-msg2'))).done(function (result) {
            if (result) {
                htmltodiv($('.' + elem), $(this).attr('data-urlaction'));
            }
        });
    });

    //se esistono specifiche, abilita
    $(document).on('keyup', '.specall', function () {
        var $input = $(this);
        var ref = $input.attr('data-ref');
        var allspec = 0;
        $('.specall').each(function () {
            if (!$(this).val()) {
                allspec = 0;
            } else {
                allspec += 1;
            }
        })
        if (allspec == 3) {
            $(ref).prop('disabled', false);
        } else {
            $(ref).prop('disabled', true);
        }
    });
});

// funzione di chiamata ajax astratta sulla action.xsl
function ajaxcall(formid, formurl, messagesuccess, messageerror) {
    var url = formurl;
    return $.ajax({
        type: "POST",
        url: url,
        data: formid.serialize(),
        beforeSend: function () {

        },
        success: function (data) {
            formid.attr('data-exec', 'done');
            if (messagesuccess != 'no') {
                $('#positiveText').html(messagesuccess);
                $('#positiveMessage').modal('show');
            }
        },
        error: function (data) {
            if (messageerror != 'no') {
                $('#negativeText').html(messageerror);
                $('#alertMessage').modal('show');
            }
        }

    })
}

// funzione di chiamata specifica di aggiunta prodotto al carrello, bottone add basket
function addprodtobasket(elem) {

    var refid = elem.attr('data-refid');
    var refdisponibility = elem.attr('data-ref');
    var refprod = elem.attr('data-prod');
    var idorder = elem.attr('data-order');
    refqty = $("#qty" + refid).val();
    var refspec = '';
    $('.specall').each(function () {
        if (!$(this).val()) {

        } else {
            refspec = refspec + $(this).data('text') + ": " + $(this).val() + " - ";
        }
    })
    var refprice = elem.attr('data-price');
    $.post($('#checkship').attr('data-url'), { "fields[qty]": refqty, "fields[price]": refprice, "fields[order]": idorder, "fields[product]": refprod, "fields[specific]": refspec, "action[add-order-detail]": "submit" }, function (data) {
        $('.shoppingIcon').css('color', '#cc405e');
        $('.nobasket' + refid).hide();
        $('.alreadybasket' + refid).show();
    }).fail(function () {
        $('#negativeText').html('error on update');
        $('#alertMessage').modal('show');
    });
}

// funzione astratta GET html to div ALERT da cambiare path immagine
function htmltodiv(elem, urldest) {
    var url = urldest;
    var loading = '<img src="https://www.associazionedimorestoricheitaliane.it/workspace/static/bootstrap/images/originaloading.gif" style="margin: 0% 33%;width: 100px;"/>'
    $.ajax({
        url: url,
        beforeSend: function () {
            elem.html(loading);
        },
        success: function (data) {
            elem.html(data);
            selectimage();
            gridrefresh();
            buttonbasket();
        },
        error: function (data) {
            $('#negativeText').html('loading error ' + url);
            $('#alertMessage').modal('show');
        }
    });
}

function selectimage() {
    // select input phone flags

    var langArray = [];
    $('.vodiapicker option').each(function () {
        var img = $(this).attr("data-thumbnail");
        var text = this.innerText;
        var value = $(this).val();
        var item = '<li><img src="' + img + '" alt="" value="' + value + '"/><span>' + text + '</span></li>';
        langArray.push(item);
    })
    $('#a').html(langArray);

    //Set the button value to the first el of the array
    $('.btn-select').html(langArray[0]);
    $('.btn-select').attr('value', 'en');

    //change button stuff on click
    $('#a li').click(function () {
        var img = $(this).find('img').attr("src");
        var value = $(this).find('img').attr('value');
        var text = this.innerText;
        var item = '<li><img src="' + img + '" alt="" /><span>' + text + '</span></li>';
        $('.btn-select').html(item);
        $('.btn-select').attr('value', value);
        $(".b").toggle();
    });

    $(".btn-select").click(function () {
        $(".b").toggle();
    });

    //check local storage for the lang
    var sessionLang = localStorage.getItem('lang');
    if (sessionLang) {
        //find an item with value of sessionLang
        var langIndex = langArray.indexOf(sessionLang);
        $('.btn-select').html(langArray[langIndex]);
        $('.btn-select').attr('value', sessionLang);
    } else {
        var langIndex = langArray.indexOf('ch');
        $('.btn-select').html(langArray[langIndex]);
        //$('.btn-select').attr('value', 'en');
    }


}


// function general
function generalfunction() {
    // class management on image
    var heightwin = $(window).height();
    var widthwin = $(window).width();
    if (heightwin >= widthwin) {
        $(".image_article").css('max-height', heightwin);
        $(".image_article").css('width', '100%');
        $(".image_article").css('height', 'auto');
    } else {
        $(".image_article").css('max-height', heightwin);
        $(".image_article").css('max-width', '100%');
        $(".image_article").css('width', 'auto');
    }
}



// check element is visible in window
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

// image preview on class input .thumb with ref image
$("body").on('change', '.thumb', function () {
    let ref = $(this).data('ref');
    if (typeof (FileReader) != "undefined") {
        var dvPreview = $(ref);
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
        $($(this)[0].files).each(function () {
            var file = $(this);
            if (regex.test(file[0].name.toLowerCase())) {
                var reader = new FileReader();
                reader.onload = function (e) {

                    dvPreview.css('background-image', 'url(' + e.target.result + ')');
                }
                reader.readAsDataURL(file[0]);
            } else {
                alertify.alert(file[0].name + " is not a valid image file.");
                return false;
            }
        });
    } else {
        alertify.alert("This browser does not support HTML5 FileReader.");
    }
});

function photopreview(upload, preview) {

}
// upload preview on class input .upload
$(document).on('click', '.save_profile', function (e) {
    e.preventDefault();
    let ref = $(this).data('ref');
    let refform = $(this).data('form');
    $(this).prop("disabled", true);
    if (document.getElementById(ref).files.length == 0) {
        $('#' + ref).remove();
    }
    $('#' + refform + ' .upload').each(function () {
        if ($(this).get(0).files.length == 0) {
            $(this).remove();
        }
    });
    $('#' + refform).submit();
});


//!IMPORTANT STYLE FUNCTION
(function ($) {
    if ($.fn.style) {
        return;
    }

    // Escape regex chars with \
    var escape = function (text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    // For those who need them (< IE 9), add support for CSS functions
    var isStyleFuncSupported = !!CSSStyleDeclaration.prototype.getPropertyValue;
    if (!isStyleFuncSupported) {
        CSSStyleDeclaration.prototype.getPropertyValue = function (a) {
            return this.getAttribute(a);
        };
        CSSStyleDeclaration.prototype.setProperty = function (styleName, value, priority) {
            this.setAttribute(styleName, value);
            var priority = typeof priority != 'undefined' ? priority : '';
            if (priority != '') {
                // Add priority manually
                var rule = new RegExp(escape(styleName) + '\\s*:\\s*' + escape(value) +
                    '(\\s*;)?', 'gmi');
                this.cssText =
                    this.cssText.replace(rule, styleName + ': ' + value + ' !' + priority + ';');
            }
        };
        CSSStyleDeclaration.prototype.removeProperty = function (a) {
            return this.removeAttribute(a);
        };
        CSSStyleDeclaration.prototype.getPropertyPriority = function (styleName) {
            var rule = new RegExp(escape(styleName) + '\\s*:\\s*[^\\s]*\\s*!important(\\s*;)?',
                'gmi');
            return rule.test(this.cssText) ? 'important' : '';
        }
    }

    // The style function
    $.fn.style = function (styleName, value, priority) {
        // DOM node
        var node = this.get(0);
        // Ensure we have a DOM node
        if (typeof node == 'undefined') {
            return this;
        }
        // CSSStyleDeclaration
        var style = this.get(0).style;
        // Getter/Setter
        if (typeof styleName != 'undefined') {
            if (typeof value != 'undefined') {
                // Set style property
                priority = typeof priority != 'undefined' ? priority : '';
                style.setProperty(styleName, value, priority);
                return this;
            } else {
                // Get style property
                return style.getPropertyValue(styleName);
            }
        } else {
            // Get CSSStyleDeclaration
            return style;
        }
    };
})(jQuery);
