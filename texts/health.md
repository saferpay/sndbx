# API Health Check

The API "Health check" is used to determine, whether the Saferpay environments are generally available.
This function is available for test and production respectively and involves a simple **GET** call to the following URL:

+ **Live:** <code>https://www.saferpay.com/api/health/[YOUR CUSTOMERID]</code>
+ **Test:** <code>https://test.saferpay.com/api/health/[YOUR CUSTOMERID]</code>


<div class="danger" style="min-height: 75px;">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>When using the Health check API, you agree to the following rules:</p>
  <ul>
    <li>Do not poll the API status without any limitation (see below).</li>
    <li>Restrict yourself to 1 request every 5 minutes.</li>
    <li>Do not check the API status before every transaction.</li>
  </ul>
  <p>In case of violation, Saferpay reserves the right to limit access to this API.</p>
</div>

The API responds in two ways:

## Success

The success case returns <code> 200 (OK)</code>.

```json
{
  "Status": "PASS"
}
```

## Failure

The failure case depends on what is happening, but in case of an unavailability of the Saferpay Service, the response-code would simply be anything else than <code>200(OK)</code>.
