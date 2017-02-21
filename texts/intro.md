# Introduction

The Saferpay JSON API (**J**ava**S**cript **O**bject **N**otation **A**pplication **P**rogramming **I**nterface), hereinafter also referred to as JA, is a modern streamlined interface that is independent of programming languages. The JA supports all Saferpay methods and is suitable for all shop systems, call centre solutions, merchandise management, ERP and CRM systems and other applications in which online payments are processed. This Integration Guide focuses on the basics of the Saferpay JSON API and serves as a guide for programmers, developers and integrators.

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

To use the Saferpay Payment Page, card holders enter their credit card number and expiry date not within the merchant’s e-commerce application, but rather within the Saferpay Payment Page. As the e-commerce application and Saferpay operate on physically separate platforms, there is no risk that the credit card information could be stored in the database of the merchant’s system.

The risk of misuse of credit card details is significantly reduced via the use of Saferpay Secure Card Data or the Saferpay Payment Page and the expenditure required for PCI DSS merchant certification is reduced significantly.

If you have questions about PCI DSS, your processor or a specialised company will provide answers. More information can be found on the [PCI Security Standards Council website](https://www.pcisecuritystandards.org/).

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

## <a name="dcc"></a> Dynamic Currency Conversion

Dynamic Currency Conversion (DCC) is a dynamic currency converter that allows international customers to pay the purchase price in the local currency or their home currency. DCC is available for SIX acceptance contracts with DCC expansion. For this, the terminal used for making the payment request receives a base currency in which all transactions are settled. Via DCC, international customers are shown the purchase price in the base currency and the current exchange rate in their national currency. The customer can then decide the currency in which the payment is to be made. Separate implementation by the merchant is not necessary for DCC. Saferpay automatically handles this step during the redirect. 

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
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>PostFinance Card</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
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
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
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
  </tbody>
</table>

## <a name="licenses"></a> Licences

For use in e-commerce, Saferpay distinguishes between two licences:

* Saferpay eCommerce
* Saferpay Business

It is extremely important to clarify before the implementation of Saferpay whether an eCommerce licence or a business license is to be used, as they provide different functions. The Saferpay Business licence is an extension of the eCommerce licence. If you have any queries, please contact your relevant contractually appointed person.

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



## <a name="pm-functions"></a> Payment Method Features

Saferpay supports a variety of payment methods, including 3rd party providers such as PayPal. These 3rd party providers are not obligated to support all Saferpay functions. The following table provides an overview of the features supported by the individual payment methods:

<p></p>

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Zahlungsmittel</th>
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
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
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
      <td> </td>
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
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
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
  </tbody>
</table>

--->>>

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
</dl>

<<<---


## <a name="capture-batch"></a> Capture and Daily Closing

These two features are extremely important Saferpay features. Depending on the means of payment, the two can be directly associated with each other and they must be carried out for cash flow to the merchant’s account.

### Capture

[Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) serves to book and thus to conclude a payment. As long as a transaction has not passed through the capture, the amount is merely reserved (“authorised”) and has not yet been paid. On the API side, you receive information about the transaction via the “Status” parameter (note that this is only a part of the data):

--->>>

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

<<<---

Transactions which have not yet been booked are visible in Saferpay Backoffice as “Reservation.” If a transaction has already passed through the capture, the status is changed to “CAPTURED”:

--->>>
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
<<<---

Not all payment methods need a separate capture to trigger the cash flow. You can find an overview of which payment methods should be booked [under Payment Option Functions](https://saferpay.github.io/sndbx/index.html#pm-functions).

IMPORTANT: A reservation is made in the payment option processor for a limited time only. If this is exceeded, the authorised amount is released and becomes available to the CH again. This may have the result that the amount can no longer be claimed. If possible, we recommend always triggering the booking immediately after authorisation. Either by direct API call, or manually via Saferpay Backoffice. If this is not possible, the update must nonetheless be done as soon as possible. With PayPal, this must be within 48 hours. Otherwise, it may be that the payment will be refused. For other payment methods, later booking is sometimes possible. When necessary, please speak to your processor about guaranteed reservation times.


### Daily Closing
The daily closing follows the capture once daily, automatically at 22h CEST. For this, all transactions that have passed through the capture are filed with the payment method processor in order to initiate the cash flow.

If desired, this step can also be triggered via the Saferpay API. The request necessary for this is called [Batch Close](http://saferpay.github.io/jsonapi/index.html#ChapterBatch).

Before you can use the API, you first have to disable daily closing in the Saferpay Backoffice via Administration -> Disable terminals for the affected terminal. Closing should and must be carried out only once a day.

### Special Cases

#### PayPal and Schweizer Postcard
With these payment methods, daily closing is triggered alongside the capture automatically for each transaction and the cash flow is initiated immediately. With PayPal, this happens because the right is reserved to refuse the payment. For this reason, we demand the money for you immediately. For Schweizer Postcard, this is established in the protocol used by PostFinance.

#### Online Banking 
giropay, iDEAL, SOFORT, Bancontact, eprzelewy und eps are online payment methods that trigger a transfer and thus the cash flow via the purchaser’s online banking services. A successful transaction is always 100% complete.

## <a name="cancel-refund"></a> When Can Cancellations or Credit Payments Occur?

It’s by no means rare that customers want to cancel their orders or return goods. As a merchant, you will in such a situation want to either cancel or to make a credit payment for the transaction in question. It should be noted here that there are means of payment that do not offer this functionality. [An overview can be found in the Payment Method Features chapter](https://saferpay.github.io/sndbx/index.html#pm-functions).

If this is permitted by the payment method, payments that have not been submitted via daily closing may be cancelled. If daily closing has already been triggered, a credit note will have to be issued.
