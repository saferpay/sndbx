# Fraugster Fire

Fraugster Fire (Henceforth just Fire) is a fraud protection module provided by *NAME HERE* and supported by Saferpay. 
It allows a merchant to dynamically react on suspicious behavior and even  prevent transactions with mailicious intent, during runtime.
This chapter will cover the technical aspects of a Fire integration into your shop-system.


## <a name="fire-req"></a> Requirements
* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* A contract with Fraugster and its activation in the Saferpay System. **<= HOW TO? INFORMATION NEEDED!**

### Supported Payment Methods and Flows
Currently, the following payment methods are supported:

+ Mastercard
+ Maestro
+ Visa/Vpay
+ American Express
+ Bancxontact
+ PayPal

Currently, the following flows are supported:

+ [Payment Page](Integration_PP.html)
+ [Transaction Interface](Integration_trx.html), including the [Saferpay Fields](SaferpayFields.html)
+ [Direct Mode for Bancontact](bancontact.html#bancontact-directmode)

## <a name="fire-activation"></a> Activation

After Fraugster Fire has been activated on your account, you will have access to the options under **Risk & Fraud > Fraud Prevention Settings**. There you can find a list of all the currently supported Payment Methods, for which you can either fully activate the fraud prevention:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/bo_fraud_activation1.png "Fraud Prevention fully activated")

Or you can select the payment methods you want to be covered by Fraugster Fire:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/bo_fraud_activation1.png "Fraud Prevention partially activated")

## <a name="fire-training"></a> Training

Fire uses AI-Algorithms and a pre-defined set of rules, in order to provide fraud protection. This means, that the fraud-prevention will better itself over time, as it adapts itself to the merchants needs.

## <a name="fire-data"></a> Datapoints

In order for the training and also the detection to work properly, the system needs to be provided with a set of datapoints with each transaction.
Some are provided automatically by Saferpay, while others need to be submitted by the merchant-system, with the initial request, when starting the transaction, like the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize">Transaction Initialize</a> or <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page Initialize</a>.

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Note:</strong> All of these datapoints are generally optional. However the detection will work better, the more data it has, to do its risk evaluation!
  </p>
</div>

The following data points can be set via the JSON-API:

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center">Fire Datapoint</th>
      <th class="text-center">JSON API</th>
      <th class="text-center">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center">trans_amt</td>
      <td class="text-center"><strong>Payment.Amount.Value</strong></td>
      <td>The transaction amount.</td>
    </tr>
    <tr>
      <td class="text-center">trans_currency</td>
      <td class="text-center"><strong>Payment.Amount.CurrencyCode</strong></td>
      <td>The transaction currency.</td>
    </tr>
    <tr>
      <td class="text-center">cc_num</td>
      <td class="text-center"><strong>(see description)</strong></td>
      <td>The used PAN. Note that this value usually comes directly from the card holder and not the merchant directly. Also note that, if you should use <a href="scd.html">Secure Card Data</a>, the PAN behind the provided alias will, of course, be used.</td>
    </tr>
    <tr>
      <td class="text-center">cust_email</td>
      <td class="text-center"><strong>Payer.DeliveryAddress.Email</strong></td>
      <td>The customers E-Mail address.</td>
    </tr>
    <tr>
      <td class="text-center">ip</td>
      <td class="text-center"><strong>Payer.IpAddress</strong></td>
      <td>The customers IP-address.</td>
    </tr>
    <tr>
      <td class="text-center">cust_dob</td>
      <td class="text-center"><strong>Payer.BillingAddress.DateOfBirth</strong></td>
      <td>The customers date of birth.</td>
    </tr>
    <tr>
      <td class="text-center">cust_signup_ts</td>
      <td class="text-center"><strong>RiskFactors.AccountCreationDate</strong></td>
      <td>The customers date of signup to the merchant shop.</td>
    </tr>
    <tr>
      <td class="text-center">password_update_ts</td>
      <td class="text-center"><strong>RiskFactors.PasswordLastChangeDate</strong></td>
      <td>The date, when the customer last changed his/her password.</td>
    </tr>
    <tr>
      <td class="text-center">items</td>
      <td class="text-center"><strong>Order.Items[]</strong></td>
      <td>Array of all the shopping cart items.</td>
    </tr>
    <tr>
      <td class="text-center">item_id</td>
      <td class="text-center"><strong>Order.Items[].Id</strong></td>
      <td>Identifier of the product. This ID is created and provided by the merchant!</td>
    </tr>
    <tr>
      <td class="text-center">unique_item_id</td>
      <td class="text-center"><strong>Order.Items[].VariantId</strong></td>
      <td>Identifier of the product-variant. This ID is created and provided by the merchant!/td>
    </tr>
    <tr>
      <td class="text-center">item_desc</td>
      <td class="text-center"><strong>Order.Items[].Name</strong></td>
      <td>Name of the product, given by the merchant.</td>
    </tr>
    <tr>
      <td class="text-center">additional_description</td>
      <td class="text-center"><strong>Order.Items[].Description</strong></td>
      <td>Description of the product, given by the merchant.</td>
    </tr>
    <tr>
      <td class="text-center">item_amt</td>
      <td class="text-center"><strong>Order.Items[].UnitPrice</strong></td>
      <td>Price of the product.</td>
    </tr>
    <tr>
      <td class="text-center">quantity</td>
      <td class="text-center"><strong>Order.Items[].Quantity</strong></td>
      <td>Quantity ordered of this specific item.</td>
    </tr>
    <tr>
      <td class="text-center">item_category</td>
      <td class="text-center"><strong>Order.Items[].CategoryName</strong></td>
      <td>Product category, given by the merchant.</td>
    </tr>
    <tr>
      <td class="text-center">item_type</td>
      <td class="text-center"><strong>Order.Items[].Type</strong></td>
      <td>Product type. Has to be one of the following: <strong>DIGITAL|PHYSICAL|SERVICE|GIFTCARD</strong></td>
    </tr>
    <tr>
      <td class="text-center">includes_giftcard</td>
      <td class="text-center"><strong>Order.Items[].IsPreOrder</strong></td>
      <td>Boolean, whether the item is a giftcard.</td>
    </tr>
    <tr>
      <td class="text-center">includes_preorder</td>
      <td class="text-center"><strong>Order.Items[].IsPreOrder</strong></td>
      <td>Boolean, whether the item is a pre-ordered item.</td>
    </tr>
    <tr>
      <td class="text-center">delivery_method</td>
      <td class="text-center"><strong>RiskFactors[].DeliveryType</strong></td>
      <td>The used delivery method, for the carts items. Has to be one of the following: <strong>EMAIL|SHOP|HOMEDELIVERY|PICKUP|HQ</strong></td>
    </tr>
  </tbody>
</table>
<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center">Fire Datapoint</th>
      <th class="text-center">JSON API</th>
      <th class="text-center">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center">bill_ad_city</td>
      <td class="text-center"><strong>Payer.BillingAddress.City</strong></td>
      <td>Billing address city</td>
    </tr>
    <tr>
      <td class="text-center">bill_ad_ctry</td>
      <td class="text-center"><strong>Payer.BillingAddress.Country</strong></td>
      <td>Billing address country</td>
    </tr>
    <tr>
      <td class="text-center">bill_ad_first_name</td>
      <td class="text-center"><strong>Payer.BillingAddress.FirstName</strong></td>
      <td>Billing address first name</td>
    </tr>
    <tr>
      <td class="text-center">bill_ad_last_name</td>
      <td class="text-center"><strong>Payer.BillingAddress.LastName</strong></td>
      <td>Billing address last name</td>
    </tr>
    <tr>
      <td class="text-center">bill_ad_line1</td>
      <td class="text-center"><strong>Payer.BillingAddress.Street</strong></td>
      <td>Billing address street</td>
    </tr>
    <tr>
      <td class="text-center">bill_ad_line2</td>
      <td class="text-center"><strong>Payer.BillingAddress.Street2</strong></td>
      <td>Additional billing address street information (e.g. PO Box)</td>
    </tr>
    <tr>
      <td class="text-center">bill_ad_zip</td>
      <td class="text-center"><strong>Payer.BillingAddress.Zip</strong></td>
      <td>Billing address zip code</td>
    </tr>
    <tr>
      <td class="text-center">phone</td>
      <td class="text-center"><strong>Payer.BillingAddress.Phone</strong></td>
      <td>Billing address phone number</td>
    </tr>
    <tr>
      <td class="text-center">ship_ad_city</td>
      <td class="text-center"><strong>Payer.DeliveryAddress.City</strong></td>
      <td>Shipping address city</td>
    </tr>
    <tr>
      <td class="text-center">ship_ad_ctry</td>
      <td class="text-center"><strong>Payer.DeliveryAddress.Country</strong></td>
      <td>Shipping address country</td>
    </tr>
    <tr>
      <td class="text-center">ship_ad_first_name</td>
      <td class="text-center"><strong>Payer.DeliveryAddress.FirstName</strong></td>
      <td>Shipping address first name</td>
    </tr>
    <tr>
      <td class="text-center">ship_ad_last_name</td>
      <td class="text-center"><strong>Payer.DeliveryAddress.LastName</strong></td>
      <td>Shipping address last name</td>
    </tr>
    <tr>
      <td class="text-center">ship_ad_line1</td>
      <td class="text-center"><strong>Payer.DeliveryAddress.Street</strong></td>
      <td>Shipping address street</td>
    </tr>
    <tr>
      <td class="text-center">ship_ad_line2</td>
      <td class="text-center"><strong>Payer.DeliveryAddress.Street2</strong></td>
      <td>Additional shipping address street information (e.g. PO Box)</td>
    </tr>
    <tr>
      <td class="text-center">ship_ad_zip</td>
      <td class="text-center"><strong>Payer.DeliveryAddress.Zip</strong></td>
      <td>Delivery address zip code</td>
    </tr>
    <tr>
      <td class="text-center">phone</td>
      <td class="text-center"><strong>Payer.DeliveryAddress.Phone</strong></td>
      <td>Delivery address phone number</td>
    </tr>
    <tr>
      <td class="text-center">ship_ad_email</td>
      <td class="text-center"><strong>Payer.DeliveryAddress.Email</strong></td>
      <td>Delivery address email address</td>
    </tr>
  </tbody>
</table> 

### Example
Here you can see an example <a href="">Payment Page Initialize</a> request. Note, that the containers and parameters are, of course, consistent throughout the whole API:

```json
{
  "RequestHeader": {
    "SpecVersion": "<insert current spec-version here>",
    "CustomerId": "<insert your customer id here>",
    "RequestId": "798b38f3176f4eb1bc6ce36e946d10ba",
    "RetryIndicator": 0
  },
  "TerminalId": "<insert your terminal id here>",
  "Payment": {
    "Amount": {
    "Value": "55000",
    "CurrencyCode": "EUR"
  },
  "OrderId": "AB-12345.xyz",
  "Description": "Your order #AB-12345.xyz"
  },
  "Payer": {
    "IpAddress": "127.0.0.1",
    "DeliveryAddress": {
      "FirstName": "John",
      "LastName": "Doe",
      "Company": "123 T-hee hee hee Ltd.",
      "Gender": "MALE",
      "Street": "Fakestreet 42",
      "Zip": "12346",
      "City": "Gotham",
      "CountryCode": "US",
      "DateOfBirth": "1939-27-05",
      "Phone": "555707422666701"
    }
  },
  "ReturnUrls": {
    "Success": "https://yourshop/payment-success",
    "Fail": "https://yourshop/payment-failed",
    "Abort": "https://yourshop/payment-aborted"
  },
  "Notification": {
    "NotifyUrl": "https://yourshop/payment-notify"
  },
  "Order": {
    "Items": [
      {
        "Type": "PHYSICAL",
        "Id": "BAAA-BPTENT",
        "VariantId": "BAAA-BPTENT-RED",
        "Name": "Awesome Tent",
        "Description": "Backpacking Tent with room for 3 people, in red.",
        "Quantity": 1,
        "UnitPrice": "25000",
        "IsPreOrder": false
      },
      {
        "Type": "GIFTCARD",
        "Id": "EVCHR-HIKE",
        "VariantId": "EVCHR-HIKE-300",
        "Name": "Hiking vacation voucher",
        "Description": "Enjoy the vacation with your new girlfriend!!",
        "Quantity": 2,
        "UnitPrice": "30000",
        "IsPreOrder": false
      }
    ]
  },
  "RiskFactors": {
    "DeliveryType": "SHOP",
    "AccountCreationDate": "2019-02-21T12:04:43Z",
    "PasswordLastChangeDate": "2019-12-23T16:36:43Z"
  }
}
```


## <a name="fire-rules"></a> Rules

Aside its AI-Algorithms, Fire also offers the option for the merchant, to write his own set of rules, which are then incorporated into the evaluation process.
For this purpose, Fraugster offers its own Backend, where you, the merchant, can directly influence Fire, to fit your needs.

The <a href="">LINK NEEDED Fire Backend can be found here. LINK NEEDED</a>
Furthermore, you can also find <a href="">LINK NEEDED documentation on how to write and use custom rules here. LINK NEEDED</a>

## <a name=""></a> Responses

### Success

In case of a success, the transaction response will aslo carry additional information inside the **FraudPrevention.Result** parameter. 
This can have one of two values **APPROVED** and **MANUAL_REVIEW**.
In both cases, the transaction was indeed successful, however the latter indicates, that there may be issues with this transaction, which need to be reviewed manually, inside the Fraugster Fire backoffice.
It is then up to you -the merchant-, to either accept, or decline this transaction.

```json
 "ResponseHeader": {
    "SpecVersion": "[current Spec-Version]",
    "RequestId": "[your request id]"
  },
  "Transaction": {
    "Type": "PAYMENT",
    "Status": "AUTHORIZED",
    "Id": "MUOGAWA9pKr6rAv5dUKIbAjrCGYA",
    "Date": "2015-09-18T09:19:27.078Z",
    "Amount": {
      "Value": "100",
      "CurrencyCode": "CHF"
    },
    "AcquirerName": "AcquirerName",
    "AcquirerReference": "Reference",
    "SixTransactionReference": "0:0:3:MUOGAWA9pKr6rAv5dUKIbAjrCGYA",
    "ApprovalCode": "012345"
  },
  "PaymentMeans": {
    "Brand": {
      "PaymentMethod": "VISA",
      "Name": "VISA Saferpay Test"
    }
  },
  "DisplayText": "9123 45xx xxxx 1234",
  "Card": {
    "MaskedNumber": "912345xxxxxx1234",
    "ExpYear": 2015,
    "ExpMonth": 9,
    "HolderName": "Max Mustermann",
    "CountryCode": "CH"
  },
  "Payer": {
    "IpAddress": "1.2.3.4",
    "IpLocation": "DE"
  },
  "Liability": {
    "LiabilityShift": true,
    "LiableEntity": "ThreeDs",
    "ThreeDs": {
      "Authenticated": true,
      "LiabilityShift": true,
      "Xid": "ARkvCgk5Y1t/BDFFXkUPGX9DUgs=",
      "VerificationValue": "AAABBIIFmAAAAAAAAAAAAAAAAAA="
    }
  },
  "FraudPrevention": {
    "Result": "MANUAL_REVIEW"
  }
}
```

### Failure

In case of a decline, Saferpay will throw a corresponding error

```json
{
    "ResponseHeader": {
        "SpecVersion": "<current spec-version>",
        "RequestId": "1"
    },
    "Behavior": "ABORT",
    "ErrorName": "BLOCKED_BY_RISK_MANAGEMENT",
    "ErrorMessage": "Blocked by fraud detection"
}
```
