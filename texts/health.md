# Payment Page Interface


<div class="danger">
  <p><strong>IMPORTANT NOTE:</strong> You may not use this function to poll the status, or otherwise overuse it! Saferpay reserves the right to revoke your right to do any further requests towards the health-check API!</p>
</div>

The API Health check is used to determine, whether, or not the Saferpay-Environments are generally available.
This function is available for test and production respectively and involves a simple POST call to the following URL:

+ **Live:** <code>https://www.saferpay.com/api/health/[YOUR CUSTOMERID]</code>
+ **Test:** <code>https://test.saferpay.com/api/health/[YOUR CUSTOMERID]</code>

This may be expanded on, in the future, but for now the API responds in two ways:

## Success

In case of a success, the API resonds the following way:
<code> 200 (OK)</code>
```json
{
  "Status": "PASS"
}
```

## Success

The failure-case depends on what is happening, but in case of an unavailability of the Saferpay Service, the response-code would simply be != <code>200(OK)</code>!
