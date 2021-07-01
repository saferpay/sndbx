# Apple Pay

Apple Pay transactions can be processed via the Saferpay Payment Page, without much effort from you side. Note that Apple Pay is not a classic means of payment, but rather a digital wallet. Your customers will still pay with Visa, Mastercard, or whatever credit card has been saved inside the wallet, thus the actual recorded payment method will correspond to this. However, Saferpay will also return information that this transaction has been performed through Apple Pay. Furthermore, all options and limitations of the used means of payment apply [as stated here](index.html#pm-functions), if not mentioned otherwise in this chapter.

The following chapter will guide you through the steps required in order to activate and use Apple Pay.

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0;"></span>
  <p>
    <strong>Caution:</strong> As of now, LiabilityShift for Visa cards over Apple Pay is denied on authorization, due to an ongoing issue between Apple and Visa.
  </p>
</div>

## <a name="ppal-requirement"></a> Requirements

The handling of Apple Pay payments with Saferpay requires:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal by which payments can be carried out and availability of the associated Saferpay TerminalId.
* Apple Pay is only available via the [PaymentPage flow](Integration_PP.html).
* Apple Pay is only available with **SpecVersion 1.15** or higher.
* **NotifyUrl:** The NotifyUrl is **mandatory**, in order to avoid missing payment successes. See the <a href="Integration_PP.html">Payment Page process</a> for further information.
* Apple Pay can only be used with Apple devices, like Macs, iPhones and iPads. <strong>Exception being the test environment, so you are able to test Apple Pay on other devices.</strong>
* Furthermore, only Apple's own browser, Safari, is supported. <strong>Exception being the test environment, so you are able to test Apple Pay using other browsers.</strong>
* Apple Pay does not support [Secure Card Data](scd.html), even though the means of payment may support it. However [Recurring Payments](recurring.html) can be executed, if supported by the payment means.

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0;"></span>
  <p><strong>Warning:</strong> Apple Pay does not support iFrame Integration.</p>
</div>

## <a name="apple-activation"></a> Activation

The activation of Apple Pay for your Saferpay account, be it live, or on the test-environment, requires next to no effort and can be done in a matter of seconds:

1. First step is to **log into the Saferpay Backoffice**, there you have to navigate to the **Settings** tab and click on **Payment Means / Terminals**.
<br /><img src="https://raw.githubusercontent.com/saferpay/sndbx/master/images/applepayBO1.png" alt="Apple Pay inside the Saferpay Backoffice">
2. Next, select the e-Commerce, or Secure PayGate terminal on which you want to activate Apple Pay. 
3. Navigate to the **Wallets** section, there you will find Apple Pay.
4. Click on the <strong>Activate</strong> Button.
<img src="https://raw.githubusercontent.com/saferpay/sndbx/master/images/applepayBO2.png" alt="Apple Pay inside the Saferpay Backoffice">
5. You will be prompted with another window, which asks you to accept the Terms and Conditions from Apple. Mark the checkbox and click <strong>Activate</strong>.
<img src="https://raw.githubusercontent.com/saferpay/sndbx/master/images/applepayBO3.png" alt="Apple Pay inside the Saferpay Backoffice">
6. And you are done! Apple Pay is now available for you on your Saferpay Terminal.
<img src="https://raw.githubusercontent.com/saferpay/sndbx/master/images/applepayBO4.png" alt="Apple Pay inside the Saferpay Backoffice">

## <a name="apple-redirect"></a> Direct redirect

If you want to perform a direct redirect to Apple Pay, you have to use the parameter **Wallets** within the [PaymentPage Initialize request](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize)!

**Example Request:**
```json 
{
    "RequestHeader": {
        "SpecVersion": "[CURRENT SPECVERSION]",
        "CustomerId": "[YOUR CUSTOMERID]",
        "RequestId": "[YOUR REQUESTID]",
        "RetryIndicator": 0,
        "ClientInfo": {
            "ShopInfo": "My Shop",
            "OsInfo": "Windows Server 2016"
        }
    },
    "TerminalId": "[YOUR TERMINAL]",
    "Payment": {
        "Amount": {
            "Value": "12345",
            "CurrencyCode": "EUR"
        },
        "OrderId": 123,
        "Description": "Test Order #123"
    },
    "Wallets": [
        "APPLEPAY"
    ],
    "PaymentMethods": [
        "VISA",
        "MASTERCARD"
    ],
    "ReturnUrls": {
        "Success": "[YOUR URL]",
        "Fail": "[YOUR URL]",
        "Abort": "[YOUR URL]"
    },
}

```

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0;"></span>
  <p><strong>Tip:</strong> If you are using <strong>"Wallets"</strong> alongside <strong>"PaymentMethods"</strong>, you can limit the brands which your customers can use. However, note that the Payment Page also will display the given brands as dedicated payment methods, so the customer might pay this way instead of using Apple Pay.</p>
</div>

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0;"></span>
  <p>
    <strong>Important:</strong> If you are using "PaymentMethods", you <strong>must</strong> also submit "Wallets", if you want Apple Pay to be displayed. Also, if you are just submitting one payment method, the Payment Page will still directly jump to the card entry form, skipping Apple Pay.
  </p>
</div>

## <a name="apple-tokens"></a> Applepay scheme tokens

Saferpay also supports the direct insertion of decrypted Applepay-tokens, provided by the Applepay API.
This way, it is possible to provide a more seamless and integrated solution. However in this case, the integration is realized via the <a href="Integration_trx.html">Transaction Interface</a>. The overall transaction-flow will stay the same. The only thing you must take care of is, that you provide the necessary data, within the <strong>PaymentMeans.SchemeToken</strong> container, through the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize">Initialization request</a>.

### Example

```json 
{
  "RequestHeader": {
    "SpecVersion": "[current Spec-Version]",
    "CustomerId": "[your customer id]",
    "RequestId": "[unique request id]",
    "RetryIndicator": 0
  },
  "TerminalId": "[your terminal id]",
  "Payment": {
    "Amount": {
      "Value": "100",
      "CurrencyCode": "CHF"
    }
  },
  "PaymentMeans": {
    "SchemeToken": {
      "Number": [DECRYPTED TOKEN NUMBER],
      "ExpMonth": "03",
      "ExpYear: "2021",
      "AuthValue": "AAABBIIFmAAAAAAAAAAAAAAAAAA="
    }
  },
  "Payer": {
    "LanguageCode": "en"
  },
  "ReturnUrls": {
    "Success": "[your shop payment success url]",
    "Fail": "[your shop payment fail url]"
  },
  "Styling": {
    "CssUrl": "[your shop css url]"
  }
}

```
