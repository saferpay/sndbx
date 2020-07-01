# Mastercard Issuer Installments

Mastercard offers, together with participating issuers, an installment solution (Called **MCII** during the rest of this chapter!) where, the merchant will immediately receive the full amount of the payment and the card holder pays back the transaction amount to his issuing bank in installments, according to the chosen installment plan.
Installment options will only be available, if the merchant has implemented the functionality as described below, with the issuing bank supporting Mastercard Installments and deciding to offer them for the transaction at hand. 
The functionality is available upon request for merchants active in the mandated countries Romania, Hungary, UK, Slovenia, Czech Republic or Poland.


## <a name="mcii-requirement"></a> Requirements

The acceptance of Issuer Installments requires the following

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* A valid Mastercard acceptance contract via SIX Acquiring.
* Activation of MCII for the given terminalId. Please contact your account/contract manager, about this matter.


<div class="warning">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Attention:</strong> As the name suggests, Mastercard Issuer Installments are only available for Mastercard branded cards!</p>
</div>

## <a name="mcii-acqplan"></a> Acquiring an installment plan

First and foremost, it is important to know, that the availability of an installment plan, is up to the issuing bank and not the merchant, or the card holder.
Though, generally, all Mastercard transactions are potentially open for Issuer Installments, the issuer decides, whether, or not to potentially accept installments for a given transaction in the first place.

The result of such an application is only returned on authorization, meaning, that the card holder has to go through a standard transaction first, either by using <a href="Integration_PP.html">the Saferpay Payment Page</a> or <a href="Integration_trx.html">Transaction Interface</a>.

If the Issuer decides to offer Installment options, he will propose one, or more, of two types of installment plans to the merchant. The necessary Information will be returned by Saferpay through the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert">Payment Page Assert</a> -also see <a href="Integration_PP.html">the Saferpay Payment Page Flow</a>- or <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize">Transaction Authorize</a> -also see <a href="Integration_trx.html">Transaction Interface Flow</a>- responses respectively, inside the <strong>MastercardIssuerInstallments</strong> container.

Inside this container you will find one of two types of installment plans:

1. <strong>A Fixed plan:</strong> The issuer may propose one or more fixed installment plans, where each detail of said plan is set in stone by the issuer. Saferpay will in this case return an array of JSON-Objects, containing the information about the proposed plans, within the <strong>MciInstallments.InstallmentPlans</strong> array. The card holder then may choose between those plans, if desired.

```json 
  "MastercardIssuerInstallments": {    
    "InstallmentPlans": [      
      {
        "NumberOfInstallments": 12,
        "InterestRate": "1000",
        "InstallmentFee": {
          "Value": "1000",
          "CurrencyCode": "CHF"
        },
        "AnnualPercentageRate": "500",
        "FirstInstallmentAmount": {
          "Value": "100000",
          "CurrencyCode": "CHF"
        },
        "SubsequentInstallmentAmount": {
          "Value": "180000",
          "CurrencyCode": "CHF"
        },
        "TotalAmountDue": {
          "Value": "1180000",
          "CurrencyCode": "CHF"
        }
      },
      {
        "NumberOfInstallments": 6,
        "InterestRate": "1000",
        "InstallmentFee": {
          "Value": "1000",
          "CurrencyCode": "CHF"
        },
        "AnnualPercentageRate": "500",
        "FirstInstallmentAmount": {
          "Value": "100000",
          "CurrencyCode": "CHF"
        },
        "SubsequentInstallmentAmount": {
          "Value": "360000",
          "CurrencyCode": "CHF"
        },
        "TotalAmountDue": {
          "Value": "1180000",
          "CurrencyCode": "CHF"
        }
      }    
    ],    
    "ReceiptFreeText": "Some dummy receipt free text"
  }
```


2. <strong>A custom plan:</strong> The Issuer may also propose the general guidelines for an installment plan, with the merchant and the card holder being able to decide which route to take, within the given set of boundaries! In this case, the <strong>MciInstallments.CustomPlan</strong> conatiner is returned, containing the previously mentioned guidelines.

```json 
  "MastercardIssuerInstallments": {
    "CustomPlan": {
      "MinimumNumberOfInstallments": 3,
      "MaximumNumberOfInstallments": 37,
      "InterestRate": "1100",
      "InstallmentFee": {
        "Value": "1200",
        "CurrencyCode": "CHF"
      },
      "AnnualPercentageRate": "600",
      "TotalAmountDue": {
        "Value": "1190000",
        "CurrencyCode": "CHF"
      }
    },
    "ReceiptFreeText": "Some dummy receipt free text"  }
  }
```

<div class="info">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> Either one, or the other option will be available, but not both! It is up to the issuer, what to propose, if at all!
  </p>
</div>

Once the given information is returned, the merchant has to make sure, to display said information to the card holder!
The card holder must be able to chose, whether to accept one of the proposed plans, or not!
The display itself can be freely designed by the merchant! 
Saferpay just returns the necessary information.

## <a name="mcii-plan"></a> Chosing an installment plan

Should the card holder choose an installment plan, the merchant has to relay this information back to Saferpay, from where the information is routed back to the issuer, so the installment plan may take effect.

This has to be done, through the <a href="index.html#capture">finalization/capture of the transaction</a>, by submitting the information of the chosen plan, through <strong>the MciInstallments.ChosenPlan</strong> container. With the capture of the transaction, the plan has been chosen and the process is handled automatically by the card holders issuing bank.

```json 
  "MastercardIssuerInstallments": {
    "ChosenPlan": {
      "NumberOfInstallments": 12,
      "InterestRate": "1100",
      "InstallmentFee": {
        "Value": "1200",
        "CurrencyCode": "CHF"
      },
      "AnnualPercentageRate": "600",
      "TotalAmountDue": {
        "Value": "1190000",
        "CurrencyCode": "CHF"
      }
    }
  }
```

<div class="info">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> The merchant immediately will get the full amount of the transaction, with the issuer standing in for the card holder! The card holder will then pay back the transaction amount to his bank, rate by rate, defined by the chosen installment plan!
  </p>
</div>

