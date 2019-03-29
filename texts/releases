# Saferpay Release Notes

In this chapter you will find information about current and past Saferpay releases.

# <a name="R79"></a> Release 79

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





