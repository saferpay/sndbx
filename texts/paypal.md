# PayPal

Paypal payments can be processed with Saferpay without much effort. This chapter describes what needs to be observed in this regard.

## <a name="ppal-requirement"></a> Requirements

The handling of PayPal payments with Saferpay requires:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* A valid PayPal merchant account.

<div class="warning">
  <p><strong>Attention:</strong> For PayPal activation on the Saferpay terminal, please inform **service.saferpay@six-payment-services.com** of your PayPal merchant account ID and the desired currency.</p>
</div>

## <a name="api-access"></a> Grant API Approval for Saferpay

To enable processing of PayPal payments via Saferpay a few settings must be first specified in the PayPal Mercahnt account.

1. Log in to your PayPal business account at [www.paypal.com](http://www.paypal.com/).
1. Click on the profile icon ![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_icon.png "Profile") on the top right side of the page. From the **Business Profile** menu, select Account Settings.  
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_business_profile.png "Select Account settings")
1. From the left menu, click **My selling tools**.
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_my_selling_tools.png "My selling tools")
1. In the **Selling online** section, click the Update link for the **API access** item.
1. The **API Access** dialogue appears. Click on **Grant API permission** under the bullet point **Pre-built payment solution**.  
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_grant_api_permission.png "API Access")
1. The dialogue **Add New Third Party Permissions** appears:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_add_3rd_party_permission.png "3rd Party permission")<br /><pre>Enter <b>be-sfp_api1.six-group.com</b> into <b>Third Party Permission Username</b> box. Click on <b>Lookup</b>.</pre>
1. The *Available Permissions* list will be shown:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_available_permission.png "Available permissions")

<i class="glyphicon glyphicon-hand-right"></i> Tick the following checkboxes and then click on **Add**:
* Use Express Checkout to process payments.
* Issue a refund for a specific transaction.
* Authorize and capture your PayPal transactions.
* Obtain information about a single transaction.
* Search your transactions for items that match specific criteria and display the results
* Obtain authorization for pre-approved payments and initiate pre-approved transactions.
* Accept or deny a pending transaction.
* Issue a refund for any prior transaction.

## <a name="merchant-protection"></a> Seller Protection

PayPal Seller Protection protects you against payment default when your customer pays for your goods or services with PayPal. Occasionally, an expected payment does not arrive because the customer has insufficient account funds or there is a delivery fault. Your buyer may revoke any payment – for example, when credit card fraud occurs.

Seller protection occurs in the following cases:
*	Your buyer revokes a debit or credit card payment
*	The buyer’s account has insufficient funds
*	Your buyer has complained unjustly and sought Buyer Protection
*	Credit Card Fraud

If a credit card payment or direct debit is revoked (chargeback), the sum will automatically be returned to the bank or to the customer’s card issuer. In these cases, PayPal will deduct the credited amount from your PayPal account. If Seller Protection then enters into force, PayPal will refund the amount to you after the case is closed.

To benefit from PayPal seller protection, the following conditions must be met:
*	The goods are sent insured and with a sales slip
*	The article is sent, where possible, within seven days
*	The goods will then be sent to the buyer address as appears in the transaction details and the PayPal account.

For PayPal Seller Protection to be valid when your customer uses PayPal to pay via Saferpay, it is imperative that the address details are forwarded to Saferpay.

The [Saferpay Payment Page](https://saferpay.github.io/jsonapi/#ChapterPaymentPage) can help in forwarding the address parameters in the **Payer** container with the delivery address, or you can use the Saferpay Payment Page’s own address form.

<div class="info">
  <p><strong>Attention:</strong> Request with address forwarding:</p>
</div>
```json
{
  "RequestHeader": {
    "SpecVersion": "1.3", 
    "CustomerId": "123123", 
    "RequestId": "33e8af17-35c1-4165-a343-c1c86a320f3b", 
    "RetryIndicator": 0, 
    "ClientInfo": {
        "ShopInfo": "My Shop", 
        "ApplicationInfo": "ApplicationInfo", 
        "OsInfo": "Windows Server 2013"
    }
  }, 
  "TerminalId": "12345678", 
  "Payment": {
    "Amount": {
      "Value": "100", 
      "CurrencyCode": "EUR"
    }, 
    "OrderId": "OrderId", 
    "Description": "Description", 
    "PayerNote": "Payernote", 
  }, 
  "PaymentMethods": ["PAYPAL"], 
  "Payer": {
    "IpAddress": "111.111.111.111",
    "DeliveryAddress": {
      "FirstName": "Hans",
      "LastName": "Muster",
      "DateOfBirth": "1969-07-21",
      "Street": "Strasse 1",
      "Zip": "12345",
      "City": "Musterstadt",
      "CountryCode": "DE",
      "Phone": "+49 40 1234 5678",
      "Email": "Muster@muster.com",
      "Gender": "MALE",
    }
  }, 
  "ReturnUrls": {
    "Success": "https://merchanthost/success", 
    "Fail": "https://merchanthost/fail", 
    "Abort": "https://merchanthost/abort"
  }, 
  "Notification": {
    "MerchantEmail": "merchant@saferpay.com", 
    "NotifyUrl": "https://merchanthost/notify"
  }
}
```

<div class="info">
  <p><strong>Attention:</strong> Request for the use of the form:</p>
</div>

```json
{
  "RequestHeader": {
    "SpecVersion": "1.3", 
    "CustomerId": "123123", 
    "RequestId": "33e8af17-35c1-4165-a343-c1c86a320f3b", 
    "RetryIndicator": 0, 
    "ClientInfo": {
      "ShopInfo": "My Shop", 
      "ApplicationInfo": "ApplicationInfo", 
      "OsInfo": "Windows Server 2013"
    }
  }, 
  "TerminalId": "12345678", 
  "Payment": {
    "Amount": {
      "Value": "100", 
      "CurrencyCode": "EUR"
    }, 
    "OrderId": "OrderId", 
    "Description": "Description", 
    "PayerNote": "Payernote", 
  }, 
  "PaymentMethods": ["PAYPAL"], 
  "Payer": {
    "IpAddress": "111.111.111.111"
  },
  "DeliveryAddressForm": {
    "Display": true,
    "MandatoryFields": ["CITY","COUNTRY","EMAIL","FIRSTNAME","LASTNAME","PHONE","SALUTATION","STATE","STREET","ZIP"],
  },
  "ReturnUrls": {
    "Success": "https://merchanthost/success", 
    "Fail": "https://merchanthost/fail", 
    "Abort": "https://merchanthost/abort"
  }, 
  "Notification": {
    "MerchantEmail": "merchant@saferpay.com", 
    "NotifyUrl": "https://merchanthost/notify"
  }
}
```

For Canada, USA and Mexico, specification of the province or the state with the parameter **CountrySubdivisionCode** is required. The abbreviation which must be forwarded corresponds to the two-digit code of the province or the federal state per ISO 3166-2.

As soon as these attributes have been forwarded, Seller Protection comes into effect. PayPal verifies the supplied address details with the data filed by the buyer and refuses payment if the registered address does not concur with the specified address.

## <a name="partial-capture"></a> Partial Capture

With Partial Capture, it is possible to book a PayPal authorisation in several individual steps. For this, additional parameters must be forwarded with [Transaction Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) in the **Partial** container.

With Partial Capture, the booking of an authorised amount is possible in up to ten partial steps. The total number of individual bookings may not exceed the authorised amount.

The **OrderPartId** parameter must be unique for a partial booking, so as to be able to refer to it later in follow-up actions, such as a credit note payment. 
With the parameter Type, it is determined whether the amount that is to be booked is a partial step or a final booking. 

## <a name="capture"></a> Capture and the solvency of the customer

Unlike credit cards, that give the merchant a certain guarantee for the authorized money, PayPal reserves the right to deny the payout of a transaction, if the solvency of the account holder changes negatively after the authorization.

Therefore Saferpay claims the money directly, once the [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) of the transaction has been successfully executed. If the money cannot be claimed, the capture then returns an error.
We generally recommend to execute the [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) as soon as possible, to avoid any issues.

## <a name="iframe"></a> PayPal iFrame integration

<div class="danger">
  <p><strong>Warning:</strong> PayPal does not support the iFrame Integration!</p>
</div>

PayPal actively blocks the iFrame-Integration.
In order to circumvent this issue, the Saferpay Payment Page will break out of the iFrame and display the PayPal website full-size, in order to make a payment possible.
However, please keep in mind, that the ReturnUrls will also be displayed full-size!


