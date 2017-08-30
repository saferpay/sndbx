# Recurring Payments

Recurring payments are transactions processed on a regular basis under a pre-authorized agreement. They are particularly interesting for subscription or instalment business models. This chapter describes the two main concepts on how the perform recuring payments.

-	Transaction Referenced Method -  [AuthorizeReferenced Function](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AuthorizeReferenced) with the TransactionId of the initial transaction
-	Secure Card Data Method       - [AuthorizeDirect Function](http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AuthorizeDirect) with previously registered Aliases
---

## <a name="recurring-req"></a> Requirements:

*	a Saferpay Business License
*	a valid login access with a username and password for the Saferpay Backoffice.
*	one active Saferpay ecommerce terminal and an additional MOTO terminal via which payment can be carried out and the associated
*	Saferpay terminal number (TerminalId parameter) and Saferpay customer number (CustomerId parameter).
*	valid acceptance agreement for credit cards or other payment methods
*	Secure Card Data Module (if recurring payments are performed with using Aliases)
---

## <a name="recurring-payment-methods"></a> Supported Payment Methods: 
Recurring payments are supported by the following payment means: 
*	American Express
*	Bancontact (SCD method only)
*	Bonus Card
*	Diners Club
*	Discover
*	JCB
*	Maestro International (SCD method only)
*	MasterCard
*	Myone
*	Sepa Direct Debit
*	Visa
*	VPAY
---

## <a name="recurring-referenced"></a> Recurring Payments with the Referenced Transactions Method

With this method, the initial transaction is performed with either the PaymentPage Interface or with the Transaction Interface leading the cardholder through a normal ecommerce payment process, including entering the CVC and 3DSecure authentication. The first transaction is flagged as initial transaction. The Transaction ID of the initial transaction can then be used for referenced/recurring transactions.


### 1. Initial Transaction:

The Initial Transaction can be performed with the [PaymentPage Interface](https://saferpay.github.io/jsonapi/index.html#ChapterPaymentPage) or via the [Transaction Interface](https://saferpay.github.io/jsonapi/index.html#ChapterTransaction), using **Transaction Initialize** and **Transaction Authorize** .

This transaction basically captures the credit card details and sets a flag, to mark it as an initial transaction that can be used as a reference for recurring transactions.

To define a transaction as the initial transaction, you need to set a special flag with either the [PaymentPage Initialize Request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Initialize "PaymentPage Initialize") or [Transaction Initialize Request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize "Transaction Initialize") by defining the Container
```json 
Recurring": {
      "Initial": true
```

Here is an example of a PaymentPage Request with the Container **Recurring**:

**Request URL**
```http
POST /Payment/v1/PaymentPage/Initialize
```

 ```json 
 { 
 "RequestHeader": {
    "SpecVersion": "1.7",
    "CustomerId": "[your customer id]",
    "RequestId": "[unique request id]",
    "RetryIndicator": 0
  },
  "TerminalId": "[your terminal id]",
  "Payment": {
    "Amount": {
      "Value": "100",
      "CurrencyCode": "CHF"
    },
    "Recurring": {
      "Initial": true
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


> You should perform the initial transaction with your normal eCommerce TerminalID. It is more secure if the cardholder goes through all security measures like, entering the CVC and performing the 3D Secure authentication process. These security measures are not applicable with the recurring transaction as the cardholder is not present. Thus, recurring payments do not offer liability shift. 

> If you want to validate the cardholder without charging his bank account, you can trigger a “dummy” authorization with a small amount value (e.g. 1 Euro; Amount value “100”). If the transaction is not captured the customer will not be charged and therefore the cardholder will not notice this authorization. Please note that some banks do not support authorization of amounts smaller than 1 Euro (1 Dollar; 1 CHF etc.)


### 2. Validating the transaction

Depending on the Interface used to initialize the transaction, you can validate the payment and assess transaction based information with either:
- [PaymentPage Assert](https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Assert) or 
- [Transaction Authorize](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Authorize) function.

Both request will provide you with information about the Transaction including the 3D Secure response:

Here is an example of a **PaymentPage Assert Response**:

```json
{
  "ResponseHeader": {
    "SpecVersion": "1.7",
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


You must save the **TransactionId** (Container: "Transaction">"ID"), returned in the Paymentpage Assert or Transaction Authorize response as this value will be used to reference recurring payments.

>We recommend only to proceed, if the parameter “Authenticated” is true. This value indicates that the card holder has performed a full successful authentication (3D Secure process) at his bank. This option provides the highest level of security against fraud. Please take notice that some banks will skip the 3Dsecure process if they consider the transaction to have a low risk thus will still grant Liabilityshift although the cardholder did not have to authenticate him or herself. In that case the values returned for ”LiabilityShift” will be “true” and  “Authenticated” will be “false”. You should assess which level of security suits best to your business model and target group before deciding how to handle these two parameters.


### 3. Recurring Transaction:
The next step is to perform the actual recurring transaction(s).
The API-Function that is required is [Authorize Referenced](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AuthorizeReferenced).
You have to simply submit the **TransactionId** from your initial transaction (discussed in step B) to perform the recurring transaction(s)

Here is an example of a **Authorize Referenced Request**:

**Request URL**
```http
POST /Payment/v1/Transaction/AuthorizeReferenced
```

```json
{
  "RequestHeader": {
    "SpecVersion": "1.7",
    "CustomerId": "[your customer id]",
    "RequestId": "[unique request id]",
    "RetryIndicator": 0
  },
  "TerminalId": "[your terminal id]",
  "Payment": {
    "Amount": {
      "Value": "100",
      "CurrencyCode": "CHF"
    },
    "Description": "Test123",
    "PayerNote": "Order123_Testshop"
  },
  "TransactionReference": {
    "TransactionId": "MUOGAWA9pKr6rAv5dUKIbAjrCGYA"
  }
}
```

<div class="warning">
  <p><strong>NOTE</strong> The recurring transactions have to be performed with a Mail Phone Order TerminalId (MOTO Terminal) to ensure they are not rejected by the processor as the cardholder is not present and therefore cannot provide the CVC or partake in the 3D Secure process. The Amount is a mandatory value which can vary from the Amount of the initial transaction. Please make sure to inform the cardholder of amount changes beforehand, else he or she might request a chargeback.</p>
</div>


<div class="danger">
  <p><strong>IMPORTANT</strong> Each Transaction with the Status **Authorized** has to be [Captured](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture) to initiate the actual transfer of money.</p>
</div>

---

## <a name="recurring-auto"></a>  Automating the Recurring Payments
Automated recurring payments have to be triggered by merchant's system. There are multiple ways to setup up the automated triggering of payments. The easiest way is to setup a Cronjob (Linux) or a Task (Windows).
With cronjobs you can schedule a command or script on your server to run automatically at a specified time and date (e.g. every minute, every 15 Minutes, every hour, or every day at 10pm or even every Sunday.) 

The cronjob can be linked with a script (e.g. PHP, or a Bash script) that will be executed, every time the cronjob is triggered to automatically perform transactions. You should decide when and how often the payments have to be triggered depending on your business model and the prearranged scheduling of payments. 

<div class="info">
  <p><strong>NOTE</strong>Please note that each transaction has to be finalized by calling the [capture function](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture) including the automated recurring transactions.</p>
</div>

>Please note that each transaction has to be finalized by calling the [capture function](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture) including the automated recurring transactions.

