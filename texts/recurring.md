# Recurring Payments

Recurring payments are transactions processed on a regular basis under a pre-authorized agreement. They are particularly interesting for subscription or instalment business models. This chapter describes the main concept on how the perform recurring payments.

<div class="warning">
      <p><strong>NOTE: </strong>Before you start, you have to consider the following: Each transaction has to be triggered by you your system. Please see <strong>Automating the Recurring Payments</strong> further down in this chapter!</p>
</div>

-	Transaction Referenced Method -  [AuthorizeReferenced Function](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AuthorizeReferenced) with the TransactionId of the initial transaction


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
*	Postcard (SCD method only)
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

<div class="warning">
  <p><strong>NOTE:</strong> Due to the PSD2, you must perform 3D Secure with the first (initial) transaction. However, if you do 3D Secure with the initial transaction, LiabilityShift is also granted for the recurring transactions.</p>
</div>


### 1. Initial Transaction:

The Initial Transaction can be performed with the [PaymentPage Interface](Integration_PP.html) or via the [Transaction Interface](Integration_trx.html), using **Transaction Initialize** and **Transaction Authorize** .

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

 
<div class="info">
  <p><strong>TIPP:</strong> If you want to validate the cardholder without charging his bank account, you can trigger a “dummy” authorization with a small amount value (e.g. 1 Euro; Amount value “100”). If the transaction is not captured the customer will not be charged and therefore the cardholder will not notice this authorization. Please note that some banks do not support authorization of amounts smaller than 1 Euro (1 Dollar; 1 CHF etc.)!</p>
</div>


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

<div class="warning">
  <p><strong>NOTE:</strong>We recommend only to proceed, if the parameter “Authenticated” is true. This value indicates that the card holder has performed a full successful authentication (3D Secure process) at his bank. This option provides the highest level of security against fraud. Please take notice that some banks will skip the 3Dsecure process if they consider the transaction to have a low risk thus will still grant Liabilityshift although the cardholder did not have to authenticate him or herself. In that case the values returned for ”LiabilityShift” will be “true” and  “Authenticated” will be “false”. You should assess which level of security suits best to your business model and target group before deciding how to handle these two parameters.</p>
</div>


### 3. Recurring Transaction:
The next step is to perform the actual recurring transaction(s).
The API-Function that is required is [Authorize Referenced](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AuthorizeReferenced).
You have to simply submit the **TransactionId** from your initial transaction (discussed in step 2) to perform the recurring transaction(s)

### Flowchart

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Recurring_Referenced_FlowChart.PNG "Recurring with initial transaction")

1. Gather the TransactionId from the previous, initial, transaction
2. Aquire the necessary payment-data e.g. Amount, Currency, OrderId etc.
3. Initialize and Execute Payment with [Transaction Authorize Referenced](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeReferenced)
      * You will get the authorization-response right away
4. Validate the request response
5. Depending on the outcome of step 4 you may
    * [Capture/Finalize the Transaction](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture)
    * [Cancel/Abort the Transaction](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel)
6. Transaction is finished! 

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
  <p><strong>NOTE:</strong>  The Amount is a mandatory value which can vary from the Amount of the initial transaction. A change of amount has to be communicated with the card holder and you <strong>must</strong> re-do this process, to start the recurring-chain over again!</p>
</div>


<div class="danger">
  <p><strong>IMPORTANT:</strong> Each Transaction with the Status **Authorized** has to be <a href="https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture">captured</a> to initiate the actual money transfer.</p>
</div>

---

## <a name="recurring-auto"></a>  Automating the Recurring Payments
Automated recurring payments have to be triggered by the merchant's system. There are multiple ways to setup up the automated triggering of payments. The easiest way is to setup a Cronjob (Linux) or a Task (Windows).
With cronjobs you can schedule a command or script on your server to run automatically at a specified time and date (e.g. every minute, every 15 Minutes, every hour, or every day at 10pm or even every Sunday.) 

The cronjob can be linked with a script (e.g. PHP, or a Bash script) that will be executed, every time the cronjob is triggered to automatically perform transactions. You should decide when and how often the payments have to be triggered depending on your business model and the prearranged scheduling of payments. 

<div class="warning">
  <p><strong>NOTE: </strong>Please note that each transaction has to be finalized by calling the <a href="https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture">capture function</a> including the automated recurring transactions.</p>
</div>

