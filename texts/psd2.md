# PSD2

 

<div class="info">
  <p><strong>Tip:</strong> As a rule of thumb, ask yourself the following question: Is the card holder present, to enter his/her card details, or otherwise be able to interact with your webshop/system? If so: Do 3-D Secure!</p>
</div>

However, there are excemptions and to give you an overview of what flows need and what do not need SC, please refer to the following tables:

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
      <td>This is a special type of Customer Initiated Transaction. With PSD2 the first (initial) transaction within a recurring-chain needs to be covered by SCA. Each subsequent transaction then references this transaction. </td>
      <td><a href="recurring.html">Recurring Integration</a>, <a href="Integration_PP.html">Payment Page Integration</a>, <a href="Integration_trx.html">Transaction Interface Integration</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize">Transaction Initialize</a> & <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize">Transaction Authorize</a>, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page Initialize</a> & <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a></td>
    </tr>
    <tr>
      <td class="text-center">Saved Cards</td>
      <td>This is specifically for cases, where the card itself has been saved, but not authorized, during the first user-interaction. While you are still allowed to just save cards, you have to make sure, that the first real transaction is covered by SCA! <strong>You are no longer allowed to just save cards and then do MIT (see below) transactions right away!</strong> Also remember: Is the customer present in your shop, you have to do SCA! This just coveres MITs (see below)!</td>
      <td><a href="scd.html#scd-sa">Standalone Secure Card Data registration</a>, <a href="https://saferpay.github.io/jsonapi/#ChapterAliasStore">Secure Card Data Store</a></td>
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
      <td>Basically all transactions, that are triggered by Merchant, with the card holders consent, while not being present. <strong>MITs do not offer LiabilityShift!</strong></td>
      <td><a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect">Authorize Direct</a> e.g. using <a href="https://saferpay.github.io/sndbx/scd.html">an alias</a></td>
    </tr>
    <tr>
      <td class="text-center">Subsequent Recurring/installment Transaction</td>
      <td>
        These are transactions, that follow the initial recurring transaction (see above) and are a special type of Merchant initiated Transaction (see above).. They must reference the initial transaction. Note, that due to that, they effectively also reference to the LiabilityShift of the initial transaction, giving an additional layer of protection for the merchant, by effectively granting subsequent LiabilityShift.
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

