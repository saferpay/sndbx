# <a name="pf"></a> Swiss Postcard

Via the Saferpay JSON API, payments can be handled by Swiss Postcard and the card details are stored in the Saferpay Secure Card data store. This chapter describes what needs to be observed in this regard.

## <a name="pf-requirement"></a> Requirements

Acceptance of Swiss Postcard requires:

* A corresponding licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* A valid contract with PostFinance.

## <a name="pf-alias"></a> Storage in the Secure Card Data Store

Saferpay provides the possibility of storing PostFinance’s Postcard in the Saferpay Secure Card store. For this, the following requirements must be met:

*	Activation of Saferpay Secure Card Data in the merchant account
* The activation of the PostFinance Alias System for PostFinance and Saferpay.

>
>    <i class="glyphicon glyphicon-hand-right"></i> **NOTE**: The registration of a Swiss Postcard is only possible with the [Alias Insert](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert) method.
>

### <a name="pf-regdial"></a> Registration Dialogue

Unlike with credit cards, PostFinance requires the card holder to agree to registration on its site.

1. Confirmation dialogue on PostFinance:  
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/post_reg_for_payment.png "Confirmation")  
2. After clicking on **Next**, card holders are asked to enter their card ID:  
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/post_enter_id.png "Enter ID")  
3. Card holders must then confirm registration by entering a TAN. This is created using a card reader:  
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/post_input_reader.png "Enter Code")  
4. After registration, the result is displayed to the customer, who is then returned to the shop:  
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/post_reg_completed.png "Registration complete")  
The result of the registration can then be called up using the [Alias AssertInsert](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_AssertInsert) feature.
