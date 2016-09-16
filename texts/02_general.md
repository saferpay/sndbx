# 02 - Allgemeines

## <a name="capture-batch"></a> 1 Capture (Verbuchung) und der Tagesabschluss

Diese beiden Funktionen gehören wohl zu den weniger beachteten, aber äußerst wichtigen Saferpay-Funktionen. Beide stehen im direkten Zusammenhang und werden sie nicht ausgelöst, so wird es keine Auszahlung an das Händlerkonto geben.

### Der Capture

[Der Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) ist dafür gedacht eine Zahlung zu finalisieren.
Solange eine Transaktion nicht durch den Capture gelaufen ist, wird der Betrag für sie reserviert, aber nicht ausgezahlt.
API seitig erhalten sie über den parameter „Status“ Auskunft (Beachten sie dass dies nur ein Ausschnitt der Daten ist):

--->>>

```json
"Transaction": {
  "Type": "PURCHASE",
  "Status": "AUTHORIZED",
  "Id": "MUOGAWA9pKr6rAv5dUKIbAjrCGYA",
  "Date": "2015-09-18T09:19:27.078Z",
  "Amount": {
    "Value": "100",
    "CurrencyCode": "CHF"
  },
  "AcquirerName": "AcquirerName",
  "AcquirerReference": "Reference"
}
```

<<<---

Analog hierzu erhalten solche Transaktion im Saferpay Backoffice den Status “Reservation“.
Ist eine Transaktion bereits durch den Capture gelaufen, so verändert sich auch der Status:

--->>>
```json
"Transaction": {
  "Type": "PURCHASE",
  "Status": "CAPTURED",
  "Id": "MUOGAWA9pKr6rAv5dUKIbAjrCGYA",
  "Date": "2015-09-18T09:19:27.078Z",
  "Amount": {
    "Value": "100",
    "CurrencyCode": "CHF"
  },
  "AcquirerName": "AcquirerName",
  "AcquirerReference": "Reference"
}
```
<<<---

Dies ist z.B. bei Zahlungsmitteln so, die keinen Capture brauchen bzw. können. [Siehe hier](https://saferpay.github.io/sndbx/General.html#pm-functions).

WICHTIG: Eine Reservation wird nicht ewig für sie vorgehalten. Ist eine bestimmte Zeit verstrichen, wird der für sie autorisierte und reservierte Betrag wieder freigegebenund sie können das Geld nicht mehr einfordern.
Besonders PayPal behält es sich vor die Auszahlung zu verweigern. Aus diesem Grund empfehlen wir den Capture sofort durchzuführen. Sollte das nicht möglich sein, so muss er innerhalb von 48 Stunden geschehen. Entweder per API, oder manuell im Saferpay Backoffice.

### Der Tagesabschluss
Der Tagesabschluss folgt dem Capture einmal täglich, automatisiert um 22 Uhr MEST.
Hierbei werden alle Transaktionen, welche durch den Capture gelaufen sind, beim Zahlungsverarbeiter eingereicht, um das Geld vom Kunden- auf das Händlerkonto zu übertragen.

Dieser Schritt lässt sich, falls gewünscht, über die Saferpay API auch selber auslösen. Der hierzu notwendige Request heisst [Batch Close](https://saferpay.github.io/jsonapi/#Payment_v1_Batch_Close).

Bevor sie jedoch die API nutzen können, müssen sie den automatischen Tagesabschluss zunächst im Backoffice unter Administration > Terminals für das betreffende Terminal deaktivieren. Der Abschluss sollte nur einmal täglich durchgeführt werden.

### Sonderfälle
#### PayPal und Postfinance
Bei diesen Anbietern wird mit dem Capture auch gleich ein mini-Tagesabschluss ausgelöst. Wenn sie also den Capture auslösen, wird sofort der Geldfluss eingeleitet.
Bei PayPal wird dies getan aus dem oben genannten grund, dass sich PayPal vorbehält die Auszahlung zu verweigern. Aus diesem Grunde fordern wir das Geld für sie sofort ein.
Bei Postfinance ist dies schlicht im von Postfinance genutzten Protokoll begründet.

#### Onlinebanking 
Zahlungsanbieter, wie GiroPay, oder iDeal gehören zu den Onlinebanking Anbietern. Diese lösen mit der Autorisation sofort den Geldfluss aus. Sobald die Transaktion also erfolgreich war, ist die Transaktion zu 100% abgeschlossen.

## <a name="cancel-refund"></a> 02 Wann Storno (Cancel) und wann Gutschrift?

Dass Kunden Ihre Bestellungen stornieren, oder waren zurückgeben wollen ist nicht selten. Natürlich ist es als Händler wichtig die im Hintergrund stehende Transaktion entweder zu stornieren, oder eine Gutschrift zu machen.
Auf Zahlungsmittelebene kann es jedoch zu komplikationen kommen, wenn man nicht genau weiss, was wann genau zu tun ist. Auch gibt es Zahlungsmittel, die hier schlichtweg keinerlei Funktionalität bieten.
Dieses Kapitel soll Ihnen dabei helfen eine Übersicht über dieses Thema zu bekommen. Dabei helfen soll auch die im Kapitel 5.2 stehende Matrix.

Generell gilt: Solange Zahlungen nicht durch den Tagesabschluss eingereicht wurden, steht immer ein Storno (Cancel) zur Verfügung. Danach muss eine Gutschrift durchgeführt werden, falls verfügbar.

WICHTIG: Beachten sie die [hier](https://saferpay.github.io/sndbx/General.html#pm-functions) genannten Sonderfälle! Besonders beim Onlinebanking stehen weder Stornos, noch Gutschriften zur Verfügung.
