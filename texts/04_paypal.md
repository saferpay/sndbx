# 01 - Integration PayPal

## <a name="start"></a> 01 Einführung

Sie können über die Saferpay JSON-API ebenfalls PayPal anbinden.
Saferpay bettet dabei die Paypal-API ein, so dass sie nur die JSON-API integrieren müssen.

Da es sich bei Paypal jedoch um einen 3rd-Party Anbieter handelt, gibt es ein paar Dinge zu beachten.
Dieses Kapitel soll Ihnen hierbei helfen.

## <a name="requirement"></a> 02 Voraussetzungen

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
