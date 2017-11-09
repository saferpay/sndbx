# Refunds via API
Saferpay generally offers a refund functionality from the start through the Saferpay Backoffice.
However, if automated, or more integrated processes are needed, the JSON-API can be used to execute refunds from the merchants webshop, or ERP-system. This part of the guide covers the process of how to execute refunds through the Saferpay JSON-API, which can be performed in two ways.

<div class="info">
  <p><strong>Note:</strong> Not all payment methods to support a refund functionality. Especially online banking does not provide refund due to how the money is processed. You can find a complete overview of the supported functionalities in the <a href="https://saferpay.github.io/sndbx/#pm-functions">Payment Method Features matrix</a></p>.
</div>

<div class="warning">
  <p><strong>Attention:</strong> The refund functionality is part of the Transaction Interface, which is only available for holders of a business license on the live system. For the eCommerce license, these features are not available and a refund has to be executed through the Backoffice. The test accounts have business activated by default for evaluation purposes.</p>
</div>

## <a name="refund-req"></a> Requirements

*	a Saferpay Business License
*	a valid login access with a username and password for the Saferpay Backoffice.
*	one active Saferpay ecommerce terminal
*	Saferpay terminal number (TerminalId parameter) and Saferpay customer number (CustomerId parameter).
*	valid acceptance agreement for credit cards or other payment methods
*	Secure Card Data Module (if refunds are performed using Aliases. Method 2)

## <a name="refund-reference"></a> Method 1: Referenced refunds

Referenced refunds are performed, by using the [Refund request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Refund). This request accepts the **original transaction ID, of the transaction you want to refund!**. By passing this ID through to Saferpay, the refund will be linked to the original transaction inside the Saferpay Backoffice:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/refund.PNG "Refund")

By clicking on the transaction ID you'll be redirected to the original transaction:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/refund_trx.PNG "Refunded Transaction")

## <a name="refund-alias"></a> Method 2: Refunds using an alias

A different method is using an alias obtained through Secure Card Data, which [can be obtained in multiple ways](https://saferpay.github.io/sndbx/scd.html).

The request however is a different one, than with referenced refunds. When using an alias, the [Refund Direct request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_RefundDirect) has to be used.

<div class="danger">
  <p><strong>Attention:</strong> While <a href="https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_RefundDirect">Refund Direct</a> does offer the possibilities to submit the card number (PAN) directly, it is not allowed to do this without a full PCI-DSS certification. More on that topic can be found in the<a href="https://saferpay.github.io/sndbx/index.html#pci">Data Security and PCI DSS chapter</a>. </p>
</div>

<div class="info">
  <p><strong>Note:</strong> Due to the fact, that the original transaction ID is not submitted, like with referenced refunds, the refund will not be linked to the original transaction inside the Saferpay Backoffice!</p>. 
</div>

## <a name="refund-capture"></a> Capture

Like normal transactions, refunds need to be captured/booked by executing the [Capture request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture) successfully! **The actual transfer of money will not be executed if the refund hasn't been captured!**

## <a name="refund-info"></a> Additional information

Refunds are basically normal transactions where instead of debiting the cardholders account, you are crediting it. That means, that refunds go through the same authorization-steps like a normal authorization. Which means that a refund can also be rejected.

You can also define a higher or lower amount than originally authorized. This also applies to referenced refunds. The refund will be regarded as a completely new transaction, with its own set of parameters, like the amount value. So, if you want to refund two transactions in one batch, you can do that by simply adding the amounts together. Please make sure to keep track of this process.

One way to do so (like with normal transactions) is to submit the parameter **"OrderId"** inside the **"Refund"** container. This ID will be forwarded by Saferpay and will show up inside the Saferpay Backoffice (as the Reference number) as well as in your reconciliation-files.
