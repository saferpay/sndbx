# Refunds via API
Saferpay generally offers a refund functionality from the start through the Saferpay Backoffice.
However, if automated, or more integrated processes are needed, the JSON-API can be used to execute refunds from the merchants webshop, or ERP-system. This part of the guide covers the whole process of how to execute refunds through the Saferpay JSON-API, which can be performed in two ways.

<div class="info">
  <p><strong>Note:</strong> Not all payment methods support a refund functionality. Especially online banking payment methods do not provide refund functionality due to how the money is processed. You can find a complete overview of the supported fucntionalalities in the <a href="https://saferpay.github.io/sndbx/#pm-functions">Payment Method Features matrix</a></p>. 
</div>

<div class="warning">
  <p><strong>Attention:</strong> The refund functionality is part of the Transaction Interface, which is only available for holders of a business licence on the live system. For the eCommerce licence, these features are not available and a refund has to be executed through the Backoffice. The test accounts have business activated by default, for evaluation purposes.</p>
</div>


## <a name="refund-reference"></a> Method 1: Refernced refunds

Referenced refunds are done, by using the [Refund request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Refund). This request accepts the **original transaction ID, of the transaction you want to refund!**. By passing this ID through to Saferpay, the refund will be linked to the original transaction inside the Saferpay Backoffice:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/refund.PNG "Refund")

By clicking on the transaction ID you'll be redirected to the original transaction:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/refund_trx.PNG "Refunded Transaction")

## <a name="refund-alias"></a> Method 2: Refunds using an alias

A different method is using an alias obtained through Secure Card Data, either through the [Payment Page](https://saferpay.github.io/sndbx/Integration_PP.html#pp-initialize), [Transaction Autorize](https://saferpay.github.io/sndbx/Integration_trx.html#trx-ta), or the [Secure Alias Store](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Alias_Insert) directly.

The request however is a different one, than with referenced refunds. When using an alias, the [Refund Direct request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_RefundDirect) has to be used.

<div class="danger">
  <p><strong>Attention:</strong> While <a href="https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_RefundDirect">Refund Direct</a> does offer the possibilities to submit the card number (PAN) directly, it is not allowed to do this without a full PCI-DSS certification. More on that topic <a href="https://saferpay.github.io/sndbx/index.html#pci">can be found here</a>. </p>
</div>

<div class="info">
  <p><strong>Note:</strong> Due to the fact, that the original transaction ID is not submitted, like with referenced refunds, the refund will not be linked to the original transaction inside the Saferpay Backoffice!</p>. 
</div>

## <a name="refund-capture"></a> Capture

Like normal transactions, refunds need to be captured/booked by executing the [Capture request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture) successfully! **If not done properly, the money transfer will not be executed!**

## <a name="refund-info"></a> Additional information

Refunds are basically normal transactions with a negative sign in front of the amount. That means, that they'll go through the same authorization-steps like a normal authorization. Like them, they also can be rejected.

You can also define a higher, or lower amount, than originally authorized. Even with referenced refunds! The refund will be a completely new transaction, with its own set of parameters, like the amount. So if you want to refund two transactions with one batch, you can do that, by simply adding the amounts together. You just need to keep track of this process.

One way to do that, like with normal transactions, is to submit the parameter **"OrderId"** inside the **"Refund"**-container. This ID will be forwarded by us and will show up inside the Saferpay Backoffice (As the Reference number) and your reconciliation-files.
