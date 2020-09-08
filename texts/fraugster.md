# Fraugster Fire

Fraugster Fire (Henceforth just Fire) is a fraud protection module provided by *NAME HERE* and supported by Saferpay. 
It allows a merchant to dynamically react on suspicious behavior and even  prevent transactions with mailicious intent, during runtime.
This chapter will cover the technical aspects of a Fire integration into your shop-system.


## <a name="fire-req"></a> Requirements

### Licenses

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

## <a name=""></a> Decline
