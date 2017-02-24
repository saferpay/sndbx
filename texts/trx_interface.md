# Transaction Interface

Das Transaction Interface ist als Erweiterung zur PaymentPage zu verstehen, kann allerdings auch alleine genutzt werden.
Es bietet erweiterte Funktionen und Möglichkeiten zur Verarbeitung von Transaktionen an, sollten die Möglichkeiten PaymentPage nicht ausreichen.
Im folgenden Kapitel werden auf einige dieser Möglichkeiten eingegangen.
>
>    <i class="glyphicon glyphicon-hand-right"></i> **Hinweis**: Beachten sie bitte, dass die JSON-API vielseitig eingesetzt werden und somit viele Prozessabläufe abdecken kann. Aus diesem Grund werden im Folgenden nur standard Abläufe behandelt. Sollten sie besondere Ansprüche und zu diesen Fragen haben, dann kontaktieren sie bitte das **[Saferpay Integrationsteam](https://saferpay.github.io/sndbx/contact.html)**.
>

>
>    <i class="glyphicon glyphicon-hand-right"></i> **ACHTUNG**: Das Transaction Interface steht **ausschließlich** (Ausgenommen [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) und [Cancel](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel)) Händlern mit einem Business-Vertrag zur Verfügung. Sollten sie keinen Business-Vertrag haben, so werden die erweiterten Funktionen Ihnen im Livebetrieb nicht zur Verfügung stehen. Beachten sie auch, dass die Testaccounts auf dem Testsystem zur Evaluierung Business aktiviert haben. Dort stehen diese Funktionen zum testen zur Verfügung.
>

## <a name="trx-kk"></a> Kreditkarten

Das Transaction Interface bietet die Möglichkeit an, Kreditkarten gezielter in den Händlershop zu integrieren, als mit der Saferpay Payment Page. Der grundlegende Ablauf Ähnelt zwar dem der Payment Page, jedoch gibt es auch gewisse Unterschiede, welche hier nun beleuchtet werden!

### 1. Transaction Initialize

Der Ablauf beginnt mit dem [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize). Mit diesem Request übergeben sie alle für die Zahlung notwendigen Daten an Saferpay, wie z.B. Ihre Accountnummer, die Währung, den Betrag, eine Referenznummer (OrderId) zur späteren Identifizierung der Daten und auch Rücksprungadressen, an die der Kunde in bestimmten Fällen zurückgeleitet wird, wie zum Beispiel beim erfolgreichen Abschluss der Zahlung.

Hier ein paar Hinweise und Tipps zu den Möglichkeiten, die Ihnen nun zur Verfügung stehen:

+ **ReturnUrls**: Saferpay liefert aus Sicherheitsgründen keinerlei Daten mit den ReturnUrls an den Shop zurück. Die Identifikation der Zahlung bzw. des zurückkehrenden Kunden, obliegt somit dem Händler. Wir empfehlen hierzu die verwendung von eigenen Parametern, welche sie per http-GET an die ReturnUrls hängen können. Werden diese aufgerufen, so liefert Saferpay auch die angehängten Parameter wieder zurück und ermöglich so eine einfache Identifikation des Kunden.
+ **Secure Card Data**: Mit dem Initialize Request können sie auch im Saferpay Secure Card Data Store gespeicherte Karten in Form eines Alias übergeben, wenn sie dem Kunden die Eingabe seiner Kartendaten ersparen wollen. Beachten sie hierfür den Container **PaymentMeans > Alias**.

>
>    <i class="glyphicon glyphicon-hand-right"></i> **Hinweis**: Da der CVC aus PCI-Gründen von uns und Ihnen nicht gespeichert werden darf, müssen sie diesen dennoch extra erfassen und später mit der Autorisierung (Siehe Schritt 4) übergeben.
>

In der Response auf den Initialize-Request erhalten sie zwei Dinge, welche für den weiteren Ablauf wichtig sind:

+ **Der Token:** Der Token ist für weitere Schritte innerhalb des Zahlungsablaufs wichtig. Es ist deshalb sehr wichtig, dass sie Ihn in Ihrer Datenbank abspeichern. Am besten verknüpfen sie Ihn mit den Parametern, die sie an die ReturnUrls/die NotifyUrl angehängt haben, damit sie Ihn später einfach wieder aus der Datenbank auslesen können.
+ **Die RedirectUrl:** Anders, als bei der Payment Page wird diese URL nicht für einen Redirect benutzt, sondern in einen HTML-iFrame eingebettet. In diesem öffnet sich dann ein von Saferpay gehostetes Formular, mit dem der Händler die Kartendaten PCI-gerecht erfassen kann. Mehr zum Thema iFrame-Integration finden sie auf [dieser Seite](https://saferpay.github.io/sndbx/CssiFrame.html).
>
>    <i class="glyphicon glyphicon-hand-right"></i> **Hinweis**: Wenn sie mit dem Request bereits einen Alias übergeben haben, dann wird der Aufruf des Formulars übersprungen. 
>

### 2. 3D Secure und DCC

Wenn das Formular abgeschickt wird, dann werden automatisch [3D Secure](https://saferpay.github.io/sndbx/index.html#3ds) und [DCC](https://saferpay.github.io/sndbx/index.html#dcc) für diese Transaktion durchgeführt, falls aktiviert.
Hierfür sind keinerlei zusätzliche Schritte vom Händler notwendig.
Beachten sie, dass zu diesem Zeitpunkt noch keine Belastung/Transaktion durchgeführt wurde. Es wurden lediglich die beiden oberen Schritte durchgeführt.

### 3. Rücksprung in den Shop

Wurden [3D Secure](https://saferpay.github.io/sndbx/index.html#3ds) und [DCC](https://saferpay.github.io/sndbx/index.html#dcc) abgeschlossen, dann kehrt der Käufer, je nach Ergebnis, an eine der Returnurls zurück.
Sie können nun die URL-Parameter per http-GET auslesen um mit deren Hilfe den Token aus Ihrer Datenbank zu holen.
Dieser wird dann benutzt, um den nächsten Schritt auszuführen.

### 4. Transaction Authorize

Im Gegensatz zur Payment Page wird beim Transaction Interface erst mit dem [Authorize Request](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize) die Karte des Kunden belastet. Das kann dazu genutzt werden, um dem Kunden zum Beispiel abschließend noch eine Bestellübersicht anzuzeigen.

Darüber hinaus haben sie noch folgende Möglichkeiten an dieser Stelle:

+ **Condition**: Dieser Parameter lermöglicht es dem Händler festzulegen, ob er Transaktionen ohne Haftungsumkehr durch 3D Secure erlauben will, oder nicht. Auch, wenn sich der Karteninhaber erfolgreich via 3D Secure authentifiziert hat, kann es sein, dass die Haftungsumkehr bei der Autorisation abgelehnt wird. Dieser Parameter stellt sicher, dass nur dann eine Autorisierung durchgeführt wird, wenn auch Haftungsumkehr besteht.
+ **Secure Card Data**: Wollen sie die Kartendaten des Kunden für eine spätere Verwendung speichern? Die PaymentPage kann Kartendaten sicher und PCI-DSS konform für sie speichern. Beachten sie hierfür den Container **RegisterAlias**. Sie erhalten den Alias mit der Autorisationsant in der Response zurück. Diesen Alias können sie dann später statt der Kartennummer benutzen, um dem Kunden die Eingabe dieser zu ersparen.

>
>    <i class="glyphicon glyphicon-hand-right"></i> **Achtung**: Die Karte wird nur mit einer erfolgreichen Autorisierung registriert.
>

Mit der Response erhalten sie -im Erfolgsfall- die Autorisationsantwort zurück.
Anhand der ausgelesenen Daten ist zu entscheiden, ob eine Transaktion weiterverarbeitet werden sollte, oder nicht.
Folgende Daten sind hierbei interessant:

+ **Transaction > ID:** Diese ID ist die eindeutige Transaktionskennung für diese Transaktion. Nicht nur wird sie für weitere Verarbeitungsschritte benötigt, sie kann auch dazu benutzt werden, um im Saferpay Backoffice nach dieser Transaktion zu suchen. Aus diesem Grund muss die ID abgespeichert werden.
+ **ThreeDs:** Dieser Container gibt Auskunft darüber, ob Haftungsumkehr durch [3D Secure](https://saferpay.github.io/sndbx/index.html#3ds) besteht. Es liegt im Ermessen des Händlers fortzufahren, allerdings empfehlen wir nur Transaktionen anzunehmen, welche auch Haftungsumkehr besitzen. 
+ **Transaction > Status:** Wie [hier](https://saferpay.github.io/sndbx/General.html#capture-batch) bereits angegeben, gibt der Status an, ob eine Transaktion durch den [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) finalisiert werden muss, oder nicht. Ist dieser Status nicht **CAPTURED**, so muss der Capture ausgeführt werden, um die Transaktion zu finalisieren.

### 5. Capture oder Cancel

Als finaler Schritt steht nun an die Transaktion durch den [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) zu finalisieren, oder die Transaktion durch den [Cancel-Request](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel) zu stornieren. Hierfür wird die im **Schritt 4** ausgelesene ID benötigt. Beachten sie die Hinweise [hier](https://saferpay.github.io/sndbx/General.html#capture-batch) und [hier](https://saferpay.github.io/sndbx/General.html#cancel-refund), bezüglich ob ein Capture notwendig ist und ob ein Cancel noch durchgeführt werden kann, oder nicht.

Sind diese Schritte abgeschlossen, so ist der Transaktionsablauf beendet.

## <a name="trx-rp"></a> Redirect Payments

Mit Redirect Payments haben sie die Möglichkeit durch die Saferpay JSON API andere 3rd Party Anbieter direkt an Ihr Shopsystem anzubinden. Sie müssen somit lediglich die Saferpay JSON-API in Ihr System integrieren.

Zurzeit werden folgende Anbieter unterstützt:

+ Paypal
+ Postfinamce eFinance
+ Postfinance Card

## <a name="trx-sepa"></a> SEPA Lastschrift

## <a name="trx-recurring"></a> Recurring Payments

## <a name="trx-end"></a> Abschließende Worte

