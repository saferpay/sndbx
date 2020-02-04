# iDeal
iDeal transactions can also be processed via the Saferpay JSON API. However, as iDeal is a third party provider, there are a few things to consider.

## <a name="ideal-requirement"></a> Requirements

The handling of iDeal payments with Saferpay requires:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* A valid iDeal merchant account.
* iDeal is only available via the [PaymentPage flow](Integration_PP.html)!
* **NotifyUrl:** The NotifyUrl is **mandatory**, in order to avoid missing payment successes. See the <a href="Integration_PP.html">Payment Page process</a> for further information!

<div class="warning">
  <p><strong>Attention:</strong> For iDeal activation on the Saferpay terminal, please contact your sales contact.</p>
</div>

## <a name="ideal-timeout"></a> Session Timeouts

Due to special technical restrictions by iDeal, you have to be very careful using it in time-sensitive scenarios.
iDeal-transactions usually are finished within the Saferpay Payment Page timeout of 20 minutes.
However, due to processing-limitations, iDeal response-times can be way higher than this time frame.
So if your session runs into a timeout during this window, it could be, that the transaction is successful, even though your system does not recognize it as such!
**We generally recommend setting the timeout to 35 minutes, however the processing can take up to 12 hours on iDeal-side!**
If you are running a time-sensitive process, that requires your session to be lower, than this timne frame, we recommend not using iDeal!
Furthermore, we highly recommend [using the NotifyUrl for the Saferpay Payment Page](https://saferpay.github.io/sndbx/Integration_PP.html#pp-initialize), which will be called, once we (Saferpay) get a successful response from iDeal!
This way your shop does get the necessary information in case of a success, even after 12 hours and can initiate further processing.

## <a name="ideal-pre"></a> Bank Pre-Selection

You may want to implement the Bank selection for iDeal payments into your shop, or just pre-select the bank for your customer, so they do not have to. Saferpay offers an option, to skip the selection page and jump right to yyour customers online banking site, so he/she may perform the payment.

<div class="warning">
  <p><strong>Attention:</strong> This feature is only available with <strong>SpecVersion 1.15</strong> and up!</p>
</div>

In order to pre-select the bank, you have to set the parameter <strong>PaymentMethods</strong> with the value <strong>IDEAL</strong>, in order to pre-select iDeal in general and then you have to fill in the parameter <strong>PaymentMethodsOptions.Ideal.IssuerId</strong> with one of the following values, depending on which bank you want to pre-select:


<div class="warning">
  <p><strong>Attention:</strong> These Values are issued, by iDeal and underly changes, as they seem necessary!</p>
</div>

### Test Environment Values

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Bank</th>
      <th class="text-center">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Test Bank 1</td>
      <td class="text-center">0091</td>
    </tr>
    <tr>
      <td>Test Bank 2</td>
      <td class="text-center">0092</td>
    </tr>
  </tbody>
</table>

### Production Values

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Bank</th>
      <th class="text-center">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ABN AMRO</td>
      <td class="text-center">ABNANL2A</td>
    </tr>
    <tr>
      <td>ASN Bank</td>
      <td class="text-center">ASNBNL21</td>
    </tr>
    <tr>
      <td>bunq</td>
      <td class="text-center">BUNQNL2A</td>
    </tr>
    <tr>
      <td>Handelsbanken</td>
      <td class="text-center">HANDNL2A</td>
    </tr>
    <tr>
      <td>ING</td>
      <td class="text-center">INGBNL2A</td>
    </tr>
    <tr>
      <td>Knab</td>
      <td class="text-center">KNABNL2H</td>
    </tr>
    <tr>
      <td>Moneyou</td>
      <td class="text-center">MOYONL21</td>
    </tr>
    <tr>
      <td>Rabobank</td>
      <td class="text-center">RABONL2U</td>
    </tr>
    <tr>
      <td>RegioBank</td>
      <td class="text-center">RBRBNL21</td>
    </tr>
    <tr>
      <td>SNS</td>
      <td class="text-center">SNSBNL2A</td>
    </tr>
    <tr>
      <td>Triodos Bank</td>
      <td class="text-center">TRIONL2U</td>
    </tr>
    <tr>
      <td>Van Lanschot</td>
      <td class="text-center">FVLBNL22</td>
    </tr>
  </tbody>
</table>

## <a name="ideal-refund"></a> SEPA manual Refunds for iDeal

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

<div class="warning">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> It may be necessary to contact your bank, for this import-feature to be activated! Some also may not offer it at all!
  </p>
</div>
<div class="danger">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Caution:</strong> SEPA-refund-files from the test-environment can't be uploaded into online-banking portals, since they only contain test-data, thus non-valid IBANs!
  </p>
</div>


