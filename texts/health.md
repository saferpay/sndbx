# API Health Check

The API Health check is used to determine, whether, or not the Saferpay-Environments are generally available.
This function is available for test and production respectively and involves a simple POST call to the following URL:

+ **Live:** <code>https://www.saferpay.com/api/health/[YOUR CUSTOMERID]</code>
+ **Test:** <code>https://test.saferpay.com/api/health/[YOUR CUSTOMERID]</code>

<div class="danger">
  <p><strong>IMPORTANT NOTE:</strong> When using the Health-Check, you agree to the following rules:</p>
  <ul>
    <li>Do not poll the API status, without any limiter (see below!).</li>
    <li>Restrict yourself to 1 request every 5 minutes!</li>
    <li>Do not check the API status befor every transaction!</li>
  </ul>
  <p>Saferpay reserves the right to limit access to this part of the API, in case of violation!</p>
</div>

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
