# F.A.Q

## Is there some kind of test-system or sandbox, where i can test the API?

Yes! Saferpay offers a test system, where you can [register for your own individual test account](https://test.saferpay.com/BO/Welcome?lang=en). Please note, that the test system and the live environment run on two seperate systems.
Due to that, you need to apply seperate base-urls for test and live, when doing requests, as [mentioned here (see right side)](https://saferpay.github.io/jsonapi/index.html#intro).

## Can I use my test account on the live system?

No, the test and live systems are completely separate from each other. No data exchange takes place.

## Can I use real card details in the test environment? <br />When i use my Card on the Test environment i get an error. What is the cause?

The test-environment does **NOT** accept real credit cards, to avoid confusion between live and test.
Only test cards may be used on the test-environment, which you can [find here](paymentmeans.html).

<div class="danger">
  <p><strong>Warning: DO NOT</strong> use real credit card details, when testing on the Saferpay test-environment! Even though the test accounts cannot process real payment means, it is also important to not share them in the first place on the test-system, for security reasons!</p>
</div>

## Which functions are available in the test system?

On the test system, all Saferpay functions are available, including Saferpay Business. However, for your live account, you need to specifically request Business to be activated!

## What currencies are available in the test system?

By default, EUR and CHF are enabled on test accounts. Other currencies can be activated on demand. For this, please contact the [Saferpay Integration Team](mailto:integration.saferpay@six-payment-services.com?subject=Test%20Account%20Currencies).

## Can i combine Saferpay with my ERP-system?

Generally yes!
There are multiple options to do this however.
Two scenarios may be:

1.) The shop does the transaction, but the ERP does the [Capture](http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture) only at a point, when the goods can be shipped!
You simply need to set up a connection between the shop and ERP-system, so the transaction-data can be shared between them, and the ERP can execute the [Capture](http://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Capture) using the transaction id the shop recieves from Saferpay.
But please note, that reservations can expire, depending on the brand and issuer of the card, [as stated here](https://saferpay.github.io/sndbx/index.html#capture). To avoid this, you may want to use approach 2.

2.) The customers credit card gets saved by the shop within the [Saferpay Secure Card Data Store](http://saferpay.github.io/sndbx) but the transaction happens at a point, when all the goods can be shipped, executed by the ERP-system, using the obtained Secure Card Data-data.
Note, that the solvency of the card holder can change until this point.

There are more scenarios Saferpay can cover, together with different ERP-systems.
If you have some detailed questions, feel free to ask the [Integration Support Team](https://saferpay.github.io/sndbx/contact.html)

## I already have a shop system. Do you offer an extension for it?

Ready-to-use Saferpay payment extensions for several shop systems are offered by our partner [Customweb](https://www.sellxed.com/shop/en/eur/extensions/module/payment-service-provider/saferpay.html). You get 1 year support and, if wanted, an installation service! Your SIX-contract partner may provide you with a voucher to purchase the extension free of charge.

## I have finished my testing. What are the next steps? How do i go live?

If you haven't already, you need to contact our [Sales](https://www.six-payment-services.com/classic/en/shared/contacts.html#ch) in order to sign a live contract.

We will activate the things necessary for you and then send you the respective logins and Ids (Customer-and TerminalId), you need  to go live.
However, there are things you need to change with the Go-Live, before you can start accepting payments:

* As mentioned, you will get new Logins and IDs with your live account. Those have to be changed inside your application.
* The JSON-API user and password need to be set. Once you have recieved your live Backoffice user, you need to log into [this site here](https://www.saferpay.com/BO/Login). Then you need to create your own credentials under **Settings > JSON API basic authentication** or  **JSON API client certificate**. Those credentials have to be entered inside your application.

* Lastly, you need to change the request-gateway URL from **https://test.saferpay.com/api/[...]** to **https://www.saferpay.com/api/[...]** in order  to send your requests to the Saferpay live-system, instead of the test-system. Some pre-made modules (Like the ones by our partner Customweb!) however offer a live-mode, which does this step for you! You simply have to activate it!


## My company uses a Firewall and therefore has to whitelist the IPs/Ports for the Saferpay test-system/production. Where can i find them?

Saferpay uses the standard http-ports, which means 80 and 443!
The following IPs may need to be whitelisted in order to accept outgoing and incoming requests from and to Saferpay:

**wave.six-group.com**
+ 153.46.244.84
+ 193.247.180.4
+ 153.46.254.150
+ 153.46.254.164
+ 153.46.254.209

## I have heard of the possibility to scan your credit card, using your mobile devices camera! How do i implement this feature?

Saferpay does support this feature, however on Saferpay Side, nothing is needed! This is more of a feature, that is directly built into Android 8Chrome only) and iOS (Safari only). If you are using an app, you may have to enable your app to use this native feature. For more information, please consult the iOS/Android developer documentation!
