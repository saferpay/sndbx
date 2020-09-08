# Fraugster Fire

Fraugster Fire (Henceforth just Fire) is a fraud protection module provided by *NAME HERE* and supported by Saferpay. 
It allows a merchant to dynamically react on suspicious behavior and even  prevent transactions with mailicious intent, during runtime.
This chapter will cover the technical aspects of a Fire integration into your shop-system.


## <a name="fire-req"></a> Requirements

### Licenses

Fire will be devided into 3 categories:
+ 
+ 
+ 

## <a name="fire-activation"></a> Activation

## <a name="fire-training"></a> Training

Fire uses AI-Algorithms and ap re-defined set of rules, in order to provide fraud protection. While the latter can directly be influenced by the merchant and is fixed,
the former requires a so called training period.
As every merchant is different and also has varying needs, the AI needs to be trained do consider these needs, to correctly detect mailicious transactions, while also preventing false alerts.

This period usually takes **TIME HERE**.

## <a name="fire-training"></a> Datapoints

In order for the training and also later the detection to work properly, the system needs to be provided with a set of datapoints with each transaction.
Some are provided automatically, while others need to be submitted by the merchant-system, with the initial request, when starting the transaction, like the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize">Transaction Initialize</a> or <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Payment Page Initialize</a>.
The following data points need to be set via the JSON-API:

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


## <a name=""></a> Decline

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
