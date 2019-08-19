# Introduction

The Saferpay JSON API (**J**ava**S**cript **O**bject **N**otation **A**pplication **P**rogramming **I**nterface), hereinafter also referred to as JA, is a modern streamlined interface that is independent of programming languages. The JA supports all Saferpay methods and is suitable for all shop systems, call centre solutions, merchandise management, ERP and CRM systems and other applications in which online payments are processed. This Integration Guide focuses on the basics of the Saferpay JSON API and serves as a guide for programmers, developers and integrators.

This Guide uses the [Saferpay JSON-API Specification](https://saferpay.github.io/jsonapi/) as a base reference and will frequently link to the respective Requests. All requests and parameters are specified there.

The sequential steps of the general integration process are described in our [Step-by-step Integration-Manual](https://www.six-payment-services.com/en/site/e-commerce/support/integration.html).

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

<div class="info">
  <p><strong>New:</strong> Introducing 3D Secure 2 for Visa and Mastercard. Less hassle for customers, a higher conversion rate for you! Already have a Saferpay Integration with the JSON-API <strong>and 3D Secure</strong>? Great! Saferpay will rollout 3DSv2 automatically for you starting in May 2019, with no changes needed!</p>
</div>

3-D Secure – 3DS for short – is supported by Visa (Visa Secure), Mastercard (Mastercard ID check), American Express (SafeKey), Diners Club (ProtectBuy) and others. Via liability shift, merchants that offer the 3-D Secure process benefit from fewer payment defaults and from increased security with respect to credit card acceptance. It does not matter whether the card holder (CH) participates in this process or not.

The 3-D Secure procedure can only be used for payments on the Internet. If participating in the process, CHs must identify themselves to their card-issuing banks (issuer) while making payments. Payments that merchants conclude via 3-D Secure are to be specially flagged. Only when the corresponding criteria have been sent with the authorisation to the credit card company does the liability shift apply. This step is done automatically via the Transaction Interface and the Payment Page, meaning that no additional integration costs arise. The authentication of the CH proceeds via a web form provided by the issuer or by the service provider contracted by the issuer. The 3-D Secure authentication of the CH is done via an Internet browser.

A transaction with the 3-D Secure process proceeds as follows:

1.	The merchant sends the credit card details together with the relevant payment data to Saferpay.
2.	Saferpay checks whether the CH uses the 3DS process or not. If yes, she or he will be required to authenticate her or himself to her or his bank. If not, the payment can be carried out without authentication.
3.	The 3DS request will be forwarded to the card-issuing bank via the CH’s Internet browser. 
4.  The Issuing bank, or its 3DS provider will then perform a so called scoring. This scoring will determine the fraud risk, which will lead to one of two outcomes:
  1. <strong>Frictionless:</strong> The fraud risk is low and 3D Secure will proceed without user interaction. The bank will be the liable entity. This also applies to all orders smaller, or equal to 30 Euro, or equivalent.
  2. <strong>Challanged:</strong> The fraud risk is high, thus the card holder needs to authenticate him/herself, by using a password and mTAN, an App, or even the fingerprint-sensor on his phone. If 3D Secure was successfull, the bank will still be the liable entity.
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

The Saferpay JSON-API does return all necessary information inside the Liability-Container, when using [Transaction Authorize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize) or [PaymentPage Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert).
The important parameters are <strong>Authenticated</strong> and especially <strong>LiabilityShift</strong>. Furthermore <strong>LiableEntity</strong> will provide information about who will be liable in case of fraud.

<div class="warning">
  <p><strong>Attention:</strong> Only the <a href="Integration_trx.html">Transaction interface</a> and <a href="Integration_PP.html">Payment Page</a> processes do support 3D Secure! Please keep that in mind, when implementing Saferpay!</p>
</div>

```json
"Liability": {
    "LiabilityShift": true,
    "LiableEntity": "ThreeDs",
    "ThreeDs": {
      "Authenticated": true,
      "LiabilityShift": true,
      "Xid": "63b1c8e6-2f51-4bb8-bd7b-32bb107f9d1b",
      "VerificationValue": "unavailable"
    }
  }
```

It depends on the merchant, how to proceed further, however Saferpay does recommend the following behaviors:


<div class="info">
  <p><strong>Tip:</strong> Only want to accept transactions with LiabilityShift? Check out the <strong>Condition</strong>-flag, that can be set within the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page Initialize</a> and <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize">Transaction Authorize</a> requests, to control  whether an authorization should be performed, or not, in the first place.</p>
</div>
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
      <td>Everything is okay. <strong>Continue transaction</strong></td>
      <td>A full 3D Secure authentication has been performed by the card holder. This is the best case scenario</td>
    </tr>
    <tr>
      <td class="text-center"><strong>false</strong></td>
      <td class="text-center"><strong>true</strong></td>
      <td><strong>Continue transaction</strong></td>
      <td>In some cases, it can be, that the card holders bank grants the LiabilityShift. For instance, some banks only require one 3D Secure every 24 hours and the others will be approved, in order to speed up the payment process. The LiabilityShift is still granted, however high risk businesses (Jewelery, Electronics, ect.) may want to stick to the highest level of security. It is your (The merchant) decision, if you want to accept these transactions, or if you want a full authentication.</td>
    </tr>
    <tr>
      <td class="text-center"><strong>true</strong></td>
      <td class="text-center"><strong>false</strong></td>
      <td><strong>Abort transaction</strong> Continue at your own risk</td>
      <td>In this case, the card holder authenticated him-/herself successfully, but his/her bank still rejects the LiabilityShift for internal reasons (Note that we -Saferpay- only get a rejection. The real reason is only known to the card holders bank). You are allowed to continue, but please note, that you (The merchant) will be liable in case of fraud (See above in this chapter). We recommend to not continue</td>
    </tr>
      <tr>
      <td class="text-center"><strong>false</strong></td>
      <td class="text-center"><strong>false</strong></td>
      <td><strong>Abort transaction</strong> Continue at your own risk</td>
        <td>Similar to the previous case, but this time, the card holder <strong>did not</strong> authenticated him-/herself successfully, which causes the LiabilityShift to be completely rejected. You are allowed to continue, but please note, that you (The merchant) will be liable in case of fraud (See above in this chapter). We highly recommend to not continue</td>
    </tr>
  </tbody>
</table>

<div class="warning">
  <p><strong>Attention:</strong> If you intend on doing a dummy authorization, using 3D Secure as a card holder verification measure, we do not recommend an amount < 1,-! Small amounts often get rejected by issuing banks, thus causing issues, with amount 0 not being possible at all.</p>
</div>
<div class="info">
  <p><strong>Tip:</strong> If you want to keep the amount of <strong>Challanged</strong> transactions as llow and thus your conversion-rate as high as possible, please make sure to submit a <strong>BillingAddress</strong> within the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">PaymentPgae Initialize</a> or <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize">Transaction Initialize</a> requests. This information will then be used for the sccoring, as mentioned earlier, to ensure a frictionless transaction and thus a smooth experience for your customers!</p>
</div>

## <a name="psd2"></a> PSD2 and 3D Secure

As of September 14th 2019, all credit card transactions inside the European Union must be secured by some form of <strong>Strong Consumer Authentication (SCA)</strong>, as defined inside the **Payment Services Directive**. In order to provide a compliant solution for our customers, Saferpay will automatically provide 3D Secure v2 to all transactions via the <a href="Integration_PP.html">Payment Page</a> or <a href="Integration_trx.html">Transaction Interface</a> flows. Therefore 3DS will be <strong>mandatory</strong> for all merchants doing business within the EU. 

<div class="info">
  <p><strong>Tip:</strong> As a rule of thumb, ask yourself the following question: Is the card holder present, to enter his/her card details, or otherwise be able to interact with your webshop/system? If so: Do 3D Secure!</p>
</div>

However, there are excemptions and to give you an overview of what flows need and what do need SC, please refer to the following tables:

### Transactions and flows, that DO need SCA

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center" style="width: 140px;">Case</th>
      <th class="text-center">Description</th>
      <th class="text-center">Flows/Requests</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center">Customer Initiated Transactions</td>
      <td>This is your standard transaction-type. The card holder comes to the shop and orders something. The card holer is present during these transactions and as mentioned above, they must be covered with SCA and thus 3D Secure!</td>
      <td><a href="Integration_PP.html">Payment Page Integration</a>, <a href="Integration_trx.html">Transaction interface Integration</a></td>
    </tr>
    <tr>
      <td class="text-center">Initial Recurring Transaction</td>
      <td>This is a special type of Customer Initiated Transaction. With PSD2 the first (initial) transaction within a recurring-chain needs to be covered by SCA. Each subsequent transaction then references this transaction. </td>
      <td><a href="recurring.html">Recurring Integration</a>, <a href="Integration_PP.html">Payment Page Integration</a>, <a href="Integration_trx.html">Transaction Interface Integration</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize">Transaction Initialize</a> & <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize">Transaction Authorize</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page Initialize</a> & <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a></td>
    </tr>
  </tbody>
</table>

### Transactions and flows, that DO NOT need SCA

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center" style="width: 140px;">Case</th>
      <th class="text-center">Description</th>
      <th class="text-center">Flows/Requests</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center">Merchant Initiated Transactions</td>
      <td>Basically all transactions, that are triggered by Merchant, with the card holders consent, while not being present, e.g. Installments. <strong>MITs do not offer LiabilityShift!</strong></td>
      <td><a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect">Authorize Direct</a> e.g. using <a href="https://saferpay.github.io/sndbx/scd.html">an alias</a></td>
    </tr>
    <tr>
      <td class="text-center">Subsequent Recurring Transaction</td>
      <td>
        These are transactions, that follow the initial recurring transaction (see above) and are a special type of Merchant initiated Transaction (see above).. They must reference the initial transaction. Note, that due to that, they effectively also reference to the LiabilityShift of the initial transaction, giving an additional layer of protection for the merchant, by effectively granting subsequent LiabilityShift.
        <div class="warning">
          <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
          <p>
            <strong>Important:</strong> The subsequent LiabilityShift may be rejected by the issuing bank. Also changing the amount may cause rejection of LiabilityShift, or even the denial of an authorization alltogether. A new initial transaction may be executed instead, starting a new recurring-chain!
          </p>
        </div>
      </td>
      <td><a href="recurring.html">Recurring Integration</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeReferenced">Authorize Referenced</a></td>
    </tr>
    <tr>
      <td class="text-center">Mail Phone Order</td>
      <td>Transactions, where the payment means are provided to the merchant via phone, or mail. <strong>MPO transactions are out-of-scope of PSD2! SCA does not apply here!</strong></td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>

## <a name="dcc"></a> Dynamic Currency Conversion

Dynamic Currency Conversion (DCC) is a dynamic currency converter that allows international customers to pay the purchase price in the local currency or their home currency. DCC is available for SIX acceptance contracts with DCC expansion. For this, the terminal used for making the payment request receives a base currency in which all transactions are settled. Via DCC, international customers are shown the purchase price in the base currency and the current exchange rate in their national currency. The customer can then decide the currency in which the payment is to be made. Separate implementation by the merchant is not necessary for DCC. Saferpay automatically handles this step during the redirect. 

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

<div class="info">
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
      <td class="text-center"><strong>1.10+</strong></td>
      <td>
        <ul>
          <li><strong>Refund Handling: </strong>Due to the introduction of <a href="marketplace.html">Partial Captures</a> and thus the splitting of a transaction into multiple transactions, you must do a refund using the <strong>CaptureId</strong> provided in the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a> and <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture">MultipartCapture response</a> and no longer the <strong>TransactionId</strong>, as with SpecVersions 1.9 and lower!</li>
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

<div class="info">
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
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Bancontact</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #ff0000"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>   
    <tr>
      <td>BillPay Direct Debit</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
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
      <td>BillPay Purchase on Receipt</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
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
      <td>Bonus Card</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Diners Club</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
        <tr>
      <td>Discover</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"> (See Diners)</span></td>
    </tr>
    <tr>
      <td>ePrzelewy</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td class="text-center"> <span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td class="text-center"> <span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
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
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>  
    <tr>
      <td>JCB</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
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
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
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
    <tr>
      <td>MyOne</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>paydirekt</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>PayPal</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>PostFinance Card</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
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
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
    </tr>
    <tr>
      <td>SEPA Direct Debit</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
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
      <td> </td>
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
      <td>VPay</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
    </tr>
    <tr>
      <td>TWINT</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Unionpay</td>
      <td></td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #ff0000"></span></td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Alipay</td>
      <td></td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>  
  </tbody>
</table>

<dl class="dl-horizontal">
  <dt>Capture|Cancel</dt>
  <dd>
    Capture required, Cancel possible.
    <div class="info">
      <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
      <p>
        <strong>Important:</strong> A <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel">Cancel</a> cannot be performed, after the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a>! A Capture immediately initiates the money-flow from the card holders bank account. At this point, a refund has to be issued instead!
      </p>
    </div>
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
  <dt><span class="glyphicon glyphicon-ok" style="color: #ff0000"></dt>
  <dd>This feature is mandatory, for this payment method to function!</dt>
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

Not all payment methods need a separate capture to trigger the cash flow. You can find an overview of which payment methods must be captured [under Payment Method Features](https://saferpay.github.io/sndbx/index.html#pm-functions). Methods, that do not need the capture, will return the status **"CAPTURED"** right away.

<div class="info">
  <p><strong>Important:</strong> A reservation made through a certain payment processor, may only last for a limited time only. If this timeframe is exceeded, the authorised amount is released and 
becomes available to the card holder again. This may have the result that the amount can no longer be claimed. We recommend to <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a> an authorization as soon as possible. Either by direct API call, or manually via Saferpay Backoffice. If this is not possible, the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a> nonetheless must be done as soon as possible. With PayPal, this must happen within 48 hours. 
Otherwise, it may be that the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a> -and thus the money-transfer- will be refused. For other payment methods, a later <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a> is sometimes possible. If necessary, please speak to your processor about guaranteed reservation times.</p>
</div>

### <a name="closing"></a>Daily Closing

The daily closing follows the capture once daily, automatically at 22h CEST. During this process, all transactions that have passed through the capture are filed with the payment method processor in order to initiate the cash flow.

If desired, this step can also be triggered via the Saferpay API. The request necessary for this is called [Batch Close](http://saferpay.github.io/jsonapi/index.html#ChapterBatch).

However, before you can use the API, you need to disable the daily closing in the Saferpay 
Backoffice via "Administration -> Terminals" for the respective terminal. Closing should be carried out only once a day.

<div class="info">
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



