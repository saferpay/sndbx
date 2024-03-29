<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>SITE MOVED:</strong> This documentation is outdated, as of July 26th 2021. The new and improved documentation can be found under <a href="https://docs.saferpay.com/home/integration-guide/introduction">https://docs.saferpay.com/</a>.</p>
</div>




# SEPA ELV
SEPA transactions can also be processed via the Saferpay JSON API, through a partnership with Intercard.

## <a name="sepa-requirement"></a> Requirements

The handling of SEPA payments with Saferpay requires:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* A valid SEPA contract with Intercard.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Attention:</strong> For SEPA activation on the Saferpay terminal and the necessary contract, please contact your Saferpay sales contact.</p>
</div>

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Info:</strong> SEPA makes it necessary to define a unique SEPA MandateId for each transaction. You -the merchant- have two options to deal with this requirement:</p>
  <ul>
    <li>You can define your own MandateId and submit it inside the <strong>Payment.MandateId</strong> parameter within the initialize request! <strong>Make sure it is unique!</strong></li>
    <li>If <strong>Payment.MandateId</strong> is not used, Saferpay will use the Saferpay TransactionId as its replacement, which is unique. You can find this value inside the authorization response as <strong>Transaction.Id</strong>!</li>
  <ul>
</div>

## <a name="sepa-refund"></a> SEPA manual Refunds

Saferpay does offer the possibility to accept refunds for certain SEPA-based payment methods. However those need special attention.
Reason being, that SEPA does not directly offer refunds, which is just in the nature of the payment-system itself. 
Due to this, Saferpay offers a workaround, to make manual SEPA-refunds easier for the merchant.

### Step 1: Activation

Before you -the merchant- can start accepting refunds, they need to be activated inside the Saferpay Backoffice:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/BO_Manual_Refund.png "Manual refund activation")

### Step 2: Executing refunds

Once the activation has been done, you can execute refunds, like any other payment method. Either <a href="refund.html">via API</a>, or inside the Saferpay Backoffice.

### Step 3: Uploading the refunds into your online-banking

This is, where SEPA-refunds deviate from other payment methods, like credit cards.
As mentioned before, SEPA does not offer direct refunds via the processing itself. This is why Saferpay first collects all executed refunds inside the backoffice:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/BO_Manual_Refund_Export.png "Manual refund activation")

These refunds need then to be exported into a special XML-File, which can be done right there inside the Backoffice.
The created XML-file can then be uploaded into your online banking-portal, which executes these refunds in a batch, eliminating the need, of doing them all manually.
You can <a href="https://github.com/saferpay/sndbx/blob/master/assets/other/ManualBankRefund-2019-09-13-10-50-28-Example_File.xml" download>download an example-file here</a>.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> It may be necessary to contact your bank, for this import-feature to be activated! Some also may not offer it at all!
  </p>
</div>
<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Caution:</strong> SEPA-refund-files from the test-environment can't be uploaded into online-banking portals, since they only contain test-data, thus non-valid IBANs!
  </p>
</div>

