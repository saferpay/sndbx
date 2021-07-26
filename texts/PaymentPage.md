<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>SITE MOVED:</strong> This documentation is outdated, as of July 26th 2021. The new and improved documentation can be found under <a href="https://docs.saferpay.com/home/integration-guide/introduction">https://docs.saferpay.com/</a>.</p>
</div>

# Payment Page Interface

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>VERY IMPORTANT:</strong> Before you start integrating this flow, make sure, you have read the <a target="_blank" href="index.html">the Introduction</a> and <a target="_blank" href="interfaces.html">Licenses and Interfaces</a> chapters. They contain general and vital information, not only about the JSON-API, but also for you, the merchant! Furthermore, also make make sure, whether, or not <a href="psd2.html">PSD2</a> does apply to you!</p>
</div>

The Saferpay [Payment Page Interface](https://saferpay.github.io/jsonapi/#ChapterPaymentPage)<sup>1</sup> is intended for a simplified and universal integration of the payment process by using the PaymentPage payment form<sup>2</sup>. The Saferpay Payment Page can be used both with a Saferpay eCommerce license and with a Saferpay business license. All Saferpay supported payment methods can be processes with the Payment Page Interface; credit cards and third-party payment methods like “PayPal, iDEAL, SOFORT/Klarna and more. Once integrated, more payment methods can be added at any time without major adjustments.

The PaymentPage can be either used to offer the payer the option to select a desired payment method or can be defined to jump directly to one specific payment method with a preselection option. Please read chapter [**Iframe Integration and CSS**](https://saferpay.github.io/sndbx/CssiFrame.html#chapter-css-iframe) for examples of the different payment forms. It can also be used in combination with the Secure Card Data to store/tokonize payment data during the payment process. 

*<sup>1</sup> this term refers to name of the interface*<br>
*<sup>2</sup> this term refers to the actual payment form which is used to capture payment details*

## Description of the general process for using the Payment Page Interface

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/PP_FlowChart2.PNG "Payment Page Flow Chart")

1. [Payment Page Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize)
    * Initializes the Payment and generates the RedirectUrl for the Payment Page.
2. Redirect to the RedirectUrl
3. Return to ReturnUrl depending on the outcome of the transaction. The ReturnUrls are defined in step 1.
4. [Payment Page Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert)
    * Gathers all the information about the payment, like LiabilityShift through 3D Secure and more, using the Token, gathered in step 1.
5. Depending on the outcome of step 4 you may
    * [Capture/Finalize the Transaction](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture)
    * [Cancel/Abort the Transaction](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel)
6. Transaction is finished! 

### <a name="pp-initialize"></a> 1 - PaymentPage Initialize

The process begins with the [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize) request. With this request, you forward all data necessary for the payment to Saferpay. These include the customer number (CustomerId), the terminal number (Terminal Id), the currency (CurrencyCode), the amount (Value), the internal reference no. of the merchant system (OrderId), and the return addresses (ReturnUrls) to which the customer will return after leaving the PaymentPage.


### Information on the Use and Significance of the Available Parameters

+ **PaymentMethods:** By default, the PaymentPage will always show all payment methods approved for the terminal in question. Limiting the display to a single item or preselection of the payment methods in the shop can be achieved via the **PaymentMethods** parameter. When using this parameter, the only payment methods displayed are those whose values are forwarded.  When forwarding multiple values, the PaymentPage opens with a page which offers the option to select the appropriate payment method. If only one value is passed, the PaymentPage skips the selection window. Invalid values or values from payment methods which are not available on the terminal or not available with the specified currency are ignored by the PaymentPage. For example, if only one value is forwarded and this is invalid, the PaymentPage will display the same options as if **PaymentMethods** had not been used.

+ **Strong Consumer Authentication (SCA):** If a certain transaction needs SCA (please refer to the <a href="psd2.html">PSD2 chapter</a>), you can force SCA, by setting **Authentication.ThreeDsChallenge** to **"FORCE"**.

+ **ReturnUrls:** Via the **ReturnUrls**, the customer is returned to the shop after the transaction. For security reasons, Saferpay returns no data to return addresses. The identification of the payment or the returning customers is up to the merchant. We recommend using your own parameters. These can be attached via HTTP GET to the **ReturnUrls**. When a ReturnUrl is called, Saferpay returns the appended parameter, thus enabling identification of the customer/transaction. The ReturnUrls are **ALWAYS** called through the clients Browser. 

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> If you intent on using <a href="index.html#dcc">Dynamic Currency Conversion (DCC)</a>, it is highly recommended to set the Abort Url, even though optional!
  </p>
</div>

+ **"Notification"=>"NotifyUrl":** Although it is optional, we **strongly** recommend integrating the **NotifyUrl** (see Notification container). Due to its technical nature, the redirect to the **SuccessUrl** may fail, if the user closes his browser window prematurely, or loses connection e.g. on a mobile device, due to a bad mobile connection. In these cases, the merchant shop would never recieve the success-message and thus would believe the transaction to be still open, or even failed. The **NotifyUrl** is a measure to circumvent this behaviour. Technically speaking, the **NotifyUrl** call notifies the merchant system, as a redundant measure. Think a second **SuccessUrl**. However in contrast to the **SuccessUrl**, the **NotifyUrl** is called up directly via HTTP GET by the Saferpay servers upon a successful payment and not by the client browser. It should be noted that the notification via **NotifyUrl** takes place in addition to the SuccessUrl, due to its redundant nature. Make sure, that your system can handle both calls, so it doesn't interpret them as two separate payments. Moreover, Saferpay expects the merchant server to answer the call with a HTTP status code 200(OK). If no (e.g. a Timeout after 10 seconds), or a different status code (e.g. http 500) is received, Saferpay will call the **NotifyUrl** up to two times more, for a total of three times, to ensure, that the previous error is not caused by a temporal problem. 
</ br>
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>VERY IMPORTANT:</strong> The usage of <strong>the NotifyUrl</strong> is strongly recommended! Only leave it out, if your system cannot recieve external requests!</p>
</div>
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Important Note:</strong> The NotifyUrl also does not return any data to the merchants application, except your own parameters (See <strong>ReturnUrls</strong> above!)!</p>
</div>
<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Note:</strong> The NotifyUrl is only called, if the transaction is successful!
  </p>
</div>

+ **"Payment"=>"OrderId":** This optinal parameter is important to keep track of all your transactions in later processes. This ID will be forwarded, so it will show up inside the Saferpay Backoffice (As the Reference number!) and on your reconciliation-files. This will help associate all the transactions for your accounting-department.

+ **BillingAddressForm and DeliveryAddressForm:** The use of **BillingAddressForm** and/or **DeliveryAddressForm** allows card holders to fill in an address-form during payment. This enables merchants to capture their address-data without having to implement a form on their own. It can be freely decided which entry fields are mandatory to fill in and which are not. Upon completion of the payment, Saferpay returns the addresses via the [PaymentPage Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert) response.

+ **Card Verification Value:** The Card Verification Value (CVC) is mandatory, when using the PaymentPage, except for card brand Maestro, which offers cards with and without CVC.

+ **Card Holder:** This value is mandatory, however you may hide the input field. See the **CardForm** container inside the [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize) request.

+ **RegisterAlias:** Via the **RegisterAlias** container, card details from a payment can be stored safely and in conformity with PCI.  [See the Secure Card Data chapter](scd.html#scd-pp) for more information. 
<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Note:</strong> A card will be registered only after a successful authorisation. Although the Payment Page Interface can be used to register (store) payment data, it is <strong>NOT</strong> possible to use it for future payments. Registered card data can only be used with the <a href="https://saferpay.github.io/sndbx/Integration_trx.html">Transaction Interface</a>.</p>
</div>

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Tip:</strong> Don't like the style of the PaymentPage? Try our <a target="_blank" href="CssiFrame.html#css-usecss">CSS-Styling feature!</a></p>
</div>

## <a name="pp-initialize-response"></a>PaymentPage Initialize Response

### Inside the PaymentPage Initialize Response, the following parameters are important:

+ **Token:** The **Token** refers to the values temporarily stored regarding the Saferpay transaction and is mandatory during subsequent processing of the transaction ([for more information, see e.g. PaymentPage Assert](http://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Assert)). The Token should be coupled to the http-GET parameters that were previously attached to the **ReturnUrls** and **NotifyUrl** for identification and then stored inside a database, for further actions to come!

+ **RedirectUrl:** The **RedirectURL** provides the address via which the buyer is redirected to the PaymentPage. This can be done automatically via calling up the Iframe or by embedding the URL in an HTML link that must be clicked on by the buyer.<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>VERY IMPORTANT:</strong> The <strong>RedirectUrl</strong> can only be called one time, due to security restraints. Please make sure, that the <strong>RedirectUrl</strong> cannot be called twice. The second call will automatically trigger the <strong>FailUrl</strong> or <strong>AbortUrl</strong>, if the latter is defined!</p>
</div>


## <a name="pp-transaction"></a> 2 - Redirect and Transaction

Redirect the buyer to the **RedirectUrl** from the  [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize) response, using your desired method.
The transaction will be fully processed by the PaymentPage. The Payment Page handles all steps automatically, including [3D Secure](https://saferpay.github.io/sndbx/index.html#3ds) and [DCC](https://saferpay.github.io/sndbx/index.html#dcc). No additional steps are necessary on the merchant website.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> Saferpay does not recommend the usage of a Client-Side Session (Cookie), for customer identification, due to restrains emposed by browser manufacturers! Those can cause the Session getting lost, during the payment process, thus causing the shop to not being able to identify the returning user. We recommend using GET-parameters, as described above (See parameter-description for Initialize)!
  </p>
</div>

## <a name="pp-retshop"></a> 3 - Return to the Shop

Once the transaction is complete, the card holder – depending on the outcome – is taken back to the shop, to one of the **ReturnUrls**. Here, the GET parameters can be read and the **Token** can be assigned to the transaction. With the **Token**, the payment can be continued to the next step.

## <a name="pp-assert"></a> 4 - PaymentPage Assert

With the [PaymentPage Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert), the results of a transaction are requested. The returned data may be stored on the merchant side.
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Important:</strong> The Assert does <strong>NOT</strong> do the transaction itself. The PaymentPage will do that automatically for you. The Assert only calls for the result! So, if you call the Assert, the transaction already happened!</p>
</div>

Based on the data obtained, it is to be decided whether or not a transaction is to be further processed. The following data is interesting in this regard:

+ **Transaction > ID:** The transaction identifier returned in the container **Transaction** with **Id** is a unique identifier for a transaction. The value is obligatory for further processing steps (Transaction Capture or Transaction Cancel) and should therefore be saved.

+ **ThreeDs:** This container provides information about whether or notliability shift through [3D Secure](https://saferpay.github.io/sndbx/index.html#3ds) is available or not. It is up to merchant whether or not he wants to accept transactions without liability shift. Evaluation of the parameter provides the opportunity for merchants to incorporate appropriate rules here.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Important:</strong> Accepting transaction without LiabilityShift happens at the merchants own risk.</p>
</div>

+ **Transaction > Status:** As already described [here](https://saferpay.github.io/sndbx/index.html#capture-batch), this status states whether or not a transaction has to be finalized via [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture). If this status is not **CAPTURED**, the capture must be executed in order to finalise the transaction.

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Tip:</strong> You can also call the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a>, if the Fail-or AbortUrl has been called. It will then return a JSON-Object, containing information about the failed transaction, like the reason (If available!) and error-code from the processor itself! Note, that the http-status will be != 200, indicating a failed transaction!</p>
</div>
<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Info:</strong> Under certain circumstances a PaymentPage Session can be valid for about 1 hour -other sessions, like external redirections to 3D Secure and 3rd party providers can add up to this!-, but a normal session does not take longer, than 20 minutes!</p>
</div>
<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Tip:</strong> The <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a> can be called up to 24 hours, after the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page Initialize</a>!</p>
</div>

## <a name="pp-captcancel"></a> 5 - Capture or Cancel

Subsequently, the transaction will be finalised via [**Capture**](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) or aborted via [**Cancel**](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel).For this, the transaction identifier **Id** is required. Please refer to the notes [in the payment methods chapter](index.html#pm-functions), to check, if and when a **Capture** is necessary, and whether a **Cancel** can still be executed. Alternatively, you can also check the **Transaction.Status** parameter, within the [PaymentPage Assert Response](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert). If the status is **AUTHORIZED** a [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) needs to be performed. If the status is **CAPTURED** you do not need to finalize the payment.

Once these steps are complete, the transaction is completed.
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>VERY IMPORTANT:</strong> Keep in mind that you <strong>cannot cancel</strong> a transaction, once it is captured! At that point, a refund has to be executed, <a href="index.html#pm-functions">if available</a>! So please make sure, that you really want to finalize the transaction and initiate the money transfer, to avoid confusion with your customers!</p>
</div>

## <a name="pp-demo"></a> Try it out!

<a href="https://shop.saferpay.eu/saferpayintegration" class="demobtn">Click here for a live demo!</a>
