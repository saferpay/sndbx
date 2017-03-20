# Transaction Interface
The Transaction Interface is an extension to Payment Page. It can be operated in parallel or alone. In comparison to Payment Page, more functions for the processing of transactions are available. 

>
><i class="glyphicon glyphicon-hand-right"></i>**NOTE:** The JSON API can be used in various ways to cover the most diverse processes. For this reason, only the standard processes are discussed below. For other possible uses, or for questions about the standard procedures, please contact the [**Saferpay Integration Team**](https://saferpay.github.io/sndbx/contact.html).
>

>
><i class="glyphicon glyphicon-hand-right"></i>**Attention:** The Transaction Interface is only for holders of a business licence on the live system. For the eCommerce licence, the advanced features are not available. The test accounts have business activated by default, for evaluation purposes.
>

## <a name="trx-cc"></a> Credit Cards
In contrast to the payment page, credit card payments can be seamlessly integrated into the merchant's shop with the Transaction Interface. The procedure will be described in the following.

### <a name="trx-ini"></a>Transaction Initialize
The process begins with [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize). With this request, you forward all data necessary for the payment to Saferpay. Such as your customer number (CustomerId), the terminal number (Terminal Id), the currency (CurrencyCode), the amount (Value), the internal reference number of the merchant system (OrderId), and the return addresses (ReturnUrls) to which the customer will return, depending on the outcome of the payment. 

### Here are a few hints and tips about the options that are available for the merchant:

+ **ReturnUrls:** For security, Saferpay returns no data to return addresses of the shop. The identification of the payment or the returning customers is up to the merchant. We recommend using your own parameters. These can be attached via HTTP GET to the ReturnUrls. When a ReturnUrl is called, Saferpay returns the appended parameter, thus enabling identification of the customer. 

+ **Secure Card Data:** With the Initialize Request, it is also possible within Saferpay Secure Card Data Store to forward saved cards in the form of an alias. For example, this can be the case if the card number of the customer is already known, and you do not want her or him to have to re-enter it. To enter the alias, use the container PaymentMeans.
>
><i class="glyphicon glyphicon-hand-right"></i> **NOTE:** Although it is not permitted to store the Card Verification Code (CVC), it is usually still required for the authorization (see [Transaction Authorize](#transaction-authorize))  and must be requested.
>

### In the Response of the Initialize Request these parameters are import for further processing:

+ **Token:** The Token is mandatory for further steps within the payment process and must therefore be cached. Preferably, it should be linked to the parameters attached to the ReturnUrls. It can thus be easily reassigned.

+ **RedirectUrl:** Unlike with Payment Page, this URL is not used for a redirect. Instead, it is embedded in an HTML Iframe. Within this, a form hosted by Saferpay is displayed. This form can perform the capture of the card details in a PCI-compliant manner. You can find out more about the Iframe integration [in this chapter](https://saferpay.github.io/sndbx/CssiFrame.html).
>
><i class="glyphicon glyphicon-hand-right"></i> **NOTE:** If a request has already forwarded an alias, the display of the form will be skipped.
>

### <a name="trx-3ds"></a> 3-D Secure and DCC
If [3-D Secure](https://saferpay.github.io/sndbx/index.html#3ds) and/or [DCC](https://saferpay.github.io/sndbx/index.html#dcc) are available on the terminal for the payment method being used, these services are automatically conducted for the transaction as soon as the form has been sent. For this, no additional steps are necessary for the merchant. 

### <a name="trx-retshop"></a>Return to the Shop
Once [3-D Secure](https://saferpay.github.io/sndbx/index.html#3ds) and/or [DCC](https://saferpay.github.io/sndbx/index.html#dcc) are completed, the card holder – depending on the outcome – is taken to one of the **ReturnUrls** in the shop. Here, the GET parameters can be read and the **Token** can be assigned to the transaction. With the **Token**, the payment can be continued to the next step.

### <a name="trx-ta"></a>Transaction Authorize
With Payment Page, the payment is triggered automatically upon completion of [3-D Secure](https://saferpay.github.io/sndbx/index.html#3ds) and/or [DCC](https://saferpay.github.io/sndbx/index.html#dcc). In contrast, with Transaction Interface it is triggered separately via [Authorize Request](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize).

### Transaction Authorize offers further possibilities:

+ **Condition:** With the **Condition** parameter, it can be specified that a payment will only be authorised when a 3-D Secure liability shift is present for it.

+ **Secure Card Data:** Via the **RegisterAlias** container, card details from a payment can be stored safely and in conformity with PCI. For this, the alias for the card details is transmitted back to the merchant system with the authorisation response. It is then available for another purchase in the shop, without customers having to enter their card details again. See for example the [Initialize request above](https://saferpay.github.io/sndbx/Integration_trx.html#trx-ini). The parameter **IdGenerator** is used to determine how the alias is generated. If **MANUAL** is specified, the shop system passes an absolutely unique value. With **RANDOM**, a random alphanumeric value is generated by Saferpay. With **RANDOM_UNIQUE**, it will be additionally verified prior to generation of the alias, as to whether or not the card number/expiration date combination already exists as an alias entry in the database. If so, the already existing alias is returned and nothing new is generated.
>
><i class="glyphicon glyphicon-hand-right"></i> **NOTE:** A card will be registered only after a successful authorisation.
>
### With the **Transaction Authorize Response**, the authorisation data is returned in case of success. Based on this data, it can be decided how the transaction is to proceed. The following data is interesting in this regard:

+ **Transaction > ID:** The transaction identifier (**Id**) returned in the container **Transaction**, is a unique identifier for a transaction. The value is obligatory for further processing steps (Transaction [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) or [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel)) and should therefore be saved.

+ **ThreeDs:** This container provides information about whether or not transaction liability shift via [3-D Secure](https://saferpay.github.io/sndbx/index.html#3ds) is available or not. It is up to merchants whether or not they want to accept transactions without liability shift. Evaluation of the parameter provides the opportunity for merchants to incorporate appropriate rules here.
>
><i class="glyphicon glyphicon-hand-right"></i> **IMPORTANT:** Accepting transaction without LiabilityShift happens at the merchants own risk.
>
+ **Transaction > Status:** As already described [here](https://saferpay.github.io/sndbx/General.html#capture-batch), this status states whether or not a transaction has to be finalized via [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture). If the status is not **CAPTURED**, the capture must be run in order to finalize the transaction.

### <a name="trx-captcancel"></a>Capture or Cancel
Subsequently, the transaction will be finalised via [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) or broken off via [Cancel](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel). For this, the transaction identifier **Id** is required. Please refer to the notes on the payment methods on if and when a capture is necessary, and whether or not a Cancel can still be carried out.
Once these steps have been finalised, the transaction is complete.

## <a name="trx-sepa"></a> SEPA Direct Debit
Because there are no PCI requirements for direct debits, bank details data can be captured directly. The use of an in-house HTML form and the subsequent payment request are allowed. For this, the bank details must be forwarded to [AuthorizeDirect](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect) with the **BankAccount** parameter in the **PaymentMeans** container.
## <a name="trx-recurring"></a> Recurring Payments
Recurring payments are particularly interesting for subscription systems. A recurring payment is initiated via an initial payment. This can proceed via the **Initialize** transaction or via **PaymentPage Initialize**. For this, it is important that this first transaction is marked as an initial payment. This means that subsequent payments can be referenced back to them and that the entire subscription chain can be tracked.
