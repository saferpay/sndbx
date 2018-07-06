# Fraud Free

<div class="warning">
  <p><strong>NOTE:</strong> This service is still in evaluation - contact your account manager for further information.</p>
</div>

When using our Fraud Free solution (requires a concerned contract amendment) the transmission of specific parameters is mandator.

## <a name="ff-mandatory"></a> Mandatory Data Points
The following data points are mandatory and must contain valid values when using the Fraud Free Service and calling [PaymentPage Initialize Request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Initialize) or [Transaction Initialize Request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize):

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center">Data Point</th>
      <th class="text-center">Example</th>
      <th class="text-center">Validation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center">BillingAddress Email</td>
      <td class="text-center">payer@gmail.com</td>
      <td class="text-center">Valid email address</td>
    </tr>
    <tr>
      <td class="text-center">DeliveryAddress CountryCode</td>
      <td class="text-center"> DE</td>
      <td class="text-center"> ISO 3166-1 alpha-2 country code</td>
    </tr>
    <tr>
      <td class="text-center">Payer IpAddress*</td>
      <td class="text-center">212.243.178.130 </td>
      <td class= "test-center"> Valid IP address</td>
    </tr>
  </tbody>
</table>

(*) The Payer IpAddress is only mandatory when calling [Transaction Initialize Request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize). With [PaymentPage Initialize Request](https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Initialize) the Payer IpAdress ist detected automatically.

## <a name="ff-response"></a> API Response

The Fraud Free Service takes the liability for the transaction only if the API response contains all of the following attributes with values as specified:
-	In the Liability Container is `LiabilityShift` set to `true`, and
-	The `LiableEntity` equals `FraudFree`, and 
-	Within the FraudFree Container is  `LiabilityShift` set to `true`

The image below snippet is an example response where the Fraud Free Service accepts liability for the transaction: 

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
