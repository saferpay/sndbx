# PSD2

With the introduction of PSD2 within the EU, the ruleset for doing card transactions, has been changed in many ways.
Specifically the need for <strong>S</strong>trong <strong>C</strong>onsumer <strong>A</strong>uthentication needs special attention from merchants.
This chapter will contain important information on PSD2 and SCA specifically.

## <a name="psd2-apply"></a> Does PSD2 apply to me?

The first step, is to figure out, if PSD2 applies to you -the merchant- in the first place.
Important to know is, that PSD2 is valid for all countries inside the EEA (European Economic Area), which is **NOT the same as the European Union!** However the important part is, where you have signed your acquiring contract! When signing a card acceptance contract with an Acquirer, you have to pay attention to the country in which the contract is signed! Should this country be inside the EEA, then PSD2 does apply to you! **This is also applies, if you -the merchant- have your company headquarters outside the EEA!**

However should PSD2 not apply to you, then you do not have to follow the rules for SCA. Even though we highly recommend doing 3D Secure, since it is also an anti-fraud measure, you can request an exemption, to avoid 3DS (see further below).

### API-response

Saferpay also tries to determine, whether or not a transaction has been inside the PSD2 scope.
This information is then returned to you via the API, through the **Liability.InPsd2Scope** parameter.

#### Example

```json 
{
  "ResponseHeader": {
    "SpecVersion": "[current Spec-Version]",
    "RequestId": "[unique request id]"
  },
  "Transaction": {
    "Type": "PAYMENT",
    "Status": "AUTHORIZED",
    "Id": "f3QnO7bxCnY1vAlOvvr5A4z9IphA",
    "Date": "2021-05-17T13:05:49.920+02:00",
    "Amount": {
      "Value": "245",
      "CurrencyCode": "EUR"
    },
    "OrderId": "0",
    "AcquirerName": "MasterCard Saferpay Test",
    "AcquirerReference": "05945355638",
    "SixTransactionReference": "0:0:3:f3QnO7bxCnY1vAlOvvr5A4z9IphA",
    "ApprovalCode": "292749",
    "IssuerReference": {
      "TransactionStamp": "767980829703",
      "SettlementDate": "0517"
    }
  },
  "PaymentMeans": {
    "Brand": {
      "PaymentMethod": "MASTERCARD",
      "Name": "MasterCard"
    },
    "DisplayText": "xxxx xxxx xxxx 0006",
    "Card": {
      "MaskedNumber": "xxxxxxxxxxxx0006",
      "ExpYear": 2021,
      "ExpMonth": 5,
      "HolderName": "John Doe",
      "CountryCode": "US",
      "HashValue": "0DBC2E4EB492F7AB4122602B46D60D89DEF51C8C"
    }
  },
  "Payer": {
    "IpAddress": "87.123.201.46",
    "IpLocation": "DE",
    "BillingAddress": {
      "FirstName": "John",
      "LastName": "Doe",
      "CountryCode": "de",
      "Email": "john.doe@provider.com"
    }
  },
  "Liability": {
    "LiabilityShift": true,
    "LiableEntity": "THREEDS",
    "ThreeDs": {
      "Authenticated": true,
      "LiabilityShift": true,
      "Xid": "4ca1a5e4-f9fc-4081-873f-f02e30547c81",
      "Version": "2",
      "AuthenticationType": "FRICTIONLESS"
    },
    "InPsd2Scope": "YES"
  }
}
```

## <a name="psd2-when"></a> When to do SCA?

As a rule of thumb, ask yourself the following question: 

**Is the card holder present, to enter his/her card details, or otherwise be able to interact with your webshop/system? If so: SCA hast to be performed, in any case!**

This also applies to card registrations, if the card holder is not present during the next, real, transaction!

Also make sure, that you use a flow, that can do SCA -in form of <a href="/sndbx/#3ds">3D Secure</a>- in the first Place! Be it the <a href="Integration_PP.html">Payment Page</a> or the <a href="Integration_trx.html">Transaction Interface</a>. Saferpay will always attempt 3D Secure and thus SCA!

**Your acquiring contract also has to support 3D Secure!** However most acquirers do not offer contracts without 3D Secure in the first place, without being explicitly asked for one. When in doubt: Ask your acquirer, if your contract is set up for 3D Secure, or not!

## <a name="psd2-overview"></a> Overview

PSD2 is very complex. So to give you an overview of what flows need and what do not need SCA, please refer to the following tables:

### Transactions and flows, that DO need SCA

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center" style="width: 140px;">Case</th>
      <th class="text-center">Description</th>
      <th class="text-center">Flows/Requests</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center">Customer Initiated Transactions (CIT)</td>
      <td>This is your standard transaction-type. The card holder comes to the shop and orders something. The card holer is present during these transactions and as mentioned above, they must be covered with SCA and thus 3-D Secure!</td>
      <td><a href="Integration_PP.html">Payment Page Integration</a>, <a href="Integration_trx.html">Transaction interface Integration</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize">Transaction Initialize</a> & <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize">Transaction Authorize</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page Initialize</a> & <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a></td>
    </tr>
    <tr>
      <td class="text-center">Initial Recurring/Installment Transaction</td>
      <td>This is a special type of Customer Initiated Transaction. With PSD2 the first (initial) transaction within a recurring-chain needs to be covered by SCA! Thus, we highly recommend forcing SCA (see further down in this chapter). Each subsequent transaction then references this transaction. </td>
      <td><a href="recurring.html">Recurring Integration</a>, <a href="Integration_PP.html">Payment Page Integration</a>, <a href="Integration_trx.html">Transaction Interface Integration</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize">Transaction Initialize</a> & <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize">Transaction Authorize</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page Initialize</a> & <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a></td>
    </tr>
    <tr>
      <td class="text-center">Saving Cards</td>
      <td>If you intend on saving cards with the intent of doing MITs (see below), with no card holder presence, you must make sure, that SCA is performed during registration! You should force SCA. More information, on how to force SCA, can be found, further down in this chapter! However, if you simply intend on just saving the card, so the card holder doesn't have to enter his card details again, during the next transaction, <strong>performed with 3D Secure</strong> you do not have to do SCA during the registration. <strong>Note</strong> If you register a card during a<a href="Integration_PP.html">Payment Page</a> or <a href="Integration_trx.html">Transaction Interface</a> transaction, with 3D Secure, then this registration is fully PSD2 compliant!</td>
      <td><a href="scd.html#scd-sa">Standalone Secure Card Data registration</td>
    </tr>
  </tbody>
</table>

### Transactions and flows, that DO NOT need SCA

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center" style="width: 140px;">Case</th>
      <th class="text-center">Description</th>
      <th class="text-center">Flows/Requests</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center">Merchant Initiated Transactions (MIT)</td>
      <td>Basically all transactions, that are triggered by Merchant, with the card holders consent, while not being present. <strong>However: SCA has to be made, while acquiring the card details for this transaction, e.g. via a Secure Card Data registration (see above)!</strong></td>
      <td><a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect">Authorize Direct</a> e.g. using <a href="https://saferpay.github.io/sndbx/scd.html">an alias</a></td>
    </tr>
    <tr>
      <td class="text-center">Subsequent Recurring/installment Transaction</td>
      <td>
        These are transactions, that follow the initial recurring transaction (see above) and are a special type of Merchant initiated Transaction (see above). They must reference the initial transaction.
      </td>
      <td><a href="recurring.html">Recurring Integration</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeReferenced">Authorize Referenced</a></td>
    </tr>
    <tr>
      <td class="text-center">Mail Phone Order</td>
      <td>Transactions, where the payment means are provided to the merchant via phone, or mail. <strong>MPO transactions are out-of-scope of PSD2! SCA does not apply here!</strong></td>
      <td>N/A</td>
    </tr>
    <tr>
      <td class="text-center">One legged CIT transactions</td>
      <td>Generally, we always recommend doing 3D Secure. However there are CITs, that do not need SCA. Cases are, if either the card issuer (bank of the card holder), or the Acquirer of the Merchant, are outside the EEA (European Economic Area)! However, what is important here for the latter, is, in which country the acquiring contract has been signed. For instance: If a swiss merchant signs a contract within germany and a german card holder comes to his shop, PSD2 does indeed apply, even though the merchant is not inside the EEA! However the card issuer and the acquirer are!</td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>

## <a name="psd2-force"></a> When and how to force SCA

There are certain Cases, where SCA must be made, with no exception!
Saferpay offers the option to force SCA during a transaction and you -the merchant- has to make sure, that the transaction (or registration) is covered by SCA in the following cases:

+ <strong>MITs via Card Alias:</strong> If you intend on doing any kind of MIT, like <a href="recurring.html#recurring-alias">Recurring Payments</a>, via an alias, you must force SCA during the registration.
  + <strong>Forcing SCA during a transaction:</strong> When registering a card, during a transaction, be it via the <a href="scd.html#scd-trx">Transaction interface</a> or the <a href="scd.html#scd-pp">Payment Page</a>, you must force a 3D Secure Challanged flow, by also setting the <strong>Authentication.ThreeDsChallenge</strong> parameter to <strong>FORCE</strong>, within the respective Initialization request. 
  + <strong>Forcing SCA during a standalone registration:</strong> In some cases, it may be viable to save a card first, but charge it way later down the line. However, those transactions are usually MIT, with the card holder not being present! Due to that, SCA has to be performed during registration, requiring a <a href="scd.html#scd-check">Strong Online Check with SCA</a>!
+ <strong>Initial Recurring Transactions:</strong> We highly recommend you also force SCA during an initial transaction, for <a href="recurring.html">Recurring Payments</a>. When doing the initial transaction, be it through the <a href="Integration_PP.html">Payment Page</a> or the <a href="Integration_trx.html">Transaction Interface</a>, you should also set the <strong>Authentication.ThreeDsChallenge</strong> parameter to <strong>FORCE</strong>. 

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Important:</strong> This only applies, if you intend on doing MITs right after the registration! However if you plan on using the Alias for CITs with 3DS -and thus SCA- beforehand, or only that, then you do not have to consider this!</p>
</div><br />
<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Tip:</strong> If you have a high risk business, or generally want a higher level of protection against fraud, you can, of course, force SCA too!</p>
</div><br />
<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Tip:</strong> If you have previously created aliases, without the necessary SCA-Info attached, you can perform a transaction with forced SCA and Saferpay will automatically update the Alias, with the SCA-data, so you may use the Alias for MITs.</p>
</div><br />
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> Forcing SCA is only possible with Visa/Vpay, Mastercard/Maestro and American Express! <strong>Other card-brands are currently NOT MIT-compliant under PSD2 and thusly cannot be used in this way!</strong></strong>
  </p>
</div><br />
<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Caution:</strong> Forcing SCA during the first transaction/registration, does NOT excuse you from doing SCA/3D Secure afterwards, if you intend on doing CITs with a saved card! There are exemptions (see below), but those also have their own set of rules to follow!
  </p>
</div>

## <a name="psd2-exemptions"></a> SCA Exemptions

SCA Exemptions are certain cases, where SCA either doesn't havve to be applied, or cannot be applied!
Transactions in these cases must be flagged accordingly, or they may be refused. Also, in any case, the merchant would perform transactions against the PSD2!
The Exemption value may be submitted via the <strong>Authentication.Exemption</strong> parameter, within the respective initial request (see flows and requests column).

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Caution:</strong> Do not submit exemptions on your own, without the consent of your Acquirer! The Acquirer otherwise has the right to deny these transsactions at any time!
  </p>
</div>
<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Very Important:</strong> Even if you are allowed to submit exemptions, you have to make sure, that your implementation generally follows the PSD2 rules!
  </p>
</div>
</div>
<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Warning:</strong> When an exemption is applied, no Liabilityshift through 3D Secure is given! You, the merchant, will thus take full responsibility, in case of fraud!
  </p>
</div>
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> The issuing bank always has the right to reject a transaction and ask for a full transaction, with SCA! This also applies to Recurring Transactions! In these cases, the transaction will run into a <strong>Soft decline (see below).</strong>
  </p>
</div>

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Exemption</th>
      <th class="text-center">Usecase</th>
      <th class="text-center">Flows and requests</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center"><strong>Authentication.Exemption: "LOW_VALUE"</strong></td>
      <td>
        <p>This transaction has an overall value of 30 Euros, or lower and thus does not fall under SCA by PSD2! However, that falls under certain rules:</p>
        <ul>
          <li>After 5 transactions, without SCA, SCA must be performed again!</li>
          <li>After a cumulative value of 100,-, SCA must be performed again!</li>
        </ul>
      </td>
     <td><a href="Integration_PP.html">Payment Page Flow</a>, <a href="Integration_trx.html">Transaction Interface Flow</a></td>
    </tr>
    <tr>
     <td class="text-center"><strong>Authentication.Exemption: "TRANSACTION_RISK_ANALYSIS"</strong></td>
     <td>
       External Fraud Risk Analysis has been done and the transaction has been deemed at low risk.</ br>
       <div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Tip:</strong> Interested in using such a tool? <a href="fraugster.html">Saferpay Fraud Intelligence</a> offers the possibility of automatically analyzing transactions and applying the TRA exemption for you, if applicable!</a>
  </p>
</div>
     </td>
     <td><a href="Integration_PP.html">Payment Page Flow</a>, <a href="Integration_trx.html">Transaction Interface Flow</a></td>
    </tr>
    <tr>
     <td class="text-center"><strong>Authentication.Exemption: "RECURRING"</strong></td>
     <td>This transaction is a subsequent, recurring transaction, which does not need SCA!</td>
      <td><a href="recurring.html">Recurring Flow</a></td>
    </tr>
    <tr>
     <td class="text-center"><strong>Authentication.ThreeDsChallenge: "AVOID"</strong></td>
     <td>
       <p>A 3D Secure challanged flow should  be avoided for this transaction!</p>
        <div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
          <p>
            <strong>CAUTION:</strong> This value may only be used by merchants and transactions outside  the PSD2 scope. <strong>Do not</strong> use this value, without evaluating, if PSD2 applies to you/the transaction, or not! Attempting a transaction inside the PSD2 scope, with avoidance, will lead to a soft decline (see below)!
          </p>
        </div>
     </td>
     <td><a href="Integration_PP.html">Payment Page Flow</a>, <a href="Integration_trx.html">Transaction Interface Flow</a></td>
    </tr>
  </tbody>
</table>

## <a name="psd2-special"></a> Special Cases


While Saferpay aims to make handling these cases as trivial, as possible, there are certain special cases, that deviate from the usual flows and integrations.

### Transferring SCA from and to Saferpay

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
    <p>
      <strong>CAUTION:</strong> This flow is only possible, if you are fully PCI certified!
    </p>
</div>

In certain cases, it may be necessary to perform SCA through a system, that is not connected to Saferpay, or transfer existing SCA-data to an external system. While Saferpay **does not support the inclusion of external 3D Secure-systems**, it does support the transfer of the transaction stamp, once an authorization has been made with SCA. So please keep that in mind, since these two are not the same. The transaction-stamp is only returned by the bank on a successful authrorization of a card!



### SCA transfer to Saferpay

The transfer of SCA-data to Saferpay is currently only supported, while doing MIT transactions, using <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect">Authorize Direct</a> and a direct post of the card-data (**note the PCI-warning above!**). In order to reference the SCA-data, one must also submit the parameters **Authentication.IssuerReference.TransactionStamp** and **Authentication.IssuerReference.SettlementDate** (if applicable), alsongside the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect">Authorize Direct</a> request:

#### Example

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
    },
    "Description": "Test123",
    "PayerNote": "Order123_Testshop"
  },
  "PaymentMeans": {
    "Card": {
      "Number": "912345678901234",
      "ExpYear": 2015,
      "ExpMonth": 9,
      "HolderName": "Max Mustermann",
      "VerificationCode": "123"
    }
  },
  "Authentication": {
    "IssuerReference": {
      "TransactionStamp": "767980829703",
      "SettlementDate": "0517"
    }
  }
}
```

### SCA transfer from Saferpay

Likewise, whenever a transaction is done with SCA, Saferpay will return these values, alongside the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a> and <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize">Transaction Authorize</a> authorization responses, inside the **Transaction.IssuerReference** container.

#### Example

```json 
{
  "ResponseHeader": {
    "SpecVersion": "[current Spec-Version]",
    "RequestId": "[unique request id]"
  },
  "Transaction": {
    "Type": "PAYMENT",
    "Status": "AUTHORIZED",
    "Id": "f3QnO7bxCnY1vAlOvvr5A4z9IphA",
    "Date": "2021-05-17T13:05:49.920+02:00",
    "Amount": {
      "Value": "245",
      "CurrencyCode": "EUR"
    },
    "OrderId": "0",
    "AcquirerName": "MasterCard Saferpay Test",
    "AcquirerReference": "05945355638",
    "SixTransactionReference": "0:0:3:f3QnO7bxCnY1vAlOvvr5A4z9IphA",
    "ApprovalCode": "292749",
    "IssuerReference": {
      "TransactionStamp": "767980829703",
      "SettlementDate": "0517"
    }
  },
  "PaymentMeans": {
    "Brand": {
      "PaymentMethod": "MASTERCARD",
      "Name": "MasterCard"
    },
    "DisplayText": "xxxx xxxx xxxx 0006",
    "Card": {
      "MaskedNumber": "xxxxxxxxxxxx0006",
      "ExpYear": 2021,
      "ExpMonth": 5,
      "HolderName": "John Doe",
      "CountryCode": "US",
      "HashValue": "0DBC2E4EB492F7AB4122602B46D60D89DEF51C8C"
    }
  },
  "Payer": {
    "IpAddress": "87.123.201.46",
    "IpLocation": "DE",
    "BillingAddress": {
      "FirstName": "John",
      "LastName": "Doe",
      "CountryCode": "de",
      "Email": "john.doe@provider.com"
    }
  },
  "Liability": {
    "LiabilityShift": true,
    "LiableEntity": "ThreeDs",
    "ThreeDs": {
      "Authenticated": true,
      "LiabilityShift": true,
      "Xid": "c54a264e-dae2-45ad-b784-3eaa6be6956c"
    }
  }
}
```

These values then can be transferred to the external system.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> Not all external systems may support this feature!</strong>
  </p>
</div>

## <a name="psd2-decline"></a> Non Compliance

What happens in case of non-compliance?
With PSD2, every bank, inside the EEA is now obliged to reject transactions, that are not PSD2-compliant.

So for instance, if you register card details for, for example, recurring payments, without enforcing SCA during the registration, the card holders bank is obliged to reject every MIT, as they are described above.

In these cases, a so called **Soft Decline** is thrown:

### Example of a Soft Decline Error message with Mastercard

 ```json 
 { 
 "ResponseHeader": {
    "SpecVersion": "[current SpecVersion]",
    "RequestId": "[unique request id]"
  },
  "Behavior": "ABORT",
  "ErrorName": "PAYER_AUTHENTICATION_REQUIRED",
  "ErrorMessage": "Transaction declined by acquirer",
  "TransactionId": "llOKnfAEW57QSAErGdIYbAtAQ1fb",
  "ProcessorResult": "1A",
  "ProcessorMessage": "Additional customer authentication required"
}
```


### Example of a Soft Decline Error message with Visa/American Express

 ```json 
 { 
 "ResponseHeader": {
    "SpecVersion": "[current SpecVersion]",
    "RequestId": "[unique request id]"
  },
  "Behavior": "ABORT",
  "ErrorName": "PAYER_AUTHENTICATION_REQUIRED",
  "ErrorMessage": "Transaction declined by acquirer",
  "TransactionId": "dOrvUAAWn16USAU8d08OA10A03SA",
  "ProcessorResult": "65",
  "ProcessorMessage": "Soft decline, SCA required"
}
```


### Test Cards

If you want to force a Soft-Decline response, you can do so, by using our test-cards <a href="paymentmeans.html">Over here</a>.

### What to do, in case of a Soft Decline

If you recieve a Soft Decline, you have to re-initiate your process, with **forced** (see above) SCA in mind.
In case of the above example, the card details have to be re-registered, with SCA. The old Alias effectively becomes invalid and has to be re-created.
This also applies to <a href="recurring.html#recurring-referenced">Referenced Recurring Transactions</a>, requiring a new initial transaction, to set off a new recurring-chain.
So you must contact your customer, for him/her to go through the process again.

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Important Info:</strong> A bank has the right to request SCA and thus throw a soft decline at any point, if it deems it necessary! This is out of control of Wordline/Saferpay!</p>
</div>
