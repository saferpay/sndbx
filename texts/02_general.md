# 02 - Allgemeines

## <a name='TOC'></a> Inhaltsverzeichnis

1. [01 Einführung](#start)
1. [02 Voraussetzungen](#requirement)
1. [03 Datensicherheit und PCI DSS](#pci)
1. [04 3D Secure](#3ds)
1. [05 Dynamic Currency Conversion](#dcc)
1. [06 Unterstützte Zahlungsmittel](#paymentmethods)
1. [07 Lizenzen](#licenses)
1. [08 Transaktionsablauf](#transaction-flow)

## <a name="start"></a> 01 Einführung

Die Saferpay JSON API (**J**ava**S**cript **O**bject **N**otation **A**pplication **P**rogramming **I**nterface), in der Folge auch JA genannt, ist eine moderne schlanke Schnittstelle, die unabhängig von Programmiersprachen ist. 
Die JA unterstützt alle Saferpay Methoden und ist für alle Shop-Systeme, Callcenter-Lösungen, Warenwirtschafts-, ERP-, CRM-Systeme sowie alle anderen Einsatzgebiete geeignet, in denen Online-Zahlungen verarbeitet werden müssen.
Dieser Integrationsguide dient als Hilfestellung für Programmierer und Integratoren. Er soll gängige Abläufe beschreiben und Gängige Fragen beantworten.
Dieses Dokument beschäftigt sich mit den Grundlagen der Saferpay JSON-API.

## <a name="requirement"></a> 02 Voraussetzungen

Die Nutzung der JA setzt Folgendes voraus:

* Eine entsprechende Lizenz für das Saferpay Modul.
* Das Vorhandensein einer gültigen Kennung mit Benutzername und Passwort für das Saferpay Backoffice.
* Mindestens ein aktives Saferpay Terminal, über das die Zahlungen durchgeführt werden können ist vorhanden und die dazugehörige 
* Saferpay Terminalnummer sowie die Saferpay Kundennummer liegen vor.
* Ein gültiger Akzeptanzvertrag für Kreditkarten oder ein anderes Zahlungsmittel liegt vor.

## <a name="pci"></a>  03 Datensicherheit und PCI DSS

Die Kreditkartenorganisationen haben das Sicherheitsprogramm PCI DSS (Payment Card Industry Data Security Standard) ins Leben gerufen, um Betrug mit Kreditkarten und deren Missbrauch vorzubeugen.

Bitte beachten Sie bei der Gestaltung des Zahlungsprozesses und dem Einsatz von Saferpay  die PCI DSS Richtlinien. 

Bei Nutzung des Saferpay Hosted Forms zusammen mit dem optionalen Dienst Saferpay Secure Card Data, abgekürzt SCD, können Sie die Zahlungsprozesse so sicher gestalten, dass keine Kreditkartennummern auf Ihren (Web)Servern verarbeitet, weitergeleitet oder gespeichert werden. 

Bei Nutzung der Saferpay Payment Page erfasst der Karteninhaber seine Kreditkartennummer und das Verfalldatum nicht innerhalb der E-Commerce-Applikation des Händlers, sondern innerhalb der Saferpay Payment Page. Da die E-Commerce-Applikation und Saferpay auf physisch getrennten Plattformen betrieben werden, besteht keine Gefahr, dass die Kreditkartendaten in der Datenbank des Händlersystems gespeichert werden können. 

Das Risiko eines Missbrauchs der Kreditkartendaten wird durch die Nutzung von Saferpay Secure Card Data oder der Saferpay Payment Page deutlich reduziert und der Aufwand der PCI DSS Zertifizierung verringert sich für den Händler deutlich.

Fragen zu PCI DSS kann Ihnen Ihr Verarbeiter oder ein darauf spezialisiertes Unternehmen beantworten [Siehe hier](https://www.pcisecuritystandards.org).

## <a name="3ds"></a> 04 3D Secure

3-D Secure, abgekürzt 3DS, wird von Visa (Verified by Visa), MasterCard (MasterCard SecureCode), American Express (SafeKey) und Diners Club (ProtectBuy) unterstützt. Händler, die das 3-D Secure Verfahren anbieten profitieren von der erhöhten Sicherheit bei der Kreditkartenakzeptanz und weniger Zahlungsausfällen durch die Haftungsumkehr („Liability Shift“). Es ist dabei nicht von Bedeutung, ob die Karteninhaber (KI) an dem Verfahren teilnehmen oder nicht.

Das 3-D Secure Verfahren kann ausschließlich für Zahlungen im Internet eingesetzt werden. Der KI muss, sofern er an den Verfahren teilnimmt, sich während der Zahlung gegenüber seiner kartenausgebenden Bank (Issuer) ausweisen.
Zahlungen, die der Händler mit 3-D Secure abwickelt, sind speziell zu kennzeichnen. Nur wenn die entsprechenden Merkmale mit der Autorisierung an die Kreditkartengesellschaft gesendet werden, gilt die Haftungsumkehr.
Das Saferpay Merchant Plug-In, abgekürzt MPI, unterstützt die notwendigen Interaktionen und den sicheren Datenaustausch zwischen den beteiligten Systemen. Die JSON API wickelt diesen Schritt automatisiert über das Transaction Interface (Initialize) und über die Payment Page ab, sodass kein zusätzlicher Integrationsaufwand anfällt. Die Authentifizierung des KI erfolgt über ein Webformular, das der Issuer oder ein von ihm beauftragter Dienstleister hostet. Für eine 3-D Secure Authentifizierung benötigt der KI daher zwingend einen Internet Browser.

1. Der Händler sendet die Kreditkartendaten zusammen mit den relevanten Zahlungsdaten an Saferpay.
2. Saferpay prüft, ob der KI an dem 3-D Secure Verfahren teilnimmt oder nicht. Nimmt er teil, muss er sich gegenüber seiner Bank authentifizieren. Falls nicht, wird die Zahlung ohne Authentifizierung durchgeführt.
3. Über den Internet Browser des KI wird die 3-D Secure Anfrage an die kartenausgebende Bank weitergeleitet. Der KI muss sich mit einem Passwort, Zertifikat oder einer anderen Methode ausweisen.
4. Das Ergebnis dieser Überprüfung (Authentifizierung) wird über den Internet Browser des Kunden zurück an Saferpay gesendet. 
5. Saferpay prüft das Resultat und stellt sicher, dass keine Manipulation vorliegt. Die Zahlung kann fortgeführt werden, wenn die Authentifizierung erfolgreich verlaufen ist.
6. Saferpay bindet die MPI-Daten an den von der JSON API verwendeten Token und fragt diese bei der Autorisierung der Karte automatisch ab.

## <a name="dcc"></a> 05 Dynamic Currency Conversion

Dynamic Currency Conversion, abgekürzt DCC, steht nur für SIX Akzeptanzverträge mit DCC-Erweiterung zur Verfügung. Das für die Zahlungsanfragen zugrunde liegende Terminal erhält hierbei eine Basiswährung in der alle Transaktionen abgerechnet werden. Internationalen Kunden wird mittels DCC der Kaufbetrag in der Basiswährung und zum besten Wechselkurs in ihrer Landeswährung angezeigt. Der Kunde kann selbst entscheiden, in welcher Währung er bezahlen möchte.
Eine gesonderte Implementierung auf Seiten des Händlers ist für DCC nicht notwendig. Saferpay behandelt diesen Schritt während des Redirect automatisch. 

## <a name="paymentmethods"></a> 06 Unterstützte Zahlungsmittel

<table class="table table-striped">
  <thead>
    <tr>
      <th>Zahlungsmittel</th>
      <th>Transaction Interface</th>
      <th>Payment Page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Visa</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>V PAY</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>MasterCard</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Maestro International</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>American Express</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Diners Club</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>JCB</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Bonus Card</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Postfinance E-Finance</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>PostFinance Card</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>MyOne</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>SEPA Lastschrift (Nur DE!)</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>PayPal</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>ePrzelewy</td>
      <td>Nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Homebanking AT (eps)</td>
      <td>Nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>GiroPay</td>
      <td>Nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>iDeal</td>
      <td>Nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>BillPay Kauf auf Rechnung</td>
      <td>Nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>BillPay Lastschrift</td>
      <td>Nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
  </tbody>
</table>

## <a name="licenses"></a> 07 Lizenzen

Saferpay unterscheidet im Generellen zwischen zwei Lizenzen:
+ Saferpay eCommerce
+ Saferpay Business

Es ist von äßerster Wichtigkeit bereits vor der Integration zu klären, ob eine eCommerce-oder Business-Lizenz genutzt werden soll.
Im Wesentlichen stellt Business eine Erweiterung zur normalen eCommerce Lizenz dar, welche allerdings mit zusätzlichen Kosten verbunden ist.
Bei vertraglichen Fragen, auch zu Kosten, wenden sie sich bitte an Ihren Sales Partner.

Um Ihnen dennoch einen generellen Überblick, über die zur Verfügung stehenden Funktionen zu geben, konultieren sie bitte folgende Featurematrix:

<table class="table table-striped">
  <thead>
    <tr>
      <th>Interface</th>
      <th>eCommerce</th>
      <th>Business</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th><b>PaymentPage Interface</b></th>
      <th>verfügbar</th>
      <th>verfügbar</th>
    </tr>
    <tr>
      <td>Initialize Payment Page</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Assert Payment Page</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <th><b>Transaction Interface</b></th>
      <th><b>eingeschränkt</b></th>
      <th>verfügbar</th>
    </tr>
    <tr>
      <td>Transaction Initialize</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Transaction Authorize</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Transaction QueryPaymentMeans</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Transaction AdjustAmount</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Transaction Authorize Direct</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Transaction Authorize Referenced</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Transaction Capture</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Transaction Cancel</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Transaction Refund</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Transaction Refund Direct</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Transaction Redirect Payment</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Transaction AAssert Redirect Payment</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <th><b>Secure Alias Store¹</b></th>
      <th>nicht verfügbar</th>
      <th>verfügbar</th>
    </tr>
    <tr>
      <td>Alias Insert</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Alias Assert Insert</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Alias Insert Direct</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <td>Alias Delete</td>
      <td>nicht verfügbar</td>
      <td>verfügbar</td>
    </tr>
    <tr>
      <th><b>Batch</b></th>
      <th>verfügbar</th>
      <th>verfügbar</th>
    </tr>
    <tr>
      <td>Close</td>
      <td>verfügbar</td>
      <td>verfügbar</td>
    </tr>
  </tbody>
</table>
¹Nur Verfügbar in Verbindung mit Saferpay Secure Card Data (Im Business-Paket enthalten)

## <a name="transaction-flow"></a> 08 Transaktionsablauf


![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/Zahlungsablauf_sml.png "Saferpay general transaction-flow")

--->>>
 
> 1. Durch [Transaction Initialize](///saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize), [Transaction RedirectPayment](///saferpay.github.io/jsonapi/#Payment_v1_Transaction_RedirectPayment), oder [PaymentPage Initialize](///saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize)
>
> 2. Sowohl die PaymentPage, als auch das Transaction Interface bieten die iFrame Integration an!
>
>    Fügen sie die RedirectUrl hierzu einfach in einen HTML-iFrame ein.
>
> 3. Der Rücksprung erfolgt an die ReturnUrls.
>
>    <i class="glyphicon glyphicon-hand-right"></i> **TIPP**: Sie können die URLs per GET mit eigenen Parametern ausstatten.
>
> 4. Durch [Transaction Authorize](///saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize) oder [PaymentPage Assert](///saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert).
>
>    <i class="glyphicon glyphicon-hand-right"></i> **HINWEIS**: Bei Authorize geschieht erst hier die Autorisation!
>    Diese ist bei der PaymentPage bereits geschehen.
>
> 5. Je nach Ausgang der Transaktion steht es Ihnen nun frei die Transaktion zu finalisieren ([Capture](///saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture)), oder zu stornieren ([Cancel](///saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel)).
>
> Besonderes Augenmerk ist auf die Haftungsumkehr (Liabilityshift) durch 3D Secure zu richten. Diese sollte nach Möglichkeit immer vorhanden sein.
>
> Des Weiteren braucht eine fehlgeschlagene Transaktion nicht storniert zu werden.
 
<<<---

Die Saferpay JSON-API ist so aufgebaut, dass der generelle Transaktionsablauf immer gleich ist. Beachten sie hierbei allerdings dass es durchaus kleinere Unterschiede gibt. Dieser Flowchart ist zum generellen Verständnis!

## <a name="pm-functions"></a> 09 Zahlungsmittelfunktionen

Saferpay unterstützt viele Zahlungsmittel, darunter auch 3rd-Party Anbieter, wie zum Beispiel PayPal. Diese müssen aber nicht zwingend sämtliche Saferpayfunktionen unterstützen.
Die folgenden Tabellen sollen Ihnen dabei helfen eine Übersicht darüber zu bekommen, welche Funktionen mit welchen Zahlungsmitteln verfügbar sind:

<table class="table table-striped">
  <thead>
    <tr>
      <th>Zahlungsmittel</th>
      <th>Capture notwendig</th>
      <th>Tagesabschluss notwendig</th>
      <th>Secure Alias Store verfügbar</th>
      <th>Gutschriften durchführbar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>MasterCard</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
    </tr>
    <tr>
      <td>VISA, VPay, Lasercard</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
    </tr>
    <tr>
      <td>American Express</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
    </tr>
    <tr>
      <td>Diners Club</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
    </tr>
    <tr>
      <td>JCB</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
    </tr>
    <tr>
      <td>Bonus Card</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
    </tr>
    <tr>
      <td>PostFinance Card</td>
      <td>JA</td>
      <td>NEIN</td>
      <td>NEIN</td>
      <td>JA</td>
    </tr>
    <tr>
      <td>PostFinance eFinance</td>
      <td>JA</td>
      <td>NEIN</td>
      <td>JA</td>
      <td>JA</td>
    </tr>
    <tr>
      <td>Maestro Int.</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
    </tr>
    <tr>
      <td>MyOne</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
    </tr>
    <tr>
      <td>SEPA Lastschrift</td>
      <td>JA</td>
      <td>JA</td>
      <td>JA</td>
      <td>NEIN</td>
    </tr>
    <tr>
      <td>BillPay Lastschrift</td>
      <td>JA</td>
      <td>JA</td>
      <td>NEIN</td>
      <td>NEIN</td>
    </tr>
    <tr>
      <td>BillPay Rechnung</td>
      <td>JA</td>
      <td>JA</td>
      <td>NEIN</td>
      <td>NEIN</td>
    </tr>
    <tr>
      <td>PayPal</td>
      <td>JA</td>
      <td>NEIN</td>
      <td>NEIN</td>
      <td>JA</td>
    </tr>
    <tr>
      <td>GiroPay</td>
      <td>NEIN</td>
      <td>NEIN</td>
      <td>NEIN</td>
      <td>NEIN</td>
    </tr>
    <tr>
      <td>iDeal</td>
      <td>NEIN</td>
      <td>NEIN</td>
      <td>NEIN</td>
      <td>NEIN</td>
    </tr>
    <tr>
      <td>>Homebanking(AT)</td>
      <td>NEIN</td>
      <td>NEIN</td>
      <td>NEIN</td>
      <td>NEIN</td>
    </tr>
    <tr>
      <td>ePrzelewy</td>
      <td>NEIN</td>
      <td>NEIN</td>
      <td>NEIN</td>
      <td>NEIN</td>
    </tr>
  </tbody>
</table>
