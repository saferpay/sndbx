# Masterpass

Masterpass is a Wallet-Solution introduced by Mastercard.
It is **NOT** a typical payment method, like Mastercard, it is more like a database, that contains payment methods, that can be registered there by the card holder.
Masterpass can indeed contain Mastercard, as well as Visa and other payment means, which will then be used for the transaction. These transactions will then show up as Visa, or Mastercard transactions, with the added information, that the payment means have been provided by a Masterpass wallet!
This chapter will cover all things worth to know about Masterpass!

## <a name="mp-req"></a> Requirements

The handling of Masterpass payments with Saferpay requires:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.

<div class="info">
  <p><strong>Note:</strong> In order for Masterpass to be activated, please contact your contract manager. He/She can guide you and will initiate all the necessary steps, so you can start accepting Masterpass.</p>
</div>

## <a name="mp-pp"></a> Masterpass via Payment Page

The Integration of Masterpass via the Payment Page may be the easiest way to integrate Masterpass.
Simply follow the basic [Payment Page integration steps](Integration_PP.html). If you already have a Payment Page integration, you can, of course, skip this step. After you have contacted your contract manager and Masterpass has been activated, Masterpass will show up on the Payment Page, just like any other payment method:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/MasterpassPPage.PNG "Masterpass Payment Page")

Furthermore, Masterpass will also show up, once a credit card brand has been selected, as an alternative:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/MasterpassPPageCEF.PNG "Masterpass Payment Page Card Entry Form")

### Direct redirect to Masterpass

If you want to perform a direct redirect to Masterpass, you have to use the parameter **Wallets** within the [PaymentPage Initialize request](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize)!

```json 
{
    "RequestHeader": {
        "SpecVersion": "1.10",
        "CustomerId": "[YOUR CUSTOMERID]",
        "RequestId": "2f3f941282ebf63933052693194b5e61",
        "RetryIndicator": 0,
        "ClientInfo": {
            "ShopInfo": "My Shop",
            "OsInfo": "Windows Server 2013"
        }
    },
    "TerminalId": "[YOUR TERMINAL]",
    "Payment": {
        "Amount": {
            "Value": "12345",
            "CurrencyCode": "EUR"
        },
        "OrderId": 123,
        "Description": "Test Order #123"
    },
    "Wallets": [
        "MASTERPASS"
    ],
    "ReturnUrls": {
        "Success": "[YOUR URL]",
        "Fail": "[YOUR URL]",
        "Abort": "[YOUR URL]"
    },
}

```

<div class="info">
  <p><strong>IMPORTANT:</strong> If you are using <strong>"Wallets"</strong> alongside <strong>"PaymentMethods"</strong>, both parameters will be treated equally and a selection-screen will be displayed!</p>
</div>



### Forcing the Delivery Address

If you want to **force** the user into selecting a delivery address, within his Masterpass Wallet, you can do so, via the **DeliveryAddressForm** parameter, within the [PaymentPage Initialize request](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize):

```json 
{
    "RequestHeader": {
        "SpecVersion": "1.10",
        "CustomerId": "[YOUR CUSTOMERID]",
        "RequestId": "2f3f941282ebf63933052693194b5e61",
        "RetryIndicator": 0,
        "ClientInfo": {
            "ShopInfo": "My Shop",
            "OsInfo": "Windows Server 2013"
        }
    },
    "TerminalId": "[YOUR TERMINAL]",
    "Payment": {
        "Amount": {
            "Value": "12345",
            "CurrencyCode": "EUR"
        },
        "OrderId": 123,
        "Description": "Test Order #123"
    },
    "Wallets": [
        "MASTERPASS"
    ],
     "DeliveryAddressForm": {
        "Display": true
    },
    "ReturnUrls": {
        "Success": "[YOUR URL]",
        "Fail": "[YOUR URL]",
        "Abort": "[YOUR URL]"
    },
}

```

The address will then be delivered via the [PaymentPage Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert):

```json 
{
    "ResponseHeader": {
        "SpecVersion": "1.9",
        "RequestId": "1c9f941282ebf6e3a05261144b5fb4"
    },
    "Transaction": {
        "Type": "PAYMENT",
        "Status": "AUTHORIZED",
        "Id": "14IMtdbljnYhtA9x2WbhbKrA1Odb",
        "Date": "2018-10-17T16:27:15.000+02:00",
        "Amount": {
            "Value": "12345",
            "CurrencyCode": "EUR"
        },
        "OrderId": "123",
        "AcquirerName": "MasterCard Saferpay Test",
        "AcquirerReference": "59428236614",
        "SixTransactionReference": "0:0:3:14IMtdbljnYhtA9x2WbhbKrA1Odb",
        "ApprovalCode": "387800"
    },
    "PaymentMeans": {
        "Brand": {
            "PaymentMethod": "MASTERCARD",
            "Name": "MasterCard"
        },
        "DisplayText": "xxxx xxxx xxxx 0003",
        "Wallet": "MASTERPASS",
        "Card": {
            "MaskedNumber": "903010xxxxxx0003",
            "ExpYear": 2022,
            "ExpMonth": 10,
            "HolderName": "Max Simulator",
            "CountryCode": "DE",
        }
    },
    "Payer": {
        "IpAddress": "153.46.97.98",
        "IpLocation": "CH",
        "DeliveryAddress": {
            "FirstName": "",
            "LastName": "Max Simulator",
            "Street": "Dorfstrasse 54",
            "Street2": "",
            "Zip": "6000",
            "City": "Luzern",
            "CountrySubdivisionCode": "CH-LU",
            "CountryCode": "CH",
            "Phone": "+41 41 765-4321",
            "Email": "max.simulator@saferpay.com"
        }
    },
    "Liability": {
        "LiabilityShift": true,
        "LiableEntity": "ThreeDs",
        "ThreeDs": {
            "Authenticated": true,
            "LiabilityShift": true,
            "Xid": "n0kq9Z41MKK2wSKE+x+gPH9LoOw=",
            "VerificationValue": "AAABBIIFmAAAAAAAAAAAAAAAAAA="
        }
    }
}


```

<div class="warning">
  <p><strong>IMPORTANT:</strong> Saferpay can capture the billing address in multiple ways. Either the merchant does capture it himself and submits the data through the respective request, or, in case of the Payment Page, the page does offer respective forms, that can capture the address! In case of Masterpass however, the address is saved within the Masterpass Wallet of the card holder. Should the delivery address be captured, using one of the other methods, it will be overwritten by the wallet-address!</p>
</div>



