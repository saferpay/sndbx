# The Marketplace and Partial Captures

## Partial Captures

In order to understand the Saferpay marketplace-solution, one must first grasp the concept of partial- or [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), for they are the very foundation, on which the marketplace-solution is built upon.

### Things to consider

1. [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture) is available for SIX Acquiring contracts and PayPal <strong>only!</strong>
2. Your live merchant-account needs to be configured, in order to support Multipart Captures, or the request will fail!
3. No MultipartCapture request should be sent before receiving the response of a preceeding request (i.e. no parallel calls are allowed).
4. The sum of multipart captures must not exceed the authorized amount.
5. A unique OrderPartId must be used for each request.
6. Unlike normal [Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture), which also undergo the daily batch close, with [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), the money-flow will be initiated with the execution of the capture itself! A cancel of a [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture) therefore is not possible!
7. MultipartCapture is only available for **SpecVersions 1.10 and higher!**

### Correctly executing a Multipart Capture

Before you can even execute a [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), you, of course, need a transaction, that needs to be captured. This can be any normal authorization, either done by the [Payment Page](https://saferpay.github.io/jsonapi/#ChapterPaymentPage), or [Transaction Interface](https://saferpay.github.io/jsonapi/#ChapterTransaction). You don't have to consider anything special, up to this point!

Additionally to the standard parameters, needed to execute a [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture), the following parameters are important for a [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture):

- **Type:** The **Type** specifies, whether this is one subsequent, or final Capture.
- **OrderPartId:** Each [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture) is identified by a unique **OrderPartId**, which will also be forwarded to the respective reconciliation-files you will recieve later. That makes this Id very important for later identification, thus you have to make sure, that said Id is set an unique, so confusions can be averted.

A complete request may look like this:

```json 
{
    "RequestHeader": {
      "SpecVersion": "1.10",
      "CustomerId": "[your customer id]",
      "RequestId": "[unique request identifier]",
      "RetryIndicator": 0
    },
    "TransactionReference": {
        "TransactionId": "723n4MAjMdhjSAhAKEUdA8jtl9jb"
    },
    "Amount": {
        "Value": 1000,
        "CurrencyCode": "CHF"
    },
    "Type": "PARTIAL",
    "OderPartId": "123456789"
}
```

The response may look like this:


```json 
{
    "ResponseHeader": {
        "SpecVersion": "1.10",
        "RequestId": "[unique request identifier]"
    },
    "CaptureId": "723n4MAjMdhjSAhAKEUdA8jtl9jb_c",
    "Status": "CAPTURED",
    "Date": "2018-08-08T12:45:22.258+01:00"
}
```

Each capture is identified by a **CaptureId** (Marked with the suffix **"\_c"**) , which should be saved, since this Id is used for further actions, like refunds. More on the latter later in this very chapter!

<div class="info">
 <p><strong>Note:</strong> The basic reservation times <a href="https://saferpay.github.io/sndbx/#reservation">mentioned here</a> do still aplly for <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture">Multipart Captures!</a> If this time is exceeded, the reservation could void and the money flow will be rejected by the card holders bank!</p>
</div>

## Finalizing a Capture-Chain

After a transaction has been captured to the merchants liking using [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), it should be finalized, in order to seclude the transaction.
There are two different ways to finalize a [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture). Each covering one specific case, that should be differentiated, by asking one specific question:

**Does the merchant intend to capture a final amount, or not?**

<div class="warning">
  <p><strong>Important:</strong> Once finalized, a transaction cannot be opened again. Make sure, that you really want to finalize the transaction. Other captures won't be possible!</p>
</div>

### Finalizing, while also capturing a certain amount
<div class="warning">
  <p><strong>Remember:</strong> Like mentioned previously, make sure to not exceed the initially authorized amount, or the capture will fail!</p>
</div>

In order to capture a final amount, the merchant-system simply needs to execute [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), whilst setting the parameter **Type** to **"FINAL"**. A full request then may look like this:

 ```json 
{
    "RequestHeader": {
      "SpecVersion": "1.10",
      "CustomerId": "[your customer id]",
      "RequestId": "[unique request identifier]",
      "RetryIndicator": 0
    },
    "TransactionReference": {
        "TransactionId": "723n4MAjMdhjSAhAKEUdA8jtl9jb"
    },
    "Amount": {
        "Value": 1000,
        "CurrencyCode": "CHF"
    },
    "Type": "FINAL",
    "OderPartId": "123456790"
}
```

### Finalizing without capturing/ Capturing with amount 0

In order to avoid confusion and merchants accidently executing the wrong request, the finalization with amount 0 is done through a completely different request called [Multipart Finalize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartFinalize). Executing this request will close the transaction without transfering any money.

## Why do you need to finalize a transaction?

There are two reasons, why you, the merchant, should finalize a transactions, once you have finished all your actions:

1. It is the cleaner process! Four you, the merchant, this is the cleaner solution and helps keeping track of every transaction and its status, not just inside your own system, but also inside the Saferpay Backoffice, where still open and closed transactions, will be marked as such!
2. It means less hassle for your customers. Each time you successfully authorize a credit card, the authorized amount gets reserved on the card holders credit limit. That effectively means, that he/she cannot use this money, as long as you haven't claimed the money, or the reservation voids, after a certain time-frame. A finalization will open up the credit-limit for the card holder, so he/she may use it again, which is especially important in situations, where the merchant does not want, or can't claim all of the money, originally authorized!

## Submerchants

In some cases, a merchant, or marketplace-operator, needs to be able to split the authorized amounts do different contracts, bank accounts and/or submerchants. Saferpay does offer this option through [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture).

The general money-flow may look like this:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Submerchants_MultiPart.png "Multipart Capture with Submerchants")

Now in order for this to work, the following requirements have to be met:

1. Each Submerchant you want to cover, needs an acquiring-contract with SIX, so the money can be directly transfered to their bank-account! **Make sure to specifically request these contracts for the marketplace-solution, since those need a special setup!**
2. Each submerchant will get their own Id, which has to be submitted with each [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), to define the merchant, who is getting the money!

### Executing a Multipart Capture with a Submerchant

A [Multipart Capture request with a submerchant](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture) requires you, to correctly fill the **Marketplace => SubmerchantId** parameter, with the corresponding Id. A request then may look like this:

 ```json 
{
    "RequestHeader": {
      "SpecVersion": "1.10",
      "CustomerId": "[your customer id]",
      "RequestId": "[unique request identifier]",
      "RetryIndicator": 0
    },
    "TransactionReference": {
        "TransactionId": "723n4MAjMdhjSAhAKEUdA8jtl9jb"
    },
    "Amount": {
        "Value": 1000,
        "CurrencyCode": "CHF"
    },
    "Type": "PARTIAL",
    "OderPartId": "123456789",
    "Marketplace": {
        "SubmerchantId": "17312345"
    }
}
```

This request will transfer 10 CHF to the merchant with the Id 17312345!

## Handling Refunds

Since [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture) basically split an existing transaction into multiple parts, refunds also need to be processed in a different way.
Unlike normal Refunds, you now need to reference each Capture you want to refund individually!

To do so, you have to reference the **CaptureId** from the [Multipart Capture Response](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), you want to refund. Remember, that all **CaptureId**s have the suffix **\_c** for that reason. 

A [Refund request](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Refund) may look like this then:

```JSON
{
  "RequestHeader": {
    "SpecVersion": "1.10",
    "CustomerId": "[your customer id]",
    "RequestId": "[your request id]",
    "RetryIndicator": 0
  },
  "Refund": {
    "Amount": {
      "Value": 100,
      "CurrencyCode": "CHF"
    }
  },
  "CaptureReference": {
    "CaptureId": "723n4MAjMdhjSAhAKEUdA8jtl9jb_c"
  }
}
```

### Capturing a Refund

<div class="warning">
  <p><strong>Important:</strong> Like every other <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Refund">Refund</a>, these too need to be captured.
However <strong>please make sure to use the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">normal Capture request</a> in this case and NOT MultipartCapture!</strong> Refunds cannot be split into multiple parts, like authorizations!</p>
</div>

## Fees

Especially for marketplace providers, it is not unusual to charge a small fee for each transaction, that is handled through the marketplace, from the respective merchant. Saferpay also offers options to charge these fees, through [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture).

For that, it is necessary to correctly set the **Marketplace => Fee** container, within a [Multipart Capture request](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), which may look like this then:

 ```json 
{
    "RequestHeader": {
      "SpecVersion": "1.10",
      "CustomerId": "[your customer id]",
      "RequestId": "[unique request identifier]",
      "RetryIndicator": 0
    },
    "TransactionReference": {
        "TransactionId": "723n4MAjMdhjSAhAKEUdA8jtl9jb"
    },
    "Amount": {
        "Value": 1000,
        "CurrencyCode": "CHF"
    },
    "Type": "PARTIAL",
    "OderPartId": "123456789",
    "Marketplace": {
        "SubmerchantId": "17312345",
        "Fee": {
            "Value": 100,
            "CurrencyCode": "CHF"
        }
    }
}
```

This request will transfer 1000 CHF to the merchant account 17312345, but will also charge a 1 CHF for said transaction. So effectively the merchant will get 9 CHF transferred, **not including the acquiring-costs**, since that can vary from merchant to merchant and even contract!

But, what if you want to refund said transaction, including the transaction fee?
For that, the [Refund request](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Refund) also offers the option, to submit a fee, but note, that the container is named **FeeRefund** this time. A request then may look like this:

```JSON
{
  "RequestHeader": {
    "SpecVersion": "1.10",
    "CustomerId": "[your customer id]",
    "RequestId": "[your request id]",
    "RetryIndicator": 0
  },
  "Refund": {
    "Amount": {
      "Value": 1000,
      "CurrencyCode": "CHF"
    }
  },
  "CaptureReference": {
    "CaptureId": "723n4MAjMdhjSAhAKEUdA8jtl9jb_c"
  },
  "Marketplace": {
    "SubmerchantId": "17312345",
    "FeeRefund": {
      "Value": 100,
      "CurrencyCode": "CHF"
    }
  }
}
```
This request will refund 10 CHF (Please keep track of this!) from the merchant account 17312345, to the card holder! The fee then will be taken from the marketplace and transfered to the submerchant. So the full amount will be refunded first from the submerchant-account and then they will recieve the fee back from the marketplace!
