# TWINT

This chapter will handle all specifics involved with the integration of the payment method TWINT.

## <a name="twint-requirement"></a> Requirements

* A corresponding license and thus a valid identification with a username and password for the Saferpay system.
* At least one active Saferpay terminal via which payment can be carried out and the associated Saferpay TerminalId.
*	A valid TWINT contract
*	JSON API Version 1.7 or later 
* Twint can only be used via the [Payment Page](Integration_PP.html). Please follow the general guide there!

## <a name="twint-general"></a> General specifics

+ **Reservation time**: Unlike normal credit card transactions, where a [capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) could be attempted after the normal reservation time, TWINT does only offer a maximum timeframe of 7 days! After that the transaction will be discarded and a [capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) **will not initiate the money-transfer with the next batch-close**, so make sure, to [capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) your transactions within this time limit!
+ **Refund times**: Due to processing limitations, a refund can fail, if it is executed earlier than two hours after the initial transaction. The initial transaction needs to be processed first, until a refund can be executed, which happens within said two hours!
