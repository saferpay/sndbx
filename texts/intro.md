# Introduction

The Saferpay JSON API (**J**ava**S**cript **O**bject **N**otation **A**pplication **P**rogramming **I**nterface), hereinafter also referred to as JA, is a modern streamlined interface that is independent of programming languages. The JA supports all Saferpay methods and is suitable for all shop systems, call centre solutions, merchandise management, ERP and CRM systems and other applications in which online payments are processed. This Integration Guide focuses on the basics of the Saferpay JSON API and serves as a guide for programmers, developers and integrators.

This Guide uses the [Saferpay JSON-API Specification](https://saferpay.github.io/jsonapi/) as a base reference and will frequently link to the respective Requests. All requests and parameters will be specified there.

## <a name="intro-requirement"></a> Requirements

Use of the JA requires the following:

*	A corresponding licence for the Saferpay module.
*	The existence of a valid identification with a username and password for the Saferpay Backoffice.
*	Availability of at least one active Saferpay terminal via which payment can be carried out and the associated
*	Availability of Saferpay terminal number (TerminalId parameter) and Saferpay customer number (CustomerId parameter).
*	Availability of valid acceptance agreement for credit cards or other payment methods.

## <a name="pci"></a>  Data Security and PCI DSS

The credit card organisations have launched the safety program PCI DSS (Payment Card Industry Data Security Standard) to prevent misuse and fraudulent use of credit cards.

Please pay attention to the PCI DSS guidelines when setting up payment processes and deploying Saferpay.

When using the Saferpay Hosted Register Form together with the optional Saferpay Secure Card Data (SCD), you can set up and handle the payment process safely. No credit card numbers are processed, transferred or stored on your (web) servers.

To use the Saferpay Payment Page, card holders enter their credit card number and expiry date not within the merchant’s e-commerce application, but instead within the Saferpay Payment Page. As the e-commerce application and Saferpay operate on physically separate platforms, there is no risk that the credit card information could be stored in the database of the merchant’s system.

The risk of misuse of credit card details is significantly reduced via the use of Saferpay Secure Card Data or the Saferpay Payment Page and the expenditure required for PCI DSS merchant certification is reduced significantly.

If you have questions about PCI DSS, your processor or a specialised company should be able to assist you. More information can also be found on the [PCI Security Standards Council website](https://www.pcisecuritystandards.org/).

## Additional tips and hints in regards to PCI-compliancy
The following tips, tricks and also "don't"s should help to build a fully PCI-compliant shop-plattform, with relatively little effort.

### Certification Levels
The PCI-DSS certification is devided into multiple compliance levels, called SAQ (Self Assigned Questionary). Each SAQ has its own set of questions and requirements to meet in order to be certified. **Every** party involved with the processing of credit card information has to be PCI-compliant. That includes you -the merchant-, your Payment Service Processor -in this case Saferpay- your Acquirer -for example SIX Payment Services- and the card holders bank -also called Issuer-. Each certification is valid for a year at most and has then to be renewed.

The two PCI levels most relevant for the majority of merchants integrating Saferpay into their webhsop are; SAQ-A and SAQ-A EP.

<div class="warning">
  <p><strong>Attention:</strong> Saferpay is capable of covering multiple levels of PCI-compliance besides SAQ-A and EP. Please contact your acquirer/processor or a specialized company, should you have any questions regarding PCI compliancy. You can also find more information as well as sample SAQ-questionnaires <a href="https://www.pcisecuritystandards.org/document_library?category=saqs#results">on the official PCI DSS website</a> to get a better understanding and overview about the requirements you have to meet as a merchant, or ask your Acquirer/Credit Card Processor (e.g. SIX Payment Services) for help!</p>
</div>


1. **SAQ-A** <br /> This level of certification is the easiest to maintain for a merchant. It mostly involves using a solution, that is maintained by a fully PCI-certified processor. The merchant only specifies his PSP to be compliant, which then holds the risk and responsibility of being compliant. Saferpay is fully PCI SAQ-A compliant and offers solutions for the merchant to be SAQ-A compliant, however the merchant has to follow the following rules, in order to apply this to his plattform: <br /> **The merchant must not use his own (HTML-)form to capture credit card data!** This is now forbidden for SAQ-A merchants, defined by the PCI DSS standard version 3, released on January 1st 2015! The merchant can use the [Saferpay Payment Page](https://saferpay.github.io/jsonapi/index.html#ChapterPaymentPage), or the Hosted Forms inside an iFrame, provided by the transaction Interface through [Transaction Initialize](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize) and the Secure Alias Store through [Alias Insert](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Alias_Insert). <br /> **Every Element on the Payment Page and/or inside the iFrame, must be hosted by a PCI-certified processor!** The merchant is **NOT** allowed to add or change any elements by hosting **external** CSS, or by breaking into the iFrame, using JavaScript. Both the Payment Page as well as the Hosted Forms offer the necessary solutions to meet these PCI requirements. Please refer to chapter [Using CSS](https://saferpay.github.io/sndbx/CssiFrame.html#css-usecss) on how to use the CSS-styling-feature, while being SAQ-A compliant.

2. **SAQ-A EP** <br /> If the SAQ-A level does not suite your requirements or demands, you can certify for SAQ-A EP. This level is more advanced as it enables you to use your own (HTML-)form, however it also requires more effort to be certified. The certification process involves matters like intruder and virus scans and certain firewall configurations.

3. **SAQ-C (VT)** <br /> This is a special certification for merchants, who want to do Mail Phone Order Transactions and card registrations through their own systems. While the JSON-API can be used to capture cards by a merchant employee through the phone, on the merchant system, further tasks and requirements have to be met by the merchant and his system, in order to be allowed to do this. Even the usage of the Saferpay Hosted Form is not enough in this case, because the card details are captured by the merchants employee. Due to that, a higher certification-level is required!

<div class="info">
  <p><strong>Note:</strong> The Saferpay Backoffice itself offers tools to capture card details in a PCI-compliant manner, for Mail Phone Order Transactions, or just register them inside the Secure Alias Store! However the Backoffice does not offer an interface, to be integrated into a merchant-system. If that is required, a SAQ-C certification is inevitable!</p>
</div>

### Processes, that are NOT allowed

Even with an SAQ-A EP certification, some processes are still not allowed. The following describes such processes, that the merchant **MUST NOT DO UNDER ANY CIRCUMSTANCES!**

1. **Credit Card Information**: It is not allowed to process credit card data through the merchants server. This includes, among others posting credit card data from an HTML-form to the merchant-server to perform a Saferpay request. It is especially forbidden to save credit card data. It doesn't just involve saving! It is enough, if the card details run through your system and be it for just a second! **All credit card information involving the Card Verification Code (CVC/CVV) and the card number (PAN), must be processed through Saferpay, if you aren't explicitly allowed to do otherwise!** Saferpay does offer the option, to post the collected data directly, however this can only be used by merchants that are fully PCI-certified and allowed to process/save credit card data accordingly.

<div class="danger">
  <p><strong>Warning: DO NOT</strong> use real credit card details, when testing on the Saferpay test-environment! Even though the test accounts cannot process real payment means, it is also important to not share them in the first place on the test-system, for security reasons!</p>
</div>

## <a name="3ds"></a> 3-D Secure

3-D Secure – 3DS for short – is supported by Visa (Verified by Visa), MasterCard (MasterCard SecureCode), American Express (SafeKey), Diners Club (ProtectBuy) and others. Via liability shift, merchants that offer the 3-D Secure process benefit from fewer payment defaults and from increased security with respect to credit card acceptance. It does not matter whether the card holder (CH) participates in this process or not.

The 3-D Secure procedure can only be used for payments on the Internet. If participating in the process, CHs must identify themselves to their card-issuing banks (issuer) while making payments. Payments that merchants conclude via 3-D Secure are to be specially flagged. Only when the corresponding criteria have been sent with the authorisation to the credit card company does the liability shift apply. This step is done automatically via the Transaction Interface and the Payment Page, meaning that no additional integration costs arise. The authentication of the CH proceeds via a web form provided by the issuer or by the service provider contracted by the issuer. The 3-D Secure authentication of the CH is done via an Internet browser.

A transaction with the 3-D Secure process proceeds as follows:

1.	The merchant sends the credit card details together with the relevant payment data to Saferpay.
2.	Saferpay checks whether the CH uses the 3DS process or not. If yes, she or he will be required to authenticate her or himself to her or his bank. If not, the payment can be carried out without authentication.
3.	The 3DS request will be forwarded to the card-issuing bank via the CH’s Internet browser. The CH must provide proof of identity by using a password, mTAN or another method.
4.	The result of this authentication is sent back to Saferpay via the CO’s Internet browser.
5.	Saferpay checks the result and ensures that no manipulation has occurred. The payment can be continued if the authentication concludes successfully.
6.	Saferpay links the 3DS data to the token used by the JSON API and asks for this automatically when authorising the card.
7.	When receiving the authorisation answer, the merchant also receives information about the output of the 3-D Secure process.

### What is LiabilityShift and why is it important for me as a merchant?

The best way to understand what **LiabilityShift** means, is by a small example:

Let's say a merchant is offering certain goods and gets an order for 1000,-.
The merchant finalizes the order and the money gets charged from the card holders bank account.
After he recieved his money, the merchant ships the goods to the given destination.

After three weeks the merchant gets the information, that this transaction is a fraud-case and that the actual card holder initiated a chargeback.
Here is what happens, either with, or without 3D Secure/LiabilityShift:

1. **Without 3D Secure/Liabilityshift:** 
The Money gets transfered back, from the merchants bank account, to the original card holder. The merchant, in this case, is liable for the damage that has been caused and even though the goods already have been shipped (probably to a criminal subject), he has to pay the full amount back to the card holder. So he carries the whole risk and the cost in a fraud-case!

<div class="danger">
  <p><strong>Attention:</strong> A high amount of chargebacks can also cause penalties from the brands (E.g. VISA and MasterCard) directly! So it can be, that they will force you -the merchant- into using 3D Secure, if the fraud-rate is too high!</p>
</div>

2. **With 3D Secure/LiabilityShift:**
Like the name suggests, the liability gets shiftet!
Shifted from the merchant, to the bank. So in case of fraud, the chargeback gets completely carried by the issuer.
The card holder will get his money back, **BUT**, unlike before, the merchant can keep the charged money. The risk and the cost is carried by the issuer in this case, negating the costs on the merchant side.

### 3D Secure on API-Level

The Saferpay JSON-API does return all necessary information inside the ThreeDs-Container, when using [Transaction Authorize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize) or [PaymentPage Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert).
The important parameters are <strong>Authenticated</strong> and especially <strong>LiabilityShift</strong>.

```json
"ThreeDs": {
  "Authenticated": true,
  "LiabilityShift": true,
  "Xid": "YjJ1LgtpQBZtBA5RMTwDbCUeTAE=",
  "VerificationValue": "AAABBIIFmAAAAAAAAAAAAAAAAAA="
 },
```

It depends on the merchant, how to proceed further, however Saferpay does recommend the following behaviors:

<div class="warning">
  <p><strong>Attention:</strong> These are <strong>only recommendations!</strong> Your credit card contract can dictate otherwise. Please contact your acquirer/card processor for further information!</p>
</div>

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Authenticated</th>
      <th class="text-center">LiabilityShift</th>
      <th class="text-center">Recommended behavior</th>
      <th class="text-center">Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center"><strong>true</strong></td>
      <td class="text-center"><strong>true</strong></td>
      <td>Everything is okay. <strong>Continue transaction!</strong></td>
      <td>A full 3D Secure authentication has been performed by the card holder. This is the best case scenario!</td>
    </tr>
    <tr>
      <td class="text-center"><strong>false</strong></td>
      <td class="text-center"><strong>true</strong></td>
      <td><strong>Continue transaction!</strong></td>
      <td>In some cases, it can be, that the card holders bank grants the LiabilityShift. For instance, some banks only require one 3D Secure every 24 hours and the others will be approved, in order to speed up the payment process. The LiabilityShift is still granted, however high risk businesses (Jewelery, Electronics, ect.) may want to stick to the highest level of security. It is your (The merchant) decision, if you want to accept these transactions, or if you want a full authentication.</td>
    </tr>
    <tr>
      <td class="text-center"><strong>true</strong></td>
      <td class="text-center"><strong>false</strong></td>
      <td><strong>Abort transaction!</strong> Continue at your own risk!</td>
      <td>In this case, the card holder authenticated him-/herself successfully, but his/her bank still rejects the LiabilityShift for internal reasons (Note that we -Saferpay- only get a rejection. The real reason is only known to the card holders bank!). You are allowed to continue, but please note, that you (The merchant) will be liable in case of fraud (See above in this chapter!)! We recommend to not continue!</td>
    </tr>
      <tr>
      <td class="text-center"><strong>false</strong></td>
      <td class="text-center"><strong>false</strong></td>
      <td><strong>Abort transaction!</strong> Continue at your own risk!</td>
        <td>Similar to the previous case, but this time, the card holder <strong>did not</strong> authenticated him-/herself successfully, which causes the LiabilityShift to be completely rejected. You are allowed to continue, but please note, that you (The merchant) will be liable in case of fraud (See above in this chapter!)! We highly recommend to not continue!</td>
    </tr>
  </tbody>
</table>


## <a name="dcc"></a> Dynamic Currency Conversion

Dynamic Currency Conversion (DCC) is a dynamic currency converter that allows international customers to pay the purchase price in the local currency or their home currency. DCC is available for SIX acceptance contracts with DCC expansion. For this, the terminal used for making the payment request receives a base currency in which all transactions are settled. Via DCC, international customers are shown the purchase price in the base currency and the current exchange rate in their national currency. The customer can then decide the currency in which the payment is to be made. Separate implementation by the merchant is not necessary for DCC. Saferpay automatically handles this step during the redirect. 

## <a name="version"></a>  Versioning

If you are implementing new payment methods and/or features, please make sure to implement the correct **SpecVersion** of our API.
If you are unsure, you should refer to the newest SpecVersion. [Our Changelog](https://saferpay.github.io/jsonapi/Changelog.html) will give you further information about the current and past spec-versions.
You'll also find the newest Version in the top left of our [API Specification](https://saferpay.github.io/jsonapi/).

Furthermore, it is possible to go back to previous spec-versions, by adding the version to the url.
For example, if you want to go back to the 1.4 specification, simply add the version to the url like this:

```
https://saferpay.github.io/jsonapi/1.4
```

<div class="info">
  <p><strong>Note:</strong> SpecVersion 1.1 and lower are not available, since those were only released for internal use!</p>
</div>


## <a name="paymentmethods"></a> Supported Payment Methods

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Payment method</th>
      <th class="text-center">Transaction Interface</th>
      <th class="text-center">Payment Page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Visa</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>V PAY</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>MasterCard</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Maestro International</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>American Express</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Bancontact</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Diners Club</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>JCB</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Bonus Card</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Postfinance E-Finance</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c">*</span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>PostFinance Card</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c">*</span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>MyOne</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>SEPA Direct Debit</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>PayPal</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c">*</span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>ePrzelewy</td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>eps</td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>giropay</td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>iDEAL</td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>BillPay Purchase on Receipt</td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>BillPay Direct Debit</td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
        <tr>
      <td>SOFORT</td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>paydirekt</td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Twint</td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Unionpay</td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
  </tbody>
</table>


## <a name="licenses"></a> Licences

Saferpay distinguishes between two licences:

* Saferpay eCommerce
* Saferpay Business

It is extremely important to clarify before the implementation of Saferpay, whether an eCommerce licence or a business license is to be used, as they provide different functions. The Saferpay Business licence is an extension of the eCommerce licence. If you have any queries, please contact your relevant contractually appointed person.

<div class="info">
  <p><strong>Note:</strong> All Saferpay Test-Accounts do have Business activated by default, for evaluation purposes!</p>
</div>

The following table shows an overview of which functions are included in the two licence models:

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Interface</th>
      <th class="text-center">eCommerce</th>
      <th class="text-center">Business</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th><b>PaymentPage Interface</b></th>
      <th></th>
      <th></th>
    </tr>
    <tr>
      <td>Initialize Payment Page</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Assert Payment Page</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <th><b>Transaction Interface</b></th>
      <th></th>
      <th></th>
    </tr>
    <tr>
      <td>Transaction Initialize</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction Authorize</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction QueryPaymentMeans</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction AdjustAmount</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction Authorize Direct</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction Authorize Referenced</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction Capture</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction Cancel</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction Refund</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction Refund Direct</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction Redirect Payment</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction Assert Redirect Payment</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction AssertCapture</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction AssertRefund</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <th><b>Secure Alias Store</b></th>
      <th></th>
      <th></th>
    </tr>
    <tr>
      <td>Alias Insert</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Alias Assert Insert</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Alias Insert Direct</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Alias Delete</td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <th><b>Batch</b></th>
      <th class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></th>
      <th class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></th>
    </tr>
    <tr>
      <td>Close</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
  </tbody>
</table>

<div class="warning">
  <p><strong>*<a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_RedirectPayment">Transaction Interface - Redirect Payment</a></strong> is deprecated and replaced by the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page!</a>. Please use the parameter <strong>PaymentMethods</strong> to directly select your desired provider!</p>
</div>

## <a name="pm-functions"></a> Payment Method Features

Saferpay supports a variety of payment methods, including 3rd party providers such as PayPal. These 3rd party providers are not obligated to support all Saferpay functions. The following table provides an overview of the features supported by the individual payment methods:

<p></p>

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Payment method</th>
      <th class="text-center">Capture</th>
      <th class="text-center">Batch</th>
      <th class="text-center">SCD</th>
      <th class="text-center">Refund</th>
      <th class="text-center">Recurring</th>
      <th class="text-center">DCC</th>
      <th class="text-center">3DS</th>
      <th class="text-center">MOTO</th>
    </tr>
  </thead>
  <tbody>
      <tr>
      <td>American Express</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Bancontact</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #ff0000"></span></td>
      <td> </td>
    </tr>   
    <tr>
      <td>BillPay Direct Debit</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>BillPay Purchase on Receipt</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>Bonus Card</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Diners Club</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
        <tr>
      <td>Discover</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>ePrzelewy</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>eps</td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>giropay</td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>iDEAL</td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>  
    <tr>
      <td>JCB</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Maestro Int.</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
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
    </tr>
    <tr>
      <td>MyOne</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>paydirekt</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>PayPal</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>PostFinance Card</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>PostFinance eFinance</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>SEPA Direct Debit</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>SOFORT</td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
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
    </tr>
        <tr>
      <td>VPay</td>
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
      <td>TWINT</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>Unionpay</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #ff0000"></span></td>
      <td> </td>
    </tr>  
  </tbody>
</table>

<dl class="dl-horizontal">
  <dt>Capture</dt>
  <dd>Capture required</dd>
  <dt>Batch</dt>
  <dd>Daily closing required</dd>
  <dt>SCD</dt>
  <dd>Secure Alias Store available</dd>
  <dt>Refund</dt>
  <dd>Credits payments can be made</dd>
  <dt>Recurring</dt>
  <dd>Recurring payments</dd>
  <dt>DCC</dt>
  <dd>DCC available</dd>
  <dt>3-D Secure</dt>
  <dd>3-D Secure available</dd>
  <dt>MOTO</dt>
  <dd>Mail Phone Order available</dd>
  <dt><span class="glyphicon glyphicon-ok" style="color: #ff0000"></dt>
  <dd>This feature is mandatory, for this payment method to function!</dt>
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

 If a transaction has already passed through the capture, the status is changed to **“CAPTURED”**:

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
Executing the [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) is not needed in this case!

Not all payment methods need a separate capture to trigger the cash flow. You can find an overview of which payment methods should be captured [under Payment Method Features](https://saferpay.github.io/sndbx/index.html#pm-functions). Methods, that do not need the capture, will return the status **"CAPTURED"** right away.

**IMPORTANT:** A reservation made through a certain payment processor, may only last for a limited time only. If this timeframe is exceeded, the authorised amount is released and 
becomes available to the card holder again. This may have the result that the amount can no longer be claimed. If possible, we recommend always triggering the [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) immediately after authorisation. Either by direct API call, or manually via Saferpay Backoffice. If this is not possible, the [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) nonetheless must be done as soon as possible. With PayPal, this must happen within 48 hours. 
Otherwise, it may be that the [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) -and thus the money-transfer- will be refused. For other payment methods, a later [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) is sometimes possible. If necessary, please speak to your processor about guaranteed reservation times.

### <a name="closing"></a>Daily Closing

The daily closing follows the capture once daily, automatically at 22h CEST. During this process, all transactions that have passed through the capture are filed with the payment method processor in order to initiate the cash flow.

If desired, this step can also be triggered via the Saferpay API. The request necessary for this is called [Batch Close](http://saferpay.github.io/jsonapi/index.html#ChapterBatch).

However, before you can use the API, you need to disable the daily closing in the Saferpay 
Backoffice via "Administration -> Terminals" for the respective terminal. Closing should be carried out only once a day.

### <a name="special"></a>Special Cases

#### PAYPAL, SWISS POSTCARD, SEPA ELV, BANCONTACT and paydirekt
With these payment methods, daily closing is triggered alongside the capture automatically for each transaction and the cash flow is initiated immediately. With PayPal, this happens because the right is reserved to refuse the payment. For this reason, we demand the money for you immediately. For Swiss Postcard, this is established in the protocol used by PostFinance. Same goes for SEPA ELV ,Bancontact and paydirekt.

#### Online Banking 
giropay, iDEAL, SOFORT, Bancontact, eprzelewy und eps are online payment methods that trigger a transfer and thus the cash flow via the purchaser’s online banking services. A successful transaction is always 100% complete.

#### Capturing a different amount
The [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) can also be used to change the amount of the transaction. It is generally possible to capture less, than initially authorized. So applying things like voucher codes, or similar is possible. 
Capturing more than initially authorized however, may result in an error and is not recommended. This however depends on your processor.

<div class="warning">
  <p><strong>Attention:</strong> A transaction can only be captured once. If the amount value changes during the payment process, a new transaction has to be initialized with the new adjusted amount. Only PayPal offers the option, to perform partial captures. </p>
</div>

### <a name="reservation"></a>Reservation-Times

The time, in which a reservation can be successfully captured, highly depends on the respective processor and sometimes even the contract. Due to that, we cannot provide exact information, on when exactly to execute the capture of a specific transaction.
Please contact your contract manager, or the processor, in order to get more information on the reservation-times.



