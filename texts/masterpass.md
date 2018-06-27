# Masterpass

Masterpass is a Wallet-Solution introduced by Mastercard.
It is **NOT** a typical payment method, like Mastercard, it is more like a database, that contains payment methods, that can be registered there by the card holder.
Masterpass can indeed contain Mastercard, as well as Visa and other payment means, which will then be used for the transaction.
This chapter will cover all things worth to know about Masterpass!

## <a name="mp-special"></a> Special Cases

+ **Delivery address:** Saferpay can capture the delivery address in multiple ways. Either the merchant does capture it himself and submits the data through the respective request, or, in case of the [Payment Page](Integration_PP.html), the page does offer respective forms, that can capture the address! In case of Masterpass however, the address is saved within the Masterpass Wallet of the card holder. Should the delivery address be captured, using one of the other methods, it will be overwritten by the wallet-address!
