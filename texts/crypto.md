<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>SITE MOVED:</strong> This documentation is outdated, as of July 26th 2021. The new and improved documentation can be found under <a href="https://docs.saferpay.com/home/integration-guide/introduction">https://docs.saferpay.com/</a>.</p>
</div>

# Crypto Payments
Saferpay also offers the possibility to pay via the Bitcoin and Etherum crypto currencies. The following chapter will cover the activation and integration of this payment method.

## <a name="crypto-requirement"></a> Requirements

The handling of Crypto currencies with Saferpay requires:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* Any payout of transactions made via crypto currencies, will happen in CHF only! Any other currency, or payout to a crypto currency wallet, is not supported!
* API SpecVersion 1.22

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Attention:</strong> For Crypto currency activation on the Saferpay terminal and the necessary contract, please contact your Saferpay sales contact.</p>
</div>

## <a name="crypto-integration"></a> Integration

Crypto Payments follow a standard <a href="Integration_PP.html">Payment Page Integration<a/>. Also make sure, that you take a look at the <a href="index.html#pm-functions">supported features</a>.

However one thing is important to note: The payout will not happen in the crypto currency. The processing of Bitcoin and Etherum is done in partnership with Bitcoin Swiss. Bitcoin Swiss will exchange the payed amount into Swiss Franks, which will then be payed out to the merchant bank account. <strong>A direct transfer of Bitcoin, or Etherum is not intended!</strong>

  <div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Attention:</strong> This means, that Crypto payments are available for Swiss Franks (CHF) only!</p>
</div>
