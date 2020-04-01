# Partial Captures

Saferpay does offer the option to do [Partial Captures (Hereafter refered to as Multipart Captures)](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture) on transactions, made with certain payment methods. [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture) split the money authorized during one transactions into multiple batches, enabling the merchant to only capture the amount he wants to obtain e.g. for deliviering a part of a certain order.

## <a name="pc-req"></a> Requirements

1. [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture) are available for SIX Mastercard, Visa Acquiring contracts and PayPal <strong>only!</strong>
2. No MultipartCapture request should be sent before receiving the response of a preceeding request (i.e. no parallel calls are allowed). The timeout for this are 100 seconds.
3. The sum of multipart captures must not exceed the authorized amount.
4. A unique OrderPartId must be used for each request.
5. [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture) execute the money-flow (closing) with the execution of the capture itself! A [Cancel](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel) of a [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture) therefore is not possible!
6. MultipartCapture is only available for **SpecVersions 1.10 and higher!**

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
    <p><strong>Important Note:</strong> Note, that you cannot mix the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture">Multipart Capture</a> and the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">Normal Capture</a> within one transaction. Either do one, or the other!</p>
</div>

## <a name="pc-exec"></a> Executing a Multipart Capture

Before you can even execute a [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), you, of course, need a transaction, that needs to be captured. This can be any normal authorization, either done by the [Payment Page](https://saferpay.github.io/jsonapi/#ChapterPaymentPage), or [Transaction Interface](https://saferpay.github.io/jsonapi/#ChapterTransaction). You don't have to consider anything special, up to this point!

Additionally to the standard parameters, needed to execute a [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture), the following parameters are important for a [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture):

- **Type:** The **Type** specifies, whether this is one subsequent, or final Capture.
- **OrderPartId:** Each [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture) is identified by a unique **OrderPartId**, which will also be forwarded to the respective reconciliation-files you will recieve later. That makes this Id very important for later identification, thus you have to make sure, that said Id is set as unique, so confusions can be averted.

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

Each capture is identified by a **CaptureId** (Marked with the suffix **"\_c"**) , which should be saved, since this Id is used for further actions, like refunds. More on the latter later in this very chapter.

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
 <p><strong>Note:</strong> The basic reservation times <a href="https://saferpay.github.io/sndbx/#reservation">mentioned here</a> do still aplly for <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture">Multipart Captures!</a> If this time is exceeded, the reservation could void and the money flow will be rejected by the card holders bank!</p>
</div>

## <a name="pc-final"></a> Finalizing a Capture-Chain

After a transaction has been captured to the merchants liking using [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), it should be finalized, in order to seclude the transaction.
There are two different ways to finalize a [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture). Each covering one specific case, that should be differentiated, by asking one specific question:

**Does the merchant intend to capture a final amount, or not?**

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Important:</strong> Once finalized, a transaction cannot be opened again. Make sure, that you really want to finalize the transaction. Other captures won't be possible!</p>
</div>

### Finalizing, while also capturing a certain amount
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
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

## <a name="pc-final-why"></a> Why do you need to finalize a transaction?

There are two reasons, why you, the merchant, should finalize a transactions, once you have finished all your actions:

1. It is the cleaner process! Four you, the merchant, this is the cleaner solution and helps keeping track of every transaction and its status, not just inside your own system, but also inside the Saferpay Backoffice, where still open and closed transactions, will be marked as such!
2. It means less hassle for your customers. Each time you successfully authorize a credit card, the authorized amount gets reserved on the card holders credit limit. That effectively means, that he/she cannot use this money, as long as you haven't claimed the money, or the reservation voids, after a certain time-frame. A finalization will open up the credit-limit for the card holder, so he/she may use it again, which is especially important in situations, where the merchant does not want, or can't claim all of the money, originally authorized!

## <a name="pc-refund"></a> Handling Refunds

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

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Important:</strong> Like every other <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Refund">Refund</a>, these too need to be captured.
However <strong>please make sure to use the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture">normal Capture request</a> in this case and NOT MultipartCapture!</strong> Refunds cannot be split into multiple parts, like authorizations!</p>
</div>
