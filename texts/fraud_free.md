# Fraud Free
(still in evaluation - contact your account manager for further information)

When using our Fraud Free solution (requires a concerned contract amendment) the transmission of the specific parameters is mandatory:

### <a name="ff-mandatory"></a> Mandatory Data Points
The following data points are mandatory and must contain valid values when using the Fraud Free Service and calling PaymentPage Initialize or Transaction Initialize:

| Data Point  | Exmaple | Validation |
| ------------- | ------------- | ------------- |
| BillingAddress Email | payer@gmail.com  | Valid email address |
| DeliveryAddress CountryCode  | DE  | ISO 3166-1 alpha-2 country code |
| Payer IpAddress* | 212.243.178.130  | Valid IP address |

(*) The Payer IpAddress is mandatory only when calling [Transaction Initialize Request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize). With [PaymentPage Initialize Request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Initialize) the Payer IpAdress ist detected automatically and forwarded.

<div class="warning">
  <p><strong>NOTE:</strong>(*) The Payer IpAddress is mandatory only when calling. With the Payer IpAdress ist automatically detected and forwarded.</p>
</div>

### <a name="ff-response"></a> API Response

The Fraud Free Service takes the liability for the transaction only if the API response contains all of the following attributes with values as specified:
-	In the Liability Container is `LiabilityShift` set to `true`, and
-	The “LiableEntity” equals `FraudFree`, and 
-	Within the FraudFree Container is  `LiabilityShift` set to `true`

The image below depicts an example reply where the Fraud Free Service accepts liability: 

```json

"Liability":{ 
   "LiabilityShift":true,
   "LiableEntity":"FraudFree",
   "FraudFree":{ 
      "Id":"fb126ca6853f4217853df26213da4de8",
      "LiabilityShift":true,
      "Score":0.00,
      "Investigationpoints":[ 
         "susp_bill_ad",
         "susp_machine"
      ]
   }
}

```
