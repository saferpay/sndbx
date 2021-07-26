<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>SITE MOVED:</strong> This documentation is outdated, as of July 26th 2021. The new and improved documentation can be found under <a href="https://docs.saferpay.com/home/integration-guide/introduction">https://docs.saferpay.com/</a>.</p>
</div>

# Mobile App integration

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0;"></span>
  <p><strong>VERY IMPORTANT:</strong> Before you start integrating this flow, make sure you have read the <a target="_blank" href="index.html">the Introduction</a> and <a target="_blank" href="Interfaces.html">Licenses and Interfaces</a> chapters. Furthermore, also consider whether <a href="psd2.html">PSD2</a> does apply to you.</p>
</div>

Payments done via a smartphone through a mobile app are becoming more and more important. Saferpay offers the tools needed to be integrated by a mobile app. The following guide is an extension to the standard integration methods for the [transaction interface](https://saferpay.github.io/sndbx/Integration_trx.html) and [Secure Alias Store](https://saferpay.github.io/sndbx/scd.html#scd-sa).

## <a name="mobile-cardprocess"></a>Credit Card Process

General process:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/App-Integration2.png "App-Integration Process")

1. The app sends a message to your backend server to make a payment.
2. The server calls Saferpay, doing either a [Transaction Initialize](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize), or [Alias Insert](https://saferpay.github.io/jsonapi/index.html##Payment_v1_Alias_Insert).
3. Saferpay responds with a token and the RedirectUrl.
4. The server saves the token and forwards the RedirectUrl to the app.
5. The app opens up a native card form.
6. The card holder enters his card details and submits the form.
7. The card details are posted to Saferpay directly, using the RedirectUrl as the endpoint.
8. Saferpay responds with a new RedirectUrl for 3D Secure and DCC, if applicable.
9. The app either opens the Url inside a WebView, or by using the phone's browser. 
10. The user may authenticate him-/herself through 3DS and perform DCC.
11. Once the external process is completed, the card holder gets redirected to the ReturnUrl
12. The app intercepts the redirect through a WebView-handler 
13. The app opens up the in-app return page instead, while asking the server for the final outcome.
14. The server executes the [Authorization](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Authorize) and forwards the result to the app.
15. The app confirms the receipt of the result, so the server may finalize and [capture](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture) the payment, while the app either displays a success, or a failure message to the customer.

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0;"></span>
  <p>
    <strong>CAUTION:</strong> Do not implement calls to Saferpay directly in your app! While technically possible, this would mean that you'd store the authentication credentials (user name and password, or certificate) in the app itself. Those credentials can be extracted and then used for mailicious actions on your account. <strong>ALWAYS</strong> implement the server-client model described above. 
  </p>
</div>

## Request and response of Card-Post

### Request
The following parameters need to be posted from the app to the RedirectUrl (See step 7 above):

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
      <td class="text-center" style="width: 10%;">URL</td>
      <td class="text-center" style="width: 10%;">mandatory</td>
      <td>Endpoint where the card details are posted to</td>     
    </tr>
    <tr>
      <td style="width: 15%;">HolderName</td>
      <td class="text-center" style="width: 10%;">String</td>
      <td class="text-center" style="width: 10%;">mandatory</td>
      <td>Card holder name</td>     
    </tr>
    <tr>
      <td style="width: 15%;">CardNumber</td>
      <td class="text-center" style="width: 10%;">String</td>
      <td class="text-center" style="width: 10%;">mandatory</td>
      <td>Card number (PAN)</td>     
    </tr>
    <tr>
      <td style="width: 15%;">ExpMonth</td>
      <td class="text-center" style="width: 10%;">String</td>
      <td class="text-center" style="width: 10%;">mandatory</td>
      <td>Expiration month</td>     
    </tr>
    <tr>
      <td style="width: 15%;">ExpYear</td>
      <td class="text-center" style="width: 10%;">String</td>
      <td class="text-center" style="width: 10%;">mandatory</td>
      <td>Expiration year</td>     
    </tr>
    <tr>
      <td style="width: 15%;">VerificationCode</td>
      <td class="text-center" style="width: 10%;">String</td>
      <td class="text-center" style="width: 10%;">mandatory</td>
      <td>Card Verification Code (CVC)</td>     
    </tr>
    <tr>
      <td style="width: 15%;">FromAjax</td>
      <td class="text-center" style="width: 10%;">Boolean</td>
      <td class="text-center" style="width: 10%;">optional</td>
      <td>Must be set to "true" in order to receive a JSON response</td>     
    </tr>
  </tbody>
</table>

### Response
The response will be a JSON object.

#### Success response in case of an http-200 response:

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
      <td class="text-center" style="width: 10%;">URL</td>
      <td class="text-center" style="width: 10%;">mandatory</td>
      <td>Url to open up inside a WebView</td>     
    </tr>
  </tbody>
</table>

#### Error response in case of an http-4xx response:

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
      <td class="text-center" style="width: 10%;">String</td>
      <td class="text-center" style="width: 10%;">mandatory</td>
      <td>Description or ID of the error</td>     
    </tr>
    <tr>
      <td style="width: 15%;">Behavior</td>
      <td class="text-center" style="width: 10%;">String</td>
      <td class="text-center" style="width: 10%;">mandatory</td>
      <td>Further details on how to proceed (RETRY_LATER, RETRY, ABORT...)</td>     
    </tr>
    <tr>
      <td style="width: 15%;">ErrorDetail</td>
      <td class="text-center" style="width: 10%;">String</td>
      <td class="text-center" style="width: 10%;">optional</td>
      <td>Further details on the error, if available. For example, if the ErrorName=VALIDATION_FAILED, the ErrorDetail contains a list of the invalid input-fields (“CardNumber”, “ExpYear”, “ExpMonth”, etc.)</td>     
    </tr>
  </tbody>
</table>

## <a name="mobile-alterprocess"></a> 3rd Party Payment Methods

All 3rd party payment methods are exclusively provided via the <a href="Integration_PP.html">Payment Page</a>, since they mostly require web-based redirects to be processed.

3rd party payment methods process: 

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/mobile_3rd_party.png "App-Integration Process")

1. The app sends a message to your backend server to make a payment.
2. The server calls Saferpay, doing a [Payment Page Initialize](https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Initialize) request.
3. Saferpay responds with a token and the RedirectUrl.
4. The server saves the token and forwards the RedirectUrl to the app.
5. The app opens the URL in a WebView.
6. The customer performs the payment.
7. Afterwards, Saferpay will redirect the customer back to one of the corresponding Return URLs (see #11), while also notifying the server.
8. The server executes the [Payment Page Assert](https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Assert) request to gather the payment data.
9. Saferpay responds with the payment data, which then gets saved on the server.
10. The server forwards the result and any additional data to the app.
11. It is also possible to intercept the redirect, so the app may perform a web-to-app switch.
12. The app displays a success or failure message to the customer, while the server finalizes (Capture etc.) the payment.


<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0;"></span>
  <p>
    An exception from this process is Bancontact, which offers an <a href="bancontact.html#bancontact-directmode">alternative payment process</a>.
  </p>
</div>
