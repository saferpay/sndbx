# Alipay
Alipay transactions can also be processed via the Saferpay JSON API. However, as a third-party provider, there are a few things to consider when offering Alipay to customers.

## <a name="alipay-requirement"></a> Requirements

* A corresponding license and thus a valid identification with a username and password for the Saferpay system.
* At least one active Saferpay terminal on which the payment can be carried out, and the associated Saferpay terminal id.
* A valid Alipay contract
* JSON API Version 1.11 or later 
* Alipay is only available via the [Payment Page](Integration_PP.html)

## <a name="alipay-general"></a> Alipay specifics

+ **Cancel:** A cancel may only be performed before the batch close on Alipay side, which happens around 0:00am Bejing time.
+ **Capture:** As Alipay is a single-message protocol, they don't need or support <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">captures</a>.
+ **Refund:** A refund cannot be cancelled, so make sure that you really want to execute it. Furthermore, in order to execute a refund, the turnover on this day must be greater than or equal to the amount to be refunded. The refunded amount won't be taken from your bank account, instead it will be subtracted from the overall turnover since the last batch close.
+ **Refund #2:** Note that the **CaptureId**, needed for a refund, is returned as part of the response of <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a>.
+ **OrderId:** The OrderId is limited to 64 characters.
+ **NotifyUrl:** The NotifyUrl is **mandatory**, in order to avoid missing payment successes. See the <a href="Integration_PP.html">Payment Page process</a> for further information.

