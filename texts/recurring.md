# Recurring Payments

Recurring payments are transactions processed on a regular basis under a pre-authorized agreement. They are particularly interesting for subscription or instalment business models. This chapter describes the main concept on how the perform recurring payments.

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
      <p><strong>Very Important:</strong> Please also consider the <a href="psd2.html">PSD2 chapter</a>, when executing recurring payments!
      </p>
</div><br />
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
      <p><strong>NOTE: </strong>Before you start, you have to consider the following: Each transaction has to be triggered by you your system. Please see <strong>Automating the Recurring Payments</strong> further down in this chapter!</p>
</div>

-	Transaction Referenced Method -  [AuthorizeReferenced Function](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AuthorizeReferenced) with the TransactionId of the initial transaction


## <a name="recurring-req"></a> Requirements:

*	a Saferpay Business License
*	a valid login access with a username and password for the Saferpay Backoffice.
*	one active Saferpay ecommerce terminal via which payment can be carried out and the associated
*	Saferpay terminal number (TerminalId parameter) and Saferpay customer number (CustomerId parameter).
*	valid acceptance agreement for credit cards or other payment methods
---

## <a name="recurring-payment-methods"></a> Supported Payment Methods: 
Recurring payments are supported by the following payment means: 
*	American Express
*	Postcard (SCD method only)
*	Bonus Card
*	Diners Club
*	Discover
*	JCB
*	Twint (SCD method only)
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
    "SpecVersion": "[CURRENT SPEC-VERSION]",
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

 
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> Due to laws, defined within PSD2, Saferpay will force a 3DS Challenge, if a transaction is labeled as <strong>recurring.initial = true</strong>!
  </p>
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
    "SpecVersion": "[CURRENT SPEC-VERSION]",
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

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
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
    "SpecVersion": "[CURRENT SPEC-VERSION]",
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

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>NOTE:</strong>  The Amount is a mandatory value which can vary from the Amount of the initial transaction. A change of amount has to be communicated with the card holder and you <strong>must</strong> re-do this process, to start the recurring-chain over again!</p>
</div><br />
<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>IMPORTANT:</strong> Each Transaction with the Status **Authorized** has to be <a href="https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture">captured</a> to initiate the actual money transfer.</p>
</div><br />

## <a name="recurring-alias"></a> Recurring Payments using an alias

A second method is to use the Saferpay Secure Alias Store in conjunction with the [AuthorizeDirect Request](http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AuthorizeDirect) with previously registered Aliases.

### 1. Obtaining the Alias

The alias can be obtained in multiple ways, using the Saferpay Secure Card Data store. [All of those options are described over here](https://saferpay.github.io/sndbx/scd.html).
By using the [Payment Page](https://saferpay.github.io/sndbx/Integration_PP.html) or [Transaction Interface](https://saferpay.github.io/sndbx/Integration_trx.html), it is possible to do an initial transaction, to validate the card (e.g. through 3D Secure), similar to the referenced transaction-process above! The initial payment, unlike with a referenced authorization, can then be discarded, once the alias has been obtained, using [Transaction Cancel](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel). This way the card holder doesn't get charged for the dummy-amount!

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
      <p><strong>Important:</strong> Amount values that undercut a certain value, can cause problems during the 3D Secure-process, thus we recommend a value of 500 (5,00 €). As mentioned above, this transaction can be discarded. It is only, to prevend the mentioned issues with 3D Secure!</p>
</div><br />

### 2. Recurring Transaction

Once tha alias has been obtained, you can execute the subsequent transactions using [AuthorizeDirect Request](http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AuthorizeDirect). The alias has to be filled into the **PaymentMeans => Alias** container.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
      <p><strong>Important:</strong> Please <strong>DO NOT</strong> save the CVC value inside your database and submit it yourself, unless you are certified to do so.</p>
</div>

### Flowchart

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Recurring_Alias_FlowChart.PNG "Recurring with initial transaction")

1. Gather the AliasId from the previous, initial, transaction
2. Aquire the necessary payment-data e.g. Amount, Currency, OrderId etc.
3. Initialize and Execute Payment with [Transaction Authorize Direct](http://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect)
      * You will get the authorization-response right away
4. Validate the request response
5. Depending on the outcome of step 4 you may
    * [Capture/Finalize the Transaction](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture)
    * [Cancel/Abort the Transaction](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel)
6. Transaction is finished! 

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
      <p><strong>Important:</strong> Each Transaction with the Status <strong>Authorized</strong> has to be <a href="https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture">captured</a> to initiate the actual transfer of money.</p>
</div>

---

## <a name="recurring-auto"></a>  Automating the Recurring Payments
Automated recurring payments have to be triggered by the merchant's system. There are multiple ways to setup up the automated triggering of payments. The easiest way is to setup a Cronjob (Linux) or a Task (Windows).
With cronjobs you can schedule a command or script on your server to run automatically at a specified time and date (e.g. every minute, every 15 Minutes, every hour, or every day at 10pm or even every Sunday.) 

The cronjob can be linked with a script (e.g. PHP, or a Bash script) that will be executed, every time the cronjob is triggered to automatically perform transactions. You should decide when and how often the payments have to be triggered depending on your business model and the prearranged scheduling of payments. 

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>NOTE: </strong>Please note that each transaction has to be finalized by calling the <a href="https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture">capture function</a> including the automated recurring transactions.</p>
</div>

