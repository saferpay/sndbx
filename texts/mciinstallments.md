# Mastercard Issuer Installments

Mastercard offers the possibility to carry out Installment plans, through the card holders issuer, giving the card holder the option to pay in rates, while the merchant gets the requested amount up front.
This chapter covers the implementation and handling of Issuer Installments.

## <a name="mcii-requirement"></a> Requirements

The acceptance of Issuer Installments requires the following

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* A valid Mastercard acceptance contract via SIX Acquiring


<div class="warning">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Attention:</strong> As the name suggests, Mastercard Issuer Installments are only available for Mastercard branded cards!</p>
</div>

## <a name="mcii-acqplan"></a> Acquiring an installment plan

First and foremost, it is important to know, that the availability of an installment plan, is up to the issuing bank and not the merchant, or the card holder.
Though, generally, all Mastercard transactions are potentially open for Issuer Installments, the issuer decides, whether, or not to potentially accept installments for a given transaction in the first place.

The result of such an application is only returned on authorization, meaning, that the card holder has to go through a standard transaction first, either by using <a href="Integration_PP.html">the Saferpay Payment Page</a> or <a href="Integration_trx.html">Transaction Interface</a>.

If the Issuer decides to accept Installments, he will propose one, or more of two types of installment plans to the merchant. The necessary Information will be returned by Saferpay through the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a> or <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize">Transaction Authorize</a> responses respectively, inside the <strong>MciInstallments</strong> container.

Inside this container you will find one of two types of installment plans:

1. <strong>A Fixed plan:</strong> The issuer may propose one or more fixed installment plan, where each detail of said plan is set in stone by the merchant. Saferpay will in this case return an array of JSON-Objects, containing the information about the proposed plans, within the <strong>MciInstallments.InstallmentPlans</strong> array.
2. <strong>A custom plan:</strong> The Issuer also may propose the general guidelines for an installment plan, with the merchant and the card holder being able to decide which route to take, within the set of boundaries! In this case, the <strong>MciInstallments.CustomPlan</strong> conatiner is returned, containing the previously mentioned guidelines.

<div class="info">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> Either one, or the other option will be available, but not both! It is up to the issuer, what to propose!
  </p>
</div>

Once the given information is returned, the merchant has to make sure, to display said information to the card holder!
The Card holder must be able to chose, whether to accept one of the proposed plans, or not!
The display itself can be freely designed by the merchant, Saferpay just returns the necessary information.

## <a name="mcii-plan"></a> Chosing an installment plan

Should the card hiolder choose an installment plan, the merchant has to relay this information back to Saferpay, from where the information is routed back to the issuer, so the installment plan may take effect.

This has to be done, through the <a href"index.html#capture">finalization/capture of the transaction</a>, by submitting the information of the chosen plan, through <strong>the MciInstallments.ChosenPlan container</strong>. With the capture of the transaction, the plan has been chosen and the process is handled automatically by the card holders issuing bank.

<div class="info">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> The merchant will get the full amount of the transaction, with the issuer standing in for the card holder! The card holder will then pay back the transaction amount to his bank, through the chosen installment plan!
  </p>
</div>
