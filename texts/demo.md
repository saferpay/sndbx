<div class="warning" style="min-height: 75px;">
  <span class="glyphicon glyphicon-exclamation-sign" style="color: rgb(240, 169, 43);font-size: 55px;float: left;height: 75px;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>SITE MOVED:</strong> This documentation is outdated, as of July 26th 2021. The new and improved documentation can be found under <a href="https://docs.saferpay.com/home/integration-guide/introduction">https://docs.saferpay.com/</a>.</p>
</div>

# API-Demo

Implementing a new API can be quite challanging and while while we at SIX Payment Services strive to provide a complete and easy to understand documentation, it often is a good help to see and experience how the API works in case of an example.

This chapter of the documentation will provide you with an excerpt of the tools and flows the Saferpay JSON-Api does provide you with.
Note that the requests can be edited in certain ways to simulate different bahaviors, like the registration of an alias using the Payment Page and more. Feel free to try everything out, so you can see how the API behaves.

<div class="info">
  <p><strong>NOTE:</strong> Some API-functions are embedded within the examples, because some require some steps to be executed beforehand. For example a referenced refund can only be executed, if a normal transaction has been authorized and captured, so it can be refunded. Also, if you register an alias using the transaction interface, payment page, or alias store, the examples will display different options to use said alias at the end of the initial flow!</p>
</div>

## Please choose a demo

+ [Payment Page](https://saferpay.github.io/sndbx/pp_demo.html)
+ [Transaction Interface](https://saferpay.github.io/sndbx/trx_demo.html)
+ [Secure Alias Store](https://saferpay.github.io/sndbx/scd_demo.html)
