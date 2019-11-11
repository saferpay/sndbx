# Saferpay Fields

<div class="warning">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>VERY IMPORTANT:</strong> Before you start integrating this flow, make sure, you have read the <a target="_blank" href="index.html">the Introduction</a> and <a target="_blank" href="interfaces.html">Licenses and Interfaces</a> chapters. They contain general and vital information, not only about the JSON-API, but also for you, the merchant!</p>
</div>

The Saferpay Fields grant you the flexibility of your own HTML-form, whilst being 100% PCI SAQ-A compliant. 

The main idea is, to split the classic card entry form into its components, namely the inputs for the PAN, CVC, Expiration and Holder Name. These fields will be hosted on Saferpay-side, making sure, that the data is captured by a fully PCI-certified system, while offering you a level of flexibility and the possibilities, similar to using your own form.

This chapter will cover the integration and preperations necessary, to work with the Saferpay Fields.

# <a name="hf-flow"></a> Basic Flow

This is the basic Hosted Fields flow.

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/hosted-fields-flow.new.png "Hosted Fields flow")
1. The card holder navigates to the checkout
2. The shop frontend calls **SaferpayFields.Init()** (See Integration and Initialization > Hosted Fields Initialization) and the Hosted Fields Javascript library initializes the iFrames.
3. Once initialized, the library will replace the placeholders with the correct iFrame inputs, which then are presented to the card holder.
4. The card holder enters his card details and clicks "Submit", on which the Webshop executes the <strong>HostedFields.submit()</strong> function.
5. The Hosted Fields Javascript library then submits the iFrames, which sends the card details towards Saferpay.
6. Saferpay caches the card details **for a maximum of 20 minutes** and generates a token, which is then used to reference said means of payment. 
7. The token is forwarded and the SaferpayFields.submit(); onSuccess callback is called, so the token may be captured and processed further.
8. The token then has to be forwarded to serverside. How you do that, is up to you. Methods like for example a redirect or AJAX are possible. Once on serverside, the token is then used to initialize the transaction itself, <a href="Integration_trx.html"> following the normal Transaction Interface flow.</a> Please refer to that chapter on further information, about how to submit the token through the JSON-API and execute the transaction itself.


# <a name="hf-prep"></a> Preperation

Before you can start integrating the Saferpay Fields, you need to create an API Token.
To do so, you need to log into the Saferpay Backoffice. Navigate to <strong>Settings > Saferpay Fields Access Tokens</strong>. There, please click on <strong>Create Saferpay Fields Access Token</strong>. The following window will pop-up:

# REPLACE ON RELEASE
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/fields-create-api-key.png "New API Key mask")

<div class="warning">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Very Important:</strong> Saferpay will indeed validate the used Source-URL and the used TerminalId! It is enough to just enter the base-url, of your shop here. If you use multiple terminals, you have to generate more API-Keys for each terminal. <strong>HTTPS IS MANDATORY</strong> and will be checked!
  </p>
</div>

# REPLACE ON RELEASE
Once created, you will be presented with a basic integration-example:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/fields-api-key.png "API Key")

# <a name="hf-integration"></a> Integration and Initialization

After you have created your API-Token, you can start integrating the Saferpay Fields into your site.

### Include the Saferpay Fields Javascript library into your site
```html
<script src="'https://test.saferpay.com/Fields/lib/1.0/saferpay-fields.js'"></script> <!-- For Test-Environment-->
<!-- OR -->
<script src="'https://www.saferpay.com/Fields/lib/1.0/saferpay-fields.js'"></script> <!-- For Live-Environment-->
```
### Define, where Saferpay should load the Hosted Fields

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
This example uses Bootstrap for formatting purposes, which isn't mandatory. You also can define these fields wherever and however you want. 
However you must make sure, that you define the placeholders -can be <div>, <span>, or <input readonly>- with the following id-values:
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

### Saferpay Fields Initialization
```javascript
SaferpayFields.init({
	// api key
	apiKey: '[YOUR API KEY]',
	// api url
	url: 'https://test.saferpay.com/Fields/[YOUR CUSTOMERID]',
	style: {
	    '.form-control': 'border: none; border-bottom: solid 1px #ccc; border-radius: unset;'
	},
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
	onFocus: function (evt) {
	    //Callback on focus (Card Holder clicks into field)
	}
});

// submit(); sends the entered hosted fields data to Saferpay.
HostedFields.submit({
	onSuccess: function(evt) {
	    //Callback on successful Submit
	},
	onError: function(evt) {
	    //Callback on unsuccessful Submit
	}
});
```

# <a name="hf-class"></a> SaferpayFields - Class functions

## .version()
Returns a **string** containing the current library-version.

## .init({options})
Initializes the Saferpay Fields and replaces the placeholders, as defined before.

### Available options

#### apiKey *string*
Contains the API-Key, you have defined inside the Saferpay Backoffice earlier.

#### url *string*
Contains the API-Url, to define, where to post the data and initialize the Saferpay Fields.
```javascript
// Test Environment
	url: 'https://test.saferpay.com/Fields/[YOUR CUSTOMERID]',
// Live Environment
	url: 'https://www.saferpay.com/Fields/[YOUR CUSTOMERID]',
```

#### onBlur *eventCallback*
Callback function, that is executed, should the customer leave the field. The event returns a **Callback message**.

#### onFocus *eventCallback*
Callback function, that is executed, should the customer enter the field. The event returns a **Callback message**.

#### onSuccess *eventCallback*
Callback function, that is executed, every time, the Saferpay Fields have been loaded successfully.

#### onError *eventCallback*
Callback function, that is executed, every time, the initialization of the Saferpay Fields has not been successful. The event returns a **Error Callback Message**.

#### style *Object*
Object, that defines CSS rules, to be applied to all elements.
**Example:**
```javascript
style: {
	'.form-control': 'border: none; border-bottom: solid 1px #ccc; border-radius: unset;'
}
```

#### cssUrl *String*
Url to an external CSS, to be applied to all elements.

#### placeholders *Object*
Object, that contains custom placeholder text, to be applied to the inputs.

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

## submit({options})
Submits the Saferpay Fields.

### Available options

#### onSuccess *eventCallback*
Callback function, that is executed, if the Saferpay Fields have been submitted successfully. The event returns a **Submit Success Callback Message**.

#### onError *eventCallback*
Callback function, that is executed, if the Saferpay Fields have not been successfully submitted. The event returns a **Error Callback Message**.

## Callback Messages
Saferpay returns certain data to the application, in case of certain **eventCallback**s.

### Callback Message *Object*
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
      <td>Validity of the field affected.</td>
    </tr>
  </tbody>
</table>

### Error Callback Message *Object*
Callback message on error event, containing the following data:
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
      <td>message</td>
      <td>String</td>
      <td>A human-readable explanation specific to this occurrence of the problem.</td>
    </tr>
  </tbody>
</table>

### Submit Success Callback Message *Object*
Callback message on a successful submit, containing the following data:
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
Saferpay Hosted Fields are supported by the following Browsers:
<ul>
  <li>Chrome latest</li>
  <li>Firefox latest</li>
  <li>Internet Explorer XXX</li>
  <li>Safari latest</li>
</ul>

# <a name="hf-example"></a> Examples

Here you can see some examples of how the Hosted Fields may be integrated. Feel free to use this code, if you have trouble integrating.

<div class="info">
  <p><strong>Note:</strong> If you want to test Saferpay Hosted Fields, you can eddit all examples in JSFiddle. Please click on the link on the upper right side of the examples: <i>Edit in JSFiddle</i></p>
</div>

#### Init Sample
<iframe width="1000px" height="400" src="https://jsfiddle.net/saferpay/gnr0k1o9/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

#### Sample 1
<iframe width="1000px" height="620" src="https://jsfiddle.net/saferpay/o8qb0ghv/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

#### Sample 2
<iframe width="1000px" height="470" src="https://jsfiddle.net/saferpay/xt83g4r2/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

# <a name="hf-transaction"></a> Executing the Transaction

It is important to understand, that the Hosted Fields are just a way to capture the card details, but not to execute the transaction itself. That is done via the <a href="Integration_trx.html">Transaction Interface</a>.
Once the **onSuccess** event is called, you need to forward the Hosted Fields token to your server-backend, in order to initialize the transaction itself and also gather the **RedirectUrl**, to perform things like 3D Secure and DCC. How you move the token to the backend is completely up to you.
You can provide the onSuccess event with an AJAX-method to execute the initialize in the background on a successful submit and forward the **RedirectUrl** to the fronent for a redirect this way, which you then can open in an iFrame, Lightbox, or as a full redirect.
However a redirect via GET, or POST, towards your initialize-script, is also an option, of course.
Refer to the above mentioned chapter, to learn, how to initialize a transaction, using a Hosted Fields token.
<div class="warning">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> This process has to be finished within 20 minutes, after the submission of the card details. Saferpay will discard the card details afterwards and the Hosted Fields token becomes invalid!
  </p>
</div>
