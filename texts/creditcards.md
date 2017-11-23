# Credit Cards - Special Cases

Though we at SIX Payment Services do offer the possibility to process credit cards, it sometimes is necessary to involve third parties in order to process credit cards in certain countries and regions.
This chapter will cover the special characteristics you need to consider, if you want to use Saferpay with these processors.

### <a name="cc-chase"></a> Chase Paymentech

Chase Paymentech is a US credit card processor with office in Dallas, Texas.
SIX Payment Services offers the pssibility to process credit cards over this processor, directly in the US.
However please take note to the following restrictions and characteristics.

+ **OrderId:** Due to technical restrictions, the **OrderId** will not be forwarded to Chase to be shown on your reconciliation-files from chase. Saferpay will instead fill it with a unique, increasing, numeric value, to meet Chase Paymentechs requirements. Therefore a later identification through the **OrderId** will not be possible!
