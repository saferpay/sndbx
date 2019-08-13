# The following entries are deprecated and are archived! DO NOT USE THEM!

## <a name="recurring-alias"></a> Recurring Payments using an alias

A second method is to use the Saferpay Secure Alias Store in conjunction with the [AuthorizeDirect Request](http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AuthorizeDirect) with previously registered Aliases

### 1. Obtaining the Alias

The alias can be obtained in multiple ways, using the Saferpay Secure Card Data store. [All of those options are described over here](https://saferpay.github.io/sndbx/scd.html).
By using the [Payment Page](https://saferpay.github.io/sndbx/Integration_PP.html) or [Transaction Interface](https://saferpay.github.io/sndbx/Integration_trx.html), it is possible to do an initial transaction, to validate the card (e.g. through 3D Secure), similar to the referenced transaction-process above! The initial payment, unlike with a referenced authorization, can then be discarded, once the alias has been obtained, using [Transaction Cancel](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel). This way the card holder doesn't get charged for the dummy-amount!

<div class="warning">
      <p><strong>Important:</strong> Amount values that undercut a certain value, can cause problems during the 3D Secure-process, thus we recommend a value of 500 (5,00 €). As mentioned above, this transaction can be discarded. It is only, to prevend the mentioned issues with 3D Secure!</p>
</div>

### 2. Recurring Transaction

Once tha alias has been obtained, you can execute the subsequent transactions using [AuthorizeDirect Request](http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AuthorizeDirect). The alias has to be filled into the **PaymentMeans => Alias** container.

<div class="warning">
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

<div class="danger">
      <p><strong>Important:</strong> Each Transaction with the Status <strong>Authorized</strong> has to be <a href="https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture">captured</a> to initiate the actual transfer of money.</p>
</div>

<div class="warning">
  <p><strong>Note:</strong> The recurring transactions have to be performed with a Mail Phone Order TerminalId (MOTO Terminal) to ensure that they are not rejected by the processor as the cardholder is not present and therefore cannot provide the CVC or partake in the 3D Secure process. The Amount is a mandatory value which can vary from the Amount of the initial transaction. Please make sure to inform the cardholder of amount changes beforehand, or else he or she might request a chargeback.</p>
</div>
