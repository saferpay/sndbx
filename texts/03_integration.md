# 03 - Integration

## <a name="int-start"></a> 01 Einführung

In diesem Kapitel wird auf generelle Zahlungsabläufe eingegangen, um zu verdeutlichen, wie die einzelnen Interfaces genutzt werden.
>
>    <i class="glyphicon glyphicon-hand-right"></i> **Achtung**: Beachten sie bitte, dass die JSON-API vielseitig eingesetzt werden und somit viele Prozessabläufe abdecken kann. Aus diesem Grund werden im Folgenden nur standard Abläufe behandelt. Sollten sie besondere Ansprüche und zu diesen Fragen haben, dann kontaktieren sie bitte das **[Saferpay Integrationsteam](https://saferpay.github.io/sndbx/contact.html)**.
>

## <a name="int-pp"></a> 02 PaymentPage

Die [Saferpay Payment Page](https://saferpay.github.io/jsonapi/#ChapterPaymentPage) steht jedem Händler zur Verfügung und bietet das volle Portfolio an Zahlungsmitteln an.
Einmal integriert, können Zahlungsmittel auch nachträglich noch aktiviert werden und stehen dann ohne größere Anpassungen zur Verfügung.
Der Folgende Ablauf soll Ihnen einen Überblick darüber geben, wie der Generelle Ablauf über die Payment Page aussieht.

### 1. PaymentPage Initialize

Der Ablauf beginnt mit dem [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize). Mit diesem Request übergeben sie alle für die Zahlung notwendigen Daten an Saferpay, wie z.B. Ihre Accountnummer, die Währung, den Betrag, eine Referenznummer (OrderId) zur späteren Identifizierung der Daten und auch Rücksprungadressen, an die der Kunde in bestimmten Fällen zurückgeleitet wird, wie zum Beispiel beim erfolgreichen Abschluss der Zahlung.

Hier ein paar Hinweise und Tipps zu den Möglichkeiten, die Ihnen nun zur Verfügung stehen:

+ **PaymentMethods**: Wollen sie bereits vorher festlegen, welche Zahlungsmittel angezeigt werden, oder trifft der Kunde die Auswahl bereits in Ihrem Shop? Der Parameter PaymentMethods bietet Ihnen die Möglichkeit an genau dies zu tun. Bei mehreren Werten zeigt die PaymentPage nochmals eine Auswahl zwischen diesen Zahlungsmitteln an. Wird nur ein Wert übergeben, dann überspringt die PaymentPage diese Auswahl. Beachten sie, dass ungültige Werte, oder Methoden, die nicht aktiviert sind, von der PaymentPage ignoriert werden. Wird nur ein Wert übergeben und ist dieser ungültig, dann zeigt die PaymentPage selbstständig eine Auswahl an. Somit kann der Kunde notfalls an dieser Stelle eine Auswahl treffen. Gleiches gilt, wenn PaymentMethods leer, oder gar nicht übergeben wird.
+ **ReturnUrls**: Saferpay liefert aus Sicherheitsgründen keinerlei Daten mit den ReturnUrls an den Shop zurück. Die Identifikation der Zahlung bzw. des zurückkehrenden Kunden, obliegt somit dem Händler. Wir empfehlen hierzu die verwendung von eigenen Parametern, welche sie per http-GET an die ReturnUrls hängen können. Werden diese aufgerufen, so liefert Saferpay auch die angehängten Parameter wieder zurück und ermöglich so eine einfache Identifikation des Kunden.
+ **NotifyUrl**: Obwohl optional, empfehlen wir die Integration der NotifyUrl (Siehe Container **Notification**!). Sie müssen sich die NotifyUrl, wie eine zweite SuccessUrl vorstellen. Der Unterschied ist, dass diese Url von den Saferpay-Servern per http-GET direkt aufgerufen wird. Der Aufruf erfolgt ausschließlich bei einer **erfolgreichen Zahlung**. Achten sie darauf, dass Ihr Server den Aufruf mit einem http-Statuscode **200(OK)** beantwortet. Sollte Ihr Server nicht entsprechend antworten, so wird die NotifyUrl noch zwei Mal zusätzlich aufgerufen, um temporären Timeouts, oder Fehlern entgegenzuwirken. Auf diese Weise stellt die NotifyUrl sicher, dass der Shop die Information über eine erfolgreiche Zahlung auch wirklich erhält, sollte der Redirect an die SuccessUrl fehlschlagen.
+ **Adressformular**: Wollen sie die Adresse des Kunden erfassen? Auch hier kann die PaymentPage abhelfen. Sie bietet die Möglichkeit an, dem Kunden im Laufe der Zahlung Adressformulare anzuzeigen. Sie können frei festlegen, welche Felder verpflichtend sind und welche nicht. Nach Abschluss der Zahlung liefert Saferpay die Adresse über den [PaymentPage Assert](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Assert) wieder zurück. Beachten sie hierfür nur die Container **BillingAddressForm** oder **DeliveryAddressForm**
