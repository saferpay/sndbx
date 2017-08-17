# Recurring Payments

Recurring payments are card transactions processed on a regular basis under a pre-authorized agreement. Saferpay offers several ways to perform recurring payments. This chapter describes the two main concepts.

-	Referencing previous initial transactions
-	Secure Card Data Module and the use of Aliases


## <a name="recurring-req"></a> Requirements:

*	a Saferpay Business License
*	a valid login access with a username and password for the Saferpay Backoffice.
*	one active Saferpay ecommerce terminal and an additional MOTO terminal via which payment can be carried out and the associated
*	Saferpay terminal number (TerminalId parameter) and Saferpay customer number (CustomerId parameter).
*	valid acceptance agreement for credit cards or other payment methods
*	Secure Card Data Module (if recurring payments are performed by using Aliases)



## <a name="recurring-payment-methods"></a> Supported Payment Methods: 
Recurring payments are supported by the following payment means: 
*	Visa 
*	MasterCard 
*	Maestro international 
*	V PAY 
*	American Express 
*	Diners Club 
*	J.C.B. 
*	Paydirekt

SCD------

*	<mark>Sepa Directdebit </mark>
*	Paypal
*	Bancontact
*	Maestro
*	Myone
*	


## <a name="recurring-referenced"></a> Recurring Payments with the Referenced  transactions method

The Process in Short: 
The initial transaction is performed with either the PaymentPage Interface or with the Transaction Interface leading the cardholder through a normal ecommerce payment process. Which includes entering the CVV and with 3DSecure authentication. The first transaction is flagged as initial transaction. The Transaction ID of the initial transaction can then be used for referenced/recurring transactions.

### A.	Initial Transaction:

The Initial Transaction can be performed with the PaymentPage Interface(https://saferpay.github.io/jsonapi/index.html#ChapterPaymentPage) or via the transaction interface, using Transaction Initialize and Transaction Authorize (https://saferpay.github.io/jsonapi/index.html#ChapterTransaction).

This transaction basically captures the credit card details and sets a flag, to mark it as an initial transaction that can be used as a reference for recurring transactions (referenced transactions)

It is important to consider the following issues:

> * You should perform the initial transaction with your normal eCommerce TerminalID. It is more secure if the cardholder goes through all security measures like, entering the CVC and performing the 3D Secure authentication process. These security measures are not applicable with the recurring transaction as the cardholder is not present. Thus, recurring payments do not offer liability shift. 

> * If you want to validate the cardholder without actually charging his bank account, you can trigger a “dummy” authorization with a small amount value (e.g. 1 Euro; Amount value “100”). If the transaction is not captured the customer will not be charged and therefore the cardholder will not notice this authorization. Please note that some banks do not support authorization of amounts smaller than 1 Euro (1 Dollar; 1 CHF etc.) 

In order to define a transaction as initial, as the base transaction which will be used as reference for future recurrent transactions, you need to set a special flag, either with  

[PaymentPage Initialize] (https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Initialize "PaymentPage Initialize) or [Transaction Initialize] (https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize "Transaction Initialize" 


By defining the Container
```json 
Recurring": {
      "Initial": true
```

Here is an example of a Paymentpage Request with the Container **Recurring**:
               
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

> This process must be carried out for every initial transaction, that might have a follow up.

###Validating the transaction

•	You can validate the transaction and assess transaction based information with either:
the PaymentPage Assert (PaymentPage: https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Assert) or Transaction Authorize function (Transaction Interface: https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Authorize)  Both will provide you with information about the Transaction as well as the  3D Secure response:

```json
{
  "ResponseHeader": {
    "SpecVersion": "1.5",
    "RequestId": "[your request id]"
  },
  "Transaction": {
    "Type": "PAYMENT",
    "Status": "AUTHORIZED",
    "Id": "MUOGAWA9pKr6rAv5dUKIbAjrCGYA",
    "Date": "2015-09-18T09:19:27.078Z",
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
      "ExpYear": 2015,
      "ExpMonth": 9,
      "HolderName": "Max Mustermann",
      "CountryCode": "CH"
    }
  },
  "Payer": {
    "IpAddress": "1.2.3.4",
    "IpLocation": "DE"
  },
  "ThreeDs": {
    "Authenticated": true,
    "LiabilityShift": true,
    "Xid": "ARkvCgk5Y1t/BDFFXkUPGX9DUgs=",
    "VerificationValue": "AAABBIIFmAAAAAAAAAAAAAAAAAA="
  }
}
```


Notice:
We recommend only to proceed, if the parameter “Authenticated” is true.
This value indicates that the card holder has performed a full successful authentication (3D Secure process) at his bank. This option gives you the highest level of security.
Please take notice that some banks will skip the 3Dsecure process if they consider the transaction to have a low risk thus will still grant Liabilityshift although the cardholder did not have to authenticate him or herself. In that case the values returned for ”LiabilityShift” will be “true” and  “Authenticated” will be “false”.
You should assess which level of security suits best to your business model and target group before deciding how to handle these two parameters.
You have to save the TransactionId, returned in the Paymentpage Assert or Transaction Authorize response as this value will be used to reference for the actual recurring transactions/payments.



Recurring Transaction:
The next step is to perform the actual recurring transaction(s).
The API-Function that is required is “Authorize Referenced” (https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AuthorizeReferenced).
You have to simply submit the TransactionId from your initial transaction (discussed in step 1) to trigger/perform the recurring transaction(s)

Here are some important points to consider:

1.)	The recurring transactions has to be performed with a Mail Phone Order TerminalId (MOTO Terminal) to ensure they are not rejected by the processor as the cardholder is not present and therefore cannot provide the CVC or partake in the 3D Secure process.
2.)	The Amount is a mandatory value which can vary from the Amount of the the initial transaction. Please make sure to inform the cardholder of price changes beforehand, else he or she might request a chargeback.
3.)	Each Transaction with the  Status ”Authorized”  has to be captured to initiate the actual transfer of money (This also applies to the initial Transaction):
You can do so, by taking the TransactionId and calling the Transaction Capture function (https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture)!

```json
{
  "ResponseHeader": {
    "SpecVersion": "1.5",
    "RequestId": "[your request id]"
  },
  "Transaction": {
    "Type": "PAYMENT",
    "Status": "AUTHORIZED",
    "Id": "723n4MAjMdhjSAhAKEUdA8jtl9jb",
    "Date": "2015-01-30T12:45:22.258+01:00",
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
      "ExpYear": 2015,
      "ExpMonth": 7,
      "HolderName": "Max Mustermann",
      "CountryCode": "CH"
    }
  },
  "Payer": {
    "IpAddress": "1.2.3.4",
    "IpLocation": "DE"
  },
  "Dcc": {
    "PayerAmount": {
      "Value": "109",
      "CurrencyCode": "USD"
    }
  }
}
```json

Automating the Recurring Payments
4.)	Automated recurring payments have to be triggered by merchant system.
            There are multiple ways to setup up the automated triggering of payments. The easiest way is to setup a Cronjob (Linux) or a Task (Windows).
With cronjobs you can schedules a command or script on your server to run automatically at a specified time and date (e.g. every minute, every 15 Minutes, every hour, or every day at 10pm or even every week at Sunday.) 
The cronjob can be linked with a script (e.g. PHP, or a Bash script) that will be executed, ever time the cronjob is triggered to perform the recurring transactions.
You have to decide when and how often the payments have to be triggered depending on your business model and the prearranged schedule of the payments. 
Please note that each transaction has to be finalized by calling the capture function including the automated recurring transactions.

It then goes through your Database and looks up the Initial Transactions. You have to set a specific flag inside your database, so it can differentiate between Initial transactions and those who aren’t.
            I’d also recommend setting a date and a flag, when the next transaction is due and, if the last one has been triggered successfully. It is just important, that thescript recognizes the correct transitions and takes the TransactionId, to do the Authorize Referenced-Call.
            You’d also need to save the amount and currency, so it knows which amount to charge and currency to use.


After a transaction is finished, you may call the capture to finalize everything and then the script proceeds to the next transaction. A simple “For Each”-Loop should do the trick here and you are settled.


