# Klarna Payments

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> Klarna Payments is <strong>NOT</strong> the same as Sofortüberweisung! Please refer to <a href="sofort.html">this chapter</a>, if you want to use Sofortüberweisung!
  </p>
</div>

Klarna Payments is a 3rd party payment method, that is split into three ways of payment:
+ Pay Now: The order is payed now, via Direct Debit, or Bank Transfer.
+ Pay Later: The order is payed after 14 days.
+ Slice it: The order is payed in installment rates, with an interest.

This chapter details the technical implementation of Klarna Payments, through Saferpay.

<a name="klarna-req"></a> Requirements

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* A valid contract with Klarna.
* Klarna Payments is only available via the [PaymentPage flow](Integration_PP.html)!

<a name="klarna-activation"></a> Activation

Unlike other payment methods, Klarna payments offers a self-onboarding service, which you can access inside the Backoffice under **Settings > Terminals**. Please select the terminal you want Klarna and scroll down to **Self Service**.


This service handles differently, depending on the environment (test|live) you are on, so please pay close attention.


Lastly: As mentioned, Klarna Payments is seperated into three different categories; .
These, together with the currencies, are defined in the Klarna contract and not on Saferpay side. With each start of a new transaction, Saferpay will ask Klarna for this information. If a currency was submitted with the <a href="">Payment Page Initialize Request</a>, that isn't supported, or a certain payment category is not supported by the Klarna account, Saferpay will not show said option.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important: This can also lead to Klarna Payments not being displayed altogether.</strong> So please make sure, that your Klarna account is set up correctly and that you use the correct currency!
  </p>
</div>


<a name="klarna-integration"></a> Integration



<a name="klarna-testing"></a> Testing period

Before you can accept live payments, Klarna requires a testing period.
During this period, Klarna will evaluate your business and integration, before they fully activate your account.
During this time, the **Environment Slider** inside the Klarna configuration under **Settings > Terminals** inside the backoffice, has to be turned to **Testing**.
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/bo_klarna_settings_testing.png "Klarna Testing")

Furthermore, you have to **enter your credentials for the Klarna Sandbox not your live credentials, as these testing-transactions are running on the Klarna Sandbox!**

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> Also remember to turn this slider back to <strong>Live</strong> and change the credentials to your live-credentials, once the testing-period is over!
  </p>
</div>
