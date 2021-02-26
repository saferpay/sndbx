# Swiss Postcard

Via the Saferpay JSON API, payments can be handled by Swiss Postcard and the card details are stored in the Saferpay Secure Card data store. This chapter describes what needs to be observed in this regard.

## <a name="pf-requirement"></a> Requirements

Acceptance of Swiss Postcard requires:

* A corresponding licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* A valid contract with PostFinance.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Attention:</strong> Postfinance transactions are only valid for 30 days and must be <a href ="index.html#capture">captured</a> in this time frame. After 30 days, the reservation will void and the authorized amount can no longer be transferred! However you have a guaranteed payout, within these 30 days!</p>
</div>

## <a name="pf-alias"></a> Storage in the Secure Card Data Store

If you intend on saving Postcard-data for later use, Saferpay provides the possibility of storing PostFinance’s Postcard inside the Saferpay Secure Card store. For this, the following requirements must be met:

*	Activation of Saferpay Secure Card Data in the Saferpay merchant account
* The feature must also be activated on Postfinance side!

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Note:</strong> The registration of a Swiss Postcard is only possible with the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert">Alias Insert</a> method. For that, you have to set the parameter "TYPE" to the value "POSTFINANCE".</p>
</div>

### <a name="pf-regdial"></a> Registration Dialogue

Unlike with credit cards, PostFinance requires the card holder to agree to registration on its site, so a redirect will be done!

1. Confirmation dialogue on PostFinance:  
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/post_reg_for_payment.png "Confirmation")  
2. After clicking on **Next**, card holders are asked to enter their card ID:  
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/post_enter_id.png "Enter ID")  
3. Card holders must then confirm registration by entering a TAN. This is created using a card reader:  
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/post_input_reader.png "Enter Code")  
4. After registration, the result is displayed to the customer, who is then returned to the shop:  
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/post_reg_completed.png "Registration complete")  
The result of the registration can then be called up using the [Alias AssertInsert](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_AssertInsert) feature.

The gathered alias can then be used for further authorizations, using [AuthorizeDirect](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_AuthorizeDirect).

<div class="info" style="min-height: 75px;">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Info:</strong> Note, that Postfinance does not know the, for credit cards known and used, Mail Phone Order-Contracts. Simply use your normal eCommerce Terminal with Postfinance/Card activated!</p>
</div>
