<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>SITE MOVED:</strong> This documentation is outdated, as of July 26th 2021. The new and improved documentation can be found under <a href="https://docs.saferpay.com/home/integration-guide/introduction">https://docs.saferpay.com/</a>.</p>
</div>

# F.A.Q

## Is there some kind of test system or sandbox, where i can test the API?

Yes! Saferpay offers a test system, where you can [register for your own individual test account](https://test.saferpay.com/BO/Welcome?lang=en). Note that the test system and the live environment run on two separate systems. Due to that, you need to call separate endpoints for test and live, when doing requests, as [mentioned here, Chapter "Building the correct API URL"](https://saferpay.github.io/jsonapi/index.html#integration).

## Can I use my test account on the live system?

No, the test and live systems are completely separate from each other. No data exchange takes place.

## Can I use real card details in the test environment? <br />When i use my Card on the Test environment i get an error. What is the cause?

The test-environment does **NOT** accept real credit cards, to avoid confusion between live and test.
Only [test cards](paymentmeans.html) may be used on the test environment.

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>DO NOT</strong> use real credit card details  when testing on the Saferpay test environment. Even though the test accounts cannot process real payment means, for security reasons it is also important to not share them on the test system.</p>
</div>

## Which functions are available in the test system?

On the test system, all Saferpay functions are available, including Saferpay Business. However, for your live account, you need to specifically request Business to be activated!

## What currencies are available in the test system?

By default, EUR and CHF are enabled on test accounts. Other currencies can be activated on demand. For this, please contact the [Saferpay Integration Team](mailto:integration.saferpay@six-payment-services.com?subject=Test%20Account%20Currencies).

## Can i combine Saferpay with my ERP-system?

Generally yes!

There are multiple options to do this.

Two scenarios may be:

1. The shop does the transaction, but the ERP does the [Capture](http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture) only at a point, when the goods can be shipped.

    You simply need to set up a connection between the shop and ERP system, so the transaction data can be shared between them, and the ERP can execute the [Capture](http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture) using the transaction id the shop receives from Saferpay.
But please note that reservations can expire, depending on the brand and issuer of the card, [as stated here](https://saferpay.github.io/sndbx/index.html#capture). To avoid this, you may want to use approach 2.

2. The customer's credit card is saved by the shop to the [Saferpay Secure Card Data (SCD) Store](http://saferpay.github.io/sndbx/scd.html). The transaction happens at a point when all the goods can be shipped, executed by the ERP system, using the obtained SCD data.

    Consider that the solvency of the card holder can change until this point.

There are more scenarios Saferpay can cover.

If you have some detailed questions, feel free to ask the [Integration Support Team](https://saferpay.github.io/sndbx/contact.html)

## I already have a shop system. Do you offer an extension for it?

Ready-to-use Saferpay payment extensions for several shop systems are offered by our partner [Customweb](https://www.sellxed.com/shop/en/eur/extensions/module/payment-service-provider/saferpay.html). You get 1 year support and, if wanted, an installation service. Your SIX-contract partner can provide you with a voucher to purchase the extension free of charge.

## My company uses a Firewall and therefore has to whitelist the IPs/Ports for the Saferpay test system/production. Where can i find them?

Saferpay uses the standard http ports 80 and 443.
The following IPs may need to be whitelisted in order to accept outgoing and incoming requests from and to Saferpay:

**wave.six-group.com**
+ 153.46.244.84
+ 193.247.180.4
+ 153.46.254.150
+ 153.46.254.164
+ 153.46.254.209

## I have heard of the possibility to scan your credit card, using your mobile devices camera! How do i implement this feature?

Saferpay does support this feature, however on Saferpay Side, no configuration is needed. This is a feature that is directly built into Android (Chrome only) and iOS (Safari only). If you are implementing an app with a WebView, you may have to enable your app to use this native feature. For native app forms, you have to implement this feature yourself (if possible), since the form is implemented and initialized by your system/app. For more information, please consult the iOS/Android developer documentation!
