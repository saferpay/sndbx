# Alipay
Alipay transactions can also be processed via the Saferpay JSON API. However, as a third party provider, there are a few things to consider, when offering Alipay to customers.

## <a name="alipay-requirement"></a> Requirements

* A corresponding license and thus a valid identification with a username and password for the Saferpay system.
* At least one active Saferpay terminal via which payment can be carried out and the associated Saferpay TerminalId.
*	A valid Alipay contract
*	JSON API Version 1.11 or later 

## <a name="alipay-general"></a> General specifics

+ **Cancel:** A cancel may only be performed after the Batch Close on Alipay side, which happens around 0:00am Bejing-time.
+ **Refunds:** A refund cannot be cancelled, so make sure, that you really want to execute it.
+ **OrderId:** The OrderId is limited to 64 characters.
