# Klarna Payments

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Caution: THIS IS A WORK IN PROGRESS! KLARNA IS CURRENTLY IN ITS PILOT PHASE! ONCE IT IS BROADLY AVAILABLE, THIS NOTE WILL BE REMOVED!</strong>
  </p>
</div>

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> Klarna Payments is <strong>NOT</strong> the same as Sofortüberweisung! Please refer to <a href="sofort.html">this chapter</a>, if you want to use Sofortüberweisung!
  </p>
</div>

Klarna Payments is a 3rd party payment method, that is split into three ways of payment:
+ Pay Now: The order is payed now, via Direct Debit, or Bank Transfer.
+ Pay Later: The order is payed on invoice.
+ Slice it: The order is payed in installment rates, with an interest.

These, together with the currencies, are defined in the Klarna contract and not on Saferpay side. With each start of a new transaction, Saferpay will ask Klarna for this information. If a currency was submitted with the <a href="">Payment Page Initialize Request</a>, that isn't supported, or a certain payment category is not activated on the Klarna account, Saferpay will not show said option.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important: This can also lead to Klarna Payments not being displayed altogether.</strong> So please make sure, that your Klarna account is set up correctly and that you use the correct currency!
  </p>
</div>

This chapter details the technical implementation of Klarna Payments, through Saferpay.

## <a name="klarna-req"></a> Requirements

The following requirements have to be met, in order to accept Klarna Payments via Saferpay:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* A valid contract with Klarna.
* Klarna Payments is only available via the [PaymentPage flow](Integration_PP.html)!

## <a name="klarna-activation"></a> Activation

Unlike other payment methods, Klarna payments offers a self-onboarding service, which you can access inside the Backoffice under **Settings > Terminals**. Please select the terminal you want Klarna activated on and scroll down to **Self Service**.

**This service handles differently, depending on the Saferpay environment (test|live) you are on, so please pay close attention.**

You'll have two options **Klarna** and additionally, on the Saferpay test-environment, **Klarna Simulator**. 

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/bo_klarna_self_service.png)

### Klarna Simulator

The Klarna Simulator is a Sandbox provided by Saferpay, which provides an extensive GUI for testing Klarna.
In order to activate it, you first need to click on **Configure**. There you have to set user and password, which can be anything for the simulator.
However should you enter nothing, the simulator will simulate an error, as if no, or the wrong credentials have been entered. So if you want to test that case, you can do so. Then the **Environment** slider will simulate live and sandbox (Test) behavior, if you want, though the differences are slim.
Lastly, you have to activate the countries, you want to support Klarna in. More on that later.

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/bo_klarna_settings_testing.png "Klarna Simulator Configuration")

Once this is done, click on **Save**, however you also need to **activate the Simulator**, by clicking on the activation-slider:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/bo_klarna_self_service_simulator_on.png "Klarna Simulator activated")

That is it! You can now use the Saferpay Klarna Simulator.
And this is the Simulator on the Payment Page. Note the indicator at the top, telling you, that you are using the Saferpay Simulator:

![alte text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/klarna_saferpay_simulator.png "Saferpay Klarna Simulator")

### Klarna

Similar to the Klarna Simulator, it also requires the same level of configuration, like the countries, with the difference, that the user and password accept your real Klarna credentials.
Enter your user and password and configure your countries.

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Very Important:</strong> On the Saferpay Test Environment, the Klarna configuration exclusively works on the Klarna Sandbox! If you want to test on the Klarna Sandbox, you have to navigate to <a href="https://developers.klarna.com/">Klarna Developers</a> to create your Sandbox account.
  </p>
</div>

Additionally, you also have the **Test|Live** slider, which does different things, depending on which Saferpay Environment you are currently on:

+ **Test:** On the Saferpay Test Environment, this option will **always** point towards the Klarna Sandbox!
+ **Production:** On the Saferpay Production-Environment, this slider will switch between the Klarna Production and Sandbox. See the next sub-chapter on why this is necessary!

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/bo_klarna_settings.png "Klarna Sandbox Configuration")

Once you have entered your credentials, configured your country and, if necessary, the environment enpoint, click on **Save**.
Lastly, make sure to **activate Klarna**, by clicking on the activation slider.

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/bo_klarna_self_service_sandbox_on.png "Klarna Sandbox activated")

This is the Klarna Sandbox on the Payment Page:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/klarna_sandbox.png "Klarna Sandbox running on Saferpay Payment Page")

## <a name="klarna-testing"></a> Testing period

Before you can accept live payments, Klarna requires a testing period.
During this period, Klarna will evaluate your business and integration, before they fully activate your account.
During this time, the **Environment Slider** inside the Klarna configuration under **Settings > Terminals** inside the Saferpay Backoffice, has to be turned to **Testing**.
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/bo_klarna_settings_SliderTest.png "Klarna Testing")

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important: On the live environment, always enter your live Klarna credentials, though these testing-transactions are running on the Klarna Sandbox!</strong> 
  </p>
</div>

## <a name="klarna-integration"></a> Integration

Klarna requires certain datapoints to be submitted, in order for the processing to work.
Most importantly, you must submit the order cart, via the **Order.Items[]** array. 
Here is a list of all the mandatory parameters, that need to be submitted:
<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Info:</strong> Please also refer to the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize"> Payment Page Initialize request-specification</a> for more detailed information!
  </p>
</div>

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center">Parameter</th>
      <th class="text-center">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center"><strong>Payer.BillingAddress.FirstName</strong></td>
      <td>The first name of your customer.</td>
    </tr>
    <tr>
      <td class="text-center"><strong>Payer.BillingAddress.LastName</strong></td>
      <td>The last name of your customer.</td>
    </tr>
    <tr>
      <td class="text-center"><strong>Payer.BillingAddress.Email</strong></td>
      <td>The provided Email address of your customer.</td>
    </tr>
    <tr>
      <td class="text-center"><strong>Payer.BillingAddress.CountryCode</strong></td>
      <td>The provided Email address of your customer. <strong>Make sure, that this country is activated in your Klarna settings (see above), or otherwise Klarna will not be displayed, as an option!</strong></td>
    </tr>
    <tr>
      <td class="text-center"><strong>Order.Items[].Type</strong></td>
      <td>Type of the Order Item.</td>
    </tr>
    <tr>
      <td class="text-center"><strong>Order.Items[].Quantity</strong></td>
      <td>Number of this specific item, sold to the customer.</td>
    </tr>
    <tr>
      <td class="text-center"><strong>Order.Items[].Name</strong></td>
      <td>Name of the product, defined by the merchant.</td>
    </tr>
    <tr>
      <td class="text-center"><strong>Order.Items[].UnitPrice</strong></td>
      <td>Single unit price of this specific item.</td>
    </tr>
  </tbody>
</table>

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> Make sure, that all the order cart items are included and that all the unit-prices add up with the total amount set in <strong>Payment.Amount.Value</strong>. Otherwise Klarna may reject the payment. Additionally, make also sure, that <strong>Payment.Amount.CurrencyCode</strong> also  is in-line with <strong>Payer.BillingAddress.CountryCode</strong>! For instance: Submitting "CH" for Swizerland as your CountryCode, but selecting EUR as your currency, will cause Klarna to not be displayed!
  </p>
</div>

Furthermore, for merchants in the European Union, Klarna highly recommends to also set the following parameters:

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center">Parameter</th>
      <th class="text-center">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center"><strong>Order.Items[].TaxRate</strong></td>
      <td>Tax rate, applied to this order-item, depending on the country.</td>
    </tr>
    <tr>
      <td class="text-center"><strong>Order.Items[].TaxAmount</strong></td>
      <td>Tax amount for a single item.</td>
    </tr>
  </tbody>
</table>

### Example
```json
  "Payer": {
    "BillingAddress": {
      "FirstName": "John",
      "LastName": "Doe",
      "Email": "john.doe@provider.com",
      "CountryCode": "de"
    }
  },
  "Order": {
    "Items": [
      {
        "Type": "DIGITAL",
        "Quantity": 1,
        "Name": "Test product",
        "UnitPrice": 245
      }
    ]
  },
```

### Address 

Klarna requires the Billing Address to be set. There are two options you have, on how this is done.

1. The address is captured during the payment process, where the customer has to enter it him/herself:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/klarna_address_form.png "Address entry form")
2. If you already have the address stored in your shop, you can also submit it, with the <a href="">Payment Page Initialize Request</a>, inside the <strong>Payer.BillingAddress</strong> container. In this case the address-form will be skipped.

### Example
```json
"Payer": {
    "BillingAddress": {
        "FirstName": "John",
        "LastName": "Doe",
        "Email": "john.doe@provider.com",
        "CountryCode": "de",
        "Gender": "MALE",
        "Street": "Fakestreet 1",
        "Zip":"12345",
        "City":"Notown",
        "DateOfBirth": "1990-03-17",
        "Phone": "+491234659870"
    }
},
```
