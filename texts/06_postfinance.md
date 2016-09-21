# 05 - Postfinance

## <a name="pc-start"></a> 01 Einführung

Sie können über die Saferpay JSON-API ebenfalls Postfinance anbinden.
Saferpay bettet dabei die Postfinance-API ein, so dass sie nur die JSON-API integrieren müssen.

Da es sich bei Postfinance jedoch um einen 3rd-Party Anbieter handelt, gibt es ein paar Dinge zu beachten.
Dieses Kapitel soll Ihnen hierbei helfen.

## <a name="pc-requirement"></a> 02 Voraussetzungen

Die Akzeptanz von Postfinance Karten setzt Folgendes voraus:
* Eine entsprechende Lizenz und somit das Vorhandensein einer gültigen Kennung mit Benutzername und Passwort für das Saferpay System.
* Ein gültiger Vertrag mit der Post

## <a name="pc-alias"></a> 03 Speicherung im Secure Card Data - Store

Saferpay bietet die Möglichkeit an, Postfinance Karten im Saferpay Secure Card Data - Store (SCD) zu speichern.
Zu beachten ist hierbei, dass zum Einen folgende, zusätzliche, Voraussetzungen gegeben sein müssen:

* Die Aktivierung des Saferpay Secure Card Data-Stores
* EineAktivierung für das Postfinance Alias-System bei der Post und Saferpay.

>
>    <i class="glyphicon glyphicon-hand-right"></i> **HINWEIS**: Beachten sie, dass die Registrierung von Postfinance-Karten nur über [Alias Insert](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert) möglich ist!
>

Darüber hinaus verlangt die Post, dass alle Kunden zunächst über die Seite der Post geleitet werden, um der Registrierung der Karte zuzustimmen.
