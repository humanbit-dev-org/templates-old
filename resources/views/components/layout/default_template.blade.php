<!DOCTYPE html>
<html lang="{{ $lan ?? "it" }}">
	<head>
		{{-- <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> --}}
		<meta name="viewport" content="height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi, shrink-to-fit=no" />

		<title>{{ $title ?? 'Humanbit Template - Laravel' }}</title>
		<meta name="description" content="{{ $description ?? 'Humanbit Template realizzato con Laravel' }}" />
		<meta property="og:url" content="{{ $url ?? '/' }}" />
		<meta property="og:type" content="{{ $ogType ?? 'Home' }}" />
		<meta property="og:title" content="{{ $ogTitle ?? 'Humanbit Template - Laravel' }}" />
		<meta property="og:description" content="{{ $ogDescription ?? 'Humanbit Template realizzato con Laravel' }}" />
		<meta property="og:image" content="{{ $ogImages ?? asset("images/logos/logo-humanbit-white.svg") }}" />

		{{-- Favicon --}}
		<link rel="apple-touch-icon" sizes="57x57" href="{{ asset("images/favicon/apple-icon-57x57.png")}}" />
		<link rel="apple-touch-icon" sizes="60x60" href="{{ asset("images/favicon/apple-icon-60x60.png")}}" />
		<link rel="apple-touch-icon" sizes="72x72" href="{{ asset("images/favicon/apple-icon-72x72.png")}}" />
		<link rel="apple-touch-icon" sizes="76x76" href="{{ asset("images/favicon/apple-icon-76x76.png")}}" />
		<link rel="apple-touch-icon" sizes="114x114" href="{{ asset("images/favicon/apple-icon-114x114.png")}}" />
		<link rel="apple-touch-icon" sizes="120x120" href="{{ asset("images/favicon/apple-icon-120x120.png")}}" />
		<link rel="apple-touch-icon" sizes="144x144" href="{{ asset("images/favicon/apple-icon-144x144.png")}}" />
		<link rel="apple-touch-icon" sizes="152x152" href="{{ asset("images/favicon/apple-icon-152x152.png")}}" />
		<link rel="apple-touch-icon" sizes="180x180" href="{{ asset("images/favicon/apple-icon-180x180.png")}}" />
		<link rel="icon" type="image/png" sizes="144x144" href="{{ asset("images/favicon/android-icon-144x144.png")}}" />
		<link rel="icon" type="image/png" sizes="192x192" href="{{ asset("images/favicon/android-icon-192x192.png")}}" />
		<link rel="icon" type="image/png" sizes="32x32" href="{{ asset("images/favicon/favicon-32x32.png")}}" />
		<link rel="icon" type="image/png" sizes="96x96" href="{{ asset("images/favicon/favicon-96x96.png")}}" />
		<link rel="icon" type="image/png" sizes="16x16" href="{{ asset("images/favicon/favicon-16x16.png")}}" />
		<link rel="manifest" href="{{ asset("images/favicon/manifest.json")}}" />
		<meta name="msapplication-TileColor" content="#ffffff" />
		<meta name="theme-color" content="#6a3075" />

		{{-- BOOTSTRAP CDN --}}
		{{-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" /> --}}

		{{-- CSS Loading --}}
		{{-- <link href="{$workspace}/static/css/bootstrap.min.css" rel="stylesheet" /> --}}
		{{-- <link href="{$workspace}/static/css/style_default.css" rel="stylesheet"/> --}}
		{{-- <link href="{$workspace}/static/css/mdb.min.css" rel="stylesheet"/> --}}
		{{-- <link href="{$workspace}/static/css/slick.css" rel="stylesheet" /> --}}
		<link href="{{ asset("bessex/css/bessex_humanbit.css?v5.2.3")}}" rel="stylesheet" />
		<link href="{{ asset("css/plugin.min.css")}}" rel="stylesheet" />
		{{-- FLAGS Loading --}}
		<link rel="stylesheet" href="{{ asset("service/intlTelInput/intlTelInput.min.css") }}"/>
		{{-- <link href="{$workspace}/static/css/style_gabriel.css" rel="stylesheet" /> --}}
		{{-- <link href="{$workspace}/static/css/style.css" rel="stylesheet" /> --}}
		{{-- <link href="{$workspace}/static/css/style_gabriel_all.css" rel="stylesheet" /> --}}
		{{-- <link href="{$workspace}/static/trumbowyg/dist/ui/trumbowyg.min.css" rel="stylesheet" /> --}}
		<link href="{{ asset("css/style.css")}}" rel="stylesheet" />
		<link href="{{ asset("css/klaro.css")}}" rel="stylesheet"/>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/css/flag-icons.min.css"/>
		{{-- google fonts (download and put them in utilities) --}}
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="crossorigin" />
		<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&amp;family=Roboto+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&amp;display=swap" rel="stylesheet" />
		{{-- <link href="{$workspace}/static/css/style.min.css" rel="stylesheet" /> --}}
		{{-- <link href="{$workspace}/static/css/bootstrap-boost_humanbit-ponzano.css" rel="stylesheet"/> --}}
		<link href="{{ asset("fonts/fontawesome-pro-6.0.0-beta2-web/css/all.min.css")}}" rel="stylesheet" />
		{{-- Custom styles for this template --}}
	</head>
	<body class="bg_color_white">
		<x-messages.flash/>
		{{-- <div class="preloader" id="preloader">
			<div class="loader">
				<hr class="hr_preloader" />
			</div>
		</div> --}}
		<div class="container_humanbit_overflow scrollbar_spacing" id="page">
			{{-- <button id="add-webapp" class="btnBgP text-center font-weight-bold mb-4 py-1 px-3 d-lg-none" style="top: 15%; position: fixed;">Scarica l'App!</button> --}}

			{{-- Caricamento del template della Navbar --}}
			@include("partials.navbar_modules.nav_slide.nav_slide_right")

			<div class="container_humanbit_structure container-fluid">
				{{ $slot }}
				<x-registration.login-modal/>
				<x-registration.register-modal :$lanurl/>
				<x-registration.forgot-modal/>
				{{-- <xsl:call-template name="login_modal" />
				<xsl:call-template name="newsletter_b2c_modal" /> --}}

				{{-- Caricamento del template dei Credits --}}
				{{-- <xsl:call-template name="modal_credits_module" /> --}}
			</div>

			{{-- Caricamento del template del Footer --}}
			@include("partials.footer_modules.footer_left_right")
		</div>

		{{-- Script Loading --}}
		{{-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script> --}}
		{{-- <script src="{$workspace}/static/bootstrap/dist/js/jquery-3.5.1.js"></script> --}}
		{{-- <script src="{$workspace}/static/bootstrap/dist/js/bootstrap.min.js"></script> --}}
		{{-- <script src="{$workspace}/static/bootstrap/dist/js/popper.min.js"></script> --}}
		{{-- <script src="{$workspace}/static/bootstrap/dist/js/mdb.min.js"></script> --}}
		{{-- <script src="{$workspace}/static/fonts/fontawesome-pro-6.0.0-beta2-web/js/all.min.js"></script> --}}
		<script src="{{ asset("js/plugin.min.js")}}"></script>
		<script src="{{ asset("js/main.js?v1.06")}}"></script>
		<script src="{{ asset("js/main_humanbit.js?v1.06")}}"></script>
		{{-- <script src="{$workspace}/static/js/html_text_editor_1.js"></script> --}}
		{{-- <script src="{$workspace}/static/js/html_text_editor_2.js"></script> --}}
		{{-- <script src="{$workspace}/static/js/html_text_editor_3.js"></script> --}}
		{{-- <script src="{$workspace}/static/trumbowyg/dist/trumbowyg.min.js"></script> --}}
		{{-- <script type="text/javascript" src="https://nibirumail.com/docs/scripts/nibirumail.cookie.min.js"></script> --}}
		<script src="{{ asset("js/slick_script.js")}}"></script>
		<script src="{{ asset("service/intlTelInput/intlTelInput.min.js")}}"></script>
		<script src="{{ asset("service/intlTelInput/utils.js")}}"></script>

		<script>
			$(document).ready(function (){
				var input = document.getElementsByClassName("prefix");
				if(input != null){
					let area_code_country = "{{ old("area-code-country") }}";
					iti = input.forEach(function(this_input) {
						if(area_code_country != ''){
							window.intlTelInput(this_input, {
								initialCountry: area_code_country,
								separateDialCode: "true",
								preferredCountries: "",
								autoPlaceholder: "off",
								customContainer: "form-floating",
							});
						} else {
							window.intlTelInput(this_input, {
								initialCountry: "auto",
								geoIpLookup: function(success, failure) {
								$.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
									var countryCode = (resp && resp.country) ? resp.country : "it";
									success(countryCode);
								});
								},
								separateDialCode: "true",
								preferredCountries: "",
								autoPlaceholder: "off",
								customContainer: "form-floating",
							});
						}
					});
					
					$('.iti__flag-container').attr('style', 'width:100%;');
					$('.iti').append('<label class="label_join small border-top-0 border-end-0 border-start-0" for="floatingCountry">{{__("auth.prefix")}}</label>');
				}
			});
		</script>
		@stack('scripts')
		{{-- <script src="{$workspace}/static/js/preloader.js" /> --}}

		{{-- Linetobe -> ignorare --}}
		{{-- <xsl:if test="($current-page = 'linetobe-test')">
			<script defer="defer" crossorigin="anonymous" src="https://www.linetobe.com/workspace/static/bootstrap/js/linetobe.js?idm=idm46723354096336"></script>
		</xsl:if> --}}

		{{-- SPID -> scommentare se necessario implementare autenticazione tramite SPID --}}
		{{-- <xsl:if test="($current-page = 'spid-test')">
			<script src="{$root}/service/spid/spid.min.js"></script>
			<script src="{$root}/service/spid/spid-request.js"></script>
			<link rel="stylesheet" href="{$root}/service/spid/spid.min.css" type="text/css" />
		</xsl:if> --}}

		{{-- Documentazione Humanbit -> sono contenuti gli script relativi alla mappa, ai grafici dinamici, alla formattazione del codice e delle notifiche push. Copiare al bisogno, altrimenti commentare --}}
		{{-- <xsl:if test="($current-page = 'humanbit-doc')">
			<script src="{$workspace}/static/js/echarts.min.js" />
			<script src="{$root}/documentation/js/echarts.js" />
			<script src="{$root}/documentation/js/codeStyler.js" />
			<script src="{$workspace}/static/js/push_notifications.js" />
		</xsl:if> --}}

		{{-- <xsl:if test="$current-page = 'map'">
			<link href="{$root}/service/leaflet/leaflet.css" rel="stylesheet"/>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw-src.css" integrity="sha512-vJfMKRRm4c4UupyPwGUZI8U651mSzbmmPgR3sdE3LcwBPsdGeARvUM5EcSTg34DK8YIRiIo+oJwNfZPMKEQyug==" crossorigin="anonymous" referrerpolicy="no-referrer" />
			<script src="{$root}/service/leaflet/leaflet.js"/>
			<script src="{$root}/service/leaflet/map.js"/>
			<script src='//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-image/v0.0.4/leaflet-image.js'></script>
			<link rel="stylesheet" href="//code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css"></link>
			<script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js" integrity="sha512-ozq8xQKq6urvuU6jNgkfqAmT7jKN2XumbrX1JiB3TnF7tI48DPI4Gy1GXKD/V3EExgAs1V+pRO7vwtS1LHg0Gw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
		</xsl:if> --}}
		{{-- Medium editor -> scommentare quando serve abilitare l'editor dei test da frontend --}}
		{{-- <xsl:if test="($current-page = 'post-editing')">
			<script src="{$workspace}/static/js/medium-editor.min.js"></script>
			<link rel="stylesheet" href="{$workspace}/static/css/medium-editor.min.css" type="text/css" media="screen" charset="utf-8" />
			<script>
				$(document).ready(function () {
					var editor = new MediumEditor('.editable', {
						toolbar: {
							/* These are the default options for the toolbar,
							if nothing is passed this is what is used */
							allowMultiParagraphSelection: true,
							buttons: ['bold', 'italic', 'underline'],
							diffLeft: 0,
							diffTop: -10,
							firstButtonClass: 'medium-editor-button-first',
							lastButtonClass: 'medium-editor-button-last',
							relativeContainer: null,
							standardizeSelectionStart: false,
							static: false,
							/* options which only apply when static is true */
							align: 'left',
							sticky: false,
							updateOnEmptySelection: false
						}
					});
				});
			</script>
		</xsl:if> --}}

		{{-- Slider Slick --}}
		{{-- <xsl:if test="($current-page = 'humanbit-doc') or ($current-page = 'index') or ($current-page = 'modules')">
			<script>
				<!-- slider-for-home -->
				sliderForHome();
				<!--  -->
				sliderForLarge();
				<!--  -->
				sliderForDimo();
				<!--  -->
				sliderFor();
			</script>
		</xsl:if> --}}

		{{-- Ecommerce functions --}}
		{{-- <xsl:if test="$current-page = 'timeline'">
			<link rel="preconnect" href="https://fonts.googleapis.com"/>
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="crossorigin"/>
			<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"/>
			<script src="{$workspace}/static/js/timeline.js?v1.0" />
			<script>checkHolidays('<xsl:value-of select="$this-month"/>', '.btn_date_day');</script>
			<xsl:if test="$url-notification = 'yes'">
				<script>addNotification('#timeline_notification', '<xsl:value-of select="translate($ds-timeline-last.member, ' ', '')"/>', '<xsl:value-of select="$root"/>/timeline');</script>
			</xsl:if>
			<script>init('<xsl:value-of select="$member-id"/>', '<xsl:value-of select="translate($ds-timeline-member-list, ' ', '')"/>', '<xsl:value-of select="$root"/>/timeline-action/?action=message&amp;member=', '#chat_');</script>
		</xsl:if> --}}
		{{-- <xsl:if test="$member-id != ''">
			<script>checkElemsInContainerInputs('elem', '.cart_product', '.change_size');</script>
			<script>checkCollapse('#optionCounter', '.btn_add_soluzione');</script>
			<xsl:if test="$current-page != 'checkout'">
				<script>checkCart('#optionCounter', '.cart_container', '.cart_product');</script>
			</xsl:if>
			<xsl:if test="($current-page = 'material') and (/data/material-detail/entry[size])">
				<script>selectFirstVal('#sizeGadget', '#form_add_soluzione', 'fields[additional-notes]');</script>
			</xsl:if>
			<xsl:if test="$current-page = 'profile'">
				<script>checkAddress('.address_list');</script>
			</xsl:if>
			<xsl:if test="$current-page = 'confirm-order'">
				<script>addDisponibility('#solution_items');</script>
			</xsl:if>
			<xsl:if test="$current-page = 'checkout'">
				<xsl:if test="$url-step = 2">
					<script>updateSpedPrice('.delivery_price');</script>
				</xsl:if>
			<script>checkCartCheckout('.cart_container', '.cart_product');</script>
			<script>updateSelectionCheckout('.select_address');</script>
			<script>checkAddress('.address_list', '.btn_checkout');</script>
			<script>countOrder('<xsl:value-of select="count(/data/member-order-open-detail/solution)"/>', '<xsl:value-of select="sum(/data/member-order-open-detail/solution/entry/price-tot)"/>');</script>
			</xsl:if>
			<xsl:if test="($current-page = 'confirm-order')">
				<script>submitForms('.confirm_order');</script>
				<script>fbq('track', 'Purchase', {value: 1.00, currency: 'USD'});</script>
			</xsl:if>
		</xsl:if> --}}

		{{-- Klaro Cookie Script --}}
		<script defer="defer" type="text/javascript" src="{{ asset("js/klaro_config.js")}}"></script>
		<script defer="defer" type="text/javascript" src="{{ asset("js/klaro.js")}}"></script>
		<script src="{{ asset("js/web-app.js")}}"></script>

		{{-- TIKTOK --}}
		{{-- <script>
			!function (w, d, t) {
			w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i&lt;ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n&lt;ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&amp;lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};

			ttq.load('CEHF0IBC77U8PGLVR0D0');
			ttq.page();
			}(window, document, 'ttq');
		</script> --}}
		{{-- slick slider --}}
		{{-- <xsl:if test="$current-page = 'index'">
			<script>
				sliderForHome();
			</script>
		</xsl:if> --}}
		{{-- mail forgot --}}

		{{-- Ecommerce Forms --}}
		{{-- <xsl:choose>

			Creazione ordine vuoto iniziale se non presente
			<xsl:when test="/data/member-order-open/error">
				<form id="member_start_order" method="post" action="{$current-url}/">
					<input name="xsrf" type="hidden" value="{$cookie-xsrf-token}" />
					<input name="fields[order-number]" type="hidden" value="{substring-after(generate-id(), 'idm')}"/>
					<input name="fields[member]" type="hidden" value="{$member-id}"/>
					<input name="fields[status]" type="hidden" value="open"/>
					<input name="fields[order-date]" type="hidden" value=""/>
					<input name="action[add-order]" type="hidden" value="submit"/>
				</form>
				<script>addOrder('#member_start_order');</script>
			</xsl:when>
			<xsl:otherwise>

				Aggiunta al carrello di un prodotto
				<form class="d-none" id="form_add_soluzione" method="post" action="{$current-url}/">
					<input name="xsrf" type="hidden" value="{$cookie-xsrf-token}" />
					<input name="fields[amount]" type="hidden" value="1"/>
					<input name="fields[price]" type="hidden" value=""/>
					<input name="fields[price-tot]" type="hidden" value=""/>
					<input name="fields[order]" type="hidden" value="{/data/member-order-open/entry/@id}"/>
					<input name="fields[solution]" type="hidden" value=""/>
					<input name="action[add-order-detail]" type="hidden" value="submit"/>
				</form>

				Cancellazione di un prodotto dal carrello
				<form class="d-none" id="form_delete_soluzione" method="post" action="{$current-url}/">
					<input name="xsrf" type="hidden" value="{$cookie-xsrf-token}" />
					<input name="id" type="hidden" value=""/>
					<input name="fields[deleted]" type="hidden" value="yes"/>
					<input name="action[add-order-detail]" type="hidden" value="submit"/>
				</form>

				Modifica di un prodotto nel carrello
				<form class="d-none" id="form_edit_soluzione" method="post" action="{$current-url}/">
					<input name="xsrf" type="hidden" value="{$cookie-xsrf-token}" />
					<input name="id" type="hidden" value=""/>
					<input name="fields[amount]" type="hidden" value=""/>
					<input name="fields[price]" type="hidden" value=""/>
					<input name="fields[price-tot]" type="hidden" value=""/>
					<input name="action[add-order-detail]" type="hidden" value="submit"/>
				</form>

				Form di modifica delle note aggiuntive di un prodotto nel carrello (taglie e altre info)
				<form class="d-none" id="form_edit_notes" method="post" action="{$current-url}/">
					<input name="xsrf" type="hidden" value="{$cookie-xsrf-token}" />
					<input name="id" type="hidden" value=""/>
					<input name="fields[additional-notes]" type="hidden" value=""/>
					<input name="action[add-order-detail]" type="hidden" value="submit"/>
				</form>
			</xsl:otherwise>
		</xsl:choose> --}}
		{{-- <xsl:choose>

			Modal di successo recupero password
			<xsl:when test="/data/events/members-generate-recovery-code/@result = 'success'">
				<script>
					var myModal = new bootstrap.Modal(document.getElementById('forgotSuccessModal'));
					myModal.show();
				</script>
			</xsl:when>

			Modal di errore recupero password
			<xsl:when test="/data/events/members-generate-recovery-code/@result = 'error'">
				<script>
					var myModal = new bootstrap.Modal(document.getElementById('forgotErrorModal'));
					myModal.show();
				</script>
			</xsl:when>

			Modal di cambio password
			<xsl:when test="$url-emailchange != ''">
				<script>
					var myModal = new bootstrap.Modal(document.getElementById('pwChangeModal'));
					myModal.show();
				</script>
			</xsl:when>
		</xsl:choose> --}}

		{{-- Modal di errore --}}
		{{-- <xsl:if test="((/data/events/*/@result = 'error') or (/data/events/@result = 'error')) and (not(/data/events/members-generate-recovery-code))">
			<script>
				var myModal = new bootstrap.Modal(document.getElementById('msgErrorModal'))
				myModal.show();
			</script>
		</xsl:if>

		Modal di successo
		<xsl:if test="(($url-change = 'yes') or (/data/events/*[local-name() != 'member-login-info']/@result = 'success') or (/data/events/@result = 'success')) and (not(/data/events/members-generate-recovery-code))">
			<script>
				var myModal = new bootstrap.Modal(document.getElementById('msgSuccessModal'))
				myModal.show();
			</script>
		</xsl:if>

		Modal di conferma ordine
		<xsl:if test="(($url-confirm = '1') and ($current-page = 'profile'))">
			<script>
				var myModal = new bootstrap.Modal(document.getElementById('msgSuccessModal'))
				myModal.show();
			</script>
		</xsl:if> --}}
	</body>
</html>
