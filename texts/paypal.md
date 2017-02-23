# PayPal

Via the Saferpay JSON API, PayPal payments can be handled without too much expenditure of effort. This chapter describes what needs to be observed in this regard.

## <a name="ppal-requirement"></a> Requirements

The handling of PayPal payments with Saferpay requires:

* The corresponding Saferpay eCommerce licence and thus the existence of a valid identification with a username and password for the Saferpay system.
* Availability of at least one active Saferpay terminal via which payment can be carried out and availability of the associated Saferpay TerminalId.
* A valid PayPal merchant account.
>
>    <i class="glyphicon glyphicon-hand-right"></i> **Attention**: for PayPal activation on the Saferpay terminal, please inform **service.saferpay@six-payment-services.com** of your PayPal merchant account ID and the desired currency.
>

## <a name="api-access"></a> Grant API Approval for Saferpay

So that PayPal payments can be handled via Saferpay, a few initial settings must be changed in the PayPal merchant account.

1. Log in to your PayPal business account at [www.paypal.com](http://www.paypal.com/).

2.	Click on the profile icon (![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_icon.png "Profile")) on the top right side of the page. From the **Business Profile** menu, select Account Settings.
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_business_profile.png "Select Account settings")

3.	From the left menu, click **My selling tools**.
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/paypal_my_selling_tools.png "My selling tools")

2. Es erscheint der Dialog **Einrichten von API-Genehmigungen und –Berechtigungen**. Klicken Sie auf **API-Genehmigung** erteilen:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/PayPal-API-2.png "API Zugriff 2")

3. Der Dialog **Neue Genehmigungen für Drittanbieter hinzufügen** erscheint:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/PayPal-API-3.png "API Zugriff 3")
>
>    <i class="glyphicon glyphicon-hand-right"></i> Tragen Sie **be-sfp_api1.six-group.com** in das Feld **Benutzername für Genehmigungen für Drittanbieter** ein. Klick Sie dann auf **Nachschlagen**.
>

4. Eine Auswahlliste *Verfügbare Genehmigungen* wird angezeigt:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/PayPal-API-4-1.png "API Zugriff 4")
>
>    <i class="glyphicon glyphicon-hand-right"></i> Aktivieren Sie folgende Checkboxen und klicken Sie im Anschluss auf **Hinzufügen**:
>    * Verwenden der Express-Kaufabwicklung für Ihre Zahlungsvorgänge.
>    * Veranlassen einer Rückzahlung für eine bestimmte Transaktion.
>    * Autorisieren und Einziehen Ihrer PayPal-Transaktionen.
>    * Abrufen von Informationen zu einzelnen Transaktionen.
>    * Einholen der Autorisierung und Initiieren von PayPal-Zahlungen per Händlerabbuchung.
>    * Akzeptieren oder Ablehnen offener Transaktionen.
>    * Veranlassen einer Rückzahlung für eine beliebige zuvor getätigte Transaktion.

## <a name="merchant-protection"></a> Verkäuferschutz

Der PayPal Verkäuferschutz soll Sie vor einem Zahlungsausfall schützen, wenn Ihr Kunde mit PayPal
bei Ihnen die Waren oder Dienstleistungen bezahlt. Hin und wieder kommt es vor, dass eine
erwartete Zahlung nicht eintrifft, weil der Kontostand des Käufers nicht ausreicht oder die Lieferung
bemängelt wird. Ihre Käufer können sämtliche Zahlungen widerrufen – beispielsweise wenn ein Kreditkartenbetrug vorliegt.

Der Verkäuferschutz tritt in folgenden Fällen ein:
* Ihr Käufer widerruft eine Lastschrift oder Kreditkartenzahlung
* Das Konto des Käufers ist nicht ausreichend gedeckt
* Ihr Käufer hat sich zu Unrecht beschwert und Käuferschutz beantragt
* Kreditkartenbetrug

Wird eine Kreditkartenzahlung oder Lastschrift widerrufen (Rückbuchung), geht die Summe
automatisch zurück an die Bank oder an das Karteninstitut. PayPal bucht in diesem Fall den
gutgeschriebenen Betrag wieder von Ihrem PayPal-Konto ab. Tritt anschließend der Verkäuferschutz in Kraft, erstattet PayPal Ihnen den Betrag nach Abschluss des Falles.

Damit Sie vom PayPal Verkäuferschutz profitieren können, müssen die folgenden Bedingungen
erfüllt sein:
* Die Ware wird versichert und mit Beleg versandt
* Der Artikel wird möglichst innerhalb von sieben Tagen versandt
* Die Ware wird an die in den Transaktionsdetails und im PayPal-Konto hinterlegte Adresse des Käufers versandt

Damit der PayPal Verkäuferschutz wirksam ist, wenn Ihre Kunden mit PayPal über Saferpay bezahlen, müssen die Adressdaten zwingend an Saferpay übergeben werden.

Die [Saferpay Payment Page](https://saferpay.github.io/jsonapi/#ChapterPaymentPage) unterstützt zum einen die Übergabe der Adressparameter im Container Payer mit der Lieferadresse, oder Sie benutzen das [Saferpay Payment Page](https://saferpay.github.io/jsonapi/#ChapterPaymentPage) eigene Adressformular.

--->>>
>
>    <i class="glyphicon glyphicon-hand-right"></i> Aufruf mit Adressübergabe:
>
```json
{
  "RequestHeader": {
    "SpecVersion": "1.3", 
    "CustomerId": "123123", 
    "RequestId": "33e8af17-35c1-4165-a343-c1c86a320f3b", 
    "RetryIndicator": 0, 
    "ClientInfo": {
        "ShopInfo": "My Shop", 
        "ApplicationInfo": "ApplicationInfo", 
        "OsInfo": "Windows Server 2013"
    }
  }, 
  "TerminalId": "12345678", 
  "Payment": {
    "Amount": {
      "Value": "100", 
      "CurrencyCode": "EUR"
    }, 
    "OrderId": "OrderId", 
    "Description": "Description", 
    "PayerNote": "Payernote", 
  }, 
  "PaymentMethods": ["PAYPAL"], 
  "Payer": {
    "IpAddress": "111.111.111.111",
    "DeliveryAddress": {
      "FirstName": "Hans",
      "LastName": "Muster",
      "DateOfBirth": "1969-07-21",
      "Street": "Strasse 1",
      "Zip": "12345",
      "City": "Musterstadt",
      "CountryCode": "DE",
      "Phone": "+49 40 1234 5678",
      "Email": "Muster@muster.com",
      "Gender": "MALE",
    }
  }, 
  "ReturnUrls": {
    "Success": "https://merchanthost/success", 
    "Fail": "https://merchanthost/fail", 
    "Abort": "https://merchanthost/abort"
  }, 
  "Notification": {
    "MerchantEmail": "merchant@saferpay.com", 
    "NotifyUrl": "https://merchanthost/notify"
  }
}
```
>
>    <i class="glyphicon glyphicon-hand-right"></i> Aufruf für Nutzung des Formulars:
>
```json
{
  "RequestHeader": {
    "SpecVersion": "1.3", 
    "CustomerId": "123123", 
    "RequestId": "33e8af17-35c1-4165-a343-c1c86a320f3b", 
    "RetryIndicator": 0, 
    "ClientInfo": {
      "ShopInfo": "My Shop", 
      "ApplicationInfo": "ApplicationInfo", 
      "OsInfo": "Windows Server 2013"
    }
  }, 
  "TerminalId": "12345678", 
  "Payment": {
    "Amount": {
      "Value": "100", 
      "CurrencyCode": "EUR"
    }, 
    "OrderId": "OrderId", 
    "Description": "Description", 
    "PayerNote": "Payernote", 
  }, 
  "PaymentMethods": ["PAYPAL"], 
  "Payer": {
    "IpAddress": "111.111.111.111"
  },
  "DeliveryAddressForm": {
    "Display": true,
    "MandatoryFields": ["CITY","COUNTRY","EMAIL","FIRSTNAME","LASTNAME","PHONE","SALUTATION","STATE","STREET","ZIP"],
  },
  "ReturnUrls": {
    "Success": "https://merchanthost/success", 
    "Fail": "https://merchanthost/fail", 
    "Abort": "https://merchanthost/abort"
  }, 
  "Notification": {
    "MerchantEmail": "merchant@saferpay.com", 
    "NotifyUrl": "https://merchanthost/notify"
  }
}
```
<<<---

Bei [Redirect Payment](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_RedirectPayment) muss die Adresse mit Initialize und durch den entsprechenden Container übergeben werden.

--->>>
>
>    <i class="glyphicon glyphicon-hand-right"></i> Aufruf mit Adressübergabe:
>
```json
{
  "RequestHeader": {
    "SpecVersion": "1.3", 
    "CustomerId": "123123", 
    "RequestId": "33e8af17-35c1-4165-a343-c1c86a320f3b", 
    "RetryIndicator": 0, 
    "ClientInfo": {
        "ShopInfo": "My Shop", 
        "ApplicationInfo": "ApplicationInfo", 
        "OsInfo": "Windows Server 2013"
    }
  }, 
  "TerminalId": "12345678", 
  "Payment": {
    "Amount": {
      "Value": "100", 
      "CurrencyCode": "EUR"
    }, 
    "OrderId": "OrderId", 
    "Description": "Description", 
    "PayerNote": "Payernote", 
  }, 
  "ServiceProvider": "PAYPAL", 
  "Payer": {
    "IpAddress": "111.111.111.111",
    "DeliveryAddress": {
      "FirstName": "Hans",
      "LastName": "Muster",
      "DateOfBirth": "1969-07-21",
      "Street": "Strasse 1",
      "Zip": "12345",
      "City": "Musterstadt",
      "CountryCode": "DE",
      "Phone": "+49 40 1234 5678",
      "Email": "Muster@muster.com",
      "Gender": "MALE",
    }
  }, 
  "ReturnUrls": {
    "Success": "https://merchanthost/success", 
    "Fail": "https://merchanthost/fail", 
    "Abort": "https://merchanthost/abort"
  }, 
  "Notification": {
    "MerchantEmail": "merchant@saferpay.com", 
    "NotifyUrl": "https://merchanthost/notify"
  }
}
```
<<<---

Für Kanada und die USA ist die Angabe der Provinz oder des Bundesstaats mit dem Parameter **CountrySubdivisionCode** erforderlich. Die zu übergebende Abkürzung entspricht jeweils dem zweistelligen Code der Provinz oder des Bundesstaats gemäß ISO 3166-2.

Sobald diese Attribute mit übergeben werden gilt der Verkäuferschutz. PayPal prüft die
übergebenen Adressdaten mit den, vom Käufer hinterlegten Daten und lehnt die Zahlung ab, wenn
die hinterlegte Adresse nicht mit der übergebenen Adresse übereinstimmt.

## <a name="partial-capture"></a> Partial Capture

Partial Captures, auch Teilverbuchungen genannt, sind eine Sonderfunktion von PayPal.
Diese Funktion erlaubt es Transaktionen in Teilen zu finalisieren, wenn der Kontoinhaber z.B. nur zu einem Teil belastet werden soll.
Dafür müssen Zusätzliche Parameter beim [Transaction Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) im Container **Partial** übergeben werden.

