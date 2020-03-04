# PSD2

With the introduction of PSD2 within the EU, the ruleset for doing card transactions, has been changed in many ways.
This chapter contains information and best practices, when dealing with card transactions under PSD2!

<div class="info">
  <p><strong>Tip:</strong> As a rule of thumb, ask yourself the following question: Is the card holder present, to enter his/her card details, or otherwise be able to interact with your webshop/system? If so: Do 3-D Secure!</p>
</div>

However, there are excemptions and to give you an overview of what flows need and what do not need SC, please refer to the following tables:

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
      <td>This is a special type of Customer Initiated Transaction. With PSD2 the first (initial) transaction within a recurring-chain needs to be covered by SCA. Each subsequent transaction then references this transaction. </td>
      <td><a href="recurring.html">Recurring Integration</a>, <a href="Integration_PP.html">Payment Page Integration</a>, <a href="Integration_trx.html">Transaction Interface Integration</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize">Transaction Initialize</a> & <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize">Transaction Authorize</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page Initialize</a> & <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a></td>
    </tr>
    <tr>
      <td class="text-center">Saving Cards</td>
      <td>When saving cards inside the Saferpay Secure Alias Store, with the intent of doing any kind of MITs with said saved card afterwards, you must force Strong Consumer Authentication! This will be handled further down in this very chapter!</td>
      <td><a href="scd.html">Secure Card Data registration</a>, <a href="https://saferpay.github.io/jsonapi/#ChapterAliasStore">Secure Card Data Store</a></td>
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
        These are transactions, that follow the initial recurring transaction (see above) and are a special type of Merchant initiated Transaction (see above). They must reference the initial transaction. Note, that due to that, they effectively also reference to the LiabilityShift of the initial transaction, giving an additional layer of protection for the merchant, by effectively granting subsequent LiabilityShift.
        <div class="warning">
          <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
          <p>
            <strong>Important:</strong> The subsequent LiabilityShift may be rejected by the issuing bank. Also changing the amount may cause rejection of LiabilityShift, or even the denial of an authorization alltogether. A new initial transaction may be executed instead, starting a new recurring-chain!
          </p>
        </div>
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
      <td>Generally, we always recommend doing 3D Secure. However there are CITs, that do not need SCA. Cases are, if one side of the transaction (Merchant|Card Holder) is not part of the EU! So if you and/or your customer are outside of the EU, PSD2 does not apply!</strong></td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>

## <a name="psd2-force"></a> When to force SCA?

There are certain Cases, where SCA must be made, with no exception!
Saferpay offers the option to force SCA during a transaction and you -the merchant- has to make sure, that the transaction (or registration) is covered by SCA in the following cases:

+ <strong>MITs via Card Alias:</strong> If you intend on doing any kind of MIT, like <a href="recurring.html#recurring-alias">Recurring Payments</a>, via an alias, you must force SCA during the registration.
  + <strong>Forcing SCA during a transaction:</strong> When registering a card, during a transaction, be it via the <a href="">Transaction interface</a> or the <a href="">Payment Page</a>, you must force a 3D Secure Challanged flow, by also setting the <strong>Authentication.ThreeDsChallenge</strong> parameter to <strong>FORCE</strong>, within the respective Initialization request. 
  + <strong>Forcing SCA during a standalone registration:</strong> In some cases, it may be viable to save a card first, but charge it way later down the line. However, those transactions are usually MIT, with the card holder not being present! Due to that, SCA has to be performed during registration, requiring an <a href="">Online Check with SCA</a>!

 <div class="info">
  <p><strong>Important:</strong> This only applies, if you intend on doing MITs right after the registration! However if you plan on using the Alias for CITs with 3DS -and thus SCA- beforehand, or only that, then you do not have to consider this!</p>
</div><br />
<div class="info">
  <p><strong>Tip:</strong> If you have a high risk business, or generally want a higher level of protection against fraud, you can, of course, force SCA too!</p>
</div><br />
<div class="danger">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Caution:</strong> Forcing SCA during the first transaction/registration, does NOT excuse you from doing SCA/3D Secure afterwards, if you intend on doing CITs with a saved card! There are exemptions (see below), but those also have their own set of rules to follow!
  </p>
</div>

## <a name="psd2-exemptions"></a> SCA Exemptions

SCA Exemptions are certain cases, where SCA either doesn't havve to be applied, or cannot be applied!
Transactions in these cases must be flagged accordingly, or they may be refused. Also, in any case, the merchant would perform transactions against the PSD2!
The Exemption value may be submitted via the <strong>Authentication.Exemption</strong> parameter, within the respective initial request (see flows and requests column).

<div class="warning">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> The issuing bank always has the right to reject a transaction and ask for a full transaction, with SCA! This also applies to Recurring Transactions!
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
      <td class="text-center"><strong>LOW_VALUE</strong></td>
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
     <td class="text-center"><strong>TRANSACTION_RISK_ANALYSIS</strong></td>
     <td>
       External Fraud Risk Analysis has been done and the transaction has been deemed at low risk.
      <strong>Very important:</strong> This value may not be submitted at will. An external risk analysis and the maximum transaction value allowed, must be discussed with your acquirer first!
     </td>
     <td><a href="Integration_PP.html">Payment Page Flow</a>, <a href="Integration_trx.html">Transaction Interface Flow</a></td>
    </tr>
    <tr>
     <td class="text-center"><strong>RECURRING</strong></td>
     <td>This transaction is a <a href="recurring.html">subsequent, recurring transaction</a>, which does not need SCA!</td>
    </tr>
  </tbody>
</table>

## <a name="psd2-decline"></a> Soft Decline

**!!!INFORMATION NEEDED!!!
Apparently we return a special code, if a transaction is declined, due to a lack of SCA!
Would be great, but has too be confirmed!**
