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


## <a name="scd-generator"></a> The Id-generator

The ID-generator is used to choose what kind of alias you want to recieve. Right now, there are three options to choose from:

1. **MANUAL**: Manual should be used, if you want to define an alias yourself. This is helpful, if the alias has to be in a specific format, like all numeric, or 16 characters long etc. You then have to supply the Id you want to use within the **Id** parameter. <div class="danger"><p><strong>Important:</strong>Make sure, that all your aliases are unique! Saferpay will only authorize the first card to come up inside the database, if there are multiple records with the same alias!</p></div>
2. **RANDOM**: This value will generate a random alpha numerical hash, as your alias-id, for you! No need to supply an id yourself!
3. **RANDOM_UNIQUE**: Similar to **RANDOM**, it will create a random alpha numerical hash for you. The difference is, that it will check, if the card number (PAN) provided has already saved inside your alias store. If so, Saferpay will return the already existing alias, making sure, that no PAN can be saved twice or more!

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
