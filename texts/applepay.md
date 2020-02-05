# ApplePay

ApplePay-transactions can be processed via the Saferpay Payment Page, without much effort. Note, that ApplePay is not a classic means of payment, but rather a digital Wallet. Your customers will still pay with Visa, Mastercard, or whatever credit card has been saved inside the Wallet, thus the payment method will correspond to this. However Saferpay will also return information, that this transaction has been performed, through ApplePay. Furthermore, due to this nature, all options and limitations of the saved means of payment do apply [as stated here, if not mentioned otherwise in this chapter!](index.html#pm-functions)
The following chapter will guide you through the steps required, in order to activate and use ApplePay.

## <a name="ppal-requirement"></a> Requirements

The handling of PayPal payments with Saferpay requires:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* ApplePay is only available via the [PaymentPage flow](Integration_PP.html)!
* ApplePay is only available with **SpecVersion 1.15**, or higher.
* **NotifyUrl:** The NotifyUrl is **mandatory**, in order to avoid missing payment successes. See the <a href="Integration_PP.html">Payment Page process</a> for further information!
* ApplePay can only be used with Apple devices, like iPhones and iPads.
* Furthermore, only Apples own browser, Safari, is supported.
* ApplePay does not support [Secure Card Data](scd.html), even though the means of payment may support it! However [Recurring Payments](recurring.html) can be executed, if supported by the payment mean!

<div class="danger">
  <p><strong>Warning:</strong> ApplePay does not support the iFrame Integration!</p>
</div>

## <a name="apple-activation"></a> Activation

The activation of ApplePay for your Saferpay account, be it live, or on the test-environment, requires next to no effort and can be done in a matter of seconds.

1. First step is to **log into the Saferpay Backoffice**, there you have to navigate to the **Settings** tab and click on **Payment Means / Terminals**.
<br />![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/applepayBO1.png "ApplePay inside the Saferpay Backoffice")
2. Next, select the e-commerce, or Secure PayGate terminal, you want to activate ApplePay on. 
3. Navigate to the **Wallets** section, there you will find ApplePay.
4. Click on the **Activate** Button.
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/applepayBO2.png "ApplePay inside the Saferpay Backoffice")
5. You will be prompted with another window, that asks you to accept the Terms and Conditions from Apple, so you may use ApplePay. Mark the checkbox and click **Activate**.
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/applepayBO3.png "ApplePay inside the Saferpay Backoffice")
6. And you are done! ApplePay is now available for you on your Saferpay Terminal.
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/applepayBO4.png "ApplePay inside the Saferpay Backoffice")

## <a name="apple-redirect"></a> Direct redirect

If you want to perform a direct redirect to ApplePay, you have to use the parameter **Wallets** within the [PaymentPage Initialize request](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize)!

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
        "VISA"
    ],
    "ReturnUrls": {
        "Success": "[YOUR URL]",
        "Fail": "[YOUR URL]",
        "Abort": "[YOUR URL]"
    },
}

```

<div class="info">
  <p><strong>Tip:</strong> If you are using <strong>"Wallets"</strong> alongside <strong>"PaymentMethods"</strong>, you can limit the Brands, your customer may use!</p>
</div>
