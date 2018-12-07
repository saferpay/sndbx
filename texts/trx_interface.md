# Transaction Interface

<div class="warning">
  <p><strong>VERY IMPORTANT:</strong> Before you start integrating this flow, make sure, you have read the <a target="_blank" href="index.html">the Introduction</a> and <a target="_blank" href="interfaces.html">Licenses and Interfaces</a> chapters. They contain general and vital information, not only about the JSON-API, but also for you, the merchant!</p>
</div>

The Transaction Interface is an extension to Payment Page Interface intended for a more modular und seamless integration of the payment process and thus offers a wide variety of functions to process and handle payments. It can be operated in parallel with the Payment Page Interface or alone. It offers the **Hosted Entry Form** (HEF) to process **card payments** seamlessly. Please read chapter [**Iframe Integration and CSS**](https://saferpay.github.io/sndbx/CssiFrame.html#chapter-css-iframe) for examples of the different payment forms. This interface can also be used in combination with Secure Card Data to store/tokenize payment data during the payment process.

Apart from the processing of payments via the Hosted Entry from, it also offers various functions to process payments without payer interaction which is for example required when performing recurring payments or one click checkouts. The Transaction Interface can also be used to process payments with PCI certification of the levels SAQ-A EP and higher during which the payment data are collected directly be the merchant’s systems and forwarded to Saferpay.

<div class="info">
  <p><strong>Note:</strong> The JSON API can be used in various ways to cover the most diverse processes. For this reason, only the standard processes are discussed below. For other possible uses, or for questions about the standard procedures, please contact the <a href="https://saferpay.github.io/sndbx/contact.html">Saferpay Integration Team</a></p>
</div>

<div class="warning">
  <p><strong>Attention:</strong> The Transaction Interface is only for holders of a business licence on the live system. For the eCommerce licence, the advanced features are not available. The test accounts have business activated by default, for evaluation purposes.</p>
</div>

## Description of the general process for using the Transaction Interface


<div class="warning">
	<p><strong>Important Note:</strong> The Transaction Interface offers various options to perform transactions. This flow only describes the general flow.</p>
</div>

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/TRX_FlowChart.png "Transaction Interface Flow Chart")

1. [Transaction Initialize](index.html#Payment_v1_Transaction_Initialize)
  	* Initializes the Payment and generates the RedirectUrl for the [iFrame Integration](https://saferpay.github.io/sndbx/CssiFrame.html).
2. Open the RedirectUrl inside an HTML-iFrame, to show the hosted card entry form.
3. Return to Return Url depending on the outcome of the 3D Secure procedure. The ReturnUrls are defined in step 1.
4. [Transaction Authorize](index.html#Payment_v1_Transaction_Authorize)
  	* Authorizes the card, which has been gathered in step 2. Up until now, *no transaction has been made*!
5. Depending on the outcome of step 4 you may
  	* [Capture/Finalize the Transaction](index.html#Payment_v1_Transaction_Capture)
  	* [Cancel/Abort the Transaction](index.html#Payment_v1_Transaction_Cancel)
6. Transaction is finished.



## <a name="trx-cc"></a> Credit Cards
In contrast to the payment page, credit card payments can be seamlessly integrated into the merchant's shop with the Transaction Interface. The procedure will be described in the following.
### <a name="trx-ini"></a>1 - Transaction Initialize
The process begins with [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize). With this request, you forward all data necessary for the payment to Saferpay. Such as your customer number (CustomerId), the terminal number (Terminal Id), the currency (CurrencyCode), the amount (Value), the internal reference number of the merchant system (OrderId), and the return addresses (ReturnUrls) to which the customer will return, depending on the outcome of the payment. 

### Here are a few hints and tips about the options that are available for the merchant:

+ **ReturnUrls:** For security, Saferpay returns no data to return addresses of the shop. The identification of the payment or the returning customers is up to the merchant. We recommend using your own parameters. These can be attached via HTTP GET to the ReturnUrls. When a ReturnUrl is called, Saferpay returns the appended parameter, thus enabling identification of the customer. 

+ **"Payment"=>"OrderId":** This optinal parameter is important to keep track of all your transactions in later processes. This ID will be forwarded, so it will show up inside the Saferpay Backoffice (As the Reference number!) and on your reconciliation-files. This will help associate all the transactions for your accounting-department.

+ **Card Verification Value:** The Card Verification Value (CVC) is mandatory, when using the Card Entry Form, except for card brand Maestro, which offers cards with and without CVC. 

+ **Secure Card Data:** With the Initialize Request, it is also possible within Saferpay Secure Card Data to forward saved cards in the form of an alias. For example, this can be the case if the customers card number has been already saved (tokenized), and you do not want her or him to re-enter this data. To use the alias value instead of the actual card data, use the container PaymentMeans.

<div class="info">
 <p><strong>Note:</strong> The CVC is <strong>NOT</strong> required, when doing a 3DS transaction with an alias!</p>
</div>

### In the Response of the Initialize Request these parameters are import for further processing:

+ **Token:** The Token is mandatory for further steps within the payment process and must therefore be cached. Preferably, it should be linked to the parameters attached to the ReturnUrls. It can thus be easily reassigned.

+ **RedirectUrl:** Unlike with the Payment Page, this URL is not used for a redirect. Instead, it is embedded in an HTML Iframe. Within this, a form hosted by Saferpay is displayed. This form is also called the Hosted Entry Form. It can be used to capture sensitive card details in a PCI-compliant manner. You can find out more about the Iframe integration [in this chapter](https://saferpay.github.io/sndbx/CssiFrame.html).

<div class="info">
  <p><strong>Note:</strong> If an alias is forwarded in the initalize request (See the step above!), the display of the form will be skipped.</p>
</div>

### <a name="trx-iframe"></a>2 - Open RedirectUrl inside an HTML-iFrame
The RedirectUrl should be opened inside an HTML-iFrame embeded in your webshop or application, to show the hosted card entry form. Please view the chapter [**Iframe Integration and CSS**](https://saferpay.github.io/sndbx/CssiFrame.html#chapter-css-iframe) for more information on the iframe integration and use of CSS to style the hosted entry form.

#### <a name="trx-3ds"></a> 3-D Secure and DCC
If [3-D Secure](https://saferpay.github.io/sndbx/index.html#3ds) and/or [DCC](https://saferpay.github.io/sndbx/index.html#dcc) are activated on the terminal for the payment method being used, these services are automatically performed for the transaction as soon as the form has been sent. For this, no additional steps are necessary for the merchant. 

### <a name="trx-retshop"></a>3 - Return to the Shop
Once [3-D Secure](https://saferpay.github.io/sndbx/index.html#3ds) and/or [DCC](https://saferpay.github.io/sndbx/index.html#dcc) are completed, the card holder – depending on the outcome – is taken back to one of the **ReturnUrls** of the shop. Here, the GET parameters can be read and the **Token** can be assigned to the transaction. With the **Token**, the payment can be continued to the next step.

### <a name="trx-ta"></a>4 - Transaction Authorize
With the Payment Page Interface, the authorization of payment is triggered automatically upon completion of [3-D Secure](https://saferpay.github.io/sndbx/index.html#3ds) and/or [DCC](https://saferpay.github.io/sndbx/index.html#dcc). In contrast, with Transaction Interface it is triggered separately via [Authorize Request](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize).

**The Transaction Authorize Request offers further possibilities:**
+ **Condition:** With the **Condition** parameter, it can be specified that a payment will only be authorized when a 3-D Secure liability shift is provided by the cardholders bank.

+ **Secure Card Data:** Via the **RegisterAlias** container, card details from a payment can be stored safely and in conformity with PCI. For this, the alias for the card details is transmitted back to the merchant system with the authorization response. It is then available for another purchase in the shop, without customers having to enter their card details again. See for example the [Initialize request above](https://saferpay.github.io/sndbx/Integration_trx.html#trx-ini). The parameter **IdGenerator** is used to determine how the alias is generated. If **MANUAL** is specified, the shop system passes an absolutely unique value. With **RANDOM**, a random alphanumeric value is generated by Saferpay. With **RANDOM_UNIQUE**, it will be additionally verified prior to generation of the alias, as to whether or not the card number/expiration date combination already exists as an alias entry in the database. If so, the already existing alias is returned and nothing new is generated.

<div class="info">
  <p><strong>Note:</strong> A card will be registered only after a successful authorization.</p>
</div>

**Transaction Authorize Response data**
In case of success the authorization data is returned with the Transaction Authorize Response. Based on this data, it can be decided how the transaction is to proceed. The following data is interesting in this regard:

+ **Transaction > ID:** The transaction identifier (**Id**) returned in the container **Transaction**, is a unique identifier for a transaction. The value is obligatory for further processing steps (Transaction [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) or [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel)) and should therefore be saved.

+ **ThreeDs:** This container provides information about whether or not transaction liability shift via [3-D Secure](https://saferpay.github.io/sndbx/index.html#3ds) is available or not. It is up to merchants whether or not they want to accept transactions without liability shift. Evaluation of the parameter provides the opportunity for merchants to incorporate appropriate rules here.

<div class="warning">
  <p><strong>Important:</strong> Accepting transaction without LiabilityShift happens at the merchants own risk.</p>
</div>

+ **Transaction > Status:** As already described [here](https://saferpay.github.io/sndbx/index.html#capture-batch), this status states whether or not a transaction has to be finalized via [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture). If the status is not **CAPTURED**, the capture must be run in order to finalize the transaction.

<div class="info">
  <p><strong>Tip:</strong> You can also call Authorize, if the FailUrl has been called. It will then give you information about the error!</p>
</div>

### <a name="trx-captcancel"></a>5 - Capture or Cancel
Subsequently, the transaction will be finalised via [**Capture**](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) or aborted via [**Cancel**](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel).For this, the transaction identifier **Id** is required. Please refer to the notes [in the payment methods chapter](index.html#pm-functions), to check, if and when a **Capture** is necessary, and whether a **Cancel** can still be executed.
Once these steps have been finalised, the transaction is complete.
## <a name="trx-sepa"></a> SEPA Direct Debit
Because there are no PCI requirements for direct debits, bank details data can be captured directly. The use of an in-house HTML form and the subsequent payment request are allowed. For this, the bank details must be forwarded to [AuthorizeDirect](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect) with the **BankAccount** parameter in the **PaymentMeans** container.
	
## <a name="trx-demo"></a> Try it out!

<a href="https://saferpay.github.io/sndbx/trx_demo.html" class="demobtn">Click here for a live demo!</a>


## <a name="trx-post"></a> Using your own HTML-Form

Saferpay also offers the possibility to use a custom HTML-form for merchants with the required PCI certification. The basic transaction-flow stays the same.

<div class="danger">
  <p><strong>Warning:</strong> As mentioned before: <strong>DO NOT PROCEED</strong>, if you do not have the necessary PCI certification (SAQ-A EP) in order to use your own form! <strong>SIX Payment Services will not take any kind of responsibility in case of a noncompliance!</strong></p>
</div>

### The form

The form-inputs need to be set up in a specific way, so Saferpay can parse the submitted parameters. Please make sure, that you name the inputs in the following way:


<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Parameter</th>
      <th class="text-center">Type</th>
      <th class="text-center">Usage</th>
      <th class="text-center">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="width: 15%;">RedirectUrl</td>
      <td class="text-center" style="width: 10%;">URL</span></td>
      <td class="text-center" style="width: 10%;">mandatory</span></td>
      <td>The redirectUrl you get through <a href="http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize">Transaction Initialize</a> or <a href="http://saferpay.github.io/jsonapi/index.html#Payment_v1_Alias_Insert">Alias Insert</a>. It has to be set as the form action. The form-method will be POST!</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">HolderName</td>
      <td class="text-center" style="width: 10%;">String</span></td>
      <td class="text-center" style="width: 10%;">mandatory</span></td>
      <td>Input for the card-holder name.</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">CardNumber</td>
      <td class="text-center" style="width: 10%;">String</span></td>
      <td class="text-center" style="width: 10%;">mandatory</span></td>
      <td>Input for the card-number (PAN).</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">ExpMonth</td>
      <td class="text-center" style="width: 10%;">String</span></td>
      <td class="text-center" style="width: 10%;">mandatory</span></td>
      <td>Input for the expiration-month.</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">ExpYear</td>
      <td class="text-center" style="width: 10%;">String</span></td>
      <td class="text-center" style="width: 10%;">mandatory</span></td>
      <td>Input for the expiration-year.</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">VerificationCode</td>
      <td class="text-center" style="width: 10%;">String</span></td>
      <td class="text-center" style="width: 10%;">mandatory</span></td>
      <td>Input for the Card Verification Code (CVC).</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">FormAjax</td>
      <td class="text-center" style="width: 10%;">Boolean</span></td>
      <td class="text-center" style="width: 10%;">optional</span></td>
      <td>Set to true, if the form-submission shall be done via AJAX. When used, Saferpay returns validation-messages through a JSON-response, which can be catched with JavaScript!</span></td>     
    </tr>
  </tbody>
</table>

### Example HTML-form

```html
<html>
  <head>
    <title>Credentials-Form</title>
  </head>
  <body>
    <h1>Credentials Form</h1>
    <form method="POST" action= "<%= RedirectUrl %>">
      Karteninhabername
      <input type="text" name="HolderName" size="20"><br />
      Kartennummer
      <input type="text" name="CardNumber" size="16"><br />
      G&uuml;ltig bis
      <input type="text" name="ExpMonth" size="2">
      <input type="text" name="ExpYear" size="2"><br />
      Kartenpr&uuml;fnummer
      <input type="text" name="VerificationCode" size="4"><br />
      <input type="submit" name="submit" value="purchase">
    </form>
  </body>
</html>
```

### JavaScript example for AJAX-handling (Requires jQuery 1.9 or higher!)

```javascript
$("#myForm").submit(function (e) {
	// prevent normal (non-ajax) formular submission
	e.preventDefault();
 
	var formData = $(this).serializeArray();
	// add flag to ensure AJAX handling on server
	formData.push({ name: "FromAjax", value: true });
 
	$.post($(this).attr("action"), $.param(formData))
		// data has been posted successfully and user can be redirected
		.done(function(data, textStatus, jqXHR) {
			// NOTE: data is a json response
			window.location.href = data.RedirectUrl;
		})
		// validation failed or server error occured
		.fail(function(jqXHR, textStatus, errorThrown) {
      // NOTE: use $.parseJSON(jqXHR.responseText) in order to try to get a json response
		});
});

```

### Data-response over Ajax

#### Success-Response in case of an http-200 response:

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Parameter</th>
      <th class="text-center">Type</th>
      <th class="text-center">Usage</th>
      <th class="text-center">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="width: 15%;">RedirectUrl</td>
      <td class="text-center" style="width: 10%;">URL</span></td>
      <td class="text-center" style="width: 10%;">mandatory</span></td>
      <td>RedirectUrl to which to redirect your customer to!</span></td>     
    </tr>
  </tbody>
</table>

#### Error-Response in case of an http-4xx response:

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Parameter</th>
      <th class="text-center">Type</th>
      <th class="text-center">Usage</th>
      <th class="text-center">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="width: 15%;">ErrorName</td>
      <td class="text-center" style="width: 10%;">String</span></td>
      <td class="text-center" style="width: 10%;">mandatory</span></td>
      <td>Description, or ID of the error</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">Behavior</td>
      <td class="text-center" style="width: 10%;">String</span></td>
      <td class="text-center" style="width: 10%;">mandatory</span></td>
      <td>Further details on how to proceed (RETRY_LATER, RETRY, ABORT...).</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">ErrorDetail</td>
      <td class="text-center" style="width: 10%;">String</span></td>
      <td class="text-center" style="width: 10%;">optional</span></td>
      <td>Further details on the error itself, if available. For example, if the ErrorName=VALIDATION_FAILED, the ErrorDetail contains a list of the invalid input-fields (“CardNumber”, “ExpYear”, “Ex-pMonth”, etc.)</span></td>     
    </tr>
  </tbody>
</table>

### Return to shop

After the card holder has gone through the 3D Secure and DCC process, he returns to one of the returnUrls.
After that an <a href="http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Authorize">Authorization</a> can be attempted.
