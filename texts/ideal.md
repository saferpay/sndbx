# iDeal
iDeal transactions can also be processed via the Saferpay JSON API. However, as iDeal is a third party provider, there are a few things to consider.

## <a name="ideal-timeout"></a> Session Timeouts

Due to special technical restrictions by iDeal, you have to be very careful using it in time-sensitive scenarios.
iDeal-transactions usually are finished within the Saferpay Payment Page timeout of 20 minutes.
However, due to processing-limitations, iDeal response-times can be way higher than this time frame.
So if your session runs into a timeout during this window, it could be, that the transaction is successful, even though your system does not recognize it as such!
**We generally recommend setting the timeout to 35 minutes, however the processing can take up to 12 hours on iDeal-side!**
If you are running a time-sensitive process, that requires your session to be lower, than this timne frame, we recommend not using iDeal!
Furthermore, we highly recommend [using the NotifyUrl for the Saferpay Payment Page](https://saferpay.github.io/sndbx/Integration_PP.html#pp-initialize), which will be called, once we (Saferpay) get a successful response from iDeal!
This way your shop does get the necessary information in case of a success, even after 12 hours and can initiate further processing.
