# Secure Card Data

Saferpay Secure Card Data, or SCD for short, is a service for saving sensitive payment data in the certified Saferpay data center. By using SCD, the payment data is separated from the merchant's application and thus no longer comes into contact with it. Secure Card Data is suitable for shop systems, call center solutions, inventory management, ERP and CRM systems in which stored payment data is required for future/deferred or recurring/instalments payments.

 It provides the Hosted Register Form (HRF) to simply store/tokenize payment data regardless of any actual payment been made. For example, if a customer wants to add different payment options to his account so that he/she can decide which one to use during the actual payment process. Please read chapter [**Iframe Integration and CSS**](https://saferpay.github.io/sndbx/CssiFrame.html#chapter-css-iframe) for examples of the different payment forms.

## <a name="scd-req"></a> Requirements

* A Saferpay Business contract
* A License for Secure Card Data, which is usually included in Saferpay Business
* An active terminal with active contracts for the desired brands

### <a name="scd-payment-methods"></a> Supported Payment Methods

*	Visa
*	MasterCard
*	Maestro international
*	V PAY
*	American Express
* MyOne
*	Diners Club
* Bonus Card
* Discover
*	JCB 
*	PostFinance card (Please read the [information over here](https://saferpay.github.io/sndbx/PostFinance.html#pf-alias)!)
*	SEPA ELV (Not via the Transaction Interface!)
* Bancontact
* Credit Cards over Masterpass

## <a name="scd-pp"></a> Secure Card Data and the Payment Page

The Payment Page can be used to save a credit card, **after a successful authorization**!
In order to request an Alias with the [PaymentPage Assert](http://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert), you first need to set the **RegisterAlias** container within the [PaymentPage Initialize request](http://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize).

 ```json 
 { 
 "RequestHeader": {
    "SpecVersion": "[CURRENT-SPEC-VERSION]",
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
  "RegisterAlias": {
      "IdGenerator": "RANDOM"
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
<div class="info">
  <p><strong>NOTE:</strong>The IdGenerator has multiple options to choose from. All of them will be explained later in this chapter!</p>
</div>

Once a successful transaction has been made through the PaymentPage, you will get the result of the registration with the [PaymentPage Assert](http://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert)(See **"RegistrationResult"**!):

```json
{
  "ResponseHeader": {
    "SpecVersion": "[CURRENT-SPEC-VERSION]",
    "RequestId": "[your request id]"
  },
  "Transaction": {
    "Type": "PAYMENT",
    "Status": "AUTHORIZED",
    "Id": "MUOGAWA9pKr6rAv5dUKIbAjrCGYA",
    "Date": "2017-06-18T09:19:27.078Z",
    "Amount": {
      "Value": "100",
      "CurrencyCode": "CHF"
    },
    "AcquirerName": "AcquirerName",
    "AcquirerReference": "Reference"
  },
  "RegistrationResult": {
    "Success": true,
    "Alias": {
      "Id": "alias35nfd9mkzfw0x57iwx",
      "Lifetime": 1000
    }
  },
  "PaymentMeans": {
    "Brand": {
      "PaymentMethod": "SAFERPAYTEST",
      "Name": "SaferpayTestCard"
    },
    "DisplayText": "9123 45xx xxxx 1234",
    "Card": {
      "MaskedNumber": "912345xxxxxx1234",
      "ExpYear": 2021,
      "ExpMonth": 9,
      "HolderName": "Max Mustermann",
      "CountryCode": "CH"
    }
  },
  "Payer": {
    "IpAddress": "1.2.3.4",
    "IpLocation": "CH"
  },
  "ThreeDs": {
    "Authenticated": true,
    "LiabilityShift": true,
    "Xid": "ARkvCgk5Y1t/BDFFXkUPGX9DUgs=",
    "VerificationValue": "AAABBIIFmAAAAAAAAAAAAAAAAAA="
  }
}
```
<div class="warning">
  <p><strong>Important:</strong>The Payment Page <strong>CAN NOT</strong> be used to authorize the obtained Alias! It can only register cards!</p>
</div>

## <a name="scd-trx"></a> Secure Card Data and the Transaction Interface

[The Transaction Interface](http://saferpay.github.io/jsonapi/#ChapterTransaction) can also be used to obtain a Secure Card Data alias **also after a successful authorization**! The submitted Data is the same, as with the [PaymentPage Initialize request](http://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize), but with [the Transaction Interface](http://saferpay.github.io/jsonapi/#ChapterTransaction) you **MUST NOT USE** the **RegisterAlias** container within [Transaction Initialize](http://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize). Here the registration actually is made with the [Transaction Authorize request](http://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize) (**Remember:** A registration is only made, if the Authorization is successful!), thus you have to submit the necessary data here:

 ```json 
 { 
 "RequestHeader": {
    "SpecVersion": "[CURRENT-SPEC-VERSION]",
    "CustomerId": "[your customer id]",
    "RequestId": "[unique request id]",
    "RetryIndicator": 0
  },
  "Token": "sdu5ymxx210y2dz1ggig2ey0o",
  "RegisterAlias": {
    "IdGenerator": "RANDOM"
  }
}
```

<div class="info">
  <p><strong>NOTE:</strong>The IdGenerator has multiple options to choose from. All of them will be explained later in this chapter!</p>
</div>

Once a successful transaction has been made, you will get the result of the registration with the [Transaction Authorize response](http://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize) (See **"RegistrationResult"**!):

```json
{
  "ResponseHeader": {
    "SpecVersion": "[CURRENT-SPEC-VERSION]",
    "RequestId": "[your request id]"
  },
  "Transaction": {
    "Type": "PAYMENT",
    "Status": "AUTHORIZED",
    "Id": "MUOGAWA9pKr6rAv5dUKIbAjrCGYA",
    "Date": "2017-06-18T09:19:27.078Z",
    "Amount": {
      "Value": "100",
      "CurrencyCode": "CHF"
    },
    "AcquirerName": "AcquirerName",
    "AcquirerReference": "Reference"
  },
  "RegistrationResult": {
    "Success": true,
    "Alias": {
      "Id": "alias35nfd9mkzfw0x57iwx",
      "Lifetime": 1000
    }
  },
  "PaymentMeans": {
    "Brand": {
      "PaymentMethod": "SAFERPAYTEST",
      "Name": "SaferpayTestCard"
    },
    "DisplayText": "9123 45xx xxxx 1234",
    "Card": {
      "MaskedNumber": "912345xxxxxx1234",
      "ExpYear": 2021,
      "ExpMonth": 9,
      "HolderName": "Max Mustermann",
      "CountryCode": "CH"
    }
  },
  "Payer": {
    "IpAddress": "1.2.3.4",
    "IpLocation": "CH"
  },
  "ThreeDs": {
    "Authenticated": true,
    "LiabilityShift": true,
    "Xid": "ARkvCgk5Y1t/BDFFXkUPGX9DUgs=",
    "VerificationValue": "AAABBIIFmAAAAAAAAAAAAAAAAAA="
  }
}
```

The obtained alias can then be used for subsequent payments, which will be explained later in this chapter!

## <a name="scd-sa"></a> Standalone Secure Card Data registration

All methods so far described, how a Secure Card Data alias can be obtained **within the authorization process**.
If you just want to register the card, but not authorize it, you need to use [the Secure Alias Store](http://saferpay.github.io/jsonapi/#ChapterAliasStore).

The process itself is very similar to the one using [the Transaction Interface](http://saferpay.github.io/jsonapi/#ChapterTransaction). [The Secure Alias Store](http://saferpay.github.io/jsonapi/#ChapterAliasStore) has its own hosted card registration form, which can also be [integrated within an iFrame and styled via CSS](https://saferpay.github.io/sndbx/CssiFrame.html).
However there are two major differnces:

+ As already mentioned, the card will only be saved, but not authorized!
+ Due to PCI restrictions, the CVC will not be obtained using this method!

In order to open up the hosted Card Entry Form, you first need to execute the [Alias Insert Request](http://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert).

### Here are a few hints and tips about the options that are available for the merchant:

+ **ReturnUrls:** For security, Saferpay returns no data to return addresses of the shop. The identification of the payment or the returning customers is up to the merchant. We recommend using your own parameters. These can be attached via HTTP GET to the ReturnUrls. When a ReturnUrl is called, Saferpay returns the appended parameter, thus enabling identification of the customer.

### In the Response of the Insert Request these parameters are import for further processing:

+ **Token:** The Token is mandatory for further steps within the payment process and must therefore be cached. Preferably, it should be linked to the parameters attached to the ReturnUrls. It can thus be easily reassigned.

+ **RedirectUrl:** Unlike with the Payment Page, this URL is not used for a redirect. Instead, it is embedded in an HTML Iframe. Within this, a form hosted by Saferpay is displayed. This form is also called the Hosted Entry Form. It can be used to capture sensitive card details in a PCI-compliant manner. You can find out more about the Iframe integration [in this chapter](https://saferpay.github.io/sndbx/CssiFrame.html).

### Return to the Shop
Once the registration is completed, the card holder – depending on the outcome – is taken back to one of the **ReturnUrls** of the shop. Here, the GET parameters can be read and the **Token** can be assigned to the registration.

### Obtaining the alias

With the **Token**, the can be obtained, by submitting it through the [Alias AssertInsert request](http://saferpay.github.io/jsonapi/#Payment_v1_Alias_AssertInsert). The response will give you the alias itself and further information about the card itself, like the masked card number, or the holder name.

<div style="display: none;">
 
## Try it out!

<a href="https://saferpay.github.io/sndbx/scd_demo.html" class="demobtn">Click here for a live demo!</a>

</div>

## <a name="scd-generator"></a> The Id-generator

The ID-generator is used to choose what kind of alias you want to recieve. Right now, there are three options to choose from:

1. **MANUAL**: Manual should be used, if you want to define an alias yourself. This is helpful, if the alias has to be in a specific format, like all numeric, or 16 characters long etc. You then have to supply the Id you want to use within the **Id** parameter. <div class="danger"><p><strong>Important:</strong>Make sure, that all your aliases are unique! Saferpay will only authorize the first card to come up inside the database, if there are multiple records with the same alias!</p></div>
2. **RANDOM**: This value will generate a random alpha numerical hash, as your alias-id, for you! No need to supply an id yourself!
3. **RANDOM_UNIQUE**: Similar to **RANDOM**, it will create a random alpha numerical hash for you. The difference is, that it will check, if the card number (PAN) provided has already saved inside your alias store. If so, Saferpay will return the already existing alias, making sure, that no PAN can be saved twice or more!

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

## <a name="scd-use"></a> How to use the obtained data

The obtained alias can be used in two basic ways, which boil down to one important question:

**Do you want to do a 3D Secure transaction?**

+ If yes, then you have to use the [Transaction Interface](https://saferpay.github.io/sndbx/Integration_trx.html). The Hosted Form used there will not open up and instead proceed with the 3D Secure process right away.
+ If not, then you can use [AuthorizeDirect](http://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect) to authorize the card directly. This is especially intersting, if you want to [implement recurring payments, which are described over here](https://saferpay.github.io/sndbx/recurring.html#recurring-alias).

<div class="warning">
  <p><strong>NOTE:</strong> Bancontact only supports the former, while Maestro has some cards, that also are 3D Secure only!</p>
</div>

<div class="warning">
  <p><strong>NOTE:</strong> Every alias is bound to the CustomerId you provide with the registration-request. All Terminals bound to that id can use the aliases, but not other CustomerIds! There is no way to share the aliases between different CustomerIds</p>
</div>
