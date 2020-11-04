# Credit Cards

This chapter will cover special cases and some additional features, that are available with credit card processing.

## <a name="cc-pappoval"></a> Partial approvals

A partial approval is best explained with an example:

A customer comes to your shop and orders goods worth 100 Euros.
He/She enters the card details and Saferpay authorizes the card. During authorization, the card holders bank checks the solvency of the card holder and sees, that only maximum of 80 Euros can be authorized. Under normal circumstances, the transaction would fail. However, if the merchant requests a partial approval, the card can be authorized for as much, as possible.

This sort of authorization-type is best suited for goods, that are sold in bulk, like for example screws, food, or petrol at a gas station.
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> Not all Issuers may support this feature. If no partial approval can be granted, the transaction will fail!
  </p>
</div>

### Requirements

+ Partial approvals can only be requested with **SpecVersion 1.20**, or higher!
+ Partial approvals are only available for Visa and Mastercard!

### How to request a partial approval

A partial approval can only be requested, when using the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect">Authorize Direct Request</a>. With this request, the parameter **Payment.Options.AllowPartialAuthorization** must be set to true.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> Please make sure, that you also have read the <a href="psd2.html">PSD2 Chapter</a>, since <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AuthorizeDirect">Authorize Direct</a> is classified as a Merchant Initiated Transaction (MIT)!
  </p>
</div>

### Example request
```json
{
  "RequestHeader": {
    "SpecVersion": "1.20",
    "CustomerId": "242225",
    "RequestId": "8cf6d15a041ba515d90ee191257d9f77",
    "RetryIndicator": 0,
    "ClientInfo": {
      "ShopInfo": "My Shop",
      "OsInfo": "Windows Server 2013"
    }
  },
  "TerminalId": "17869305",
  "Payment": {
    "Amount": {
      "Value": "10000",
      "CurrencyCode": "EUR"
    },
    "OrderId": "Order_2",
    "Description": "Test Order #2",
    "Options": {
      "AllowPartialAuthorization": true
    }
  },
  "Payer": {
    "IpAddress": "192.168.178.55",
    "LanguageCode": "en"
  },
  "PaymentMeans": {
    "Alias": {
      "Id": "77b828c0975498e986e1663489ceacdc"
    }
  }
}
```
### Example response
Saferpay will respond with the maximum amount, that can be authorized:

```json
{
  "ResponseHeader": {
    "SpecVersion": "1.20",
    "RequestId": "8cf6d15a041ba515d90ee191257d9f77"
  },
  "Transaction": {
    "Type": "PAYMENT",
    "Status": "AUTHORIZED",
    "Id": "69W8jSbjbhA2vASMbxUUAl3Q4OKA",
    "Date": "2020-11-04T12:29:07.646+01:00",
    "Amount": {
      "Value": "5000",
      "CurrencyCode": "EUR"
    },
    "OrderId": "Order_2",
    "AcquirerName": "VISA Saferpay Test",
    "AcquirerReference": "05718468252",
    "SixTransactionReference": "0:0:3:69W8jSbjbhA2vASMbxUUAl3Q4OKA",
    "ApprovalCode": "715453"
  },
  "PaymentMeans": {
    "Brand": {
      "PaymentMethod": "VISA",
      "Name": "VISA"
    },
    "DisplayText": "xxxx xxxx xxxx 0013",
    "Card": {
      "MaskedNumber": "xxxxxxxxxxxx0013",
      "ExpYear": 2022,
      "ExpMonth": 2,
      "HolderName": "test",
      "CountryCode": "DE",
      "HashValue": "E1DB6CE1CC017DCB651E7256650023698E58E158"
    }
  },
  "Payer": {
    "IpAddress": "192.168.178.55"
  }
}
```

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> The merchant must make sure, that his inventory is adjusted accordingly, since less will be payed, than initially requested, which is the point behind partial approvals.
  </p>
</div>

### Test cards

Test cards can be found <a href="paymentmeans.html">over here</a>.


## <a name="cc-scase"></a> Special Cases

Though we at SIX Payment Services do offer the possibility to process credit cards, it sometimes is necessary to involve third parties in order to process credit cards in certain countries and regions.
This chapter will cover the special characteristics you need to consider, if you want to use Saferpay with these processors.

### Chase Paymentech

Chase Paymentech is a US credit card processor with office in Dallas, Texas.
SIX Payment Services offers the pssibility to process credit cards over this processor, directly in the US.
However please take note to the following restrictions and characteristics.

+ **OrderId:** Due to technical restrictions, the **OrderId** will not be forwarded to Chase to be shown on your reconciliation-files from chase. Saferpay will instead fill it with a unique, increasing, numeric value, to meet Chase Paymentechs requirements. Therefore a later identification through the **OrderId** will not be possible!
