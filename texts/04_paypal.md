# 04 - PayPal

## <a name="ppal-start"></a> 01 Einführung

Sie können über die Saferpay JSON-API ebenfalls PayPal anbinden.
Saferpay bettet dabei die Paypal-API ein, so dass sie nur die JSON-API integrieren müssen.

Da es sich bei Paypal jedoch um einen 3rd-Party Anbieter handelt, gibt es ein paar Dinge zu beachten.
Dieses Kapitel soll Ihnen hierbei helfen.

## <a name="ppal-requirement"></a> 02 Voraussetzungen

Die Abwicklung von PayPal-Zahlungen mit Saferpay setzt Folgendes voraus:

* Eine entsprechende Saferpay eCommerce-Lizenz und somit das Vorhandensein einer gültigen Kennung mit Benutzername und Passwort für das Saferpay System.
* Mindestens ein aktives Saferpay Terminal, über das die Zahlungen durchgeführt werden können ist vorhanden und die dazugehörige Saferpay TERMINALID liegt vor.
* Ein gültiges PayPal Händlerkonto.
>
>    <i class="glyphicon glyphicon-hand-right"></i> **Achtung**: Für die PayPal-Aktivierung auf dem Saferpay Terminal teilen Sie bitte **service.saferpay@six-payment-services.com** Ihre PayPal Händlerkonto-ID und die gewünschten Währungen mit.
>

## <a name="api-access"></a> 03 API Genehmigung für Saferpay

Damit PayPal-Zahlungen über Saferpay abgewickelt werden können, müssen zunächst ein paar Einstellungen im PayPal-Händlerkonto vorgenommen werden. Loggen Sie sich hierfür mit Ihren Zugangsdaten auf www.paypal.com ein.

1. Begeben Sie sich im Händlerkonto zu **Mein Konto** und klicken Sie auf **Mein Profil**. Anschließend wählen Sie auf der linken Seite **Verkäufer/Händler**, um rechts die Die Einstellungsmöglichkeiten für **Online verkaufen** anzuzeigen. Dort wählen Sie **Aktualisieren** in der Zeile **API-Zugriff**:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/PayPal-API-1.png "API Zugriff 1")

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

## <a name="merchant-protection"></a> 04 Verkäuferschutz

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

## <a name="partial-capture"></a> 05 Partial Capture

Partial Captures, auch Teilverbuchungen genannt, sind eine Sonderfunktion von PayPal.
Diese Funktion erlaubt es Transaktionen in Teilen zu finalisieren, wenn der Kontoinhaber z.B. nur zu einem Teil belastet werden soll.
Dafür müssen Zusätzliche Parameter beim [Transaction Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) im Container **Partial** übergeben werden.

