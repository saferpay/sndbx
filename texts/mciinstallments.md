# Mastercard Issuer Installment Integration Guide

##<a name="mcii-intro"></a>Introduction
Mastercard offers together with participating issuers an installment solution where the merchant will immediately receive the full amount of the payment, and the card holder pays back the transaction amount to his issuing bank in installments according to the chosen installment plan.
Installment options will only be available if the merchant has implemented the functionality as described below and the issuing bank supports Mastercard Installments, and decides to offer them for the transaction at hand. 
The functionality is available upon request for merchants active in the mandated countries Romania, Hungary, UK, Slovenia, Czech Republic or Poland.

##<a name="mcii-req"></a>Prerequisites
For a merchant to enable Mastercard Issuer Installments, the following prerequisites are required:
+ Saferpay E-Commerce licence. 
+ Saferpay E-Commerce terminal. 
+ Acquiring contract with SIX Payment Services. 
+ Mastercard Issuer Installments are activated on the terminal.
Please contact your local Sales contact to activate a terminal for Mastercard Issuer Installments. 

##<a name="mcii-opt"></a>Receiving installment options
It is important to know that the availability of installment options is up to the issuing bank and not the merchant or the card holder. All Mastercard transactions potentially offer Issuer Installments. However, it's the issuer who decides whether or not to offer installment options for a given transaction.
Installment options are only returned as a result of the the authorization. This means that the card holder has to go through a standard transaction flow first, either by using  or . the Saferpay Payment Page Transaction Interface
If the Issuer decides to offer installment options, he can do so in two different ways. The necessary information will be returned by Saferpay through the Pa or  responses respectively, inside the MastercardIssuerInstallments container.yment Page Assert Transaction Authorize
Inside this container you will find one of two types of installment plans:

1. A Fixed plan: The issuer may propose one or more fixed installment plans. Saferpay will in this case return an array of JSON-Objects, containing the information about the proposed plans within the  array: MastercardIssuerInstallments.InstallmentPlans

```json
{
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
}
```

2. A custom plan: The card holder can choose the number of installments within the boundaries given by the issuer. In this case, the MastercardIssuerInstallments.CustomPlan container is returned:
```json
{  
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
    "ReceiptFreeText": "Some dummy receipt free text"  
  } 
}
```
<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>VERY IMPORTANT:</strong> Either the first or the second option will be available, but not both.
Once the installment options are returned, the merchant has to present the options to the card holder in a way compliant with the relevant Mastercard guidelines.    
The card holder must be able to choose whether to accept one of the proposed plans, or not.</p>
</div>

##<a name="mcii-plan"></a>Choosing an installment plan
If the card holder chooses an installment plan, the data must be sent back to Saferpay through the  by submitting the finalization/capture of the transaction information of the chosen plan through  container. With the capture of the transaction, the plan has been the MastercardIssuerInstallments.ChosenPlan chosen and the process is handled automatically by the card holder's issuing bank.
Example:
```json
{  
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
}
```
##<a name="mcii-test"></a>Test cards

+ **9030100000001019**: One fixed installment plan
+ **9030100000002017**: Many fixed installment plans
+ **9030100000003015**: Custom Plan
