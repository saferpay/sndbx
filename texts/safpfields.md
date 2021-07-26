<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>SITE MOVED:</strong> This documentation is outdated, as of July 26th 2021. The new and improved documentation can be found under <a href="https://docs.saferpay.com/home/integration-guide/introduction">https://docs.saferpay.com/</a>.</p>
</div>

# Saferpay Fields

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>VERY IMPORTANT:</strong> Before you start integrating this flow, make sure, you have read the <a target="_blank" href="index.html">the Introduction</a> and <a target="_blank" href="interfaces.html">Licenses and Interfaces</a> chapters. They contain general and vital information, not only about the JSON-API, but also for you, the merchant!</p>
</div>

The Saferpay Fields grant you the flexibility of your own HTML-form, whilst being 100% PCI SAQ-A compliant. 

The main idea is, to split the classic card entry form into its components, namely the inputs for the PAN, CVC, Expiration and Holder Name. These fields will be hosted on Saferpay-side, making sure, that the data is captured by a fully PCI-certified system, while offering you a level of flexibility and the possibilities, similar to using your own form.

This chapter will cover the integration and preperations necessary, to work with the Saferpay Fields.

## Supported Payment Methods

+ Visa/VPay
+ Mastercard
+ Maestro
+ American Express
+ Bancontact
+ Diners Club
+ JCB
+ Bonus Card
+ MyOne

# <a name="hf-flow"></a> Basic Flow

This is the basic Saferpay Fields flow.

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/saferpay-fields-flow.png "Saferpay Fields flow")
1. The card holder navigates to the checkout
2. The shop frontend calls **SaferpayFields.Init()** (See Integration and Initialization > Hosted Fields Initialization) and the Saferpay Fields Javascript library initializes the iFrames.
3. Once initialized, the library will replace the placeholders with the correct iFrame inputs, which then are presented to the card holder.
4. The card holder enters his card details and clicks "Submit", on which the Webshop executes the <strong>SaferpayFields.submit()</strong> function.
5. The Saferpay Fields Javascript library then submits the iFrames, which sends the card details towards Saferpay.
6. Saferpay caches the card details **for a maximum of 20 minutes** and generates a token, which is then used to reference said means of payment. 
7. The token is forwarded and the <strong>SaferpayFields.submit(); onSuccess callback</strong> is called, so the token may be captured and processed further.
8. The token then has to be forwarded to serverside. How you do that, is up to you. Methods like for example a redirect or AJAX are possible. Once on serverside, the token is then used to initialize the transaction itself, <a href="Integration_trx.html"> following the normal Transaction Interface flow.</a> Please refer to that chapter on further information, about how to submit the token through the JSON-API and execute the transaction itself.


# <a name="hf-prep"></a> Preparation

Before you can start integrating the Saferpay Fields, you need to create an Access Token.
To do so, you need to log into the Saferpay Backoffice. Navigate to <strong>Settings > Saferpay Fields Access Tokens</strong>. There, please click on <strong>Create Saferpay Fields Access Token</strong>. The following window will pop-up:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/fields-create-api-key.png "Access Token mask")

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Very Important:</strong> Saferpay will indeed validate the used Source-URL and the used TerminalId! It is enough to just enter the base-url, of your shop here. If you use multiple terminals, you have to generate more Access Tokens for each terminal. <strong>HTTPS IS MANDATORY</strong> and will be checked!<br /> Should you have misconfigured the access-token, the <strong>.init({options}) - onError</strong> callback will be triggered, returning an <strong>"Access forbidden!"</strong> message. Make sure, you've set the correct URL, for the system you are currently running on, especially during integration and then later deployment!
  </p>
</div>

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Tip:</strong> On the Test-Environment you can use a self-signed SSL-certificate, if you wish. This is helpful, if you are coding and testing on a small, local machine, instead of a server. Furthermore, as a Source-URL, you can enter you Computer-/Host-name. Example <strong>https://hostname</strong>. This works with local PCs, that do not have a public domain attached to them!
  </p>
</div>

Once created, you will be presented with a basic integration-example:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/fields-api-key.png "Access Token")

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Very Important:</strong> Once you move from the Test-Environment to the Live-Environment, you need to create a new Access Token on your live account!
  </p>
</div>

# <a name="hf-integration"></a> Integration and Initialization

After you have created your API-Token, you can start integrating the Saferpay Fields into your site.

### Include the Saferpay Fields JavaScript library into your site
```html
<script src="https://test.saferpay.com/Fields/lib/1/saferpay-fields.js"></script> <!-- For Test-Environment-->
<!-- OR -->
<script src="https://www.saferpay.com/Fields/lib/1/saferpay-fields.js"></script> <!-- For Live-Environment-->
```
### Define, where Saferpay should insert the Hosted Fields

```html
    <div class="row">
	<div class="col-md-12 field">
	    <div id="fields-holder-name"></div>
	</div>
    </div>
    <div class="row">
	<div class="col-md-12 field">
	    <div id="fields-card-number"></div>
	</div>
    </div>
    <div class="row">
	<div class="col-md-7 field">
	    <div id="fields-expiration"></div>
	</div>
	<div class="col-md-5 field">
	    <div id="fields-cvc"></div>
	</div>
    </div>
```
<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
	  <strong>Tip:</strong> The <strong>Holder Name</strong> is generally optional. If you don't want to capture it, leave it out! However, once the field has beeen initialized (see further below), it must be filled in!
  </p>
</div>
This example uses Bootstrap for formatting purposes, which isn't mandatory. You also can define these fields wherever and however you want. 
However you must make sure, that you define the placeholders -can be ```<div>```, ```<span>```, or ```<input readonly>```- with the following id-values:
<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center">Input-Field</th>
      <th class="text-center">id-Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Card Holder Name</td>
      <td>fields-holder-name</td>
    </tr>
    <tr>
      <td>Card Number</td>
      <td>fields-card-number</td>
    </tr>
    <tr>
      <td>CVC</td>
      <td>fields-cvc</td>
    </tr>
    <tr>
      <td>Expiration</td>
      <td>fields-expiration</td>
    </tr>
  </tbody>
</table>

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> The placeholder must have a height > 0, or the iframe will inherit this height!
  </p>
</div>
<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Note:</strong> The CVC is always mandatory, except on cards, that do not have a CVC! In these cases, Saferpay will deactivate the field!
  </p>
</div>


### Saferpay Fields Initialization
```javascript
SaferpayFields.init({
	// access token
	accessToken: '[YOUR Access Token]',
	// api url
	url: 'https://test.saferpay.com/Fields/[YOUR CUSTOMERID]',
	style: {
	    '.form-control': 'border: none; border-bottom: solid 1px #ccc; border-radius: unset;'
	},
	paymentMethods: ["visa", "mastercard"],
	onSuccess: function() {
	    //Callback on successful Init
	},
	onError: function(evt) {
	    //Callback on unsuccessful Init
	},
	placeholders: {
		//Custom Text for Input placeholders
	    holdername: 'Card holder',
	    cardnumber: '0000 0000 0000 0000',
	    expiration: 'MM/YY',
	    cvc: 'CVC'
	},
	onBlur: function (evt) {
	    //Callback on blur (Card Holder leaves field)
	},
	onValidated: function(evt) {
	    //Callback similar to on blur (Card Holder leaves field), but explicitly delivers validation data
	},
	onFocus: function (evt) {
	    //Callback on focus (Card Holder clicks into field)
	}
});

// submit(); sends the entered hosted fields data to Saferpay.
SaferpayFields.submit({
	onSuccess: function(evt) {
	    //Callback on successful Submit
	},
	onError: function(evt) {
	    //Callback on unsuccessful Submit
	}
});
```

# <a name="hf-class"></a> SaferpayFields - Class functions

<h2>.version()</h2>
<p>Returns a <strong>string</strong> containing the current library-version.</p>

<h2>.init({options})</h2>
<p>Initializes the Saferpay Fields and replaces the placeholders, as defined before.</p>

### Available options

* <strong>accessToken</strong> *string* : Contains the Access Token, you have defined inside the Saferpay Backoffice earlier.

* <strong>url</strong> *string* : Contains the API-Url, to define, where to post the data and initialize the Saferpay Fields.
```javascript
// Test Environment
	url: 'https://test.saferpay.com/Fields/[YOUR CUSTOMERID]',
// Live Environment
	url: 'https://www.saferpay.com/Fields/[YOUR CUSTOMERID]',
```
* <strong>onBlur</strong> *eventCallback* : Callback function, that is executed, should the customer leave the field. The event returns a **Callback message**.
* <strong>onValidated</strong> *eventCallback* : Callback function, that is executed, should the customer leave the field. The event returns a **Callback message**, also containing field validation-data.
* <strong>onFocus</strong> *eventCallback* : Callback function, that is executed, should the customer enter the field. The event returns a **Callback message**.
* <strong>onSuccess</strong> *eventCallback* : Callback function, that is executed, every time, the Saferpay Fields have been loaded successfully.
* <strong>onError</strong> *eventCallback* : Callback function, that is executed, every time, the initialization of the Saferpay Fields has not been successful. The event returns an **Error Callback Message**.
* <strong>style</strong> *Object* : Object, that defines CSS rules, to be applied to all elements.
**Example:**
```javascript
style: {
	'.form-control': 'border: none; border-bottom: solid 1px #ccc; border-radius: unset;'
}
```
* <strong>paymentMethods</strong> *String[]* : A String-Array, containing a list of brands to be accepted! Currently accepted brands/values: mastercard, maestro, visa, jcb, diners, bancontact, amex, bonus, myone
* <strong>cssUrl</strong> *String* : Url to an external CSS, to be applied to all elements.
* <strong>placeholders</strong> *Object* : Object, that contains custom placeholder text, to be applied to the inputs.
**Example:**
```javascript
placeholders: {
    //Custom Text for Input placeholders
    holdername: 'Card holder',
    cardnumber: '0000 0000 0000 0000',
    expiration: 'MM/YY',
    cvc: 'CVC'
},
```

<h2>.submit({options})</h2>
<p>Submits the Saferpay Fields.</p>

### Available options
* <strong>onSuccess</strong> *eventCallback* : Callback function, that is executed, if the Saferpay Fields have been submitted successfully. The event returns a **Submit Success Callback Message**.

* <strong>onError</strong> *eventCallback* : Callback function, that is executed, if the Saferpay Fields have not been successfully submitted. The event returns an **Error Callback Message**.

## Callback Messages
Saferpay returns certain data to the application, in case of certain **eventCallback**s.

<strong>Callback Message</strong> *Object* :
Callback message on normal event, containing the following data:
<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center">Parameter</th>
      <th class="text-center">Type</th>
      <th class="text-center">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>event</td>
      <td>String</td>
      <td>Name of the event, that occured.</td>
    </tr>
    <tr>
      <td>fieldType</td>
      <td>String</td>
      <td>Type of the field affected.</td>
    </tr>
    <tr>
      <td>id</td>
      <td>String</td>
      <td>Id of the field affected.</td>
    </tr>
    <tr>
      <td>isValid</td>
      <td>Boolean</td>
	    <td>Validity of the field affected. (<strong>onValidated</strong> callback only!)</td>
    </tr>
    <tr>
      <td>reason</td>
      <td>String</td>
      <td>
	<p>Reason, why a field is not valid! The following reasons can be returned:</p>
	<ul>
		<li><strong>invalid:</strong> The input given, is generally invalid!</li>
		<li><strong>empty:</strong> The input is empty!</li>
		<li><strong>unsupported:</strong> Thrown, when <strong>paymentMethods</strong> is used and a not listed brand is entered!</li>
		<li><strong>expired:</strong> The given card is expired!</li>
		<li><strong>undefined:</strong> If the field is valid, or hasn't been validated yet, the reason will be "undefined"!</li>
	</ul>
      </td>
    </tr>
  </tbody>
</table>

<strong>Error Callback Message</strong> *Object* :
Callback message on error event, containing the following data:
<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center">Parameter</th>
      <th class="text-center" style="width: 60px;">Type</th>
      <th class="text-center">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>message</td>
      <td>String</td>
      <td>A human-readable explanation specific to this occurrence of the problem.</td>
    </tr>
  </tbody>
</table>

<strong>Submit Success Callback Message</strong> *Object* :
<p>Callback message on a successful submit, containing the following data:</p>
<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center">Parameter</th>
      <th class="text-center">Type</th>
      <th class="text-center">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>token</td>
      <td>String</td>
	    <td>The Saferpay Fields Token, later to be referenced by <a href="https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize">Transaction Initialize</a>, to execute the payment itself.</td>
    </tr>
  </tbody>
</table>


### Browser Support
Saferpay Fields are supported by the following Browsers:
<ul>
  <li>Chrome latest</li>
  <li>Firefox latest</li>
  <li>Internet Explorer latest</li>
  <li>Microsoft Edge latest</li>
  <li>Safari latest</li>
</ul>

# <a name="hf-example"></a> Examples

Here you can see some examples of how the Saferpay Fields may be integrated. Feel free to use this code, if you have trouble integrating.

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Note:</strong> If you want to test Saferpay Fields, you can edit all examples in JSFiddle. Please click on the link on the upper right side of the examples: <i>Edit in JSFiddle</i></p>
</div>

#### Init Sample
<iframe width="1000px" height="400" src="https://jsfiddle.net/saferpay/gnr0k1o9/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

#### Sample 1
<iframe width="1000px" height="620" src="https://jsfiddle.net/saferpay/o8qb0ghv/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

#### Sample 2
<iframe width="1000px" height="470" src="https://jsfiddle.net/saferpay/xt83g4r2/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

# <a name="hf-steps"></a> Further steps

It is important to understand, that the Saferpay Fields are just a way to capture the card details. 
Now, you have to decide, what to do, with this information. You have two options now:

1. Execute a transaction. If you want to use the captured card data for a normal transaction, then you have to refer to the <a href="Integration_trx.html">Transaction Interface Process</a>. By simply submitting the Fields Token via this API-Method, you can generate an API Token to trigger an Authorization and a RedirectUrl, for performing other steps, like DCC, or 3D Secure.

2. Save the card. If you want to just save the card for now, you can do that via the <a href="scd.html">Saferpay Secure Alias Store via standalone registration</a>. This allows you to obtain a card alias, to perform other actions, like recurring payments, or just enable your customers to save new payment means inside their shop account, for further use. The choice is yours.

Once the **onSuccess** event is called, you need to forward the Saferpay Fields token to your server-backend, in order to initialize the next step (see above) and also gather the **RedirectUrl**, to perform things like 3D Secure and/or DCC. How you move the token to the backend is completely up to you.
You can provide the onSuccess event with an AJAX-method to execute the initialization in the background on a successful submit and forward the **RedirectUrl** to the fronend for a redirect this way, which you then can open in an iframe, Lightbox, or as a full redirect.
However a redirect via GET, or POST, towards your initialize-script, is also an option, of course.
Refer to the above mentioned chapters, to learn, how to initialize a transaction, or just save a card, using a Saferpay Fields token.
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> This process has to be finished within 20 minutes, after the submission of the card details. Saferpay will discard the card details afterwards and the Saferpay Fields token becomes invalid!
  </p>
</div>

<h2> Want to see a fully working example?</h2>
<a href="https://shop.saferpay.eu/saferpayintegration" class="demobtn">Click here for a live demo!</a>
