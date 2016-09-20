# 05 - BillPay

## <a name="bp-start"></a> 01 Einführung

Sie können über die Saferpay JSON-API ebenfalls BillPay anbinden.
Saferpay bettet dabei die BillPay-API ein, so dass sie nur die JSON-API integrieren müssen.

Da es sich bei BillPay jedoch um einen 3rd-Party Anbieter handelt, gibt es ein paar Dinge zu beachten.
Dieses Kapitel soll Ihnen hierbei helfen.

## <a name="bp-requirement"></a> 02 Voraussetzungen

* Eine entsprechende Lizenz und somit das Vorhandensein einer gültigen Kennung mit Benutzername und Passwort für das Saferpay System.
* Mindestens ein aktives Saferpay Terminal, über das die Zahlungen durchgeführt werden können ist vorhanden und die dazugehörige Saferpay TERMINALID liegt vor.
* Ein gültiger Akzeptanzvertrag für Billpay liegt vor.

>
>    <i class="glyphicon glyphicon-hand-right"></i> **Achtung**: Für die BillPay-Aktivierung auf dem Saferpay Terminal teilen Sie bitte **service.saferpay@six-payment-services.com** die BillPay Zugangsdaten und die gewünschten Währungen mit.
>

## <a name="bp-approval"></a> 03 BillPay Abnahme

Bevor sie Transaktionen über BillPay abwickeln können, wird jeder Kunde von BillPay auf einen so genannten **"Abnahme Verarbeiter"** aufgeschaltet. BillPay erwartet, dass jeder Händler vor dem Livegang eine Transaktion über diesen Verarbeiter tätigt. Als Nachweis verlangt BillPay eine komplette Rechnung vom Händlersystem. Nach einer Prüfung wird der Kunde freigeschaltet und die Live-Kontodaten herausgegeben. Dieser Vorgang muss für **jeweils** für **"Kauf auf Rechnung"** und **"Kauf auf Lastschrift"** durchgeführt werden.

Über die JSON-API müssen sie hierfür eine einfache Transaktion über die [Payment Page](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize) durchführen, mit der Ausnahme, dass sie das Zahlungsmittel **explizit** über den Parameter **"Payment Methods"** ansprechen, ansonsten funktioniert die Abnahme nicht.
Darüber hinaus müssen sie generell **-also auch im Livebetrieb-** die Adresse des Käufers an BillPay überreichen. Die Saferpay Payment Page kann dies auf zwei Arten tun.

### 1. Übergabe per Parameter

Wird die Adresse bereits im Shop erfasst, so kann diese über entsprechende Parameter an Saferpay übergeben werden.

>
>    <i class="glyphicon glyphicon-hand-right"></i> Siehe hierfür den Container **"Payer > DeliveryAddress"**
>

--->>>
>
>    <i class="glyphicon glyphicon-hand-right"></i> Aufruf mit Adressübergabe :
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
  "PaymentMethods": ["DIRECTDEBIT"], //Nutzen sie "INVOICE" für Kauf auf Rechnung!
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

### 2. Erfassung per Formular

Die Payment Page kann alternativ ein Adressformular anzeigen, in dem der Kunde seine Daten eintragen kann. Stellen sie sicher, dass die von BillPay geforderten Felder verpflichtend sind. 

>
>    <i class="glyphicon glyphicon-hand-right"></i> Siehe hierfür den Container **"DeliveryAddressForm"**
>

--->>>
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
  "PaymentMethods": ["INVOICE"], //Nutzen sie "DIRECTDEBIT" für Kauf auf Lastschrift!
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

Mit dem [Payment Page Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert) erhält der Händler dann alle nötigen Informationen zurück, wie z.B. die Überweisungsdaten bei Kauf auf Rechnung, die dem Käufer übergeben werden müssen.

--->>>
>
>    <i class="glyphicon glyphicon-hand-right"></i> Beispiel Payment Page Assert:
>
```json
{
  "ResponseHeader": {
    "SpecVersion": "1.3", 
    "RequestId": "33e8af17-35c1-4165-a343-c1c86a320f3b", 
  },
  "Transaction": {
    "Id": " E6tnhrAbrYGfvAYvff47b7fG6Kfb",
    "Date": "2015-10-15T10:01:42.527+02:00",
    "Amount": {
      "Value": "100", 
      "CurrencyCode": "EUR"
    }, 
    "OrderId": "Order_ID_is_mandatory", 
    "AcquirerName": "Billpay Kauf auf Rechnung Abnahme",
    "AcquirerReference": "a83e4312-e85c-4b30-9e7c-50b511155a55",
    "Invoice": {
      "Payee": {
        "IBAN": "DE2501200000TEST000000000003", 
        "HolderName": "Billpay GmbH",
        "BIC": "TESTBIC0003",
        "BankName": "BillPay Test Bank"
      },
      "ReasonForTransfer": "BPOrder_ID_is_mandatory/544",      
      "DueDate": "2015-10-15T10:01:42.527+02:00"
    }
  },
  "PaymentMeans":{
    "Brand":{
      "PaymentMethod": "INVOICE",
      "Name": "Billpay Kauf auf Rechnung Abnahme"
    }
  }
}
```
<<<---

Wie auch bei anderen Zahlungsmitteln, müssen auch BillPay Transaktionen verbucht werden.
Hier haben sie final die Möglichkeit die Fälligkeit der Zahlung hinauszuzögern.
Beachten sie, dass die Fälligkeit der Zahlung mit BillPay abgesprochen werden muss.
So auch, ob dieses Datum hinausgezögert werden kann.
Für die Verbuchung benutzen sie den [Transaction Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture).

>
>    <i class="glyphicon glyphicon-hand-right"></i> Siehe hierfür den Container **"Billpay"**
>

--->>>
>
>    <i class="glyphicon glyphicon-hand-right"></i> Beispiel Capture Request:
>
```json
{
  "RequestHeader": {
    "SpecVersion": "1.3",
    "CustomerId": "[your customer id]",
    "RequestId": "[unique request id]",
    "RetryIndicator": 0
  },
  "TransactionReference": {
    "TransactionId": "723n4MAjMdhjSAhAKEUdA8jtl9jb"
  },
  "Billpay": {
    "DelayInDays": 5
  }
}
```
<<<---

Einige der wichtigen Informationen liefert Saferpay darüber hinaus auch nochmals mit dem [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) zurück,
wie z.B. die Rechnungsdaten.

--->>>
>
>    <i class="glyphicon glyphicon-hand-right"></i> Beispiel Capture Response:
>
```json
{
  "ResponseHeader": {
    "SpecVersion": "1.3",
    "RequestId": "[your request id]"
  },
  "TransactionId": "723n4MAjMdhjSAhAKEUdA8jtl9jb",
  "Date": "2015-01-30T12:45:22.258+01:00"
  "Invoice": {
    "Payee": {
      "IBAN": "DE2501200000TEST000000000003", 
      "HolderName": "Billpay GmbH",
      "BIC": "TESTBIC0003",
      "BankName": "BillPay Test Bank"
    },
    "ReasonForTransfer": "BPOrder_ID_is_mandatory/544",      
    "DueDate": "2015-10-15T10:01:42.527+02:00"
  }
}
```
<<<---
