# iDeal
iDeal transactions can be processed via the Saferpay JSON API. However, as iDeal is a third party provider, there are a few things to consider.

## <a name="ideal-requirement"></a> Requirements

The handling of iDeal payments with Saferpay requires:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out, and availability of the associated Saferpay TerminalId.
* A valid iDeal merchant account.
* iDeal is only available via the [PaymentPage flow](Integration_PP.html).
* **NotifyUrl:** The NotifyUrl is **mandatory**, in order to avoid missing payment successes. See the <a href="Integration_PP.html">Payment Page process</a> for further information.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>For iDeal activation on the Saferpay terminal, please contact your sales contact.</p>
</div>

## <a name="ideal-timeout"></a> Session Timeouts

Due to special technical restrictions of the iDeal platform, you have to be very careful using it in time-sensitive scenarios.

iDeal transactions usually are finished within the Saferpay Payment Page timeout of 20 minutes.
However, due to processing limitations, iDeal response times can be way higher than this time frame.
So if your session runs into a timeout during this window, it could be that the transaction is successful, even though your system does not recognize it as such!

**We generally recommend setting the timeout to 35 minutes, however the processing can take up to 12 hours on iDeal-side!**

If you are running a time sensitive process, that requires your session to be lower than this time frame, we recommend not using iDeal!

Furthermore, we highly recommend [using the NotifyUrl for the Saferpay Payment Page](https://saferpay.github.io/sndbx/Integration_PP.html#pp-initialize), which will be called, once Saferpay gets a successful response from iDeal. This way your shop does get the necessary information in case of a success, even after 12 hours, and can initiate further processing.

</div>
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>VERY IMPORTANT:</strong> In the case, that Saferpay does not recieve a response in due time, Saferpay will display a failure-message and will redirect the customer to the FailUrl! You can then call the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a>, to get the result. Should this transaction be pending, due to a prolonged processing, Saferpay will throw a "TRANSACTION_IN_WRONG_STATE" - "Transaction still in progress or abandoned by the payer." error message, indicating, that the processing is still ongoing! The NotifyUrl (see above) will then notify you about a successful payment, if possible and you can then use the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a> as usual, to get the transaction details! Should the NotifyUrl not be executed until your session timeout, you can also call the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a> proactively.</p>
</div>


## <a name="ideal-pre"></a> Bank Pre-Selection

You may want to implement the Bank selection for iDeal payments into your shop, or just pre-select the bank for your customer, so they do not have to. Saferpay offers an option to skip the selection page and jump right to your customer's online banking site, so he/she may perform the payment.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>This feature is only available with <strong>SpecVersion 1.15</strong> and up!</p>
</div>

In order to pre-select the bank, you have to set the parameter <strong>PaymentMethods</strong> to the value <strong>IDEAL</strong>. you then have set the parameter <strong>PaymentMethodsOptions.Ideal.IssuerId</strong> to one of the following values, depending on which bank you want to pre-select:

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>These Values are issued by iDeal and might change anytime. Further information may be acquired <a href="https://www.ideal.nl/en/partners/issuers/">over here</a>. </p>
  <p><strong>Last update: 20.01.2021</strong></p>
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
      <td>Moneyou <br /> <strong>Will be removed at May 3rd 2021!</strong></td>
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
      <td>Revolut</td>
      <td class="text-center">REVOLT21</td>
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

Saferpay does offer the possibility to accept refunds for certain SEPA-based payment methods. However those need special attention. SEPA does not directly offer refunds. Due to this, Saferpay offers a workaround, to make manual SEPA refunds easier for the merchant.

### Step 1: Activation

Before you can start accepting refunds, they need to be activated inside the Saferpay Backoffice:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/BO_Manual_Refund.png "Manual refund activation")

### Step 2: Executing refunds

Once the activation has been done, you can execute refunds, like any other payment method. Either <a href="refund.html">via API</a>, or within the Saferpay Backoffice.

### Step 3: Uploading the refunds into your online-banking

Here, SEPA refunds deviate from other payment methods, like credit cards.

As mentioned before, SEPA does not offer direct refunds via the processing itself. This is why Saferpay first collects all executed refunds inside the backoffice:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/BO_Manual_Refund_Export.png "Manual refund activation")

These refunds need then to be exported into a special XML file, which can be done right there inside the Backoffice. The created XML file can then be uploaded into your online banking-portal, which executes these refunds in a batch.

You can download an example file <a href="https://github.com/saferpay/sndbx/blob/master/assets/other/ManualBankRefund-2019-09-13-10-50-28-Example_File.xml" download>here</a>.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    It may be necessary to contact your bank, for this feature to be activated. Some banks may not offer this service at all.
  </p>
</div>

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    SEPA refund files from the test environment can't be uploaded into online-banking portals, since they only contain test data, thus non-valid IBANs!
  </p>
</div>


