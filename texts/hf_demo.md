# Saferpay Hosted Fields

The Saferpay Hosted Fields grant you the flexibility of your own HTML-form, whilst being 100% PCI SAQ-A compliant. 

The main idea is, to split the classic card entry form into its components, namely the inputs for the PAN, CVC, Expiration and Holder Name. These fields will be hosted on Saferpay-side, making sure, that the data is captured by a fully PCI-certified system, while offering you a level of flexibility and the possibilities, similar to using your own form.

This chapter will cover the integration and preperations necessary, to work with the Saferpay Hosted Fields.

# <a name="hf-prep"></a> Preperation

Before you can start integrating the Hosted Fields, you need to create an API Token.
To do so, you need to log into the Saferpay Backoffice. Navigate to <strong>Settings > HostedFields API Key</strong>. There, please click on <strong>New HostedFields API Key</strong>. The following window will pop-up:

# REPLACE ON RELEASE
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/hosted-fields-create-api-key.png "New API Key mask")

<div class="warning">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Very Important:</strong> Saferpay will indeed validate the used Source-URL and the used TerminalId! It is enough to just enter the base-url, of your shop here. If you use multiple terminals, you have to generate more API-Keys for each terminal.
  </p>
</div>

# REPLACE ON RELEASE
Once created, you will be presented with a basic integration-example:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/hosted-fields-api-key.png "API Key")

# <a name="hf-integration"></a> Integration and Initialization

After you have created your API-Toke, you can start integrating the Hosted Fields into your site.

### Include the Saferpay Hosted Fields Javascript library into your site
# REPLACE ON RELEASE
```html
<script src="https://test.saferpay.com/HostedFields/Public/[CURRENT VERSION]/saferpay-hosted-fields-[CURRENT VERSION].js"></script>
```
### Define, where Saferpay should load the Hosted Fields

```html
    <div class="row">
        <div class="col-md-10 field">
		<input id="hosted-fields-holder-name">
	</div>
    </div>
    <div class="row">
        <div class="col-md-10 field">
		<input id="hosted-fields-card-number">
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 field">
		<input id="hosted-fields-expiration">
	</div>
        <div class="col-md-3 field">
		<input id="hosted-fields-cvc">
        </div>
    </div>
```
This example uses Bootstrap for formatting purposes, which isn't mandatory. You also can define these fields wherever and however you want. 
However you must make sure, that you define the placeholder inputs with the following id-values:
<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Authenticated</th>
      <th class="text-center">Input-Field</th>
      <th class="text-center">id-Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Card Holder Name</td>
      <td>hosted-fields-holder-name</td>
    </tr>
    <tr>
      <td>Card Number</td>
      <td>hosted-fields-card-number</td>
    </tr>
    <tr>
      <td>CVC</td>
      <td>hosted-fields-cvc</td>
    </tr>
    <tr>
      <td>Expiration</td>
      <td>hosted-fields-expiration</td>
    </tr>
  </tbody>
</table>

### Hosted Fields Initialization
```javascript
HostedFields.init(
	// api key
	[YOUR API-TOKEN],
	// api url
	'https://test.saferpay.com/hostedfields/[YOUR CUSTOMERID]',
	{
		style: {
			'.exampleClass': 'border: none; border-bottom: solid 1px #ccc; border-radius: unset;',
		},
		styleCss: '',
		styleUrl: '',
		onSuccess: function (evt) {
			//See below for a description
		},
		onReady: function () {
			//See below for a description
		},
		onFocus: function (evt) {
			//See below for a description
		},
		onBlur: function (evt) {
			//See below for a description
		},
	}
);

// submit(); sends the entered hosted fields data to Saferpay.
HostedFields.submit();
```
#### Events
Events are called, if certain criteria are met.
They give you options for input validation and more. You can attach a callback-function (As shown above!) to a certain event, to trigger custom behavior. If available, Saferpay will return a JSON-message (evt), which contains information about the event, like validation information. 
The following events are available:

##### onSuccess
This event occurs after HostedFields.submit(); is called, but only, if the submit was successful!
When called, the event will return a Hosted-Fields token, which is later used to start the transaction itself on serverside.
However it is up to you, how you deliver said token from client- to server-side. Methods, like AJAX for example are possible.

Example, of JSON message:
```json
{
	"token": "d292f72e-5220-440d-88ea-c4cc1252a5da"
}
```

##### onReady
This event occurs after the onLoaded event, when the page is ready and the iFrames are fully loaded.
Saferpay does not return any data on this event!

##### onBlur
Execute a JavaScript when a user leaves an input field.
onBlur will also trigger the input-validation on Saferpay side, which returns data, on the given field and whether, or not it has been validated successfully. This enables you to trigger messages or CSS-events on your side, to signal your customer, that he/she needs to take action.

Example, of JSON message:
```json
{ 
	"id": "hosted-fields-holder-name",
	"fieldType": "holdername",
	"isValid": true
}
```

##### onFocus
Execute a JavaScript when an input field gets into focus.
Saferpay will return the id of the current field in focus!

Example, of JSON message:
```json
{ 
	fieldType: "holdername"
}
```

### Browser Support
Saferpay Hosted Fields are supported by the following Browsers:
<ul>
  <li>Chrome latest</li>
  <li>Firefox latest</li>
  <li>Internet Explorer XXX</li>
  <li>Safari latest</li>
</ul>

# <a name="hf-prep"></a> Examples

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


#### Mobile
# MISSING INFO

#### Styling
# MISSING INFO

