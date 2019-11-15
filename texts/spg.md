# Secure PayGate REST API

<div class="warning">
  <p><strong>VERY IMPORTANT:</strong> Before you start integrating this flow, make sure, you have read the <a target="_blank" href="index.html">the Introduction</a> and <a target="_blank" href="interfaces.html">Licenses and Interfaces</a> chapters. They contain general and vital information, not only about the Secure PayGate REST API, but also for you, the merchant!</p>
</div>

The Secure PayGate API allows a merchants to use the Saferpay Secure PayGate through their own Systems, thus allowing them to create offers and corresponding offer URLs automatically. This allows a high grade of automatation.
This chapter will guide you through the necessary steps to use this API.



# The Rest API

The first thing to consider, is the fact, that the Secure PayGate REST API, is **not** the same, as the Saferpay JSON-API, even though both work hand in hand (more on that later). It can be integrated in a similar way and if you already have the Saferpay JSON API integrated, the effort to use the Secure PayGate REST API is rather low.
However there are still some differences.

## Requirements

The following requirements have to be met, in order to use the Secure PayGate REST API:

+ You need a Saferpay Secure PayGate contract, in order to use the Secure PayGate in the first place
  + In conjunction with that, you need at least one Secure PayGate terminal, with attached payment methods of your choice.
+ A Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system, to access the necessary API-functions.

## Secure PayGate configuration

Before you can begin using the Secure PayGate, you need to configure it inside the Backoffice under **Secure PayGate > Settings**.

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/SPG_Settings_1.png "SPG Settings")
First you need to set your Notification email(s). Saferpay will send a payment confirmation mail to these email(s).
Next is the Authorization method you want to apply to your Secure PayGate orders, with the following options available:
+ **Normal (final) authorization**: Your normal authorization. Each payment will be authorized and then needs to be captured, either inside the Backoffice itself, or by using the <a href="index.html#capture">JSON API</a>
+ **Preauthorization**: Similarto the first option, however preauthorizations extend the validity of the authorized payment from a guaranteed 10, to a guaranteed 30 days, which is helpful, if you want tocapture a payment
+ **Normal (final) authorization with automatic capturing**:

# Connecting the Secure PayGate to the JSON API
