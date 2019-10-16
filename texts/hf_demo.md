## Hosted Fields Example Page

<div class="info">
  <p><strong>Note:</strong> If you want to test Saferpay Hosted Fields, you can eddit all examples in JSFiddle. Please click on the link on the upper right side of the examples: <i>Edit in JSFiddle</i></p>
</div>

### Here you see samples of the Saferpay Hosted Fields in action.

#### Init Sample
<iframe width="1000px" height="400" src="https://jsfiddle.net/saferpay/gnr0k1o9/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

#### Sample 1
<iframe width="1000px" height="620" src="https://jsfiddle.net/saferpay/o8qb0ghv/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

#### Sample 2
<iframe width="1000px" height="470" src="https://jsfiddle.net/saferpay/xt83g4r2/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### Example of possible Hosted Field usage with all possible Events
<pre style="background: #f4f4f4; border: 1px solid #ddd; border-left: 3px solid #f36d33; color: #666; page-break-inside: avoid;
											font-family: SF Mono, Monaco, Andale Mono, Lucida Console, Bitstream Vera Sans Mono, Courier New, Courier, monospace; 
											font-size: 12px; font-weight: 400; font-style: normal; line-height: 17px; width:1000px; overflow: auto; 
											display: block; word-wrap: break-word;">
// init HostedFields
HostedFields.init(
	'5961CCA944514F42B63659020C0A7714', // HostedFields api key generated in the Backoffice
	'https://www.saferpay.com/hostedfields/123456', // HostedFields url with customerid
	{
		styles: {
			'*:hover': '-webkit-box-shadow: none;',
			'#cardNumber': 'font-weight: bold;',
			'#cvv': 'color: green;'
		},
		// styleCss: '', // <-- also possible
		// styleUrl: '', // <-- also possible
		<b>onSuccess</b>: function (evt) {
			// call JsonApi Server2Server after successful submit
			performPayment(evt.token);
		},
		<b>onReady</b>: function () {
			// ready to use (iframes loaded)
		},
		<b>onBlur</b>: function(evt) {
			console.log(evt.fieldType, evt.id, evt.isValid);
		},
		<b>onFocus</b>: function(evt) {
			console.log(evt.fieldType, evt.id);
		}
	}
);

// call HostedFields submit
HostedFields.submit();</pre>

#### Events
##### onSuccess
<p>This event occurs after a successful form-submit</p>

##### onReady
<p>This event occurs after the onLoaded event, when the page is ready and the iFrames are loaded</p>

##### onBlur
<p>Execute a JavaScript when a user leaves an input field</p>

##### onFocus
<p>Execute a JavaScript when an input field gets focus</p>

### Browser Support
<p>Saferpay Hosted Fields are supported by the following Browsers:</p>
<ul>
  <li>Chrome latest</li>
  <li>Firefox latest</li>
  <li>Internet Explorer XXX</li>
  <li>Safari latest</li>
</ul>

#### Mobile


### Setup & Integration

#### API Key


#### HTML Form


#### Styling


#### Events


#### Field Input Validation