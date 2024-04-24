// A reference to Stripe.js
var stripe;
var rootstripe = document.getElementById("imgstripe").getAttribute('data-root');
var orderData;
var spedition;
var totalitem;
$(document).ready(function () {
	var amount = parseInt($('#price_tot_checkout').data('price') * 100);
	var email = $('#price_tot_checkout').data('email');
	var spedition = $('#price_tot_checkout').data('spedition');
	var totalitem = $('#price_tot_checkout').data('items');
	orderData = {
	  currency: "eur",
	  amount: amount,
	  email: email
	};
	runpayment();
});

function runpayment() {
	// Disable the button until we have Stripe set up on the page
	document.querySelector(".sr button").disabled = true;

	fetch(rootstripe + "/stripe/stripe-key.php")
	  .then(function(result) {
		return result.json();
	  })
	  .then(function(data) {
		return setupElements(data);
	  })
	  .then(function({ stripe, card, clientSecret }) {
		document.querySelector(".sr button").disabled = false;
		var form = document.getElementById("payment-form");
		form.addEventListener("submit", function(event) {
		  event.preventDefault();
		  pay(stripe, card, clientSecret);
		});
	  });

	var setupElements = function(data) {
	  stripe = Stripe(data.publishableKey);
	  /* ------- Set up Stripe Elements to use in checkout form ------- */
	  var elements = stripe.elements();
	  var style = {
		base: {
		  color: "#32325d",
		  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
		  fontSmoothing: "antialiased",
		  fontSize: "16px",
		  "::placeholder": {
			color: "#aab7c4"
		  }
		},
		invalid: {
		  color: "#fa755a",
		  iconColor: "#fa755a"
		}
	  };

	  var card = elements.create("card", { style: style });
	  card.mount("#card-element");

	  return {
		stripe: stripe,
		card: card,
		clientSecret: data.clientSecret
	  };
	};

	var handleAction = function(clientSecret) {
	  stripe.handleCardAction(clientSecret).then(function(data) {
		if (data.error) {
		  showError("Your card was not authenticated, please try again");
		} else if (data.paymentIntent.status === "requires_confirmation") {
		  fetch(rootstripe + "/stripe/pay.php", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json"
			},
			body: JSON.stringify({
			  paymentIntentId: data.paymentIntent.id
			})
		  })
			.then(function(result) {
			  return result.json();
			})
			.then(function(json) {
			  if (json.error) {
				showError(json.error);
			  } else {
				orderComplete(clientSecret);
			  }
			});
		}
	  });
	};

	/*
	 * Collect card details and pays for the order
	 */
	var pay = function(stripe, card) {
	  changeLoadingState(true);

	  stripe
		.createPaymentMethod("card", card)
		.then(function(result) {
		  if (result.error) {
			showError(result.error.message);
		  } else {
			orderData.paymentMethodId = result.paymentMethod.id;
			return fetch(rootstripe + "/stripe/pay.php", {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json"
			  },
			  body: JSON.stringify(orderData)
			});
		  }
		})
		.then(function(result) {
		  return result.json();
		})
		.then(function(paymentData) {
		  if (paymentData.requiresAction) {
			// Request authentication
			handleAction(paymentData.clientSecret);
		  } else if (paymentData.error) {
			showError(paymentData.error);
		  } else {
			orderComplete(paymentData.clientSecret);
		  }
		});
	};

	/* ------- Post-payment helpers ------- */

	/* Shows a success / error message when the payment is complete */
	var orderComplete = function(clientSecret) {
	  stripe.retrievePaymentIntent(clientSecret).then(function(result) {
		var paymentIntent = result.paymentIntent;
		var paymentIntentJson = JSON.stringify(paymentIntent, null, 2);

		document.querySelector(".sr-payment-form").classList.add("hidden");
		document.querySelector("pre").textContent = paymentIntentJson;
		chargedb(paymentIntent);
		/*document.querySelector(".sr-result").classList.remove("hidden");
		setTimeout(function() {
		  document.querySelector(".sr-result").classList.add("expand");
		}, 200);*/

		changeLoadingState(false);
	  });
	};

	var showError = function(errorMsgText) {
	  changeLoadingState(false);
	  var errorMsg = document.querySelector(".sr-field-error");
	  errorMsg.textContent = errorMsgText;
	  setTimeout(function() {
		errorMsg.textContent = "";
	  }, 4000);
	};

	// Show a spinner on payment submission
	var changeLoadingState = function(isLoading) {
	  if (isLoading) {
		document.querySelector(".sr button").disabled = true;
		document.querySelector("#spinner").classList.remove("hidden");
		document.querySelector("#button-text").classList.add("hidden");
	  } else {
		document.querySelector(".sr button").disabled = false;
		document.querySelector("#spinner").classList.add("hidden");
		document.querySelector("#button-text").classList.remove("hidden");
	  }
	};
}

function chargedb(paymentIntent) {
	var amount = paymentIntent.amount / 100;
	var spedition2 = $('#price_tot_checkout').data('spedition');
	var totalitem2 = $('#price_tot_checkout').data('items');
	$('#idpayment').val(paymentIntent.id);
	$('#add_order').submit();
}
