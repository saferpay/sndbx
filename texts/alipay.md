# Alipay
Alipay transactions can also be processed via the Saferpay JSON API. However, as a third party provider, there are a few things to consider, when offering Alipay to customers.

## <a name="alipay-requirement"></a> Requirements

* A corresponding license and thus a valid identification with a username and password for the Saferpay system.
* At least one active Saferpay terminal via which payment can be carried out and the associated Saferpay TerminalId.
*	A valid Alipay contract
*	JSON API Version 1.11 or later 

## <a name="alipay-general"></a> General specifics

+ **Cancel:** A cancel may only be performed before the Batch Close on Alipay side, which happens around 0:00am Bejing-time.
+ **Refunds:** A refund cannot be cancelled, so make sure, that you really want to execute it. Furthermore, in order to execute a refund, you must have made more, or equal that amount on that very day! The refunded amount won't be taken from your bank account, instead it will be subtracted from the overall money, you already made, since the last batch-close, on Alipay side. **If no, or not enough money was made, you cannot execute said refund!**
+ **Refunds #2:** Alipay does not need a <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Capture</a>! Thus the **CaptureId**, needed for a Refund, is returned within the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a>!
+ **OrderId:** The OrderId is limited to 64 characters.
+ **NotifyUrl:** The NotifyUrl is **mandatory**, in order to avoid missing payment successes. See the <a href="Integration_PP.html">Payment Page process</a> for further information!

