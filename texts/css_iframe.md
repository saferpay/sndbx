# Iframe Integration and CSS

The Saferpay Payment Page, the Transaction Interface and Secure Card Data offer the options for Iframe integration and design with a Cascading Style Sheets (CSS). The following describes how these features can be used and what needs to be adhered to.

## <a name="css-iframe"></a> Iframe Integration

Iframe integration is supported for these methods:

+ [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize)
+ [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize)
+ [Alias Insert](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert)

The Response Message includes a respective **RedirectURL**, if successful executed. This URL needs to be embedded in the Iframe.

### <a name="css-pp"></a> Payment Page

The Payment Page has a responsive design and automatically adapts to the size of the Iframe. Here are two examples:

+ Full size:  

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_pp_desktop.png "Payment Page desktop view")

+ Small size:  

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_pp_mobile.png "Payment Page mobile view")

### <a name="css-trxini"></a> Transaction Initialize

Here, the Saferpay Card Entry Form appears for data capture of the card details: 

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_pay_with_cvc.png "Saferpay Card Entry Form")

### <a name="css-aliasins"></a> Alias Insert

Here, the Saferpay Card Registration Form opens:  

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_alias_insert.png "Card Registration Form")
>
><i class="glyphicon glyphicon-hand-right"></i> **Attention!** For registration, the capture of the card verification code (CVC) is not enabled, because it can only be saved by Saferpay on a temporary, 20-minute basis. PCI specifications prohibit permanent storage. For payments with the CVC, [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize) and [Authorize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Authorize) shall be used.
>

## <a name="css-iframe_size"></a> Size of the Iframe

The size of the Iframe is communicated to the merchants via an HTML5-POST message. This can be evaluated using JavaScript. The Iframe can thus be dynamically adapted to the content.

>
>    <i class="glyphicon glyphicon-hand-right"></i> The POST message is transmitted in JSON format:
>

```json
{  
  "message":"css",
  "height":450,
  "width":650
}
```

>
>    <i class="glyphicon glyphicon-hand-right"></i> Example for receipt of message (for jQuery >= 1.9):
>

```javascript
$(window).bind("message", function (e) {
	$("#iframe").css("height", e.originalEvent.data.height + "px");
});
```

>
><i class="glyphicon glyphicon-hand-right"></i> **Attention!** Not every page reports its size to the merchant’s system. However, Saferpay has to forward users to third parties during the payment process (Like with the 3D Secure procedure), thus we recommend a minimum size of 450x450 pixels.
>

## <a name="css-usecss"></a> Using CSS

The use of Cascading Style Sheets is available via the following methods:

+ [PaymentPage Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_PaymentPage_Initialize)
+ [Transaction Initialize](https://saferpay.github.io/jsonapi/#Payment_v1_Transaction_Initialize)
+ [Alias Insert](https://saferpay.github.io/jsonapi/#Payment_v1_Alias_Insert)

With a request using the **Styling** container, the **CssUrl** parameter must be forwarded, alongside a reference to the CSS file which is to be used.

## <a name="css-element"></a> CSS Elements

**Element Name**

```
h1{
  text-decoration: underline;
}
```

**Class Name**

```
h1{
  text-decoration: underline;
}
```

>
><i class="glyphicon glyphicon-hand-right"></i> **Tip:** Most modern browsers include tools that simplify designing with CSS. CSS can thus be edited directly in the browser, and the results can be observed.
>

* Example for Chrome browser: 

With the right mouse button, click the item to be edited:  

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_pp_inspect.png "Inspect")

It opens a menu which shows the HTML code and the CSS classes with the corresponding attributes:  

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_inspect_code.png "Inspect code")

As an example, the text colour is adjusted here (attributes can also be added and removed, if supported by the browser):  

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_inspect_color.png "Inspect color")

The change is immediately displayed in the browser. Then, the code simply needs to be transferred to the CSS file:  

![alt text](https://raw.githubusercontent.com/saferpay/sndbx/master/images/iframe_pp_card_data.png "See changes")

The following elements should **NOT** be used:

+ **Element ID:** Element ID should not be used because the ID used may change without notice.

+ **Element Attribute:** Element attributes should not be used, because attributes (name, value, data-*, etc.) can change without notice.

## <a name="css-selector"></a> CSS Selectors

As a principle, all CSS selectors for CSS1, CSS2 and CSS3 are supported.

## <a name="css-info"></a> More Information

+ The CSS file that is referenced by the CssUrl parameter must be stored on a web server that supports HTTPS.

+ Within the CSS file, graphics must be loaded via “HTTPS://”. Otherwise, a warning is displayed in the browser, such as: “[…] this page includes other resources which are not secure. […]".

+ When aiming for the PCI DSS SAQ-A compliance, you must set the **ContentSecurityEnabled** parameter to true. Furthermore, you have to consider the following things:
++ Every bit of code must be contained within one CSS-file. Importing other files is not supported!
++ Image-files must be loaded via a Data-Url within the CSS file itself!

+ It is recommended to display a progress bar while something is loading in an Iframe.

+ The PCI specifications do **NOT** allow jumping into the Iframe with JavaScript.

+ If forwarding to a third party occurs within an Iframe, it is possible that this will pop out from the Iframe because showing one’s own website within an Iframe is not permitted. This behaviour is familiar from PayPal.

With PayPal payments, it is recommended to eject into a Success, Abort or Fail page from the Iframe when returning to the shop.

>
>    <i class="glyphicon glyphicon-hand-right"></i> Example of Iframe break out JavaScript
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
><i class="glyphicon glyphicon-hand-right"></i> **Attention!** When this is done, the return site is reloaded. The call-up thus occurs twice!
>
