# ePrzelewy

ePrzelewy payments can be processed with Saferpay without much effort. This chapter describes what needs to be considered in this regard.

## <a name="przelewy-requirement"></a> Requirements

The handling of ePrzelewy payments with Saferpay requires:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* A valid ePrzelewy contract.
* The <strong>Payer.DeliveryAddress.Email</strong>-parameter is mandatory and needs to be set, with the initial request, or captured through the respective form.
* ePrzelewy is only available via the [PaymentPage flow](Integration_PP.html)!
+ **NotifyUrl:** The NotifyUrl is **mandatory**, in order to avoid missing payment successes. See the <a href="Integration_PP.html">Payment Page process</a> for further information!

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Attention:</strong> For ePrzelewy activation on the Saferpay terminal, please inform our activation service <a href="mailto:cs.ecom@six-payment-services.com"><strong>cs.ecom@six-payment-services.com</strong></a> about your pRzelewy merchant account ID and the desired currency.</p>
</div>
