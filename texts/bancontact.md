# Bancontact
Bancontact transactions can also be processed via the Saferpay JSON API. However, as Bancontact is a third party provider, there are a few things to consider.

## <a name="bancontact-requirement"></a> Requirements

The handling of Bancontact payments with Saferpay requires:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* A valid Bancontact contract.

<div class="warning">
  <p><strong>Attention:</strong> For Bancontact activation on the Saferpay terminal, please contact your sales contact.</p>
</div>

## <a name="bancontact-directmode"></a> Bancontact Direct Mode

The Bancontact Direct Mode allows the merchant to directly integrate Bancontact into their site, or even mobile app.
This chapter handles the technical details and flow of this type of integration.

### Flow Diagram

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/BancontactDirectModeFlow.png "Bancontact Direct Mode Flow Chart")

### Flow description

<ul style="list-style: none;">
  <li><strong>1:</strong> First, the merchants application initiates the payment via the <a  href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AlternativePayment">Transaction AlternativePayment Request</a>. Note, that this should always a centralized server, even if the payer/shopper interacts with the merchant system via an app!</li>
  <li><strong>2:</strong> Saferpay forwards the merchant request to the Bancontact-system, where the <strong>IntentUrl</strong> and <strong>QR-Code data</strong> is generated.</li>
  <li><strong>3:</strong> The generated data is vorwarded towards the merchant application through the <a  href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AlternativePayment">Transaction AlternativePayment Response</a>.</li>
  <li><strong>4:</strong> The merchant then has multiple options, how to proceed, also depending on the application:
    <ul style="list-style: none;">
      <li><strong>a)</strong> The  merchant displays the QR-Code data, so his customer may scan it via the bancontact app!</li>
      <li><strong>b)</strong>  The <strong>IntentUrl</strong> is used to perform a direct switch towards the Bancontact payment-app!</li>
    </ul>
  </li>
  <li><strong>5:</strong> The payer then performs the payment itself. Bancontact authorizes his card and pushes the necessary data towards Saferpay.</li>
  <li><strong>6:</strong> Oncethe payment is finished, two things happen in parallel:
    <ul style="list-style: none;">
      <li><strong>A.1:</strong> The Payment-data is forwarded to the Saferpay system, which saves the data. Once a definitive transaction status has been determined, Saferpay will then call the <strong>StateNotificationUrl</strong>, which has been defined with the <a  href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AlternativePayment">Transaction AlternativePayment Request</a>, to notify the merchant application, that the data for this transaction is ready to be pulled.</li>
      <li><strong>A.2:</strong> The merchant application performs ther <a  href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_QueryAlternativePayment">Transaction QueryAlternativePayment Request</a>, to ask for the outcome of the transaction.</li>
      <li><strong>A.3:</strong> The merchant application validates the payment.</li>
      <li><strong>B:</strong> While the merchant-application is notified of the transaction, in the background, the Bancontact-app will redirect the payer towards the respective App-RedirectUrl, defined within <a  href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_AlternativePayment">Transaction AlternativePayment Request</a>, depending on the outcome.</li>
    </ul>
  </li>
</ul>

## <a name="bancontact-refund"></a> Bancontact Refunds

Refunds for Bancontact are limited to <a href="refund.html#refund-reference"><strong>Referenced Refunds only!</strong></a> Bancontact Secure Card Data aliases may only be used for card on file transactions!
