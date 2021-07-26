<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>SITE MOVED:</strong> This documentation is outdated, as of July 26th 2021. The new and improved documentation can be found under <a href="https://docs.saferpay.com/home/integration-guide/introduction">https://docs.saferpay.com/</a>.</p>
</div>

# SOFORT by Klarna

SOFORT is a third party means of payment by Klarna Group. To process SOFORT via the Saferpay JSON API a few things must be considered.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> Sofort by Klarna/Sofortüberweisung is <strong>NOT</strong> the same as Klarna Payments! Please refer to <a href="KlarnaPayments.html">this chapter</a>, if you want to use Klarna Payments!
  </p>
</div>

## <a name="sf-requirement"></a> Requirements

The handling of SOFORT payments with Saferpay requires:

*	A corresponding licence and thus the existence of a valid identification with a username and password for the Saferpay system.
*	Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
*	A valid acceptance agreement for SOFORT must be present.
* Sofort can only be used via the [Payment Page](Integration_PP.html). Please follow the general guide there!
* **NotifyUrl:** The NotifyUrl is **mandatory**, in order to avoid missing payment successes. See the <a href="Integration_PP.html">Payment Page process</a> for further information!

 For SOFORT activation Saferpay needs:
 
*	Your SOFORT Customer ID.
*	The SOFORT Project ID.
*	The SOFORT Project password (NOT the account password!).
*	The Currency your customers will purchase with SOFORT.
*	Your Saferpay Customer ID.
*	The ID of the Saferpay eCommerce Terminal SOFORT is to be added.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Attention:</strong> For Sofort activation on the Saferpay terminal, please <a href="contact.html"><strong>inform our activation service</strong></a> about your Sofort credentials (see list above) and the desired currencies.</p>
</div>

## <a name="sf-newproject"></a> Create a new project for SOFORT

1. Log-in to your SOFORT member area. Choose „New project“ and click „Create project“. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/sofort_create_project.png "Create project")

2. Set the radio button for „Classic project“ and click again „Create project“. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/sofort_classic_project.png "Classic project")

3. In the next step specify general settings for the project. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/sofort_general.png "General settings")<br />
<i class="glyphicon glyphicon-hand-right"></i> <b><u>Don't forget to deactivate the Test mode before going live!</u></b>

4. Then enter <b><u>your address</u></b>. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/sofort_address.png "Address")

5. Specify the currency for your customer’s payments. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/sofort_currency.png "Currency")

6. Enter your IBAN for receiving your customer’s payments. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/sofort_iban.png "Bank account")

7. For processsing SOFORT payments via Saferpay enter the redirect links. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/sofort_interface.png "Interface")<br /><i class="glyphicon glyphicon-hand-right"></i> Success link:  
*https://-USER_VARIABLE_0-paymentStatus=ok-USER_VARIABLE_2--USER_VARIABLE_3--USER_VARIABLE_4--USER_VARIABLE_5--SENDER_IBAN-*<br /><i class="glyphicon glyphicon-hand-right"></i> Abort link:  
*https://-USER_VARIABLE_0-paymentStatus=cancel*

8.  Scroll downn and click on "Save" to save your general project settings. Click on the tab „Extended settings“ to configure additional project settings. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/sofort_extended.png "Extended settings")

9. Go to „Shop interface settings“ in the "Extended settings" tab and enter the timeout value and link. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/sofort_timeout.png "Timeout")<br /><i class="glyphicon glyphicon-hand-right"></i> Timeout in seconds:  
*900*<br /><i class="glyphicon glyphicon-hand-right"></i> Timeout link:<br />*https://-USER_VARIABLE_0-paymentStatus=timeout*

10. Again click the tab „Extended Settings“ and choose „Notifications“. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/sofort_notification.png "Notifications")

11. Click „Add new notification“ and add your email address to receive notification messages. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/sofort_email.png "Email notification")

12. Save and complete with adding the notification URL. As method choose „POST“. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/sofort_noturl.png "Notification URL")<br /><i class="glyphicon glyphicon-hand-right"></i> HTTPS URL:<br />*https://-USER_VARIABLE_1-*

13. Finally create a project password. Click the tab „Extended settings“ again and there „Passwords and hash algorithm“. Select SHA-1. <br>
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/sofort_password.png "Project password") 
<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important: </strong>Please make sure to check the <strong>Don't use special characters</strong>-box! Otherwise it can cause major issues! 
  </p>
</div>

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Caution: DO NOT</strong> create a notification-password, otherwise Sofort via Saferpay will not work! 
  </p>
</div>

The settings for processing SOFORT via Saferpay are completed!

---

## <a name="sf-iframe"></a> Sofort iFrame integration

<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Warning:</strong> Sofort does not support the iFrame Integration!</p>
</div>

Sofort/Klarna actively blocks the iFrame-Integration.
In order to circumvent this issue, the Saferpay Payment Page will break out of the iFrame and display the Sofort website full-size, in order to make a payment possible.
However, please keep in mind, that the ReturnUrls will also be displayed full-size!


## <a name="sf-refund"></a> SEPA manual Refunds for Sofort

Saferpay does offer the possibility to accept refunds for certain SEPA-based payment methods. However those need special attention.
Reason being, that SEPA does not directly offer refunds, which is just in the nature of the payment-system itself. 
Due to this, Saferpay offers a workaround, to make manual SEPA-refunds easier for the merchant.

### Step 1: Activation

Before you -the merchant- can start accepting refunds, they need to be activated inside the Saferpay Backoffice:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/BO_Manual_Refund.png "Manual refund activation")

### Step 2: Executing refunds

Once the activation has been done, you can execute refunds, like any other payment method. Either <a href="refund.html">via API</a>, or inside the Saferpay Backoffice.

### Step 3: Uploading the refunds into your online-banking

This is, where SEPA-refunds deviate from other payment methods, like credit cards.
As mentioned before, SEPA does not offer direct refunds via the processing itself. This is why Saferpay first collects all executed refunds inside the backoffice:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/BO_Manual_Refund_Export.png "Manual refund activation")

These refunds need then to be exported into a special XML-File, which can be done right there inside the Backoffice.
The created XML-file can then be uploaded into your online banking-portal, which executes these refunds in a batch, eliminating the need, of doing them all manually.
You can <a href="https://github.com/saferpay/sndbx/blob/master/assets/other/ManualBankRefund-2019-09-13-10-50-28-Example_File.xml" download>download an example-file here</a>.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Important:</strong> It may be necessary to contact your bank, for this import-feature to be activated! Some also may not offer it at all!
  </p>
</div>
<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Caution:</strong> SEPA-refund-files from the test-environment can't be uploaded into online-banking portals, since they only contain test-data, thus non-valid IBANs!
  </p>
</div>


