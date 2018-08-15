# Fraud Free

<div class="warning">
  <p><strong>NOTE:</strong> This service is still in evaluation - contact your account manager for further information.</p>
</div>

## <a name="ff-response"></a> API Response
  
The Fraud Free Service only accepts liability for the transaction if the API response (PaymentPage/Assert response, Transaction/authorize response) contains all of the following attributes with values as specified:
-	In the Liability Container is `LiabilityShift` set to `true`, and
-	The `LiableEntity` equals `FraudFree`, and 
-	Within the FraudFree Container is  `LiabilityShift` set to `true`

The below snippet is an example response where the Fraud Free Service accepts liability for the transaction: 

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
      <td>BillingAddress.Email</td>
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


