# 07 - Integration Transaction Interface

## <a name="trx-start"></a> 01 Einführung

Das Transaction Interface ist als Erweiterung zur PaymentPage zu verstehen, kann allerdings auch alleine genutzt werden.
Es bietet erweiterte Funktionen und Möglichkeiten zur Verarbeitung von Transaktionen an, sollten die Möglichkeiten PaymentPage nicht ausreichen.
Im folgenden Kapitel werden auf einige dieser Möglichkeiten eingegangen.
>
>    <i class="glyphicon glyphicon-hand-right"></i> **Hinweis**: Beachten sie bitte, dass die JSON-API vielseitig eingesetzt werden und somit viele Prozessabläufe abdecken kann. Aus diesem Grund werden im Folgenden nur standard Abläufe behandelt. Sollten sie besondere Ansprüche und zu diesen Fragen haben, dann kontaktieren sie bitte das **[Saferpay Integrationsteam](https://saferpay.github.io/sndbx/contact.html)**.
>

>
>    <i class="glyphicon glyphicon-hand-right"></i> **ACHTUNG**: Das Transaction Interface steht **ausschließlich** (Ausgenommen [Capture](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Capture) und [Cancel](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Cancel) zur Verfügung. Sollten sie keinen Business-Vertrag haben, so wird die API im Livebetrieb einen Fehler werfen. Beachten sie auch, dass die Testaccounts auf dem Testsystem zur Evaluierung Business aktiviert haben.
>

## <a name="trx-kk"></a> 02 Kreditkarten
