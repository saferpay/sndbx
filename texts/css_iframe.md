# <a name="chapter-css-iframe"></a> Iframe Integration and CSS

The Saferpay Payment Page, the transaction interface and Secure Card Data offer the options for iframe integration and custom design using Cascading Style Sheets (CSS). The following describes how these features can be used and what needs to be adhered to.

## <a name="css-iframe"></a> iframe Integration

iframe integration is supported for these methods/flows:

+ [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize)/[Payment Page](Integration_PP.html)
+ [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize)/[Transaction Interface](Integration_trx.html)
+ [Alias Insert](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert)/[Standalone Secure Card Data Registration](scd.html#scd-sa)

The response message includes a respective **RedirectURL**, if successful executed. This URL needs to be embedded in the iframe.

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0;"></span>
	<p>The following payment providers/payment methods <strong>DO NOT SUPPORT</strong> the iframe integration:</p>
	<ul>
		<li>PayDirekt</li>
		<li>PayPal</li>
		<li>Sofort by Klarna</li>
		<li>Apple Pay</li>
	</ul>
</div>

### <a name="css-pp"></a> Payment Page Initialize

The Payment Page (payment form) has a responsive design and automatically adapts to the size of the iframe. Here is an example. Simply drag the window at the bottom right corner and watch how the Payment Page adapts:

<div style="resize: both; overflow: auto; min-height: 800px; height: 820px; width: 1000px;">
	<iframe src="https://shop.saferpay.eu/saferpayintegration/ppauto_initialize_submit.php" style="height: 100%; width: 100%; overflow: hidden;"></iframe>
</div>

### <a name="css-trxini"></a> Transaction Initialize

Example of the Saferpay Card Entry Form (**Hosted Entry Form**) for capturing card details. Simply drag the window at the bottom right corner and watch the form adapt:

<div style="resize: both; overflow: auto; min-height: 500px; min-width: 285px; height: 480px; width: 290px;">
	<iframe src="https://shop.saferpay.eu/saferpayintegration/auto_initialize_submit.php" style="height: 100%; width: 100%; overflow: hidden;"></iframe>
</div>

### <a name="css-aliasins"></a> Alias Insert

Here, an example of the Saferpay Card Registration Form (**Hosted Register Form**). Simply drag the window at the bottom right corner and watch the the form adapt:

<div style="resize: both; overflow: auto; min-height: 500px; min-width: 285px; height: 480px; width: 290px;">
	<iframe src="https://shop.saferpay.eu/saferpayintegration/auto_insert_submit.php" style="height: 100%; width: 100%; overflow: hidden;"></iframe>
</div>

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0;"></span>
  <p>For registration, the capture of the card verification code (CVC) is not enabled, because it can only be saved by Saferpay on a temporary, 20-minute basis. PCI specifications prohibit permanent storage. For payments with the CVC, <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize">Transaction Inintialize</a> and <a href="https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize">Transaction Authorize</a> must be used.</p>
</div>

## <a name="css-iframe_size"></a> Size of the iframe

The size of the iframe is communicated to the merchant via an HTTP-POST message, which can be captured using JavaScript. The iframe can thus be dynamically adapted to the content.

```HTML
<html lang="en">
   <head>
      <title>Payment Form</title>
   </head>
   <body>
      <h1>Payment Form</h1>
      <iframe src= "<%= RedirectUrl %>"> </iframe> 
   </body>
</html>
```

<div class="info">
  <p>The POST message is transmitted in JSON format:</p>
</div>

```json
{  
  "message":"css",
  "height":450,
  "width":650
}
```

<div class="info">
  <p>JavaScript example for receipt of message (for jQuery >= 1.9)</p>
</div>

```javascript
$(window).bind("message", function (e) {
	if (e.originalEvent.data.height <= 450) return;
	$("#iframe").css("height", e.originalEvent.data.height + "px");
});
```

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0;"></span>
  <p>Not every page reports its size to the merchant’s system. However, Saferpay has to forward users to third parties during the payment process (Like with the 3D Secure procedure), thus we recommend a minimum size of 450x450 pixels.</p>
</div>

## <a name="css-usecss"></a> Using CSS

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0;"></span>
  <p>
	  The CSS feature should not be used with the <a href="https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize">Saferpay Payment Page</a> as the feature is deprectaed there. Please use the Payment Page Configuration (See Backoffice <strong>Settings > Payment Page Configuration</strong>) instead.
  </p>
</div>

The use of Cascading Style Sheets (CSS) is available via the following methods:

+ [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize)
+ [Alias Insert](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert)

With a request using the **Styling** container, the **CssUrl** parameter must be forwarded, alongside a reference to the CSS file which is to be used.

### <a name="css-element"></a> CSS Elements

All browsers include tools that simplify designing with CSS. CSS can thus be edited directly in the browser, and the results can be observed.

**Example for Chrome browser** 

With the right mouse button, click the item to be edited:  

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_pp_inspect.png "Inspect")

It opens a menu which shows the HTML code and the CSS classes with the corresponding attributes:  

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_inspect_code.png "Inspect code")

As an example, the text colour is adjusted here (CSS attributes can also be added and removed, if supported by the browser):  

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_inspect_color.png "Inspect color")

The change is immediately displayed in the browser. Then, the code simply needs to be transferred to the CSS file:  

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_pp_card_data.png "See changes")

The following elements should **NOT** be used:

+ **Element ID:** Element ID should not be used because the ID used may change without notice.

+ **Element Attribute:** Element attributes should not be used, because attributes (name, value, data-\*, etc.) can change without notice.

### <a name="css-selector"></a> CSS Selectors

As a principle, all CSS selectors for CSS1, CSS2 and CSS3 are supported, depending on the used browser.

## <a name="css-info"></a> More Information

+ The CSS file that is referenced by the CssUrl parameter must be stored on a web server that supports HTTPS.

+ When aiming for the <a href="https://saferpay.github.io/sndbx/#pci">PCI DSS SAQ-A compliance</a>, you must set the **ContentSecurityEnabled** parameter inside the **Styling**-container to **true**. Furthermore, you have to consider the following things:

  + Every bit of code must be contained within the same CSS file. Importing more than one file is not supported!
  + Image files must be loaded via a Data-Url within the CSS file itself!

+ It is recommended to display a progress bar while something is loading in an iframe.

+ The PCI specifications **DO NOT** allow jumping into the iframe with JavaScript. So manipulating it, using JavaScript, is strictly prohibited!

+ Some third party payment providers (e.g. PayPal) **DO NOT** support the integration inside an iframe. Thus, the PaymentPage will break out of the iframe beforehand.

+ Integrating Saferpay via an iframe will also cause the SuccessUrls to be called inside said frame. If you want to present the return pages in full size, you can break out of the frame yourself, using JavaScript.

<div class="info">
  <p>Example of iframe break out in JavaScript</p>
</div>

```html
<html lang="en">
    <head>
        <title>Success Page</title>
        <script type="text/javascript">
          function iframe_breakout()
          {
              if (top.location !== location){
                  top.location.href = document.location.href;
              }
          }
        </script>
    </head>
    <body onload="iframe_breakout()">
		
        SOME HTML…
	
    </body>
</html>
```

<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0;"></span>
  <p>Executing this code will re-load the return page, resulting in it being called twice.</p>
</div>
