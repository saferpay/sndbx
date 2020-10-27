# Introduction

The Saferpay JSON API (**J**ava**S**cript **O**bject **N**otation **A**pplication **P**rogramming **I**nterface), hereinafter also referred to as JA, is a modern streamlined interface that is independent of programming languages. The JA supports all Saferpay methods and is suitable for all shop systems, call centre solutions, merchandise management, ERP and CRM systems and other applications in which online payments are processed. This Integration Guide focuses on the basics of the Saferpay JSON API and serves as a guide for programmers, developers and integrators.

This Guide uses the [Saferpay JSON-API Specification](https://saferpay.github.io/jsonapi/) as a base reference and will frequently link to the respective Requests. All requests and parameters are specified there.

The sequential steps of the general integration process are described in our [Step-by-step Integration-Manual](https://www.six-payment-services.com/en/site/e-commerce/support/integration.html).

## <a name="intro-requirement"></a> Requirements

Using the JSON API requires the following:

* a valid [JSON API Basic Authentication credential or JSON API client certificate](//saferpay.github.io/jsonapi/#authentication)
* a web client which complies with the [TLS requirements to communicate with the Saferpay servers](//saferpay.github.io/sndbx/tls.html)
*	at least one active Saferpay terminal via which payments can be carried out
*	a Saferpay terminal number (TerminalId parameter) and your Saferpay customer number (CustomerId parameter).
*	a valid acceptance agreement for credit cards or other payment methods.

## <a name="pci"></a>  Data Security and PCI DSS

The credit card organisations have launched the safety program PCI DSS (Payment Card Industry Data Security Standard) to prevent misuse and fraudulent use of credit cards.

Please pay attention to the PCI DSS guidelines when setting up payment processes and deploying Saferpay.

When using the Saferpay Hosted Register Form together with the optional Saferpay Secure Card Data (SCD), you can set up and handle the payment process safely. No credit card numbers are processed, transferred or stored on your (web) servers.

To use the Saferpay Payment Page, card holders enter their credit card number and expiry date not within the merchant's e-commerce application, but instead within the Saferpay Payment Page. As the e-commerce application and Saferpay operate on physically separate platforms, there is no risk that the credit card information could be stored in the database of the merchant’s system.

The risk of misuse of credit card details is significantly reduced via the use of Saferpay Secure Card Data or the Saferpay Payment Page and the expenditure required for PCI DSS merchant certification is reduced significantly.

If you have questions about PCI DSS, your processor or a specialised company should be able to assist you. More information can also be found on the [PCI Security Standards Council website](https://www.pcisecuritystandards.org/).

## Additional tips and hints in regards to PCI-compliancy
The following tips, tricks and also "don't"s should help to build a fully PCI-compliant shop-plattform, with relatively little effort.

### Certification Levels
The PCI-DSS certification is devided into multiple compliance levels, called SAQ (Self Assigned Questionary). Each SAQ has its own set of questions and requirements to meet in order to be certified. **Every** party involved with the processing of credit card information has to be PCI-compliant. That includes you -the merchant-, your Payment Service Processor -in this case Saferpay- your Acquirer -for example SIX Payment Services- and the card holders bank -also called Issuer-. Each certification is valid for a year at most and has then to be renewed.

The two PCI levels most relevant for the majority of merchants integrating Saferpay into their webhsop are; SAQ-A and SAQ-A EP.
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Attention:</strong> Saferpay is capable of covering multiple levels of PCI-compliance besides SAQ-A and EP. Please contact your acquirer/processor or a specialized company, should you have any questions regarding PCI compliancy. You can also find more information as well as sample SAQ-questionnaires <a href="https://www.pcisecuritystandards.org/document_library?category=saqs#results">on the official PCI DSS website</a> to get a better understanding and overview about the requirements you have to meet as a merchant, or ask your Acquirer/Credit Card Processor (e.g. SIX Payment Services) for help!</p>
</div>


1. **SAQ-A** <br /> This level of certification is the easiest to maintain for a merchant. It mostly involves using a solution, that is maintained by a fully PCI-certified processor. The merchant only specifies his PSP to be compliant, which then holds the risk and responsibility of being compliant. Saferpay is fully PCI SAQ-A compliant and offers solutions for the merchant to be SAQ-A compliant, however the merchant has to follow the following rules, in order to apply this to his plattform: <br /> **The merchant must not use his own (HTML-)form to capture credit card data!** This is now forbidden for SAQ-A merchants, defined by the PCI DSS standard version 3, released on January 1st 2015! The merchant can use the [Saferpay Payment Page](Integration_PP.html), [the Saferpay Fields](SaferpayFields.html), for a seamless integration, or the Hosted Forms inside an iFrame, provided by the [Transaction Interface](Integration_trx.html) and the Secure [Alias Store](scd.html#scd-sa). <br /> **Every Element on the Payment Page and/or inside the iFrame, must be hosted by a PCI-certified processor!** The merchant is **NOT** allowed to add or change any elements by hosting **external** CSS, or by breaking into the iFrame, using JavaScript. Both the Payment Page as well as the Hosted Forms offer the necessary solutions to meet these PCI requirements. Please refer to chapter [Using CSS](https://saferpay.github.io/sndbx/CssiFrame.html#css-usecss) on how to use the CSS-styling-feature, while being SAQ-A compliant.

2. **SAQ-A EP** <br /> If the SAQ-A level does not suite your requirements or demands, you can certify for SAQ-A EP. This level is more advanced as it enables you to use your own (HTML-)form, however it also requires more effort to be certified. The certification process involves matters like intruder and virus scans and certain firewall configurations.

3. **SAQ-C (VT)** <br /> This is a special certification for merchants, who want to do Mail Phone Order Transactions and card registrations through their own systems. While the JSON-API can be used to capture cards by a merchant employee through the phone, on the merchant system, further tasks and requirements have to be met by the merchant and his system, in order to be allowed to do this. Even the usage of the Saferpay Hosted Form is not enough in this case, because the card details are captured by the merchants employee. Due to that, a higher certification-level is required!
<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Note:</strong> The Saferpay Backoffice itself offers tools to capture card details in a PCI-compliant manner, for Mail Phone Order Transactions, or just register them inside the Secure Alias Store! However the Backoffice does not offer an interface, to be integrated into a merchant-system. If that is required, a SAQ-C certification is inevitable!</p>
</div>

### Processes, that are NOT allowed

Even with an SAQ-A EP certification, some processes are still not allowed. The following describes such processes, that the merchant **MUST NOT DO UNDER ANY CIRCUMSTANCES!**

1. **Credit Card Information**: It is not allowed to process credit card data through the merchants server. This includes, among others posting credit card data from an HTML-form to the merchant-server to perform a Saferpay request. It is especially forbidden to save credit card data. It doesn't just involve saving! It is enough, if the card details run through your system and be it for just a second! **All credit card information involving the Card Verification Code (CVC/CVV) and the card number (PAN), must be processed through Saferpay, if you aren't explicitly allowed to do otherwise!** Saferpay does offer the option, to post the collected data directly, however this can only be used by merchants that are fully PCI-certified and allowed to process/save credit card data accordingly.

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Warning: DO NOT</strong> use real credit card details, when testing on the Saferpay test-environment! Even though the test accounts cannot process real payment means, it is also important to not share them in the first place on the test-system, for security reasons!</p>
</div>

## <a name="3ds"></a> 3-D Secure

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>New:</strong> Introducing 3-D Secure 2 for Visa and Mastercard. Less hassle for customers, a higher conversion rate for you! Already have a Saferpay Integration with the JSON-API <strong>and 3-D Secure</strong>? Great! Saferpay will rollout 3DSv2 automatically for you starting in May 2019, with no changes needed!</p>
</div>

3-D Secure – 3DS for short – is supported by Visa (Visa Secure), Mastercard (Mastercard ID check), American Express (SafeKey), Diners Club (ProtectBuy) and others. Via liability shift, merchants that offer the 3-D Secure process benefit from fewer payment defaults and from increased security with respect to credit card acceptance. It does not matter whether the card holder (CH) participates in this process or not.

The 3-D Secure procedure can only be used for payments on the Internet. If participating in the process, CHs must identify themselves to their card-issuing banks (issuer) while making payments. Payments that merchants conclude via 3-D Secure are to be specially flagged. Only when the corresponding criteria have been sent with the authorisation to the credit card company does the liability shift apply. This step is done automatically via the Transaction Interface and the Payment Page, meaning that no additional integration costs arise. The authentication of the CH proceeds via a web form provided by the issuer or by the service provider contracted by the issuer. The 3-D Secure authentication of the CH is done via an Internet browser.

A transaction with the 3-D Secure process proceeds as follows:

1.	The merchant sends the credit card details together with the relevant payment data to Saferpay.
2.	Saferpay checks whether the CH uses the 3DS process or not. If yes, she or he will be required to authenticate her or himself to her or his bank. If not, the payment can be carried out without authentication.
3.	The 3DS request will be forwarded to the card-issuing bank via the CH’s Internet browser. 
4.  The Issuing bank, or its 3DS provider will then perform a so called scoring. This scoring will determine the fraud risk, which will lead to one of two outcomes:
  1. <strong>Frictionless:</strong> The fraud risk is low and 3-D Secure will proceed without user interaction. The bank will be the liable entity. This also applies to all orders smaller, or equal to 30 Euro, or equivalent, though with a maximum of 5 concurrent transactions (Globally, not merchant/shop-based!). 
  2. <strong>Challanged:</strong> The fraud risk is high, or the issuer wants to force 3D Secure (E.g. after 5 concurrent transactions, as described aboe!), thus the card holder needs to authenticate him/herself, by using a password and mTAN, an App, or even the fingerprint-sensor on his phone. If 3-D Secure was successfull, the bank will still be the liable entity.
5.	The result of this authentication is sent back to Saferpay.
6.	Saferpay checks the result and ensures that no manipulation has occurred.
7.	Saferpay links the 3DS data to the token used by the JSON API and uses this data automatically when authorising the card.
8.	When receiving the authorisation answer, the merchant also receives information about the output of the 3-D Secure process.

### What is LiabilityShift and why is it important for me as a merchant?

The best way to understand what **LiabilityShift** means, is by a small example:

Let's say a merchant is offering certain goods and gets an order for 1000,-.
The merchant finalizes the order and the money gets charged from the card holders bank account.
After he recieved his money, the merchant ships the goods to the given destination.

After three weeks the merchant gets the information, that this transaction is a fraud-case and that the actual card holder initiated a chargeback.
Here is what happens, either with, or without 3-D Secure/LiabilityShift:

1. **Without 3-D Secure/Liabilityshift:** 
The Money gets transfered back, from the merchants bank account, to the original card holder. The merchant, in this case, is liable for the damage that has been caused and even though the goods already have been shipped (probably to a criminal subject), he has to pay the full amount back to the card holder. So he carries the whole risk and the cost in a fraud-case!
<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Attention:</strong> A high amount of chargebacks can also cause penalties from the brands (E.g. VISA and Mastercard) directly! So it can be, that they will force you -the merchant- into using 3-D Secure, if the fraud-rate is too high!</p>
</div>

2. **With 3-D Secure/LiabilityShift:**
Like the name suggests, the liability gets shiftet!
Shifted from the merchant, to the bank. So in case of fraud, the chargeback gets completely carried by the issuer.
The card holder will get his money back, **BUT**, unlike before, the merchant can keep the charged money. The risk and the cost is carried by the issuer in this case, negating the costs on the merchant side.

### 3-D Secure on API-Level

The Saferpay JSON-API does return all necessary information inside the Liability-Container, when using [Transaction Authorize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize) or [PaymentPage Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert).
The important parameters are <strong>Authenticated</strong> and especially <strong>LiabilityShift</strong>. Furthermore <strong>LiableEntity</strong> will provide information about who will be liable in case of fraud.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Attention:</strong> Only the <a href="Integration_trx.html">Transaction interface</a> and <a href="Integration_PP.html">Payment Page</a> processes do support 3-D Secure! Please keep that in mind, when implementing Saferpay!</p>
</div>

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Attention:</strong> With 3DSv2 the XID value format changes (see respective request specification and below), while the VerificationValue is no longer returned!</p>
</div>

```json
"Liability": {
    "LiabilityShift": true,
    "LiableEntity": "ThreeDs",
    "ThreeDs": {
      "Authenticated": true,
      "LiabilityShift": true,
      "Xid": "63b1c8e6-2f51-4bb8-bd7b-32bb107f9d1b"
    }
  }
```

It depends on the merchant, how to proceed further, however Saferpay does recommend the following behaviors:
<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Tip:</strong> Only want to accept transactions with LiabilityShift? Check out the <strong>Condition</strong>-flag, that can be set within the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page Initialize</a> and <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize">Transaction Authorize</a> requests, to control  whether an authorization should be performed, or not, in the first place. <strong>Important Note:</strong> Issuers may reject the LiabilityShift with the authorization itself. The Condition-parameter does not cover such cases. Please still process the parameters accordingly!
  </p>
</div>

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Attention:</strong> These are <strong>only recommendations!</strong> Your credit card contract can dictate otherwise. Please contact your acquirer/card processor for further information!
  </p>
</div>

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Caution:</strong> Saferpay also returns <strong>LiabilityShift: false</strong>, if the used payment method does not support 3D Secure at all! Please also check the used payment method! Information, about whether, or not a payment method does support 3DS, <a href="index.html#pm-functions">can be found over here!</a>
  </p>
</div>

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Authenticated</th>
      <th class="text-center">LiabilityShift (Overall/3DS)</th>
      <th class="text-center" style="width: 80px;">Liable Entity</th>
      <th class="text-center">Recommended behavior</th>
      <th class="text-center">Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center"><strong>true</strong></td>
      <td class="text-center"><strong>true/true</strong></td>
      <td class="text-center"><strong>ThreeDs</strong></td>
      <td>Everything is okay. <strong>Continue transaction</strong></td>
      <td>A full 3-D Secure authentication has been performed by the card holder. This is the best case scenario</td>
    </tr>
    <tr>
      <td class="text-center"><strong>false</strong></td>
      <td class="text-center"><strong>true/true</strong></td>
      <td class="text-center"><strong>ThreeDs</strong></td>
      <td><strong>Continue transaction</strong></td>
      <td>In some cases, it can be, that the card holders bank grants the LiabilityShift. For instance, some banks only require one 3-D Secure every 24 hours and the others will be approved, in order to speed up the payment process. The LiabilityShift is still granted, however high risk businesses (Jewelery, Electronics, ect.) may want to stick to the highest level of security. It is your (The merchant) decision, if you want to accept these transactions, or if you want a full authentication.</td>
    </tr>
    <tr>
      <td class="text-center"><strong>true</strong></td>
      <td class="text-center"><strong>false/true</strong></td>
      <td class="text-center"><strong>Merchant</strong></td>
      <td><strong>Abort transaction</strong> Continue at your own risk</td>
      <td>In this case, the card holder authenticated him-/herself successfully, but his/her bank still rejects the LiabilityShift during authorization for internal reasons (Note that we -Saferpay- only get a rejection. The real reason is only known to the card holders bank). You are allowed to continue, but please note, that you (The merchant) will be liable in case of fraud (See above in this chapter). We recommend to not continue</td>
    </tr>
      <tr>
      <td class="text-center"><strong>false</strong></td>
      <td class="text-center"><strong>false/false</strong></td>
      <td class="text-center"><strong>Merchant</strong></td>
      <td><strong>Abort transaction</strong> Continue at your own risk</td>
        <td>Similar to the previous case, but this time, the card holder <strong>did not</strong> authenticated him-/herself successfully, which causes the LiabilityShift to be completely rejected. You are allowed to continue, but please note, that you (The merchant) will be liable in case of fraud (See above in this chapter). We highly recommend to not continue</td>
    </tr>
  </tbody>
</table>

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Attention:</strong> If you intend on doing a dummy authorization, using 3-D Secure as a card holder verification measure, we do not recommend an amount < 1,-! Small amounts often get rejected by issuing banks, thus causing issues, with amount 0 not being possible at all.</p>
</div>
<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Tip:</strong> If you want to keep the amount of <strong>Challenged</strong> transactions as low and thus your conversion-rate as high as possible, please make sure to submit a <strong>BillingAddress</strong> and <strong>DeliveryAddress</strong> within the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">PaymentPage Initialize</a> or <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize">Transaction Initialize</a> requests. This information will then be used for the scoring, as mentioned earlier, to increase the possibility of a frictionless transaction and thus a smooth experience for your customers!</p>
</div>

## <a name="dcc"></a> Dynamic Currency Conversion

Dynamic Currency Conversion (DCC) is a dynamic currency converter that allows international customers to pay the purchase price in the local currency or their home currency. DCC is available for SIX acceptance contracts with DCC expansion, via the <a href="Integration_PP.html">Payment Page</a> or the <a href="Integration_trx.html">Transaction Interface</a> flows. For this, the terminal used for making the payment request receives a base currency in which all transactions are settled. Via DCC, international customers are shown the purchase price in the base currency and the current exchange rate in their national currency. The customer can then decide the currency in which the payment is to be made. Separate implementation by the merchant is not necessary for DCC. Saferpay automatically handles this step during the redirect. 

### Example of the DCC response

```json
"Dcc": {
    "PayerAmount": {
      "Value": "352",
      "CurrencyCode": "JPY"
    }
  }
```

## <a name="version"></a>  Versioning

If you are implementing new payment methods and/or features, please make sure to implement the correct **SpecVersion** of our API.
If you are unsure, you should refer to the newest SpecVersion. [Our Changelog](https://saferpay.github.io/jsonapi/Changelog.html) will give you further information about the current and past spec-versions.
You'll also find the newest Version in the top left of our [API Specification](https://saferpay.github.io/jsonapi/).

Furthermore, it is possible to go back to previous spec-versions, by adding the version to the url.
For example, if you want to go back to the 1.4 specification, simply add the version to the url like this:

```
https://saferpay.github.io/jsonapi/1.4
```

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Note:</strong> SpecVersion 1.1 and lower are not available, since those were only released for internal use</p>
</div>

### Important Changes in certain SpecVersions

If you plan on upgrading to a newer SpecVersion, you may have to keep the following major changes in mind:

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center">SpecVersion</th>
      <th class="text-center">Changes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center"><strong>1.17+</strong></td>
      <td>
        <ul>
          <li><strong>Alias Insert Redirect: </strong> The <strong>redirectUrl</strong> has been moved into the new <strong>Redirect</strong> container and out of the root-object.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td class="text-center"><strong>1.12+</strong></td>
      <td>
        <ul>
          <li><strong>Notification E-Mail: MerchantEmail</strong> has been replaced with <strong>MerchantEmails</strong>, a string array, that now accepts up to 10 e-mails, instead of the one, with SpecVersion 1.11 and lower!</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td class="text-center"><strong>1.10+</strong></td>
      <td>
        <ul>
          <li><strong>Refund Handling: </strong>Due to the introduction of <a href="marketplace.html">Partial Captures</a> and thus the splitting of a transaction into multiple transactions, you must do a refund using the <strong>CaptureId</strong> provided in the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a> and <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture">MultipartCapture</a> responses, instead of the <strong>TransactionId</strong>, as with SpecVersions 1.9 and lower!</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td class="text-center"><strong>1.9+</strong></td>
      <td>
        <ul>
          <li><strong>Shift of the ThreeDs-container: </strong>Due to the introduction of <a href="fraud_free.html">the Fraud Free Service</a>, the Liability can now be accepted by one of two entities. Thusly the old <strong>ThreeDs</strong> container has been moved a level down, into the <strong>Liability</strong> container. <strong>This also applies for merchants, that do not use <a href="fraud_free.html">the Fraud Free Service</a>!</strong>. For more information, please consult the <a target="_blank" href="https://saferpay.github.io/jsonapi">API-Specification!</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Tip:</strong> You should also keep an eye on <a target="_blank" href="https://saferpay.github.io/jsonapi/#changelog">our API Changelog</a>, where we keep a record of API changes!</p>
</div>

## <a name="pm-functions"></a> Payment Method Features

Saferpay supports a variety of payment methods, including 3rd party providers such as PayPal. These 3rd party providers are not obligated to support all Saferpay functions. The following table provides an overview of the features supported by the individual payment methods:

<p></p>

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Payment method</th>
      <th class="text-center">Capture|Cancel</th>
      <th class="text-center">Multipart Captures</th>
      <th class="text-center">Batch</th>
      <th class="text-center">SCD</th>
      <th class="text-center">Refund</th>
      <th class="text-center">Recurring</th>
      <th class="text-center">DCC</th>
      <th class="text-center">3DS</th>
      <th class="text-center">MOTO</th>
      <th class="text-center">Testing</th>
    </tr>
  </thead>
  <tbody>
      <tr>
      <td>American Express</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Bancontact</td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #FFBF00"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>   
    <tr>
      <td>BillPay Direct Debit</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
    </tr>
    <tr>
      <td>BillPay Purchase on Receipt</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
    </tr>
    <tr>
      <td>Bonus Card</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Diners Club</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
        <tr>
      <td>Discover</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"> (See Diners)</span></td>
    </tr>
    <tr>
      <td>ePrzelewy</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"> <span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"> <span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>eps</td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
    </tr>
    <tr>
      <td>giropay</td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
    </tr>
    <tr>
      <td>iDEAL</td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #FFBF00"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>  
    <tr>
      <td>JCB</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Maestro Int.</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>    
    <tr>
      <td>Mastercard</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
  </tbody>
</table>   

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Payment method</th>
      <th class="text-center">Capture|Cancel</th>
      <th class="text-center">Multipart Captures</th>
      <th class="text-center">Batch</th>
      <th class="text-center">SCD</th>
      <th class="text-center">Refund</th>
      <th class="text-center">Recurring</th>
      <th class="text-center">DCC</th>
      <th class="text-center">3DS</th>
      <th class="text-center">MOTO</th>
      <th class="text-center">Testing</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>MyOne</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>paydirekt</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>PayPal</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>PostFinance Card</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>PostFinance eFinance</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>SEPA Direct Debit</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #FFBF00"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>SOFORT</td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #FFBF00"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>VISA</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
     <tr>
      <td>VPay <strong>(Processed via Visa!)</strong></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
    </tr>
    <tr>
      <td>TWINT</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #FFBF00"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #FFBF00"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Unionpay</td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Alipay</td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>  
    <tr>
      <td>Apple Pay</td>
      <td class="text-center"><span style="color: #1400ff; font-size: 20px" class="glyphicon glyphicon-unchecked"></span></td>
      <td class="text-center"><span style="color: #1400ff; font-size: 20px" class="glyphicon glyphicon-unchecked"></span></td>
      <td class="text-center"><span style="color: #1400ff; font-size: 20px" class="glyphicon glyphicon-unchecked"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span style="color: #1400ff; font-size: 20px" class="glyphicon glyphicon-unchecked"></span></td>
      <td class="text-center"><span style="color: #1400ff; font-size: 20px" class="glyphicon glyphicon-unchecked"></span></td>
      <td class="text-center"><span style="color: #1400ff; font-size: 20px" class="glyphicon glyphicon-unchecked"></span></td>
      <td class="text-center"><span style="color: #1400ff; font-size: 20px" class="glyphicon glyphicon-unchecked"></span></td>
      <td class="text-center"><span style="color: #1400ff; font-size: 20px" class="glyphicon glyphicon-unchecked"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr> 
    <tr>
      <td>Klarna Payments</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr> 
  </tbody>
</table>

<dl class="dl-horizontal">
  <dt><td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></dt>
  <dd>This feature is available for the given Payment Method!</dd>
  <dt><span class="glyphicon glyphicon-ok" style="color: #ff0000"></span></dt>
  <dd>This feature is mandatory, for this payment method to function!</dd>
  <dt><span class="glyphicon glyphicon-ok" style="color: #FFBF00"></span></dt>
  <dd>This feature needs requirements to be met! Please refer to the specific payment method chapter!</dd>
  <dt><span class="glyphicon glyphicon-remove" style="color: #ff0000"></span></dt>
  <dd>This feature is not available for the given Payment Method!</dd>
  <dt><td class="text-center"><span style="color: #1400ff; font-size: 20px" class="glyphicon glyphicon-unchecked"></span></dt>
  <dd>This feature depends on certain factors! For instance with wallets, it depends on the given means of payment, saved inside the wallet!</dd>
  <dt>Capture|Cancel</dt>
  <dd>
    Capture required, Cancel possible.
  </dd>
  <dt>Multipart Captures</dt>
  <dd>Multipart Captures can be performed! <strong>SIX ACQUIRING ONLY!</strong></dd>
  <dt>Batch</dt>
  <dd>Daily closing required</dd>
  <dt>SCD</dt>
  <dd>Secure Alias Store available</dd>
  <dt>Refund</dt>
  <dd>Credit payments can be made</dd>
  <dt>Recurring</dt>
  <dd>Recurring payments</dd>
  <dt>DCC</dt>
  <dd>DCC available</dd>
  <dt>3-D Secure</dt>
  <dd>3-D Secure available</dd>
  <dt>MOTO</dt>
  <dd>Mail Phone Order available</dd>
  <dt>Testing</dt>
  <dd>A Simulator/Sandbox is available</dd>
</dl>

## <a name="capture-batch"></a> Capture and Daily Closing

These two features are extremely important Saferpay features. Depending on the means of payment, the two can be directly associated with each other and they must be carried out for the cash flow to be initiated to the merchant’s account.

### <a name="capture"></a>Capture

[Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) serves to book and thus to conclude/finalize a payment. As long as a transaction has not passed through the capture, the amount is merely reserved (“authorised”), but it will not be transfered to the merchant account. On the API side, you receive information about the transaction via the **Transaction => Status** parameter (note that this is only a part of the data), e.g. through the [PaymentPage Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert), or [Transaction Authorize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize).
Transactions which have not yet been booked are visible in Saferpay Backoffice as **“Reservation"**, Reservations are marked as **"AUTHORIZED"** on API-level and have to go through the [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture), to be finalized:

```json
"Transaction": {
  "Type": "PURCHASE",
  "Status": "AUTHORIZED",
  "Id": "MUOGAWA9pKr6rAv5dUKIbAjrCGYA",
  "Date": "2015-09-18T09:19:27.078Z",
  "Amount": {
    "Value": "100",
    "CurrencyCode": "CHF"
  },
  "AcquirerName": "AcquirerName",
  "AcquirerReference": "Reference"
}
```

 If a transaction has already passed through, or does not need the capture, the status is changed to **“CAPTURED”**:

```json
"Transaction": {
  "Type": "PURCHASE",
  "Status": "CAPTURED",
  "Id": "MUOGAWA9pKr6rAv5dUKIbAjrCGYA",
  "Date": "2015-09-18T09:19:27.078Z",
  "Amount": {
    "Value": "100",
    "CurrencyCode": "CHF"
  },
  "AcquirerName": "AcquirerName",
  "AcquirerReference": "Reference"
}


```
A [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) may only be executed once! Should a second [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) be attempted, the API will throw an error, informing you, that the [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) already happened:

```json
{
  "ResponseHeader": {
    "SpecVersion": "1.14",
    "RequestId": "93388d85dc4519ea37595121dd8bd4ae"
  },
  "Behavior": "ABORT",
  "ErrorName": "TRANSACTION_ALREADY_CAPTURED",
  "ErrorMessage": "Transaction already captured"
}
```

Not all payment methods need a separate capture to trigger the cash flow. You can find an overview of which payment methods must be captured [under Payment Method Features](https://saferpay.github.io/sndbx/index.html#pm-functions). Methods, that do not need the capture, will return the status **"CAPTURED"** right away.

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Important:</strong> A reservation made through a certain payment processor, may only last for a limited time only. If this timeframe is exceeded, the authorised amount is released and 
becomes available to the card holder again. This may have the result that the amount can no longer be claimed. We recommend to <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a> an authorization as soon as possible. Either by direct API call, or manually via Saferpay Backoffice. If this is not possible, the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a> nonetheless must be done as soon as possible. With PayPal, this must happen within 48 hours. 
Otherwise, it may be that the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a> -and thus the money-transfer- will be refused. For other payment methods, a later <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a> is sometimes possible. If necessary, please speak to your processor about guaranteed reservation times.</p>
</div>

### Why do a Capture in the first place and not finalize the payment right away?

There are multiple reasons, why a capture is the better option:

- Some countries require the merchant to only capture the money, if the goods get delivered and not beforehand! A <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a> together, with the authorization, would be illegal in this case!
- In rare cases, the processor may not respond to the autocapture. In these cases, it may be successfull, or not. You, the merchant, wouldn't know the final status in this case, which would make these cases rather complicated. In case of a seperate <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a>, you can simply execute the request again, with the API giving you the final status!
- Error and exception-handling would be way more costly and complex, with an autocapture. A simple <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel">reversal/Cancel</a>, in case something went wrong (For example rejected LiabilityShift), wouldn't be possible, requiring you, to do a <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Refund">Refund</a>, which will cost you money!
- Fullfilling orders on store side would actually be more complex. What if you cannot deliver? An autocapture, as mentioned before, would lead to a <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Refund">Refund</a>, instead of a simple <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel">reversal/Cancel</a>.
- Features like <a href="partialcaptures.html">partial Captures</a> and <a href="marketplace.html">the Marketplace</a> wouldn't be possible in the first place.

### <a name="closing"></a>Daily Closing

The daily closing follows the capture once daily, automatically at 22h CEST. During this process, all transactions that have passed through the capture are filed with the payment method processor in order to initiate the cash flow.

If desired, this step can also be triggered via the Saferpay API. The request necessary for this is called [Batch Close](http://saferpay.github.io/jsonapi/index.html#ChapterBatch).

However, before you can use the API, you need to disable the daily closing in the Saferpay 
Backoffice via "Administration -> Terminals" for the respective terminal. Closing should be carried out only once a day.

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Important:</strong> Once the closing is complete, a transaction cannot be <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel">cancelled</a></p> anymore! You have to execute a <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Refund">Refund</a> instead!
</div>

### <a name="special"></a>Special Cases

#### PAYPAL, SWISS POSTCARD, SEPA ELV, BANCONTACT and paydirekt
With these payment methods, daily closing is triggered alongside the capture automatically for each transaction and the cash flow is initiated immediately. With PayPal, this happens because the right is reserved to refuse the payment. For this reason, we demand the money for you immediately. For Swiss Postcard, this is established in the protocol used by PostFinance. Same goes for SEPA ELV ,Bancontact and paydirekt.

#### Online Banking 
giropay, iDEAL, SOFORT, Bancontact, eprzelewy und eps are online-banking solutions, that trigger a transfer and thus the cash flow via the purchaser’s online banking services. A successful transaction is always 100% complete.

#### Credit Cards via SIX Acquiring

Credit Cards (Includes: VISA, VPay, Mastercard, Maestro) with SIX Payment Services as processor, also execute the Daily Closing with the [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture)!

#### Capturing a different amount
The [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) can also be used to change the amount of the transaction. It is generally possible to capture less, than initially authorized. So applying things like voucher codes, or similar is possible. 
Capturing more than initially authorized however, may result in an error and is not recommended. This however depends on your processor.

### <a name="reservation"></a>Reservation-Times

The time, in which a reservation can be successfully captured, highly depends on the respective processor and sometimes even the contract. Due to that, we cannot provide exact information, on when exactly to execute the capture of a specific transaction.
Please contact your contract manager, or the processor, in order to get more information on the reservation-times.

### <a name="liventesting"><a/> Testing and Go Live

Saferpay offers an extensive Sandbox, that allows you to simulate transactions, flows and other things. When integrating Saferpay, it is very benefitial, to create your own test-account. 
You can get your own test-account [over here](https://test.saferpay.com).

Everything you need will be sent to you via E-Mail, ncluding things like your test CustomerId, TerminalIds, API user andpassword etc.

#### Difference between the Test and Live environments

- First and foremost, test and live are completely seperated systems. So everything you do on one, or the other, cannot be transferred to the other system, like your transactions, or your saved cards. Due to this, it is very important, that you also seperate your data accordingly and keep an eye on which system the data belongs to. If actions are performed, with data, that does not belong to the respective system, the action will fail. This is so merchants may not confuse one system, with the other. For example by running on the test environment, whilst thinking they're live.
- To reinforce this philosophy, Saferpay will not accept real credit cards on the test environment and vice versa! The test environment uses especially designed test-card, which [can be found over here](paymentmeans.html), alongside information abou the other simulators.
- Furthermore, the test environment only runs simulators, that will emulate the behavior of the given payment method. However, no real money will be transferred, of course.
- The test environment will behave as closely to the live environment, as possible -aside the above mentioned differences-. To ensure this, every function and every URL is mirrored onto the test environment. For example the live backoffice can be found under <a href="https://www.saferpay.com/bo/login">https://www.saferpay.com/bo/login</a>, whereas the test backoffice can be found under <a href="https://test.saferpay.com/bo/login">https://test.saferpay.com/bo/login</a>. You can access any URL, by simply changing the **www** to **test** and vice versa. This also applies to API URLs. For example 
`https://test.saferpay.com/api/Payment/v1/PaymentPage/Initialize` and 
`https://www.saferpay.com/api/Payment/v1/PaymentPage/Initialize`. The JSON-Object structure is the same on both systems, making a switch as easy, as possible.

### Go live

You have completed your testing and are now ready to go live, but do not know how?

Well, if you haven't already, you need to contact our [Sales](https://www.six-payment-services.com/en/home/contacts.html) in order to sign a live contract. Please mention the payment methods and currencies you may want to be activated. Some 3rd party payment methods may also require you to configure certain things, like a UserId, or a password. Those are also necessary for our activation-team to know, so you can process the given method, through Saferpay.

We will then activate everything necessary for you and send you the respective logins and Ids (Customer-and TerminalId), you need  to go live.
However, there are things you need to change on your end, with the Go-Live, before you can start accepting payments:

* As mentioned, you will get new Logins and IDs with your live account. Those have to be changed inside your application.
* The JSON-API user and password need to be set. Once you have recieved your live Backoffice user, you need to log into [the Saferpay Backoffice](https://www.saferpay.com/BO/Login). There you need to create your own credentials under **Settings > JSON API basic authentication** or  **JSON API client certificate**. Those credentials have to be entered inside your application, so your system may authenticate itself towards our gateway. It is exactly the same, as with the credentials, you have recieved with the e-mail for your test account. However, due to security constraints, we will not generate these for you for the live environment. That is, why you have to do it yourself.
* If you are in need of some 3rd party payment methods (e.g. PayPal, Klarna etc.), please make sure, that you also read the respective chapter to that payment method (See **Payment Method specifics**), as those contain vital information, not just for integration, but also activation!
* Lastly, you need to change the request-gateway URL from **https://test.saferpay.com/api/[...]** to **https://www.saferpay.com/api/[...]** in order  to send your requests to the Saferpay live-system, instead of the test-system. Some pre-made modules (Like our own) however offer a live-mode, or a possibility to set the gateway-URL! Please look inside the admin backend of your shop. As mentioned above, all functions, URLs etc. can also be found on the test environment, by just changing this small detail.

After that, we recommend, trying out the payment methods, for example by using your own credit card for a test-order. You can always refund yourself inside the Saferpay Backoffice (If available for the given payment method! [More over here](index.html#pm-functions)), or inside your shop directly, should you have access to [refunds via API](refund.html). This ensures, that everything works as smoothly, as possible. If you encounter any problems during thistest, do not hesitate to contact us, so we may help you fix it as soon, as possible!


### <a name="terms"><a/> Understanding common Saferpay Terms
  
If you start with Saferpay, you'll often encounter certain terms and phrases, that are important to understand, when using Saferpay. What is a Customer, or Terminal ID? What is the difference between a Token and Tokenization?
This part of the introduction aims to help you understand these terms and also their relationship to one another.

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center" style="width: 20%;">Term</th>
      <th class="text-center">Explanation</th>
      <th class="text-center">Where to find it</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center"><strong><a name="customerid"></a> CustomerId</strong></td>
      <td><p>This is your primary account-number! Everything else about your Account is directly linked to this ID e.g.: Terminals, Card Aliases, Backoffice-Accounts, JSON-API Credentials and more!</p></td>
      <td><p>The CustomerId is part of many other things. For example your Backoffice userId: e<strong>123456</strong>001 . It also is contained within your JSON-API userId: API_<strong>123456</strong>_12345678. additionally, it is displayed inside the Backoffice under <strong>Settings > JSON API Basic Authentication</strong> and <strong>Settings > JSON API Client Certificate</strong>.</p></td>
    </tr>
    <tr>
      <td class="text-center"><strong><a name="terminalid"></a> TerminalId</strong></td>
      <td><p>A terminal always belongs to a Customerid and thus one account. The terminal contains certain payment methods, the connected contracts to those payment methods e.g. your acquiring contracts for credit cards, the supported currencies and other settings, like 3D Secure. Each terminal can only have one processor for a given payment method. If you want to process the same payment method over different processors, you need to have two different terminals. Each Saferpay account (CustomerId) can have multiple terminals beneath it. This could also be helpful, if you want to operate multiple shops (e.g. for different countries, or different sets of good alltogether) under one Saferpay account (CustomerId).</p></td>
      <td><p>You can find each terminal for your given account inside the Saferpay Backoffice under <strong>Settings > Terminals</strong></p></td>
    </tr>
    <tr>
      <td class="text-center"><strong><a name="ecomterminal"></a> E Commerce Terminal</strong></td>
      <td><p>This is your standard terminal for transactions. It should be the standard terminal, if you are using <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page Initialize</a> or <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize">Transaction initialize</a> for secure E Commerce transactions (hence the name). You can have one, or more (see TerminalId), if you so desire, e.g. for multiple webshops. This type of terminal usually has the format 17xxxxxx.</p></td>
      <td><p>You can differentiate between all your terminal types inside the Saferpay Backoffice under <strong>Settings > Terminals</strong>:</p>
        <img src="https://raw.githubusercontent.com/saferpay/sndbx/master/images/EComTrm.jpg" alt="Backoffice Terminals">
      </td>
    </tr>
    <tr>
      <td class="text-center"><strong><a name="spgterminal"></a> Secure PayGate (Terminal)</strong></td>
      <td><p>This terminal is the little brother of the E Commerce terminal. While also capable of processing secure E Commerce transactions, it is meant to be used within the Secure PayGate, a Saferpay product, that enables you to send payment-links and offers within an e-mail, through the Saferpay Backoffice. For your normal webshop, you should use your E Commerce terminal. Similar to its bigger brother, it also has the format 17xxxxxx.</p></td>
      <td><p>You can differentiate between all your terminal types inside the Saferpay Backoffice under <strong>Settings > Terminals</strong>:</p>
        <img src="https://raw.githubusercontent.com/saferpay/sndbx/master/images/SPGTrm.jpg" alt="Backoffice Terminals">
      </td>
    </tr>
    <tr>
      <td class="text-center"><strong><a name="mpoterminal"></a> Mail Phone Order (MOTO) Terminal</strong></td>
      <td><p>This terminal is used, like the name suggests, for Mail Phone Order transactions within the Saferpay Backoffice. The background is, that the card holder is unable to perform a 3D Secure Authentication, or enter his/her CVC. Please note, that these security-measures also do not apply with transactions made over this type of terminal! MOTO terminals usually have the following format: 19xxxxxx</p></td>
      <td><p>You can differentiate between all your terminal types inside the Saferpay Backoffice under <strong>Settings > Terminals</strong>:</p>
        <img src="https://raw.githubusercontent.com/saferpay/sndbx/master/images/MPOTrm.jpg" alt="Backoffice Terminals">
      </td>
    </tr>
    <tr>
      <td class="text-center"><strong><a name="spbo"></a> Saferpay Backoffice</strong></td>
      <td><p>This is the Saferpay Web Backend, that contains information about your transactions, settings for your account, API-credentials and more.</p></td>
      <td><p>The Live Backoffice <a href="https://www.saferpay.com/bo/login">can be found over here</a> and the Test Backoffice <a href="https://test.saferpay.com/bo/login">can be found over here</a>.<p></td>
    </tr>
    <tr>
      <td class="text-center"><strong><a name="bologin"></a> Backoffice Login</strong></td>
      <td><p>This is your login to the Saferpay Backoffice and it is directly connected to your CustomerId and thus your Saferpay account. In fact it incorporates the CustomerId. A Backoffice login may look like this: e<strong>123456</strong>001. The first being the type of the login, e for E Commerce, t for technician for example, the second being your CustomerId and the last the overall number of the login for said account.</p></td>
      <td><p>The login will only be sent towards the login owner, that had be requested durign the signing of the Saferpay contract. New logins may be requested, but only through the contract holder of the Saferpay account him/herself.<p></td>
    </tr>
    <tr>
      <td class="text-center"><strong><a name="apicredentials"></a> API Credentials (API User/API Password)</strong></td>
      <td><p>These are your API authentication credentials. They're needed so your shop may authenticate itself which each request, towards our payment gateway. <strong> DO NOT CONFUSE THEM WITH YOUR BACKOFFICE LOGIN AND PASSWORD!</strong> Those are two different things. Each credential pair is linked directly to one CustomerId and only that Id. If you try to authenticate a different CustomerId, with credentials, that aren't connected to said Id, the request will fail. You can easily find out, if a CustomerId and API-user are connected together, by checking the userId itself. The customerId is part of said id: API_<strong>123456</strong>_12345678</p></td>
      <td><p>On the test-environment, you'll get these credentials automatically, with your registration mail. However on the live-system, you need to create them inside the Saferpay Backoffice under <a href="https://test.saferpay.com/BO/Settings/JsonApiLogin"><strong>Settings > JSON API Basic Authentication</strong></a>. There you'll also find a list with previously created  userIds (Also applies to the automatically created test-credentials!). However, please note, that we only save the password encrypted! There is no way to recover it, should you lose it, so keep it somewhere safe, like a password-safe! You can however always create new credentials. Up to 10 are supported per Saferpay account. After that, you need to delete previously created ones.</p></td>
    </tr>
    <tr>
      <td class="text-center"><strong><a name="alias"></a> Card Alias</strong></td>
      <td><p>This value is part of the Saferpay Secure Card Data store, which savely encrypts and stores card data in a PCI compliant manner. Most merchants do not have the necessary PCI certification to handle, in this case save, card details directly. Thusly Saferpay provides a service, that does exactly that. In return the merchant-system gets a card alias, which references the card details. This way the merchant can process card details, without actually knowing them.</p> <p><strong>Furthermore:</strong> It is important to note, that the Card Alias only belongs to one and only one CustomerId and thus Saferpay Account! It cannot be shared between accounts!</p>
     
      </td>
      <td><p>The Alias is only returned through the API, when using <a href="scd.html">Secure Card Data</a>, or it has been set by the merchant in advance. Obtaining the alias in a different manner is not possible!</p></td>
    </tr>
    <tr>
      <td class="text-center"><strong><a name="token"></a> Token</strong></td>
      <td><p>First and foremost, one important thing: <strong>Do not confuse this with tokenization</strong>. Tokenization is essentially, what <a href="scd.html">Secure Card Data</a> is for. However the token is not meant to reference card details. That is, what the alias (See Card Alias) is meant for. It is important to seperate these two values, in order to avoid confusion. The Token is a value returned by the Saferpay API, to enable further actions on a transaction, not a card! So it actually references a specific transaction -and thus indirectly the card details- and by submitting it via the API, Saferpay knows what transaction you want to do an action with. For example with the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a>, Saferpay knows, that you want the transaction details for the transaction behind said token!</p></td>
      <td><p>The token is only returned via the API. Either through <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page Initialize</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize">Transaction Initialize</a>, or <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert">Alias Insert</a>.</p></td>
    </tr>
    <tr>
      <td class="text-center"><strong><a name="transactionid"></a> TransactionId</strong></td>
      <td><p>Each Saferpay transaction gets assigned a unique transactionId. This Id can be used to search for said transaction inside the Saferpay Backoffice, do captures and more. It can also help the Saferpay Support, if you need help with a certain transaction. If available, always submit the transactionId. This way the support can easily find the transaction and help you!</p></td>
      <td><p>The transactionId is returned via the API. Either through <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize">Transaction Authorize</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect">Transaction AuthorizeDirect</a>, or <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeReferenced">Transaction AuthorizeReferenced</a>, inside <strong>Transaction.Id</strong>. Furthermore, you can also find it inside the Saferpay Backoffice, when checking the details for a given transaction.</p></td>
    </tr>
    <tr>
      <td class="text-center"><strong><a name="captureid"></a> CaptureId</strong></td>
      <td><p>With the introduction of <a href="partialcaptures.html">Partial Captures</a>, it became possible to split one transaction into multiple parts, allowing to gather multiple parts of the transaction amount and even transfer it to different bank accounts! However that also made it necessary to give each part its own Id, in order to do <a href="refund.html">Refunds</a> on an individual part! In order to not confuse it with the transactionId, the captureId has the suffix <strong>"_c"</strong>!</p></td>
      <td><p>The captureId is returned via the API. Either through <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Transaction Capture</a>, or <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture">Transaction MultipartCapture</a>.</p></td>
    </tr>
    <tr>
      <td class="text-center"><strong><a name="orderid"></a> OrderId</strong></td>
      <td><p>This Id is your identifier, for a given order. It has to be created by your system and then be submitted through the API inside the <strong>Payment.OrderId</strong> parameter. While not mandatory (Note, that this may be manddatory for certain 3rd party processors!), we highly recommend using it. This Id will be passed through, all the way up to the processor. It will show up inside the Saferpay Backoffice as reference number, which enables you, to search for a transaction with said OrderId. It will also show up on your reconciliation files, you get from your processor, so you are able to keep track of your transactions and it will show up on the card holders bank statement. Note, that this depends on the card holders bank. Some do not support it, even though the OrderId is set! Also, should you use PayerNote (See PayerNote), this will be used instead of the OrderId, to show up on the card holders bank statement, if supported by his bank. The OrderId however will still be used for your reconciliation files.</p></td>
      <td><p>This has to be set by the merchants system in <strong>Payment.OrderId</strong>. Furthermore, you can also find it inside the Saferpay Backoffice, when checking the details for a given transaction, as <strong>Reference number</strong>.</p></td>
    </tr>
    <tr>
      <td class="text-center"><strong><a name="payernote"></a>PayerNote</strong></td>
      <td><p>Sometimes the merchant wants to seperate the Orderid from the text, that is displayed on the card holders bank statement. This is, what PayerNote is used for. If filled, PayerNote will be used, instead of the OrderId, for the card holder. Note, that your reconciliation-files will still use the orderid! <strong>Furthermore, some banks may not support this feature and will instead display a static text.</strong></p></td>
      <td><p>This has to be set by the merchants system in <strong>Payment.Payernote</strong>. <strong>Important Note: Your contract needs to be set up for the usage of the "dynamic descriptor" in order for PayerNote to take effect!. Please contact your contractual manager for more details!</strong></p></td>
    </tr>
  </tbody>
</table>
