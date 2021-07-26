<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>SITE MOVED:</strong> This documentation is outdated, as of July 26th 2021. The new and improved documentation can be found under <a href="https://docs.saferpay.com/home/integration-guide/introduction">https://docs.saferpay.com/</a>.</p>
</div>

# Transaction Inquire

The <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Inquire">inquire interface</a> allows you to acquire transaction data using the Saferpay TransactionId, or OrderId.

However, the inquiry interface has some restrictions, that have to be considered when using this feature:

## <a name="inquire-rules"></a> Rules and limitations
1. **Use the standard means first:** the inquire interface is not meant to replace other API functions, like for example <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a>, or <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize">Transaction Authorize</a>. When implementing the <a href="Integration_PP.html">Payment Page</a>, or <a href="Integration_trx.html">Transaction Interface</a> flows, you should always use the standard means first, and the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Inquire">inquire interface</a> only if those cannot be executed anymore, e.g. due to the token being expired.
2. **No polling:** In general, but in this case specifically, do not use polling to continuously ask for transaction data.
3. **Only successful transactions:** As of now, the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Inquire">inquire interface</a> only works with successful transactions.
4. **SpecVersion 1.11:** You must use SpecVersion 1.11 and up.
5. **Update delay:** The result of a *Transaction/Inquire* request does not display the current status in real time because the requested data is updated with a few minutes delay.

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>Saferpay reserves the right to restrict or deny access to the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Inquire">inquire interface</a>, due to excessive use of the interface, or violation of these rules.</p>
</div>

## <a name="inquire-examples"></a> Examples

### Example of a <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Inquire">Transaction Inquire</a> request:

 ```json 
 {
  "RequestHeader": {
    "SpecVersion": "1.11",
    "CustomerId": "[YOUR CUSTOMERID]",
    "RequestId": "f7ca9af6c203c055ec50b6dcc2a40831",
    "RetryIndicator": 0,
    "ClientInfo": {
      "ShopInfo": "My Shop",
      "OsInfo": "Windows Server 2016"
    }
  },
  "TransactionReference": {
    "TransactionId": "fn7O7nAIQWKMSAbIdnC3A26SMUpA"
  }
}
```

### Example of a <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Inquire">Transaction Inquire</a> response:
 ```json 
{
  "ResponseHeader": {
    "SpecVersion": "1.11",
    "RequestId": "f7ca9af6c203c055ec50b6dcc2a40831"
  },
  "Transaction": {
    "Type": "PAYMENT",
    "Status": "CAPTURED",
    "Id": "fn7O7nAIQWKMSAbIdnC3A26SMUpA",
    "CaptureId": "fn7O7nAIQWKMSAbIdnC3A26SMUpA",
    "Date": "2019-05-17T12:44:14.097+02:00",
    "Amount": {
      "Value": "245",
      "CurrencyCode": "EUR"
    },
    "OrderId": "0",
    "AcquirerName": "VISA Saferpay Test",
    "AcquirerReference": "84050331349",
    "SixTransactionReference": "0:0:3:fn7O7nAIQWKMSAbIdnC3A26SMUpA",
    "ApprovalCode": "586216"
  },
  "PaymentMeans": {
    "Brand": {
      "PaymentMethod": "VISA",
      "Name": "VISA"
    },
    "DisplayText": "xxxx xxxx xxxx 0004",
    "Card": {
      "MaskedNumber": "xxxxxxxxxxxx0004",
      "ExpYear": 2019,
      "ExpMonth": 5,
      "HolderName": "Yamada Taro",
      "CountryCode": "JP"
    }
  },
  "Payer": {
    "IpAddress": "178.15.222.100",
    "IpLocation": "DE"
  },
  "Liability": {
    "LiabilityShift": true,
    "LiableEntity": "ThreeDs",
    "ThreeDs": {
      "Authenticated": true,
      "LiabilityShift": true,
      "Xid": "HVQOUwEUJnYaBAM7BCQDNAofGgg="
    }
  },
  "Dcc": {
    "PayerAmount": {
      "Value": "352",
      "CurrencyCode": "JPY"
    }
  }
}
```
### Example of a <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Inquire">Transaction Inquire</a> response for a failed transaction:
<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>As mentioned before, the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Inquire">Inquire Interface</a> only works with successful transactions. Therefore you'll get the following response, if a transaction was either not completed by the payer, or was not successful.</p>
</div><br />

 ```json 
 {
  "ResponseHeader": {
    "SpecVersion": "1.11",
    "RequestId": "fbe3bb5ba9984ce74dcd54089b0cc95a"
  },
  "Behavior": "ABORT",
  "ErrorName": "TRANSACTION_NOT_FOUND",
  "ErrorMessage": "Transaction not found"
}
```
