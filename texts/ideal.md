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
