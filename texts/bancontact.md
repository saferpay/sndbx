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

<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6
    <ul>
      <li>A.1</li>
      <li>A.2</li>
      <li>A.3</li>
    </ul>
  </li>
  <li>
    <ul>
      <li>B</li>
    </ul>
  </li>
</ul>
