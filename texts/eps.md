# eps

eps is a third party means of payment by the Austrian banks. To process eps via the Saferpay JSON API, a few things must be observed.

## <a name="eps-requirement"></a> Requirements

The handling of eps payments with Saferpay requires:

*	A corresponding licence and thus the existence of a valid identification with a username and password for the Saferpay system.
*	Availability of at least one active Saferpay terminal via which payment can be carried out, and availability of the associated Saferpay TerminalId.
*	A valid acceptance agreement for eps.
* eps is only available via the [PaymentPage flow](Integration_PP.html).
+ **NotifyUrl:** The NotifyUrl is **mandatory**, in order to avoid missing payment successes. See the <a href="Integration_PP.html">Payment Page process</a> for further information.

 For eps activation Saferpay needs:
 
*	Your eps Merchant ID.
*	Your eps IBAN.
*	Your eps BIC.
*	Your eps PIN.
*	The Currency your customers will purchase with eps.
*	Your Saferpay Customer ID.
*	The ID of the Saferpay eCommerce Terminal eps has to be added.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>For eps activation on the Saferpay terminal, please <a href="contact.html"><strong>inform our activation service</strong></a> about your eps credentials and the desired currency.</p>
</div>

## <a name="eps-newproject"></a>How to get an EPS acceptance agreement

Please get in touch with your Austrian banking consultant.

## <a name="eps-refunds"></a> Refunds

While eps refunds via API are generally possible, you must be aware of certain restrictions:

1. Transactions made before 18.05.2021 cannot be refunded, as they're made via an old protocol-version!
2. Sometimes, Saferpay will not recieve the information necessary from eps, to be able to do a refund. In this case a refund will also not be possible!
3. Only <a href="refund.html#refund-reference">referenced refunds</a> are possible, as eps does not support the generation of an alias!

