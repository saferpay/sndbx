# Mobile App integration

Payments done via a smartphone through a mobile app, are becoming more and more important.
Saferpay offers the tools needed to be integrated via a mobile app.
The following guide is an extension, to the standard integration methods for the [Transaction interface](https://saferpay.github.io/sndbx/Integration_trx.html) and [Secure Alias Store](https://saferpay.github.io/sndbx/scd.html#scd-sa).

The Integration centers around a client-server model (the app being the client), in which a merchant server hosts all the necessary data, to do the requests itself and store any vital data, the app and therefore the customer/card holder, does not need to know.


## <a name="mobile-process"></a>Process

The general process is as follows:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/App-Integration2.png "App-Integration Process")

1. The app calls the server to make a payment.
2. The Server calls Saferpay, doing either a, [Transaction Initialize](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize), or [Alias Insert](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize).
3. Saferpay responds with a Token and the RedirectUrl.
4. The server saves the Token and forwards the RedirectUrl to the app.
5. The app opens up a native card-form.
6. The card holder enters his card details and submits the form.
7. The card details are posted to saferpay directly, using the RedirectUrl as the endpoint.
8. Saferpay responds with a new RedirectUrl for 3D Secure and DCC, if applicable.
9. The App either opens the Url inside a Webview, or opens the phone browser. 
10. The user may authenticate him/herself through 3DS and perform DCC.
11. Once the external process is completed, the card holder gets redirected to the ReturnUrls
12. The App intercepts the Redirect, through the Webview-handler 
13. The app instead opens up the In-App return-page, while asking the server for the final outcome.
14. The Server executes the [Authorization](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Authorize) and forwards the result to the app.
15. The app confirms the recipience, so the server may finalize and [capture](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture) the payment, while the app either displays a success, or a failure.



## Request and response of Card-Post

### Request
The following parameters need to be posted from the app to the RedirectUrl (See step 7):

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
      <td class="text-center" style="width: 10%;">M</span></td>
      <td>The RedirectUrl will be the endpoint, the card details are posted to!</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">HolderName</td>
      <td class="text-center" style="width: 10%;">String</span></td>
      <td class="text-center" style="width: 10%;">M</span></td>
      <td>Input for the card-holder name.</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">CardNumber</td>
      <td class="text-center" style="width: 10%;">String</span></td>
      <td class="text-center" style="width: 10%;">M</span></td>
      <td>Input for the card-number (PAN).</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">ExpMonth</td>
      <td class="text-center" style="width: 10%;">String</span></td>
      <td class="text-center" style="width: 10%;">M</span></td>
      <td>Input for the expiration-month.</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">ExpYear</td>
      <td class="text-center" style="width: 10%;">String</span></td>
      <td class="text-center" style="width: 10%;">M</span></td>
      <td>Input for the expiration-year.</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">VerificationCode</td>
      <td class="text-center" style="width: 10%;">String</span></td>
      <td class="text-center" style="width: 10%;">M</span></td>
      <td>Input for the Card Verification Code (CVC).</span></td>     
    </tr>
    <tr>
      <td style="width: 15%;">FromAjax</td>
      <td class="text-center" style="width: 10%;">Boolean</span></td>
      <td class="text-center" style="width: 10%;">O</span></td>
      <td>Must be set to "true", in order to recieve a JSON-response!</span></td>     
    </tr>
  </tbody>
</table>

### Response
The Response will be a JSON-Object.

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
      <td>RedirectUrl to open up inside a webview!</span></td>     
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
