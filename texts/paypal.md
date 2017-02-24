# PayPal

Via the Saferpay JSON API, PayPal payments can be handled without too much expenditure of effort. This chapter describes what needs to be observed in this regard.

## <a name="ppal-requirement"></a> Requirements

The handling of PayPal payments with Saferpay requires:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* A valid PayPal merchant account.
>
>    <i class="glyphicon glyphicon-hand-right"></i> **Attention**: for PayPal activation on the Saferpay terminal, please inform **service.saferpay@six-payment-services.com** of your PayPal merchant account ID and the desired currency.
>

## <a name="api-access"></a> Grant API Approval for Saferpay

So that PayPal payments can be handled via Saferpay, a few initial settings must be changed in the PayPal merchant account.

1. Log in to your PayPal business account at [www.paypal.com](http://www.paypal.com/).
1. Click on the profile icon ![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_icon.png "Profile") on the top right side of the page. From the **Business Profile** menu, select Account Settings.  
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_business_profile.png "Select Account settings")
1. From the left menu, click **My selling tools**.
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_my_selling_tools.png "My selling tools")
1. In the **Selling online** section, click the Update link for the **API access** item.
1. The **API Access** dialogue appears. Click on **Grant API permission** under the bullet point **Pre-built payment solution**.  
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_grant_api_permission.png "API Access")
1. The dialogue **Add New Third Party Permissions** appears:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_add_3rd_party_permission.png "3rd Party permission")
<i class="glyphicon glyphicon-hand-right"></i> Enter **be-sfp_api1.six-group.com** into **Third Party Permission Username** box. Click on **Lookup**.  
1. A list entitled *Available Permissions* will be shown:
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

--->>>
>
>    <i class="glyphicon glyphicon-hand-right"></i> Load with address forwarding:
>
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
>
>    <i class="glyphicon glyphicon-hand-right"></i> Load for the use of the form:
>
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
<<<---

With [Redirect Payment](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_RedirectPayment), the address must be forwarded with Initialize and via the corresponding container.

--->>>
>
>    <i class="glyphicon glyphicon-hand-right"></i> Load with address forwarding:
>
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
  "ServiceProvider": "PAYPAL", 
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
<<<---

For Canada, USA and Mexico, specification of the province or the state with the parameter **CountrySubdivisionCode** is required. The abbreviation which must be forwarded corresponds to the two-digit code of the province or the federal state per ISO 3166-2.

As soon as these attributes have been forwarded, Seller Protection comes into effect. PayPal verifies the supplied address details with the data filed by the buyer and refuses payment if the registered address does not concur with the specified address.

## <a name="partial-capture"></a> Partial Capture

With Partial Capture, it is possible to book a PayPal authorisation in several individual steps. For this, additional parameters must be forwarded with [Transaction Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) in the **Partial** container.

With Partial Capture, the booking of an authorised amount is possible in up to ten partial steps. The total number of individual bookings may not exceed the authorised amount.

The **OrderPartId** parameter must be unique for a partial booking, so as to be able to refer to it later in follow-up actions, such as a credit note payment. 
With the parameter Type, it is determined whether the amount that is to be booked is a partial step or a final booking. 
