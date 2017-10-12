# Mobile App integration

Payments done via a smartphone through a mobile app, becomes more and more important.
Saferpay offers all the tools needed to be integrated via a mobile app.
The following guide covers the recommended practice for a mobile-app integration.

The Integration centers around a client-server model (the app being the client), in which a merchant server hosts all the necessary data, to do the requests itself and store any vital data, the app and therefore the customer/card holder, does not need to know!


## <a name="mobile-process"></a>Process

The general Process looks as follows:

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/App-Integration.png "App-Integration Process")

1. The app calls the server to make a payment.
2. The Server calls Saferpay, doing either a [PaymentPage Initialize](https://saferpay.github.io/jsonapi/index.html#Payment_v1_PaymentPage_Initialize), [Transaction Initialize](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize), or [Alias Insert](https://saferpay.github.io/jsonapi/index.html#Payment_v1_Transaction_Initialize).
3. Saferpay responds with a Token and the RedirectUrl.
4. The server saves the Token and forwards the RedirectUrl to the app.
5. The app opens up the RedirectUrl either inside the default browser, or a Webview inside the app, so the customer can make his/her payment.
6. The customer goes through the normal payment-process. After that he/she gets redirected to one of the RedirectUrls.
<div class="info">
  <p><strong>Tip:</strong> We highly recommend using the NotifyUrl (See container <strong>"Notification > NotifyUrl"</strong>), since it is a server-to-server callback, which avoids connection issues the customer may has with his/her smartphone. Once the connection is re-established, the app may execute a subsequent request to the server, to ask for the outcome!</p>
</div>
7. Once the server recieved the callback, it executes the Assert/Authorization to call for the outcome. It then forwards all necessary data to the app, so the app can display a success, or failure!

## <a name="mobile-faq"></a>FAQ

## You are talking about a webview! Can't I just use my own form?
Yes, for now.
The PCI council basically dictates how to capture and process credit card details.
As mentioned in the [PCI Chapter](https://saferpay.github.io/sndbx/#pci), the usage of your own form is possible, but it requires a special certification. However this is only applicable to normal webshops. The rules for web-apps aren't defined yet, making all this a grey area.
So you are allowed to use your own form, but only because there are no rules yet.
We expect this to change in a way, that this is no longer allowed. So we highly recommend using the webview instead to be future-proof.

## Why should i use a Server? Can't I just integrate Saferpay directly into my App?
Technically yes, but it means, that you need to integrate the API-credentials and requests directly into the app.
This is a security concern, because all things that are client-side, can be manipulated, or hacked by the user.
The credentials then could be leaked to the public and used for mailicious requests. Additionally the Server can circumvent any connection issues Smartphones may have, if the connection is weak, unstable, or currently interrupted.

## Can't I just capture the credit card information and send it off to my server, so it can do a direct authorization? 
<strong>NO!</strong> If you would do that, you would fall into the PCI-scope under PCI-DSS SAQ-D, which means, that you'd need a full PCI certification. Without that certification, the card details <strong>MUST NOT</strong> come in contact with your systems. Not even for a short time, like inside a cache! 
