# paydirekt

paydirekt transactions can also be processed via the Saferpay JSON API. However, as paydirekt is a third party provider, there are a few things to consider.

## <a name="pd-requirement"></a> Requirements

* A corresponding license and thus a valid identification with a username and password for the Saferpay system.
* At least one active Saferpay terminal via which payment can be carried out and the associated Saferpay TerminalId.
*	A valid paydirekt merchant account
*	A valid paydirekt API-Key 
*	A valid paydirekt API Secret
*	The delivery address  of the purchaser
*	JSON API Version 1.5 or later 

## <a name="pd-address"></a> Handling of delivery address
The processing of paydirekt transactions requires that the delivery address data is submitted.  
The minimum required delivery address values are: 
*	_FirstName_
*	_LastName_
*	_Zip_
*	_City_
*	_CountryCode_

If the minimum required delivery address values are submitted during the Payment Page initialization, the delivery address form will not be displayed or will be skipped, except if the **DeliveryAddressForm** value is set to “true”.  

If the minimum required delivery data is missing or not complete, the Payment Page delivery address form, will be displayed during the payment process for the cardholder/purchaser to enter or complete the missing values. In this case the delivery address form is displayed regardless of the **DeliveryAddressForm** configuration (true or false).
## <a name="pd-pending"></a> Display of pending status for captures (booking) and refunds
paydirekt transfers every booking request to the buyer's bank for validation. If the validation process hasn’t yet taken place, the transaction status is shown as "pending". Even if the validation process normally only takes a few seconds, Saferpay waits a few seconds for the result before transmitting the "pending" status with the booking response to the merchant system.
In this case a notice will be displayed in the transaction details in the Saferpay Backoffice to inform that the booking is not yet completed. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paydirekt_pend.PNG "paydirekt pending Backoffice")
The status of the transaction remains as "reservation", not permitting any follow-up actions until the pending action is completed.<br>

## <a name="pd-note"></a>Notification after change from pending to final status
As soon as Saferpay receives a response from paydirekt that a booking or refund with the status "pending"  has been completed, an email notification is sent to the merchant or a server-to-server notification to the notification URL which was submitted via the JSON API. The notification informs the merchant whether the booking of the reservation or the credit has been accepted or rejected.  

The merchant email address is configurable via the JSON API or the Backoffice.
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paydirekt_email.PNG "paydirekt email Backoffice")

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Important Note:</strong> The "PENDING" status can only occur with <a href="http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture">Transaction/Capture</a> and <a href="http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Refund">Transaction/Refund</a>. <strong>The status-change can take up to several days, however, refunds may always be "PENDING" for at least one day!</strong></p>
</div>

## <a name="pd-query"></a> Querying the transaction status
To automatize this process, you first need to set the **PendingNotification => NotifyUrl** option, available for the [Transaction/Capture](http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture) and [Transaction/Refund](http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Refund).
Once Saferpay recieves a status-update, the NotifyUrl will be called, enabling you to query the final status.

The status of a paydirekt booking and/or refund can be queried with the JSON API.  The corresponding functions are [Transaction/AssertCapture](http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AssertCapture) and [Transaction/AssertRefund](http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AssertRefund). These functions are only available for paydirekt transactions.

## <a name="pd-refund"></a> Refunds 
Refunds on existing paydirekt bookings can be initiated via the JSON API or manually in the Saferpay Backoffice. Any number of refunds can be issued to an existing booking. Each refund will be validated directly by paydirekt.

## <a name="pd-orderID"></a> Automatic trimming of OrderId
Paydirekt restricts the OrderId to a maximal length of 20 characters. The OrderId will be automatically trimmed if it exceeds the maximal length. Please keep this in mind to properly handle the use of the OrderId.
