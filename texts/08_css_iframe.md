# 08 - IFrame Integration und CSS

## <a name="css-start"></a> 01 Einführung

Sowohl die Saferpay PaymentPage, das Transaction Interface, sowie der Secure Alias-Store, bieten Möglichkeiten an per HTML-iFrame integriert und per CSS gestaltet zu werden.
Das folgende Kapitel geht darauf ein, wie dieses Feature genutzt werden kann und was dabei beachtet werden muss.

## <a name="css-iframe"></a> 02 iFrame Integration

Die iFrame Integration ist denkbar einfach und steht bei folgenden Requests zur Verfügung:

+ [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize)
+ [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize)
+ [Alias Insert](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert)

In der Response zu diesen Requests erhalten sie, bei Erfolg, eine RedirectUrl.
Diese müssen sie in den HTML-iFrame einbetten.

### PaymentPage

Da die Payment Page ein Responsive Design bietet, passt sich diese automatisch der iFrame Größe an.
Hier zwei Beispiele:

+ Fullsize:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iFramefull.PNG "PaymentPage Fullsize")

+ Smallsize:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iFramesml.PNG "PaymentPage Smallsize")

### Transaction Initialize

Hier öffnet sich das Saferpay Card Entry Form zur Erfassung der Kartendaten:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/transactioniframe.PNG "Card Entry Form")

### Alias Insert

Hier öffnet sich das Card Registration Form:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/scdiframe.PNG "Card Registration Form")
>
>    <i class="glyphicon glyphicon-hand-right"></i> **Achtung**: Bei der Registrierung ist die Erfassung des CVC aus PCI-Gründen nicht vorgesehen. Der CVC darf selbst von Saferpay nur für 20 Minuten zwischengespeichert werden. Eine dauerhafte Speicherung ist nicht erlaubt.
>

## <a name="css-iframe_size"></a> 03 iFrame Größe

Die Größe des iFrame wird dem Händler über eine HTML5-POST Message mitgeteilt, welche sich per Java Script auswerten lässt.
Auf diese Weise kann sich der iFrame dynamisch an den Inhalt anpassen lassen.

--->>>
>
>    <i class="glyphicon glyphicon-hand-right"></i> Die Post-Message liegt im JSON-Format vor:
>
```json
{  
  "message":"css",
  "height":450,
  "width":650
}
```

>
>    <i class="glyphicon glyphicon-hand-right"></i> Beispiel zum Empfangen der Message (Für jQuery >= 1.9):
>
```javascript
$(window).bind("message", function (e) {
	$("#iframe").css("height", e.originalEvent.data.height + "px");
});
```
<<<---

>
>    <i class="glyphicon glyphicon-hand-right"></i> **Achtung**: Nicht jede Seite meldet Ihre Größe an das Händlersystem zurück! Da Saferpay jedoch im Zahlungsverlauf auf die Seiten von Drittanbietern weiterleiten muss, empfehlen wir eine **Mindestgröße von 450x450 Pixeln!**
>

## <a name="css-css"></a> 04 Verwendung von CSS
Die Verwendung von CSS steht bei folgenden Requests zur Verfügung:

+ [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize)
+ [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize)
+ [Alias Insert](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert)

Hierbei muss beim Request im Container **"Styling"** der Parameter **"CssUrl"** angegeben werden, mit einem verweis auf die zu verwendende CSS-Datei.

## Welche Elemente können verwendet werden?

### Folgende Elemente dürfen benutzt werden:

+ **Element Name**: Der Element Name darf gemäß der CSS Spezifikation verwendet werden.
Beispiel:
```
h1{
  text-decoration: underline;
}
```

+ **Class Name**: Sämtliche von der PaymentPage, Card Entry Form und Card Registration Form verwendeten CSS-Klassen dürfen für das CSS-Styling benutzt werden.
Beispiel:
```
h1{
  text-decoration: underline;
}
```

>
>    <i class="glyphicon glyphicon-hand-right"></i> **Tipp**: Die meisten modernen Browser (Chrome, Firefox) bringen von Haus aus Tools mit, um die Gestaltung per CSS zu vereinfachen. Sie können z.B. das CSS live im Browser einsehen und editieren.
>

  * Klicken sie dazu mit der rechten maustaste auf das Element, welches sie editieren wollen (Beispiel Chrome):
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/CSSinspect1.png "CSS-Inspect 1")

  * Es öffnet sich ein Menü, wo sie den HTML-Code, die CSS-Klassen und die daran hängenden Attribute einsehen können:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/CSSinspect2.png "CSS-Inspect 2")

  * Als Beispiel wird hier die Textfarbe angepasst (Es lassen sich auch Attribute hinzufügen und entfernen, sofern vom Browser unterstützt):
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/CSSinspect3.png "CSS-Inspect 3")

  * Der Browser zeigt die Änderung sofort an, sie müssen den Code nur noch in Ihr CSS-File überführen:
![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/CSSinspect4.png "CSS-Inspect 4")


### Folgende Elemente dürfen **NICHT** benutzt werden:

+ **Element ID**: Das Element ID sollte nicht verwendet werden, da sich die IDs unangekündigt ändern können.
+ **Element Attribute**: Element Attribute sollten nicht verwendet werden, da sich die Attribute (name, value, data-*, etc.) unangekündigt ändern können.

## Welche CSS-Selektoren werden unterstützt?

Grundsätzlich werden alle CSS-Selektoren  für CSS1, CSS2 und CSS3 unterstützt.

## <a name="css-info"></a> 05 Abschließende Hinweise

+ Das Stylesheet, auf das mit dem Parameter CSSURL verwiesen wird, muss auf einem Webserver abgelegt werden, der HTTPS unterstützt. Innerhalb des Stylesheets muss darauf geachtet werden, dass Grafiken über „HTTPS://“ geladen werden. Ansonsten wird im Browser eine Warnung angezeigt. Zum Beispiel: „[…] this page includes other resources which are not secure. […].

+ Es empfiehlt sich während des Ladens des Iframe eine Fortschrittsanzeige einzublenden.

+ Sie sind aus PCI-Gründen **NICHT** erlaubt per Java Script in den iFrame einzudringen.

+ Da innerhalb des iFrames Weiterleitungen zu Seiten von Drittanbietern geschehen, können wir nicht garantieren, dass diese nicht von selber einen Ausbruch aus diesem vornehmen. Es gibt derweil Anbieter, die die Integration im iFrame nicht zulassen, darunter fallen:
  + PayPal

+ Es wird generell empfohlen beim Rücksprung in den Shop auf die Success-, Abort- oder Fail-Seite aus dem Iframe auszubrechen.

--->>>
>
>    <i class="glyphicon glyphicon-hand-right"></i> Beispiel, für einen iFrame Ausbruch per Java Script:
>
```
<HTML>
    <head>
        <title>Success Page</title>
        <script language="JavaScript" type="text/javascript">

        function iframe_breakout()
        {
            if (top.location != location){
                top.location.href = document.location.href;
            }
        }
        </script>
    </head>
    <body onload="iframe_breakout()">
		
        SOME CODE…
	
    </body>
</HTML>
```

>
>    <i class="glyphicon glyphicon-hand-right"></i> **ACHTUNG**: Hierbei wird die Return-Seite neu geladen!
>
<<<---
