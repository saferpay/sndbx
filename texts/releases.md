# Saferpay Release Notes

In this chapter you will find information about current and past Saferpay releases.

# <a name="R80"></a> Release 80
### Released: 21.05.2019

## 1. 3-D Secure 2.0
Saferpay now supports 3-D Secure 2.0. After a pilot phase, the new authentication process is available for all Saferpay customers of SIX Payment Services.

<a href="https://www.six-payment-services.com/en/shared/campaigns/3-d-secure-2-0-saferpay.html#was-tun">What do you need to do as a Saferpay customer?</a>

3-D Secure 2.0 is available for all versions with the JSON API interface we particularly recommend V1.11. For more information, please refer to the <a href="index.html">integration guide</a>.

While you do not have to make any adjustments to take full advantage of 3-D Secure 2.0, the following changes will take effect:

### 1.1	No return of the authentication verification value

With the introduction of 3-D Secure 2.0, Saferpay had to meet the requirement of not storing authentication verification values after authentication. This has been implemented as follows:

* up to JSON API Version 1.10: The attribute "VerificationValue" is available, but it contains a dummy value.
* from JSON API Version 1.11: The attribute "VerificationValue" is omitted from the PaymentPage Assert.

### 1.2	Display of authentication data in the Saferpay Backoffice (mySaferpay)

The display of 3-D Secure authentication information in the Saferpay Backoffice (mySaferpay) has been limited to key data, which is now presented in a clearer and more user-friendly way.

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Releases/R80/3DSv2_BO.png "3DSv2 inside the Saferpay Backoffice")

### 1.3	Authorisation with or without liability shift 

Optionally, you can control whether authorisation should take place with or without liability shift by setting the "Condition" parameter for the payment page or the transaction interface integration.

For more details, please refer to the <a href="https://saferpay.github.io/jsonapi/">JSON API documentation</a>.

### 1.4	Important information about the 3-D Secure 2.0 process

With 3-D Secure 2.0, your customers benefit from a positive shopping experience and you also benefit from fewer interruptions during the checkout process. Low-risk transactions are identified as so-called “Frictionless Flow” transactions and a genuine customer authentication is, therefore, not required. As a result, the checkout process is seamless from the cardholder's perspective. Whether or not “Frictionless Flow” is offered for a transaction will depend on the amount and quality of the information you provide. 

Important information to increase the "Frictionless Flow" rate are the customer's name, e-mail address and billing address.

## 2	New means of payment Alipay
<a target="_blank" rel="noopener noreferrer" href="https://raw.githubusercontent.com/saferpay/sndbx/master/images/Releases/R80/Alipay_Logo.png"><img src="https://raw.githubusercontent.com/saferpay/sndbx/master/images/Releases/R80/Alipay_Logo.png" alt="alt text" title="Alipay Logo" style="max-width:40%;"></a>

Saferpay offers Alipay as new means of payment. With more than 520 million users, 100 million transactions per day and a market share of over 50 percent in the Chinese online market, Alipay is the world's largest payment platform. The availability of Alipay as a means of payment will enhance the appeal of online shops to Chinese customers.
Alipay is now available with the Payment Page integration.
If you are interested in introducing Alipay as a means of payment on your online platforms, please contact your Saferpay Sales Manager at: <a href="mailto:e-commerce@six-payment-services.com">e-commerce@six-payment-services.com</a>

## 3	Transaction details always at your fingertips

### 3.1	Assert requests can be made within 24 hours

To query the result of a payment or registration process, an Assert request can now be sent within 24 hours. This change affects the following methods: *PaymentPage/Assert* and *Alias/AssertInsert*.

Note: All other transaction-related actions must still be performed within one hour (the attribute "Expiration" relates to this expiration date).

### 3.2	New JSON API method for accessing transaction data

Saferpay offers a new method for accessing transaction data. With Transaction/Inquire, you can retrieve transaction data at any time. 
As usual, you can find all the details in our <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Inquire">JSON API documentation.</a>

### Fair use
The *Transaction/Inquire* method is not intended for large batches or monitoring of status changes (polling). In order to be able to answer all our customer requests quickly, we ask you to use this new functionality fairly. If we notice excessive use of the feature, we will contact you. In exceptional cases, we reserve the right to restrict your access to it.

### Data freshness/topicality
The result of a *Transaction/Inquire* request does not display the current status in real time because the requested data are updated with a few minutes delay.

## 4	Further JSON API function enhancements aimed at streamlining your business processes

### 4.1	Return of card type information when storing aliases

If you store the card data as an alias for subsequent transactions, Saferpay will now return the card type, e.g. "consumer" or "corporate". This allows you to see whether the used card is a corporate card.

## 5	Preparation for the switch-off of obsolete Saferpay interfaces

In recent months we have informed you that the outdated Saferpay interfaces (HTTPS Interface (HI) or Saferpay Clients) will be switched off at the end of 2020.

Are you not sure whether you are using the outdated Saferpay interfaces? A new page has been added to Saferpay Backoffice (mySaferpay), which offers more information on the topic. Under "Online Support" / "Interface Usage" you can see which interfaces you use and when you last accessed your systems.

More information on the replacement of the old interfaces and migration to JSON API is available at the <a href="https://www.six-payment-services.com/en/shared/campaigns/3-d-secure-2-0-saferpay-faq.html">Saferpay FAQ page</a>.


# <a name="R79-1"></a> Release 79.1
### Released: 19.03.2019
<div class="info">
  <p><strong>Note:</strong> Release 79 itself was released for internal use.</p>
</div>

## Diners as a means of payment at SIX Payment Services in Austria 
SIX Payment Services can now process Diners as a means of payment in Austria. 

## Support for TWINT payments in shopping apps 
Saferpay provides merchants with support in integrating TWINT into their own apps. It is now easy for shoppers to switch directly from the shopping app to the TWINT app to pay and then switch back again once the payment has been made. 

## Transaction identification reference in reconciliation files   
Customers with acquiring contracts from SIX Payment Services can now easily identify transactions in the reconciliation files (for example as PDF or MRX files) by entering their own reference number (Parameter Transaction.OrderId in JSON API). 
 
As it  is sometimes  impossible or too expensive to adapt the software used by merchants, Saferpay now transmits the transaction identification value (Parameter Transaction.OrderId in JSON API) to the acquiring system if no other reference number has been provided. 

## Additional filters and search options in Secure PayGate Journal 
The filtering of offers in the journal of the Pay-by-Link interface, Secure PayGate, has been further optimised. 
 
If multiple Secure PayGate terminals are been used, the list can now be limited to a particular terminal in order to view the content and status of an offer more quickly. The terminal used and the terminal description are therefore now also included in the list. 
 
The inclusion of the search fields “created by” and “changed by” makes it easier to search for a particular offer.  You can find all the details about the search fields in the Tooltip by moving the mouse over the information symbol. 

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Releases/R79/SPGOffers.PNG "Secure PayGate Filters")

## E-mail reminder before account lockout when users are inactive 
For security reasons, user accounts for accessing the Saferpay Backoffice are locked if the account is not used for 180 days. After this period, you need to contact the support team to have the user account unlocked having reviewed the individual case. 
 
In some circumstances, for example when sales activities occur on a seasonal basis, this lockout creates unnecessary hassle, both for the merchant and SIX Payment Services. In order to prevent lockouts, SIX Payment Services will inform affected users by e-mail 10 days before their account is locked and remind them to log in. 
 
Please note that passwords for user accounts must be changed after 90 days. 

## JSON API test with an individual test account 
For some time now, SIX Payment Services has been offering the option of creating an [individual test account](https://test.saferpay.com/BO/SignUp) to test the broad variety of functions provided by Saferpay in the Saferpay test environment. Therefore, the access data for the JSON API that is linked to the general test account will be deleted on 30 April 2019. Following this, it will only be possible to test the JSON API using an individual test account. 
 
At this point, you will only be able to use the general test account for tests with the outdated interfaces, https Interface and Client Application Interface, and this account will be deleted  entirely at the end of 2020. In this regard please see the [FAQ page regarding the migration to the Saferpay JSON API.](https://www.six-payment-services.com/en/shared/campaigns/3-d-secure-2-0-saferpay-faq.html)


# <a name="R78"></a> Release 78
### Released: 13.11.2018

## Old Saferpay interfaces will be discontinued at the end of 2020 
The Saferpay JSON API was successfully introduced in July 2015 and has continually expanded since then. Most Saferpay customers now use this new interface.  The previous interfaces - Saferpay Client and the https Interface (HI) - have not been further developed since then. However, we continued to provide support for these interfaces.  

In early 2019, the new 3-D Secure Version 2.0 will be introduced; it will only be implemented on the JSON API. As before, the Client/HI interfaces only support 3-D Secure 1.0. According to the current scheme information available, 3-D Secure 1.0 is due to be supported until the end of 2020.  
 
With the discontinuation of 3-D Secure Version 1.0, the Client/HI interfaces will no longer be compatible and are due to be discontinued at this time (expected to take place at the end of 2020). 
 
If you have not yet switched to Saferpay JSON API, we recommend that you do so sooner rather than later to begin reaping the benefits of the system.   If you have any questions, our staff in the Saferpay Integration Team will be happy to assist you. 

## Marketplaces  
40% of all online purchases are made on online marketplaces. Customers make at least three to five purchases per month on average1. Successful providers are those, who offer the greatest added value, build the most trust and enable a seamless shopping experience. The payment process is a crucial success factor in this context. 
 
SIX Payment Services is familiar with the diverse requirements, supports a broad variety of marketplace solutions and will find an optimal solution for your online marketplace. Operators of a marketplace solution do not have to apply for their own payment transaction licence. The funds are controlled by SIX Payment Services as a licensed and regulated payment service provider. 
 
SIX also manages payments to the authorised dealers of the online marketplace as well as the commissions to marketplace operators. This makes it easy to ensure compliance with payment transaction regulations, money laundering guidelines and know-your-customer (KYC).

### Your benefits at a glance:
* Legally compliant payment processing: As a company that is regulated Europe-wide, SIX meets all the necessary requirements for your solution.
* Flexible models: Mixed shopping baskets with different delivery data, individual contractual relationships and variable commission models.
* Easy integration into your platform or app: Automate payments and manage commissions via a unified API.
* User-friendly solutions for you and your customers: One-click checkout, consolidated reporting und recurring payments.

### Prerequisites 
* Saferpay JSON API with a business licence.
* SIX Payment Services as acquirer for the relevant cards.
* Support for debit and credit cards: Visa, Mastercard, Maestro and V PAY. 
### Technical details: 
* https://saferpay.github.io/sndbx/marketplace.html  

## Multiple part entries (Multipart Captures) 
Authorisations can now be captured in multiple parts in the Saferpay Backoffice or using the JSON API for payments with Visa, Mastercard, Maestro or V PAY. This requires an acceptance agreement with SIX Payment Services.

## Optimisation of the payment page 
### Scanning of credit card data
The cardholder can now have their credit card data automatically scanned on the Saferpay payment page saving them the hassle of having to type the data into the smartphone. This functionality is displayed automatically and supported only by iOS devices.  
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Releases/R78/ScanCard.PNG "Credit Card Scan")
         
### Formatting of the credit card number during input:
The credit card number is now displayed grouped in the input field when typed. Furthermore, the input of letters and special characters is ignored and very long entries are prevented. 

## Improvements in the password renewal process
### Password validity checker 
One month before the user password expires, the relevant information is now displayed in the Backoffice and is highlighted again in colour 2 weeks before expiry as a warning. 
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Releases/R78/BOPasswords.PNG "Password Change")

### Reset password
The link to the password reset is now more prominently displayed on the Backoffice login page.
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Releases/R78/login.PNG "Password Reset")

### Request new access data 
If a user has forgotten their password and does not remember their email address, a link from the password reset page now leads to a form which can be used to request new access data. 
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Releases/R78/passwordForgotten.PNG "Password Forgotten")


## Journal export 
As part of the implementation of the Multipart Capture feature, the journal export was further optimised. 
Changes in detail: 
* "Capture date" has been renamed "Last capture date" 
* "Currency" has been renamed "Merchant currency" 
* "Amount" has been renamed "Authorized merchant amount" 
* The "Captured merchant amount" contains the total of all entries related to this transaction. This eliminates the need for separate lines for multiple entries. 
* "Account ID" has been broken down into "Customer ID" and "Terminal ID” 
* "Processor ID" has been removed 
* "IP origin" has been removed from "IP address" as a separate field 
* "Entry period", "Partial capture ID" and "Partial capture authorisation ID" have been removed 
* "DCC" has been renamed "Currency conversion" 
* "DCC currency" has been renamed "Card currency" 
* "DCC amount" has been renamed "Card amount" 
* "Was captured", "Has partial captures", "Was refunded" and "Was cancelled" have been added 

The respective translations were also adapted to the display languages of Saferpay. 

## Backoffice in Spanish 
The Saferpay Backoffice is now also available in Spanish.

## Notifications 
To ensure that your contact information is always up to date and keep abreast of the latest marketing or technical topics, you can define and maintain the recipient list yourself in the Saferpay Backoffice under Settings/Notifications.
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Releases/R78/Notification.PNG "Notification")

If data is still missing , the user will be informed on the Saferpay Backoffice homepage that the information is incomplete.
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Releases/R78/AddressIncomplete.PNG "Data Notification")





