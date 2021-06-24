
var stripe = Stripe("pk_live_51J5gCBE6l9W8YrrlfPSKUM88YsrNfJM6jVSH8u8hSTqo8hKdtRvl0we9o2ZXKHGZbyvZ0Fu0ownaaUE7bnvg27bq00JbuE5L5x");
//var stripe = Stripe("pk_test_GhuLqvF7bjM8KDm0OdmqeZTp");
var backEndUrl = 'https://stripe.downloadpdf.org';
var domain = 'holy-bible.downloadpdf.org'
//var domain = 'localhost:8080'
var priceID = 'price_1J5gMcE6l9W8Yrrls6ibaHh6'
//var priceID = 'price_1J4bTLIqc7Y0dKXeXwelWs83'

// When the form is submitted...
var submitBtn = document.querySelector('#submit');
submitBtn.addEventListener('click', function (evt) {
  var inputEl = document.getElementById('email');
  var email = String(inputEl.value);

  // Create the checkout session. 
  fetch(backEndUrl+'/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: String(inputEl.value),  
      price: String(priceID),
      domain: String(domain),
    }),
  }).then(function (result) {
    return result.json();
  }).then(function (data) {
    // Redirect to Checkout. with the ID of the
    // CheckoutSession created on the server.
    stripe.redirectToCheckout({
      sessionId: data.sessionId,
    })
    .then(function(result) {
      // If redirection fails, display an error to the customer.
      if (result.error) {
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });
  });
});
