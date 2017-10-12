# How to: Mobile App integration

## Process

The general Process looks as follows:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/App-Integration.png "App-Integration Process")

1. The app calls the server to make a payment.
2. The Server calls Saferpay, doing either a [PaymentPage Initialize](https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Initialize), [Transaction Initialize](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize), or [Alias Insert](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize).
3. Saferpay responds with a Token and the RedirectUrl.
4. The server sdaves the Token and forwards the RedirectUrl to the app.
5. The app opens up the RedirectUrl either inside the default browser, or a Webview inside the app.
6. The customer goes through the normal payment-process. After that he/she gets redirected to one of the RedirectUrls.
<div class="info">
  <p><strong>Tip:</strong> We highly recommend using the NotifyUrl (See container <strong>"Notification > NotifyUrl"</strong>), since it is a server-to-server callback, which avoids connection issues the customer may has with his/her smartphone. Once the connection is re-established, the app may execute a subsequent request to the server, to ask for the outcome!</p>
</div>
7. Once the server recieved the callback, it executes the Assert/Authorization to call for the outcome. It then forwards all necessary data to the app, so the app can display a success, or failure!

## FAQ

+ You are talking about a webview! Can't i just use my own form?

+ Why should i use a Server? Can't i just integrate Saferpay directly into my App?
