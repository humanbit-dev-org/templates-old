let step = 0;
let id_global;
let ids_global;
let url_global;
let elem_global;
let source;

function init(id, ids, url, elem){
    id_global = id;
    ids_global = ids;
    url_global = url;
    elem_global = elem;
}

function addNotification(form, memberids, redirect){
    let ids = memberids.split(',');
    let cont = 0;
    do {
        $(form).find('input[name="fields[member]"]').val(ids[cont]);
        let data = $(form).serialize();
        $.ajax({ 
            type: 'post',
            data: data,
            success: function (data) {
            },
            error: function(data) {
            }
        });
        cont++;
    } while (cont < ids.length);
    window.location.replace(redirect);
};

function checkHolidays(calendar_month, class_name){
    let month_array = ["01",'02','03','04','05','06','07','08','09','10','11','12'];
    let holidays_array = ['01,06', '21', '', '09,10,25', '01', '02', '', '15', '', '', '01', '08,25,26'];
    for(i=0;i<month_array.length;i++){
        let month = '' + month_array[i];
        if(month === calendar_month){
            month_holidays_array = holidays_array[i].split(',');
            $(class_name).find('time').each(function(){
                let button = $(this).parent();
                let day = '' + $(this).text();
                for(y=0;y<month_holidays_array.length;y++){
                    let month_holidays_day = '' + month_holidays_array[y];
                    if(day === month_holidays_day){
                        $(button).addClass('opacity-50 pe-none');
                    }
                }
            });
        }
    }
}

function scrollTimeline(ref, partial_class){
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

    source = new EventSource('../../../service/chat/chat.php?id=' + id_global + '&ids=' + ids_global);
    
    source.onmessage = function(event) {
        let jsonData = Object.values(JSON.parse(event.data));
        let id = jsonData[0];
        let count = jsonData[1];
        let url_action = url_global + id;
        let elem_action = $(elem_global+id);
        $(elem_global+id).closest('.tab-pane').find('.no_message').addClass('d-none');
        htmltodiv(elem_action,url_action,false);
    };

    source.onerror = function(event) {
        console.log(event);
    }

    $('.upload_file').on('click', function(){
        let form = $(this).data('form');
        let input = $(this).data('input');
        let preview = $(this).data('img');
        $(form).find('input[name="' + input + '"]').click();
        $(form).find('input[name="' + input + '"]').on('change', function(e){
            $(preview).removeClass('d-none');
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = function (e) {
                $(preview).attr('src', e.target.result);
            }
            reader.readAsDataURL(file);
        });
    });

    $(".chat_text_input").on('input', function() {
        let this_message = $(this);
        let form = $(this_message).data('form');
        var placeholders = ['Meglio 100 piegamenti o un task di ADSI?', 'Ho delle idee per migliorare il template!','Mezza giornata?', 'Ricordati della riunione alle 12.00, mi raccomando...', 'Mi mandi i codici colori?', 'Oggi quale cliente insultiamo?'];
        if($(this_message).val() === ''){
            r = Math.floor(Math.random() * placeholders.length);
            $(this_message).attr('style', '');
            $(this_message).prop('placeholder', placeholders[r]);
            $(form).find('.send_message_button').addClass('pe-none opacity-50');
        } else {
            var scroll_height = $(this_message).get(0).scrollHeight;
            console.log($(this_message).val());
            $(this_message).css('height', scroll_height + 'px');
            if($(this_message).val().trim() != ''){
                $(form).find('.send_message_button').removeClass('pe-none opacity-50');
            }
        }
        
    });

    $('.chat_text_input').keypress(function (e) {
        let this_message = $(this);
        let form = $(this_message).data('form');
        if($(this_message).val().trim() != ''){
            if (e.which == 13) {
                if (!(e.shiftKey)) {
                    $(form).find('.send_message_button').click();
                    return false;
                }
            }
        }
    });

    $("body").on('click', '.btn_add_project, .send_message_button', function(e){
        let form = $(this).data('form');
        $(form).find('.send_message_button').prop('disabled', true);
        let url = $(this).data('url');
        let elemid = $(this).data('elem');
        let data = $(form).serialize();
        let elem = $(elemid);
        if($(form)[0].checkValidity()){
            ajaxtodiv(elem,data,url,false);
            $('#addProjectModal').modal('hide');
            $(form).find('.chat_text_input').val('');
            $(form).find('.chat_text_input').attr('style', '');
            $(form).find('.send_message_button').addClass('pe-none opacity-50');
            $(form).find('.send_message_button').prop('disabled', false);
            $(elemid).closest('.tab-pane').find('.no_message').addClass('d-none');
        } else {
            $(form)[0].reportValidity();
        }
        
    });

    $("body").on('change', '.projects_select', function(){
        let elemid = $(this).data('elem');
        let url = $(this).data('url');
        let val = $(this).val();
        url = url + val;
        let elem = $(elemid);
        htmltodiv(elem,url,false);
    });

    $("body").on('click', '.read_notification', function(){
        let form = $(this).data('form');
        let data = $(form).serialize();
        $.ajax({ 
            type: 'post',
            data: data,
            success: function (data) {
            },
            error: function(data) {
            }
        });
    });

    $("body").on('click', '.notifications, .close_notifications, .chat_button, .close_chat', function(){
        let box = $(this).data('box');
        $(box).toggleClass('active');
    });

    $("body").on('click', '.nav_calendar', function(){
        let btn_step = $(this).data('button');
        $(btn_step).attr('style', 'pointer-events: none; opacity: 0.5;');
        let urlcalendar = $(this).data('url-calendar');
        let urlmonth = $(this).data('url-month');
        let monthid = $(this).data('month');
        let month = $(monthid);
        let month_val = Number($(monthid).attr('data-value'));
        let year_val = Number($(monthid).attr('data-year'));
        let elemid = $(this).data('elem');
        let elem = $(elemid);
        if($(this).hasClass('prev_cal')){
            if(month_val === 1){
                month_val = 12;
                year_val = year_val - 1;
            } else {
                month_val = month_val - 1;
                if(month_val < 10){
                    month_val = '0' + month_val;
                }
            }
        } else {
            if(month_val === 12){
                month_val = '01';
                year_val = year_val + 1;
            } else {
                month_val = month_val + 1;
                if(month_val < 10){
                    month_val = '0' + month_val;
                }
            }
        }
        $(monthid).attr('data-year', year_val);
        $(monthid).attr('data-value', month_val);
        urlcalendar = urlcalendar + '&year=' + year_val + '&month=' + month_val;
        urlmonth = urlmonth + '&year=' + year_val + '&month=' + month_val;
        htmltodiv(month,urlmonth, false);
        htmltodiv(elem,urlcalendar,false);
    });

    let popup_start = 0;
    let popup_end = 0;
    let popup_start_index = 0;

    $('body').on('click', '.btn_date_hour', function(){
        //$('.btn_date_hour').removeClass('active');
        $(this).addClass('active').addClass('pe-none');
        let button = $(this).data('button');
        let val = $(this).find('time').text();
        let input_hour = $(this).data('ref');
        if((popup_start === 1) && (popup_end === 0)){
            let popup_action_end_first = $(this).find('.popup_action_end_first');
            let popup_action_end_second = $(this).find('.popup_action_end_second');
            if($(popup_action_end_first).length > 0){
                $(popup_action_end_first).removeClass('popup_action_end_first').addClass('popup_action_end_first_active');
            }
            if($(popup_action_end_second).length > 0){
                $(popup_action_end_second).removeClass('popup_action_end_second').addClass('popup_action_end_second_active');
            }
            popup_end = 1;
            $('.popup_action_end_first').removeClass('popup_action_end_first');
            $('.popup_action_end_second').removeClass('popup_action_end_second');
            let count = $('.btn_date_hour').length;
            let index = $(this).index();
            while (count > index) {
                $('.btn_date_hour').eq(count).attr('style', 'pointer-events:none;opacity:0.5;');
                count--;
            }
            $(button).attr('style', '');
            $(input_hour).val($(input_hour).val() + '-' + val);
            while (popup_start_index < index) {
                $('.btn_date_hour').eq(popup_start_index).addClass('pe-none active');
                popup_start_index++;
            }
        } else if(popup_start === 0){
            let popup_action_start_first = $(this).find('.popup_action_start_first');
            let popup_action_start_second = $(this).find('.popup_action_start_second');
            if($(popup_action_start_first).length > 0){
                $(popup_action_start_first).removeClass('popup_action_start_first').addClass('popup_action_start_first_active');
            }
            if($(popup_action_start_second).length > 0){
                $(popup_action_start_second).removeClass('popup_action_start_second').addClass('popup_action_start_second_active');
            }
            popup_start = 1;
            $('.popup_action_start_first').removeClass('popup_action_start_first');
            $('.popup_action_start_second').removeClass('popup_action_start_second');
            $('.popup_action_end_first, .popup_action_end_second').removeClass('d-none');
            let index = $(this).index();
            popup_start_index = index;
            let count = 0;
            while (count < index) {
                $('.btn_date_hour').eq(count).attr('style', 'pointer-events:none;opacity:0.5;');
                count++;
            }
            $(input_hour).val(val);
        }
    });

    $('body').on('click', '.btn_date_day', function(){
        popup_start = 0;
        popup_end = 0;
        popup_start_index = 0;
        $('.btn_date_day').removeClass('active');
        $(this).addClass('active');
        let btn_step = $(this).data('button');
        $(btn_step).attr('style', '');
        let month_button = $(this).data('month-name');
        let month_name = $(month_button).text();
        let month_label = $(this).data('month-label');
        let ref_day = $(this).data('ref-day');
        let ref_month = $(this).data('ref-month');
        let ref_year = $(this).data('ref-year');
        let ref_date = $(this).data('ref-date');
        let val_month = $(this).data('val-month');
        let val_year = $(this).data('val-year');
        let day = $(this).text();
        $(month_label).text(day + ' ' + month_name);
        if(Number(val_month) < 10){
            val_month = '0' + val_month;
        }
        let date = val_year + '/' + val_month + '/' + day;
        $(ref_day).val(day);
        $(ref_month).val(val_month);
        $(ref_year).val(val_year);
        $(ref_date).val(date);
        let url = $(this).data('url');
        let elem = $(this).data('elem');
        urldest = url + '&year=' + val_year + '&month=' + val_month + '&day=' + day + '&date=' + val_year + '/' + val_month + '/' + day;
        elemid = $(elem);
        htmltodiv(elemid,urldest,false);
    })

    $("body").on('click', '.scrollcalendar', function(){
        $('.timeline_partial').attr('style', 'width:200vw;margin-top:6rem;');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        let ref = $(this).data('hb-page');
        scrollTimeline(ref, '.timeline_partial');
    });

    $("body").on('click', '.backcalendar', function(){
        $('.timeline_partial').attr('style', 'width:200vw;margin-top:6rem;height: 80rem;overflow: hidden;"');
        $('.btn_date, .btn_date_hour').removeClass('active');
        $('#hour_detail_div').html('');
        $('#btn_step_1, #btn_step_2').attr('style', 'opacity:0.5;pointer-events:none;');
    });

    ranNum = 0;

    $("body").on('click', '.member-button', function(){
        $(this).toggleClass('active');
        $(this).find('.member-check-icon').toggleClass('fa-regular fa-solid');
        let id = $(this).data('ref');
        let toggleButton = document.getElementById(id);
        toggleButton.checked = !toggleButton.checked
    });

    $("body").on('mouseenter', '.member-button', function(){
        ranNum = Math.ceil(Math.random() * 5) * (Math.round(Math.random()) ? 1 : -1);
        $(this).attr('style', 'transform:scale(1.08) rotateZ(' + ranNum + 'deg);');
    });

    $("body").on('mouseleave', '.member-button', function(){
        $(this).attr('style', '');
    });

    $("body").on('mouseleave', '.member-button', function(){
        $(this).attr('style', '');
    });

});