# The Marketplace and Partial Captures

## Partial Captures

In order to understand the Saferpay marketplace-solution, one must first grasp the concept of partial- or [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), for they are the very foundation, on which the marketplace-solution is built upon.

### Things to consider

1. [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture) is available for SIX Acquiring contracts <strong>only!</strong>
2. Your live merchant-account needs to be configured, in order to support Multipart Captures, or the request will fail!
3. No MultipartCapture request should be sent before receiving the response of a preceeding request (i.e. no parallel calls are allowed).
4. The sum of multipart captures must not exceed the authorized amount.
5. A unique OrderPartId must be used for each request.
6. Unlike normal [Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture), which also undergo the daily batch close, with [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture), the money-flow will be initiated with the execution of the capture itself! A cancel of a [Multipart Captures](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture) therefore is not possible!
7. MultipartCapture is only available for **SpecVersions 1.10 and higher!**

### Correctly executing a Multipart Capture

Additional to the standard parameters, needed to execute a [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture), the following parameters are important for a [Multipart Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_MultipartCapture):

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
        "Value": "1000",
        "CurrencyCode": "CHF"
    },
    "Type": "PARTIAL",
    "OderPartId": "123456789"
}
```

## Finalizing a Capture-Chain

### The Difference between "Type": "FINAL" and Transaction MultipartFinalize

## Submerchants

## Handling Refunds

### Capturing a Refund

## Error Handling
