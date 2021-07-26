<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>SITE MOVED:</strong> This documentation is outdated, as of July 26th 2021. The new and improved documentation can be found under <a href="https://docs.saferpay.com/home/integration-guide/introduction">https://docs.saferpay.com/</a>.</p>
</div>

# The Marketplace

In order to understand the Saferpay marketplace-solution, one must first grasp the concept of partial- or [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), for they are the very foundation, on which the marketplace-solution is built upon. Please make sure, that you read the [Multipart Captures Chapter](partialcaptures.html) first.

## <a name="mark-req"></a> Requirements

1. If you want to use the Submerchant and Fee-features, your live merchant-account needs to be configured, in order to support Multipart Captures, or the request will fail!

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
 <p><strong>Important:</strong> As mentioned in the beginning, a special setup is necessary to acces the following features. Once this setup has been done, you will be unable to execute normal <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Captures</a> <strong>(Exception being Refunds!)</strong> and Captures inside the Saferpay Backoffice won't be possible anymore! Please keep that in mind, during implementation!</p>
</div>

## <a name="mark-submerchants"></a> Submerchants
<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
 <p><strong>IMPORTANT:</strong> Please read this chapter completely, <strong>INCLUDING</strong> the chapter about <strong>Applying Fees</strong>!</p>
</div>


In some cases, a merchant, or marketplace-operator, needs to be able to split the authorized amounts do different contracts, bank accounts and/or submerchants. Saferpay does offer this option through [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture).

The general money-flow may look like this:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Submerchants_MultiPart.png "Multipart Capture with Submerchants")

Now in order for this to work, the following requirements have to be met:

1. Each Submerchant you want to cover, needs an acquiring-contract with SIX, so the money can be directly transfered to their bank-account! **Make sure to specifically request these contracts for the marketplace-solution, since those need a special setup!**
2. Each submerchant will get their own Id (Sometimes also refered to as **Contract-Number** or **VP-Number**!), which has to be submitted with each [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), to define the merchant, who is getting the money!

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

## <a name="mark-fee"></a> Applying Fees

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
 <p><strong>IMPORTANT:</strong> If you are using the submerchant-feature, you <strong>must</strong> set either <strong>Fee</strong> or <strong>FeeRefund</strong> (Depending on the request!). If you do not intend on applying a fee, you musst still set it, with an amount set to 0!</p>
</div>

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
    "OrderPartId": "123456789",
    "Marketplace": {
        "SubmerchantId": "17312345",
        "Fee": {
            "Value": 100,
            "CurrencyCode": "CHF"
        }
    }
}
```

This request will transfer 10 CHF to the merchant account 17312345, but will also charge a 1 CHF for said transaction. So effectively the merchant will get 9 CHF transferred, **not including the acquiring-costs**, since that can vary from merchant to merchant and even contract!

### Refund fees

But, what if you want to refund said transaction, including the transaction fee?
For that, the [Capture request](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) also offers the option, to submit a fee, but note, that the container is named **FeeRefund** this time. A request then may look like this:

```JSON
{
  "RequestHeader": {
    "SpecVersion": "[CURRENT SPEC_VERSION]",
    "CustomerId": "[your customer id]",
    "RequestId": "[your request id]",
    "RetryIndicator": 0
  },
  "Amount": {
    "Value": 1000,
    "CurrencyCode": "CHF"
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
This request will capture a refund and transfer 10 CHF (Please keep track of this!) from the merchant account 17312345, to the card holder! The fee then will be taken from the marketplace and transfered to the submerchant. So the full amount will be refunded first from the submerchant-account and then they will recieve the fee back from the marketplace!
