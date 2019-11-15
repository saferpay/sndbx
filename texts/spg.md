# Secure PayGate REST API

<div class="warning">
  <p><strong>VERY IMPORTANT:</strong> Before you start integrating this flow, make sure, you have read the <a target="_blank" href="index.html">the Introduction</a> and <a target="_blank" href="interfaces.html">Licenses and Interfaces</a> chapters. They contain general and vital information, not only about the Secure PayGate REST API, but also for you, the merchant!</p>
</div>

The <a href="https://saferpay.github.io/jsonapi/#ChapterRestApi">Secure PayGate REST API</a> allows a merchants to use the Saferpay Secure PayGate through their own Systems, thus allowing them to create offers and corresponding offer URLs automatically. This allows a high grade of automatation.
This chapter will guide you through the necessary steps to use this API.

# <a name="spg-req"></a> Requirements

The following requirements have to be met, in order to use the Secure PayGate REST API:

+ You need a Saferpay Secure PayGate contract, in order to use the Secure PayGate in the first place
  + In conjunction with that, you need at least one Secure PayGate terminal, with attached payment methods of your choice.
+ A Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system, to access the necessary API-functions.

# <a name="spg-config"></a> Secure PayGate configuration

Before you can begin using the Secure PayGate, you need to configure it inside the Backoffice under **Secure PayGate > Settings**.

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/SPG_Settings_1.png "SPG Settings")
First you need to set your Notification email(s). Saferpay will send a payment confirmation mail to these email(s).
Next is the Authorization method you want to apply to your Secure PayGate orders, with the following options available:
+ **Normal (final) authorization**: Your normal authorization. Each payment will be authorized and then needs to be captured, either inside the Backoffice itself, or by using the <a href="index.html#capture">JSON API</a>
+ **Preauthorization**: Similarto the first option, however preauthorizations extend the validity of the authorized payment from a guaranteed 10, to a guaranteed 30 days, which is helpful, if you want to capture a payment on a later delivery.
+ **Normal (final) authorization with automatic capturing**: Triggers an automatic <a href="index.html#capture">capture</a>, after a successful authorization.

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/SPG_Settings_2.png "SPG Settings")
These settings are important, if you intend on using the Secure PayGate in conjunction with the JSON API (more on that later).
Here you can define, where the Payment Page should send your customer to, after a successful, failed, or aborted payment. This way, you can send the customer towards your website, or even a specifically tailored return-site.

Furthermore, Saferpay can also trigger a server-to-server notification, in case of a successful payment, which is helpful, to avoid redirect-problems with the former URLs, or in cases, where you do not want to use returnUrls and just the payment notification, to gather the payment-details into your system.

<div class="warning">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> In order to gather said payment-data, after these events, you need a payment page token, to initialize the next steps. Saferpay can vorward this token, if you insert the placeholder {{{PAYMENTPAGETOKEN}}} into the defined URLs. Saferpay will replace it with the token and call the URLs with it, via HTTP GET. You then can etract the token and proceed to the chapter <strong>Connecting the JSON API</strong>.
  </p>
</div>

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/SPG_Settings_3.png "SPG Settings")
Here you can pre-define certain mail-addresses, that will be presented to the payer, aswell as a BCC-address, where Saferpay will send each offer towards, for archiving purposes.

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/SPG_Settings_4.PNG "SPG Settings")
Finally, you can upload your terms and conditions via a PDF, in the languages you desire. 
<div class="info">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Note:</strong> These AGBs are only available, should you use the Secure PayGate inside the Backoffice and not via API!
  </p>
</div>

# <a name="spg-api"></a> The Rest API

After the configuration has been completed, you can finally move towards using the Secure PayGate REST API. The specification itself can be <a href="https://saferpay.github.io/jsonapi/#ChapterRestApi">found over here</a>.

The first thing to consider, is the fact, that the Secure PayGate REST API, is **not** the same, as the Saferpay JSON-API, even though both can work hand in hand (more on that later). It can be integrated in a similar way and if you already have the Saferpay JSON API integrated, the effort to use the Secure PayGate REST API is rather low.
However there are still some technical differences, which are described inside the <a href="https://saferpay.github.io/jsonapi/#ChapterRestApi">specification</a>

## Sending the Offer
The execution of the **SecurePayGateOffer CreateOffer** request will create a Secure PayGate offer and the corresponding Link to the payment gateway, like it would inside the Saferpay Backoffice.
All the offers will be displayed inside the Saferpay Backoffice and marked as **RestApi** under the **Application**column, so you can differentiate between manual and automatical created offers.

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/SPG_Backend.png "SPG Offers")


# <a name="spg-json"></a> Connecting the JSON API
