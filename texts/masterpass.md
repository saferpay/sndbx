# Masterpass

Masterpass is a Wallet-Solution introduced by Mastercard.
It is **NOT** a typical payment method, like Mastercard, it is more like a database, that contains payment methods, that can be registered there by the card holder.
Masterpass can indeed contain Mastercard, as well as Visa and other payment means, which will then be used for the transaction. These transactions will then show up as Visa, or Mastercard transactions, with the added information, that the payment means have been provided by a Masterpass wallet!
This chapter will cover all things worth to know about Masterpass!

## <a name="mp-req"></a> Requirements

The handling of Masterpass payments with Saferpay requires:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.

<div class="info">
  <p><strong>Note:</strong> In order for Masterpass to be activated, please contact your contract manager. He/She can guide you and will initiate all the necessary steps, so you can start accepting Masterpass.</p>
</div>

## <a name="mp-pp"></a> Masterpass via Payment Page

The Integration of Masterpass via the Payment Page may be the easiest way to integrate Masterpass.
Simply follow the basic [Payment Page integration steps](Integration_PP.html). If you already have a Payment Page integration, you can, of course, skip this step. After you have contacted your contract manager and Masterpass has been activated, Masterpass will show up on the Payment Page, just like any other payment method:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/MasterpassPPage.PNG "Masterpass Payment Page")

Furthermore, Masterpass will also show up, once a credit card brand has been selected, as an alternative:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/MasterpassPPageCEF.PNG "Masterpass Payment Page Card Entry Form")

## <a name="mp-special"></a> Special Cases

+ **Billing address:** Saferpay can capture the billing address in multiple ways. Either the merchant does capture it himself and submits the data through the respective request, or, in case of the [Payment Page](Integration_PP.html), the page does offer respective forms, that can capture the address! In case of Masterpass however, the address is saved within the Masterpass Wallet of the card holder. Should the billing address be captured, using one of the other methods, it will be overwritten by the wallet-address!
+ **Pre-Selection:** Similar to normal payment methods, it is possible to pre-select Masterpass, when using the [Payment Page](Integration_PP.html). If done so, Saferpay will perform the redirect to Masterpass right away and skip the Payment Page entirely. However the pre-selection of Masterpass needs to be done through a different parameter. While normal payment methods do use the parameter **PaymentMethods**, wallets like Masterpass, need to use the parameter **Wallets**, as described inside the [JSON-API specification](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize). Also note, that if you submit both parameters at the same time, the Payment Page will display the payment method selection screen. So please make sure to submit either one, or the other, if you want to skip this step!
