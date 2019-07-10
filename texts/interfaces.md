# Licences and Interfaces

Saferpay distinguishes between two licences:

* Saferpay eCommerce
* Saferpay Business

It is extremely important to clarify before the implementation of Saferpay, whether an eCommerce licence or a business license is to be used, as they provide different functions. The Saferpay Business licence is an extension of the eCommerce licence. If you have any queries, please contact your relevant contractually appointed person.

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/LicenseOptions.png "License Options")

<div class="info">
  <p><strong>Note:</strong> Inside the <a href="https://saferpay.github.io/jsonapi/">API-Specification</a>, all Business-Requests are marked with the additional <strong>Business License</strong> tag, to indicate, that they may only be used with Saferpay Business!</p>
</div>
<div class="info">
  <p><strong>Note:</strong> All Saferpay Test-Accounts do have Business activated by default, for evaluation purposes!</p>
</div>
<div class="warning">
  <p><strong>Important Note:</strong> In case you are using Saferpay Business <strong>without</strong> the corresponding license, the API will throw an error (see below) in this case, you'll two options to proceed:</p>
  <ul>
    <li><p><strong>Option 1:</strong> Getting a Business license! You can contact your sales contact and ask for a change to Saferpay Business, so you have access to the needed functions!</p></li>
    <li><p><strong>Option 2:</strong> Redo the integration! If you are not happy with option 1, the only other option would be to redo the whole integration, with the <a href="Integration_PP.html">Payment Page</a> in mind. </p></li>
    <li><p><strong>Option 3:</strong> If you are using an official plug-in/integration from our partners, it may be only necessary to switch over to the Payment Page interface inside the shop-configuration. A complete re-integration won't be necessary. When in doubt, please consult the user-manual, or contact the plug-in manufacturer directly! </p></li>
  </ul>
</div>

## Example of a "missing Business license"-API error

 ```json
 {
  "ResponseHeader": {
    "SpecVersion": "1.10",
    "RequestId": "[your request id]"
  },
  "Behavior": "ABORT",
  "ErrorName": "PERMISSION_DENIED",
  "ErrorMessage": "Permission denied",
  "ErrorDetail": [
    "Invalid license"
  ]
}
 ```

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
      <td>Transaction MultipartCapture</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
    <tr>
      <td>Transaction MultipartFinalize</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
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
      <th></th>
      <th></th>
    </tr>
    <tr>
      <td>Close</td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
  </tbody>
</table>

## <a name="interfaces"></a> The Interfaces

Saferpay consist of two main interfaces and a set of different additional modules that can be added to each interface depending on the business requriements and desired payment flow.

The main components of the Saferpay JSON API are:
- **Payment Page Interface**
- **Transaction Interface**
-	and the additional **Secure Card Data** module

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Interfaces.png "The Interfaces")

<div class="warning">
  <p><strong>Important:</strong> It is important to understand the different intended uses and functionalities of each component to decide which Interface is best suited for your business and desired payment flows.</p>
</div>

## <a name="int-paymentmethods"></a> Supported Payment Methods

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
    <tr>
      <td>Alipay</td>
      <td> </td>
      <td class="text-center"><span class="glyphicon glyphicon-ok" style="color: #5cb85c"></span></td>
    </tr>
  </tbody>
</table>

<div class="warning">
  <p><strong>*<a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_RedirectPayment">Transaction Interface - Redirect Payment</a></strong> is deprecated and replaced by the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page!</a>. Please use the parameter <strong>PaymentMethods</strong> to directly select your desired provider!</p>
</div>

## <a name="int-what"></a> What should i use?

Before implementing, it is important to clarify, which functions are important for you!

### Use the PaymentPage/ E Commerce, if...

- **You only want to do transactions:** Do you have a small and simple webshop? Are [refunds over the API](refund.html), or [recurring payments](recurring.html) not important for you? The Payment Page and thus a normal E Commerce contract is more, than sufficient for you!
- **You want to have one solution for every payment method:** [The PaymentPage](Integration_PP.html) does support every payment method Saferpay has to offer. Once integrated, it is a simple matter of activating the payment methods you need and they will show up on the page.

### Use the Transaction Interface/Saferpay Business, if...

- **You want a more embedded/integrated solution:** [The Transaction Interface](Integration_trx.html) does offer a more integrated and personalized payment flow for credit cards, via [iFrame integration](CssiFrame.html). Think of it as [the Payment Page](Integration_PP.html) reduced down to the card entry form, which can be embedded into every HTML-based application!
- **You want to do recurring payments:** [Recurring Payments](recurring.html) need special API-functions, that are only available over Saferpay Business!
- **You want to execute refunds via the API:** [Refunds via API](refund.html) (Note, that refunds are also possible via the Saferpay Backoffice!), are only possible with the transaction interface and a Saferpay Business license.
- **You want to save and use card data in our Secure Card Data store:** Similar to [recurring payments](recurring.html), but Secure Card Data can do more, that just that. You could also spare your customer from entering his card data over and over again, even for 3D Secure payments!

### Why not both?

If you have access to Saferpay Business, you also have access to all API-functions Saferpay has to offer. You don't have to stick to one interface, or the other, you can also mix both interfaces.
In some cases, you **have** to use the [PaymentPage](Integration_PP.html), for example, if you want to use [PayPal](PayPal.html), or any other 3rd party provider.
Another use case could be, that you do all your normal authorizations over the [PaymentPage](Integration_PP.html), but then you use the [Transaction Interface for Refunds](refund.html). 
This is also helpful, if you decide to upgrade from E Commerce to Business (For example for executing said refunds via API!) and already have a [PaymentPage Integration](Integration_PP.html). You can simply extend your Integration for the functions you need, without changing the whole existing implementation.

## <a name="int-questions"></a> Questions?

Still unsure what you need?
[Contact the Saferpay Integration Support](https://saferpay.github.io/sndbx/contact.html) and we will help you deciding!
