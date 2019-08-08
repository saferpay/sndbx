# The following entries are deprecated and are archived! DO NOT USE THEM!

## <a name="scd-sa"></a> Standalone Secure Card Data registration

All methods so far described, how a Secure Card Data alias can be obtained **within the authorization process**.
If you just want to register the card, but not authorize it, you need to use [the Secure Alias Store](http://saferpay.github.io/jsonapi/#ChapterAliasStore).

The process itself is very similar to the one using [the Transaction Interface](http://saferpay.github.io/jsonapi/#ChapterTransaction). [The Secure Alias Store](http://saferpay.github.io/jsonapi/#ChapterAliasStore) has its own hosted card registration form, which can also be [integrated within an iFrame and styled via CSS](https://saferpay.github.io/sndbx/CssiFrame.html).
However there are two major differnces:

+ As already mentioned, the card will only be saved, but not authorized!
+ Due to PCI restrictions, the CVC will not be obtained using this method!

In order to open up the hosted Card Entry Form, you first need to execute the [Alias Insert Request](http://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert).

<div class="info">
  <p><strong>Tip:</strong> Don't like the style of the Hosted Form? Try our <a target="_blank" href="CssiFrame.html#css-usecss">CSS-Styling feature!</a></p>
</div>

### Here are a few hints and tips about the options that are available for the merchant:

+ **ReturnUrls:** For security, Saferpay returns no data to return addresses of the shop. The identification of the payment or the returning customers is up to the merchant. We recommend using your own parameters. These can be attached via HTTP GET to the ReturnUrls. When a ReturnUrl is called, Saferpay returns the appended parameter, thus enabling identification of the customer.

### In the Response of the Insert Request these parameters are import for further processing:

+ **Token:** The Token is mandatory for further steps within the payment process and must therefore be cached. Preferably, it should be linked to the parameters attached to the ReturnUrls. It can thus be easily reassigned.

+ **RedirectUrl:** Unlike with the Payment Page, this URL is not used for a redirect. Instead, it is embedded in an HTML Iframe. Within this, a form hosted by Saferpay is displayed. This form is also called the Hosted Entry Form. It can be used to capture sensitive card details in a PCI-compliant manner. You can find out more about the Iframe integration [in this chapter](https://saferpay.github.io/sndbx/CssiFrame.html).

### Return to the Shop
Once the registration is completed, the card holder – depending on the outcome – is taken back to one of the **ReturnUrls** of the shop. Here, the GET parameters can be read and the **Token** can be assigned to the registration.

### Obtaining the alias

With the **Token**, the can be obtained, by submitting it through the [Alias AssertInsert request](http://saferpay.github.io/jsonapi/#Payment_v1_Alias_AssertInsert). The response will give you the alias itself and further information about the card itself, like the masked card number, or the holder name.

===================================================================================================================
 
## <a name="scd-demo"></a>Try it out!

<a href="https://saferpay.github.io/sndbx/scd_demo.html" class="demobtn">Click here for a live demo!</a>

===================================================================================================================

## <a name="scd-check"></a> The check-Function

The Check function is used, to check, if an entered card connects to a valid account, or not, before the authorization itself.
However, you need to consider the following restrictions:

1. The check-function is only available with the standalone registration, since the other options do said authorization!
2. The check-function **does not** check the solvency of the account. Only an authorization does!
3. The check-function is only available for VISA and Mastercard, over SIX Payment Services Acquiring contracts!

### Request

In order, to let a card get checked, you need to set the **Check**-container within the [initial registration-request](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert).
You need to make sure, to provide a valid terminal Id, with activated acquiring-contracts for VISA and MasterCard.

```json
{
  "RequestHeader": {
    "SpecVersion": "[CURRENT-SPEC-VERSION]",
    "CustomerId": "[your customer id]",
    "RequestId": "[your request id]",
    "RetryIndicator": 0,
    "ClientInfo": {
      "ShopInfo": "My Shop",
      "OsInfo": "Windows Server 2013"
    }
  },
  "RegisterAlias": {
    "IdGenerator": "RANDOM_UNIQUE"
  },
  "Type": "CARD",
  "LanguageCode": "en",
  "ReturnUrls": {
    "Success": "[your shop payment success url]",
    "Fail": "[your shop payment fail url]"
  },
  "Check": {
    "Type": "ONLINE",
    "TerminalId": "[your terminal id]"
  }
}
```

### Response

If the check was successful, you will get a successful registration-response with the [Assert Insert](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_AssertInsert).
If the chek failed, the registration too will fail and you'll get an error-response:

```json
{
    "ResponseHeader": {
        "SpecVersion": "[CURRENT-SPEC-VERSION]",
        "RequestId": "55"
    },
    "Behavior": "ABORT",
    "ErrorName": "CARD_CHECK_FAILED",
    "ErrorMessage": "Online card check failed",
    "ErrorDetail": [
        "online card check failed"
    ]
}
```
