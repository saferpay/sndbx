# DEPRECATED! DO NOT USE FOR NEW IMPLEMENTATIONS! THIS IS ONLY INTENDED FOR EXISTING FRAUD FREE CUSTOMERS!

## Sitemap
```json
    "Title": "Fraud Free Service",
    "Source": "texts/fraud_free.md",
    "Target": "fraud_free.html",
    "Subsites": [
     { "Source": "texts/fraud_free.md", "Title": "API Response", "Target": "fraud_free.html#ff-response" },
     { "Source": "texts/fraud_free.md", "Title": "Status Change", "Target": "fraud_free.html#ff-status" },
     { "Source": "texts/fraud_free.md", "Title": "Mandatory Data Points", "Target": "fraud_free.html#ff-mandatory" }
     
    ]
  },
```
# Fraud Free

<div class="warning">
  <p><strong>NOTE:</strong> This service is still in evaluation - contact your account manager for further information.</p>
</div>

## <a name="ff-req"></a> Requirements

* The corresponding Saferpay licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* A Fraud Free contract. Please contact your account manager for further information!
+ JSON-API Spec Version 1.9

## <a name="ff-response"></a> API Response
  
The Fraud Free Service only accepts liability for the transaction if the API response (PaymentPage/Assert response, Transaction/authorize response) contains all of the following attributes with values as specified:
-	In the Liability Container, `LiabilityShift` is set to `true`!
-	The `LiableEntity` equals `FraudFree`!
-	Within the FraudFree Container, `LiabilityShift` is set to `true`!


<div class="info">
  <p><strong>Info:</strong> Should the Fraud Free service not accept liability, <strong>3D Secure</strong> is used instead!</p>
</div>
<div class="warning">
  <p><strong>Important:</strong> The FraudFree-Response will not be visible inside the Saferpay Backoffice. Always save the API-response for further use, e.g. in case of fraud!</p>
</div>

Below, you'll find JSON-examples of success and major fail cases, that are returned with the authorization response:

### Fraud Free accepts liability

```json

"Liability":{ 
   "LiabilityShift":true,
   "LiableEntity":"FraudFree",
   "FraudFree":{ 
      "Id":"fb126ca6853f4217853df26213da4de8",
      "LiabilityShift":true,
      "Score":x.xx,
      "Investigationpoints":[ 
         "susp_xxx_xx",
         "susp_xxxxx"
      ]
   }
}

```

### Fraud Free rejects liability and fallback to 3D Secure

### Example of Rejection due to suspicious client data:

```json
"Liability":{ 
   "LiabilityShift":true,
   "LiableEntity":"ThreeDs",
   "ThreeDs":{ 
      "Authenticated":true,
      "LiabilityShift":true,
      "Xid":"X2lYXwpROW5IBC5tVCQLUlwrRQs=",
      "VerificationValue":"AAABBIIFmAAAAAAAAAAAAAAAAAA="
   },
   "FraudFree":{ 
      "Id":"c6057dcc280448ea8ee51307aadbb276",
      "LiabilityShift":false,
      "Score":0.80,
      "Investigationpoints":[ 
         "susp_bill_ad",
         "susp_machine"
      ]
   }
}
```

### Rejection due to too high authorization-amount:

```json
"Liability":{ 
   "LiabilityShift":true,
   "LiableEntity":"ThreeDs",
   "ThreeDs":{ 
      "Authenticated":true,
      "LiabilityShift":true,
      "Xid":"Gy0mNAETemwEBAhLNhQAVmJcSAc=",
      "VerificationValue":"AAABBIIFmAAAAAAAAAAAAAAAAAA="
   },
   "FraudFree":{ 
      "Id":"faaf76cff7de4b0f9997f941f99a626e",
      "LiabilityShift":false,
      "Score":0.00,
      "Investigationpoints":[ 
         "not_liable_high_amount"
      ]
   }
}
```
<div class="info">
  <p><strong>Info:</strong> You can simulate rejections, by submitting <strong>reject@example.com</strong> as the payer e-mail (also see Mandatory Data Points).</p>
</div>

## <a name="ff-status"></a> Status Change

Liability shift is excluded if the transaction changes to a status as within this list:

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Status</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>cancelled</td>
      <td>Transaction was cancelled by the client prior to shipment</td>
    </tr>
    <tr>
      <td>Refund</td>
      <td>Transaction was refunded</td>
    </tr>
    <tr>
      <td>Chbk</td>
      <td>Client received a chargeback for an unspecified reason</td>
    </tr>
    <tr>
      <td>cancelled_claim</td>
      <td>Chargeback was cancelled</td>
    </tr>
  </tbody>
</table>


## <a name="ff-mandatory"></a> Mandatory Data Points

When using our Fraud Free solution (requires a concerned contract amendment) the transmission of specific parameters is mandatory.

The following data points are mandatory and must contain valid values when using the Fraud Free Service and calling [PaymentPage Initialize Request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Initialize) or [Transaction Initialize Request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize):

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Data Point</th>
      <th>Example</th>
      <th>Validation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>DeliveryAddress.Email</td>
      <td>payer@gmail.com</td>
      <td>Valid email address</td>
    </tr>
    <tr>
      <td>DeliveryAddress.CountryCode</td>
      <td> DE</td>
      <td> ISO 3166-1 alpha-2 country code</td>
    </tr>
    <tr>
      <td>Payer.IpAddress*</td>
      <td>212.243.178.130 </td>
      <td> Valid IP address</td>
    </tr>
  </tbody>
</table>

(*) The Payer IpAddress is only mandatory when calling [Transaction Initialize Request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize). With [PaymentPage Initialize Request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Initialize) the Payer IpAdress ist detected automatically.


