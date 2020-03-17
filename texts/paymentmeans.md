# Payment Means for testing

In this Chapter you will find a list of payment means you can use for testing purposes!

<div class="danger">
  <span class="glyphicon glyphicon-remove-sign" style="color: rgb(224, 122, 105);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p><strong>Warning: DO NOT</strong> use real credit card details, when testing on the Saferpay test-environment! Even though the test accounts cannot process real payment means, it is also important to not share them in the first place on the test-system, for security reasons!</p>
</div>
<div class="info">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
  <p>
    <strong>Note:</strong> Some testing-methods may not be activated by default. In these cases, you can contact the <a href="mailto:integration.saferpay@six-payment-services.com">Saferpay Integration Support</a>, if you want a specific payment method for testing on a specific terminal.
  </p>
</div>
<div class="info">
  <span class="glyphicon glyphicon-info-sign" style="color: rgb(110, 199, 215);font-size: 55px;height: 75px;float: left;margin-right: 15px;margin-top: 0px;"></span>
    <p><strong>Note:</strong> The CVC can be any value you want, same goes for the Expiration-date. However, the latter needs to be valid. If you enter a date set in the past, the card will be rejected, because it is expired!</p>
</div>

<a name="pm-visa"></a><div class="dropdown" id="visa-cards">VISA &dArr;</div>
<div id="visa-cards-hider" style="display:none;">
  <h2>For 3D Secure 2</h2>
  <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Card Number</th>
          <th class="text-center">Test-case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="word-break: unset;">9010003150000001</td>
          <td style="border-left: 1px solid #ddd;">Frictionless Y. Card simulates a fully successful Frictionless Flow!<br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9010003750000005</td>
          <td style="border-left: 1px solid #ddd;">3DS Failure, authorization will be attempted. This card fails the 3DS authentication. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift!<br /><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> false</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9010004950000001</td>
          <td style="border-left: 1px solid #ddd;">Challenged Y. This card simulates a successful challenged flow.<br /><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9010004250000008</td>
          <td style="border-left: 1px solid #ddd;">Challenged A. The authentication was not successful, but LiabilityShift is still granted.<br /><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> false</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9010004350000007</td>
          <td style="border-left: 1px solid #ddd;">Challenged N. The 3DS authentication failed. An authorization will not be attempted. The transaction fails in this case!<br /><strong>Liability shift:</strong> N/A, <strong>Authenticated:</strong> N/A</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9010004150000009</td>
          <td style="border-left: 1px solid #ddd;">3DS Failure, authorization will be attempted. This card fails the 3DS authentication. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift! Crd goes through a Challanged flow beforehand!<br /><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> false</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9010403104000000</td>
          <td style="border-left: 1px solid #ddd;">Frictionless Y with DCC. This card additionally will perform DCC. Card currency is USD!<br /><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9010503104000007</td>
          <td style="border-left: 1px solid #ddd;">Frictionless Y with DCC. This card additionally will perform DCC. Card currency is JPY!<br /><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9010403153150003</td>
          <td style="border-left: 1px solid #ddd;">General Decline. This card fails the authorization and also the card check!<br /><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9010403153900001</td>
          <td style="border-left: 1px solid #ddd;">Card for simulating response codes via the amount. The last two digits inside the amount are important. Down below you'll find some examples for return-codes/amounts. <strong>Important Note:</strong> These are the most common codes! However some Issuers may return codes not on this list!<br />
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Amount</th>
                <th class="text-center">Processor Message</th>
              </tr>
            </thead>
              <tr>
                <td style="word-break: unset;">00</td>
                <td style="border-left: 1px solid #ddd;">See Frictionless Y.<br /><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td>
              </tr>
              <tr>
                <td style="word-break: unset;">01</td>
                <td style="border-left: 1px solid #ddd;">Successful Authorization and 3DS process. However LiabilityShift will be rejected during authorization<br /><strong>Liability shift:</strong> false (<strong>ThreeDs will be true!</strong>) <strong>Authenticated:</strong> true</td>
              </tr>
              <tr>
                <td style="word-break: unset;">62</td>
                <td style="border-left: 1px solid #ddd;">Restricted Card</td>
              </tr>
              <tr>
                <td style="word-break: unset;">51</td>
                <td style="border-left: 1px solid #ddd;">Insufficient Funds</td>
              </tr>
              <tr>
                <td style="word-break: unset;">43</td>
                <td style="border-left: 1px solid #ddd;">Stolen Card</td>
              </tr>
              <tr>
                <td style="word-break: unset;">34</td>
                <td style="border-left: 1px solid #ddd;">Suspicion of manipulation</td>
              </tr>
              <tr>
                <td style="word-break: unset;">33</td>
                <td style="border-left: 1px solid #ddd;">Card Expired</td>
              </tr>
              <tr>
                <td style="word-break: unset;">30</td>
                <td style="border-left: 1px solid #ddd;">Format Error</td>
              </tr>
              <tr>
                <td style="word-break: unset;">14</td>
                <td style="border-left: 1px solid #ddd;">Invalid Card</td>
              </tr>
              <tr>
                <td style="word-break: unset;">12</td>
                <td style="border-left: 1px solid #ddd;">Invalid Transaction</td>
              </tr>
              <tr>
                <td style="word-break: unset;">09</td>
                <td style="border-left: 1px solid #ddd;">Processing temporarily not possible</td>
              </tr>
              <tr>
                <td style="word-break: unset;">05</td>
                <td style="border-left: 1px solid #ddd;">Authorization declined</td>
              </tr>
              <tr>
                <td style="word-break: unset;">04</td>
                <td style="border-left: 1px solid #ddd;">Card Invalid</td>
              </tr>
              <tr>
                <td style="word-break: unset;">03</td>
                <td style="border-left: 1px solid #ddd;">Invalid Merchant Number</td>
              </tr>
            <tbody>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  
  <h2>For 3D Secure 1</h2>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Card Number</th>
        <th class="text-center">Test-case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="word-break: unset;">9010100052000004</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"enrolled"</strong>. This card is subjected to the full 3D Secure authentication process! <br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
        <td style="word-break: unset;">9010101052000002</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"not enrolled"</strong>. Bank grants liability shift! <br />    <strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> false</td>
      </tr>
      <tr>
        <td style="word-break: unset;">9010100052101000</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"enrolled"</strong>. Bank rejects liability shift despite a successful authentication!<br /><strong>Liability shift:</strong> NO, <strong>Authenticated:</strong> true <br />
          <div class="warning">
            <p><strong>Important:</strong> Saferpay will still attempt the authorization! Accepting or declining this transaction is up to the merchant!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9010100352000001</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Authentication Attempt"</strong>. Simulates an authentication attempt, where the bank grants the liability shift<br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> false <br />
        </td>
        </tr>
      <tr>
        <td style="word-break: unset;">9010101052101008</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"not enrolled"</strong>. Bank rejects liability shift!<br /><strong>Liability shift:</strong> NO, <strong>Authenticated:</strong> false<br />
          <div class="warning">
            <p><strong>Important:</strong> Saferpay will still attempt the authorization! Accepting or declining this transaction is up to the merchant!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9010101152000001</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Unable to enroll"</strong>. 3D Secure is not possible! <br /><strong>Liability shift:</strong> NO, <strong>Authenticated:</strong> false<br />
          <div class="warning">
            <p><strong>Important:</strong> Saferpay will still attempt the authorization! Accepting or declining this transaction is up to the merchant!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9010100152000003</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Authentication failed"</strong>. The card holder failed to authenticate him/herself!<br />
          <div class="warning">
            <p><strong>Important:</strong> In this case, the authorization will fail!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9010101052900003</td>
        <td style="border-left: 1px solid #ddd;">Card for <strong>"simulating response codes" via the amount</strong>. <br /> The last two digits in the currency amount determine the issuance of the authorisation request. A successful payment is only triggered with a value equal to "00" or "01". While requests with the AMOUNT "00" simulate a request with an "enrolled" card, the amount "01" simulates a transaction without a liability shift. For all other values that are different to "00" or "01", a rejection is simulated with the authorisation.
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9010500004000004</td>
        <td style="border-left: 1px solid #ddd;">Card for <strong>"simulating DCC"</strong> with the card currency JPY.
        </td>
      </tr>
       <tr>
        <td style="word-break: unset;">9010400004000007</td>
        <td style="border-left: 1px solid #ddd;">Card for <strong>"simulating DCC"</strong> with the card currency USD.
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9010000004150008</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Card Check failed"</strong>. <br />A decline will simulated by the internal card check with Alias Insert. Authorization requests with this card will be declined as well.
        </td>
      </tr>
    </tbody>
  </table>
</div>

<a name="pm-mc"></a><div id="master-cards" class="dropdown">Mastercard &dArr;</div>
<div id="master-cards-hider" style="display:none;">
  <h2>For 3D Secure 2</h2>
  <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Card Number</th>
          <th class="text-center">Test-case</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="word-break: unset;">9030003150000007</td>
          <td style="border-left: 1px solid #ddd;">Frictionless Y. Card simulates a fully successful Frictionless Flow!<br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9030003750000001</td>
          <td style="border-left: 1px solid #ddd;">3DS Failure, authorization will be attempted. This card fails the 3DS authentication. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift!<br /><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> false</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9030004950000007</td>
          <td style="border-left: 1px solid #ddd;">Challenged Y. This card simulates a successful challenged flow.<br /><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9030003204000003
          <td style="border-left: 1px solid #ddd;">Challenged A. The authentication was not successful, but LiabilityShift is still granted.<br /><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> false</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9030004350000003</td>
          <td style="border-left: 1px solid #ddd;">Challenged N. The 3DS authentication failed. An authorization will not be attempted. The transaction fails in this case!<br /><strong>Liability shift:</strong> N/A, <strong>Authenticated:</strong> N/A</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9030004150000005</td>
          <td style="border-left: 1px solid #ddd;">3DS Failure, authorization will be attempted. This card fails the 3DS authentication. Interesting for testing the <strong>Condition</strong> parameter, to stop authorizations without LiabilityShift! Crd goes through a Challanged flow beforehand!<br /><strong>Liability shift:</strong> false, <strong>Authenticated:</strong> false</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9030403104000006</td>
          <td style="border-left: 1px solid #ddd;">Frictionless Y with DCC. This card additionally will perform DCC. Card currency is USD!<br /><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9030503104000003</td>
          <td style="border-left: 1px solid #ddd;">Frictionless Y with DCC. This card additionally will perform DCC. Card currency is JPY!<br /><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9030403153150009</td>
          <td style="border-left: 1px solid #ddd;">General Decline. This card fails the authorization and also the card check!<br /><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
          <td style="word-break: unset;">9030403153900007</td>
          <td style="border-left: 1px solid #ddd;">Card for simulating response codes via the amount. The last two digits inside the amount are important. Down below you'll find some examples for return-codes/amounts. <strong>Important Note:</strong> These are the most common codes! However some Issuers may return codes not on this list!<br />
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Amount</th>
                <th class="text-center">Processor Message</th>
              </tr>
            </thead>
              <tr>
                <td style="word-break: unset;">00</td>
                <td style="border-left: 1px solid #ddd;">See Frictionless Y.<br /><strong>Liability shift:</strong> true, <strong>Authenticated:</strong> true</td>
              </tr>
              <tr>
                <td style="word-break: unset;">01</td>
                <td style="border-left: 1px solid #ddd;">Successful Authorization and 3DS process. However LiabilityShift will be rejected during authorization<br /><strong>Liability shift:</strong> false (<strong>ThreeDs will be true!</strong>) <strong>Authenticated:</strong> true</td>
              </tr>
              <tr>
                <td style="word-break: unset;">62</td>
                <td style="border-left: 1px solid #ddd;">Restricted Card</td>
              </tr>
              <tr>
                <td style="word-break: unset;">51</td>
                <td style="border-left: 1px solid #ddd;">Insufficient Funds</td>
              </tr>
              <tr>
                <td style="word-break: unset;">43</td>
                <td style="border-left: 1px solid #ddd;">Stolen Card</td>
              </tr>
              <tr>
                <td style="word-break: unset;">34</td>
                <td style="border-left: 1px solid #ddd;">Suspicion of manipulation</td>
              </tr>
              <tr>
                <td style="word-break: unset;">33</td>
                <td style="border-left: 1px solid #ddd;">Card Expired</td>
              </tr>
              <tr>
                <td style="word-break: unset;">30</td>
                <td style="border-left: 1px solid #ddd;">Format Error</td>
              </tr>
              <tr>
                <td style="word-break: unset;">14</td>
                <td style="border-left: 1px solid #ddd;">Invalid Card</td>
              </tr>
              <tr>
                <td style="word-break: unset;">12</td>
                <td style="border-left: 1px solid #ddd;">Invalid Transaction</td>
              </tr>
              <tr>
                <td style="word-break: unset;">09</td>
                <td style="border-left: 1px solid #ddd;">Processing temporarily not possible</td>
              </tr>
              <tr>
                <td style="word-break: unset;">05</td>
                <td style="border-left: 1px solid #ddd;">Authorization declined</td>
              </tr>
              <tr>
                <td style="word-break: unset;">04</td>
                <td style="border-left: 1px solid #ddd;">Card Invalid</td>
              </tr>
              <tr>
                <td style="word-break: unset;">03</td>
                <td style="border-left: 1px solid #ddd;">Invalid Merchant Number</td>
              </tr>
            <tbody>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  
  <h2>For 3D Secure 1</h2>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Card Number</th>
        <th class="text-center">Test-case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="word-break: unset;">9030100052000000</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"enrolled"</strong>. This card is subjected to the full 3D Secure authentication process! <br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
        <td style="word-break: unset;">9030100052101006</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"enrolled"</strong>. Bank rejects liability shift despite a successful authentication!<br /><strong>Liability shift:</strong> NO, <strong>Authenticated:</strong> true <br />
          <div class="warning">
            <p><strong>Important:</strong> Saferpay will still attempt the authorization! Accepting or declining this transaction is up to the merchant!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9030100352000007</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Authentication Attempt"</strong>. Simulates an authentication attempt, where the bank grants the liability shift<br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> false <br />
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9030101052101004</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"not enrolled"</strong>. Bank rejects liability shift!<br /><strong>Liability shift:</strong> NO, <strong>Authenticated:</strong> false<br />
          <div class="warning">
            <p><strong>Important:</strong> Saferpay will still attempt the authorization! Accepting or declining this transaction is up to the merchant!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9030101152000007</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Unable to enroll"</strong>. 3D Secure is not possible! <br /><strong>Liability shift:</strong> NO, <strong>Authenticated:</strong> false<br />
          <div class="warning">
            <p><strong>Important:</strong> Saferpay will still attempt the authorization! Accepting or declining this transaction is up to the merchant!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9030100152000009</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Authentication failed"</strong>. The card holder failed to authenticate him/herself!<br />
          <div class="warning">
            <p><strong>Important:</strong> In this case, the authorization will fail!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9030101052900009</td>
        <td style="border-left: 1px solid #ddd;">Card for <strong>"simulating response codes" via the amount</strong>. <br /> The last two digits in the currency amount determine the issuance of the authorisation request. A successful payment is only triggered with a value equal to "00" or "01". While requests with the AMOUNT "00" simulate a request with an "enrolled" card, the amount "01" simulates a transaction without a liability shift. For all other values that are different to "00" or "01", a rejection is simulated with the authorisation.
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9030500004000000</td>
        <td style="border-left: 1px solid #ddd;">Card for <strong>"simulating DCC"</strong> with the card currency JPY.
        </td>
      </tr>
       <tr>
        <td style="word-break: unset;">9030400004000003</td>
        <td style="border-left: 1px solid #ddd;">Card for <strong>"simulating DCC"</strong> with the card currency USD.
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9030000004150004</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Card Check failed"</strong>. <br />A decline will simulated by the internal card check with Alias Insert. Authorization requests with this card will be declined as well.
        </td>
      </tr>
    </tbody>
  </table>
</div>

<a name="pm-amex"></a><div id="amex-cards" class="dropdown">American Express &dArr;</div> 
<div id="amex-cards-hider" style="display:none;">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Card Number</th>
        <th class="text-center">Test-case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="word-break: unset;">9070100052000001</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"enrolled"</strong>. This card is subjected to the full 3D Secure authentication process! <br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
        <td style="word-break: unset;">9070100052101007</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"enrolled"</strong>. Bank rejects liability shift despite a successful authentication!<br /><strong>Liability shift:</strong> NO, <strong>Authenticated:</strong> true <br />
          <div class="warning">
            <p><strong>Important:</strong> Saferpay will still attempt the authorization! Accepting or declining this transaction is up to the merchant!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9070100352000008</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Authentication Attempt"</strong>. Simulates an authentication attempt, where the bank grants the liability shift<br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> false <br />
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9070101052101005</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"not enrolled"</strong>. Bank rejects liability shift!<br /><strong>Liability shift:</strong> NO, <strong>Authenticated:</strong> false<br />
          <div class="warning">
            <p><strong>Important:</strong> Saferpay will still attempt the authorization! Accepting or declining this transaction is up to the merchant!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9070101152000008</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Unable to enroll"</strong>. 3D Secure is not possible! <br /><strong>Liability shift:</strong> NO, <strong>Authenticated:</strong> false<br />
          <div class="warning">
            <p><strong>Important:</strong> Saferpay will still attempt the authorization! Accepting or declining this transaction is up to the merchant!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9070100152000000</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Authentication failed"</strong>. The card holder failed to authenticate him/herself!<br />
          <div class="warning">
            <p><strong>Important:</strong> In this case, the authorization will fail!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9070101052900000</td>
        <td style="border-left: 1px solid #ddd;">Card for <strong>"simulating response codes" via the amount</strong>. <br /> The last two digits in the currency amount determine the issuance of the authorisation request. A successful payment is only triggered with a value equal to "00" or "01". While requests with the AMOUNT "00" simulate a request with an "enrolled" card, the amount "01" simulates a transaction without a liability shift. For all other values that are different to "00" or "01", a rejection is simulated with the authorisation.
        </td>
        </tr>
    </tbody>
  </table>
</div>

<a name="pm-diners"></a><div id="diners-cards" class="dropdown">Diners Club &dArr;</div>
<div id="diners-cards-hider" style="display:none;">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Card Number</th>
        <th class="text-center">Test-case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="word-break: unset;">9050100052000005</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"enrolled"</strong>. This card is subjected to the full 3D Secure authentication process! <br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
        <td style="word-break: unset;">9050100052101001</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"enrolled"</strong>. Bank rejects liability shift despite a successful authentication!<br /><strong>Liability shift:</strong> NO, <strong>Authenticated:</strong> true <br />
          <div class="warning">
            <p><strong>Important:</strong> Saferpay will still attempt the authorization! Accepting or declining this transaction is up to the merchant!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9050100352000002</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Authentication Attempt"</strong>. Simulates an authentication attempt, where the bank grants the liability shift<br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> false <br />
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9050101052101009</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"not enrolled"</strong>. Bank rejects liability shift!<br /><strong>Liability shift:</strong> NO, <strong>Authenticated:</strong> false<br />
          <div class="warning">
            <p><strong>Important:</strong> Saferpay will still attempt the authorization! Accepting or declining this transaction is up to the merchant!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9050101152000002</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Unable to enroll"</strong>. 3D Secure is not possible! <br /><strong>Liability shift:</strong> NO, <strong>Authenticated:</strong> false<br />
          <div class="warning">
            <p><strong>Important:</strong> Saferpay will still attempt the authorization! Accepting or declining this transaction is up to the merchant!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9050100152000004</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Authentication failed"</strong>. The card holder failed to authenticate him/herself!<br />
          <div class="warning">
            <p><strong>Important:</strong> In this case, the authorization will fail!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9050101052900004</td>
        <td style="border-left: 1px solid #ddd;">Card for <strong>"simulating response codes" via the amount</strong>. <br /> The last two digits in the currency amount determine the issuance of the authorisation request. A successful payment is only triggered with a value equal to "00" or "01". While requests with the AMOUNT "00" simulate a request with an "enrolled" card, the amount "01" simulates a transaction without a liability shift. For all other values that are different to "00" or "01", a rejection is simulated with the authorisation.
        </td>
        </tr>
    </tbody>
  </table>
</div>

<a name="pm-maestro"></a><div id="maestro-cards" class="dropdown">Maestro International &dArr;</div>
<div id="maestro-cards-hider" style="display:none;">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Card Number</th>
        <th class="text-center">Test-case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="word-break: unset;">9040100052000008</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"enrolled"</strong>. This card is subjected to the full 3D Secure authentication process! <br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
        <td style="word-break: unset;">9040100052101004</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"enrolled"</strong>. Bank rejects liability shift despite a successful authentication!<br /><strong>Liability shift:</strong> NO, <strong>Authenticated:</strong> true <br />
          <div class="warning">
            <p><strong>Important:</strong> Saferpay will still attempt the authorization! Accepting or declining this transaction is up to the merchant!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9040100352000005</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Authentication Attempt"</strong>. Simulates an authentication attempt, where the bank grants the liability shift<br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> false <br />
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9040100152000007</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Authentication failed"</strong>. The card holder failed to authenticate him/herself!<br />
          <div class="warning">
            <p><strong>Important:</strong> In this case, the authorization will fail!</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="word-break: unset;">9040101052900007</td>
        <td style="border-left: 1px solid #ddd;">Card for <strong>"simulating response codes" via the amount</strong>. <br /> The last two digits in the currency amount determine the issuance of the authorisation request. A successful payment is only triggered with a value equal to "00" or "01". While requests with the AMOUNT "00" simulate a request with an "enrolled" card, the amount "01" simulates a transaction without a liability shift. For all other values that are different to "00" or "01", a rejection is simulated with the authorisation.
        </td>
        </tr>
    </tbody>
  </table>
</div>

<a name="pm-jcb"></a><div id="jcb-cards" class="dropdown">JCB &dArr;</div>
<div id="jcb-cards-hider" style="display:none;">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Card Number</th>
        <th class="text-center">Test-case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="word-break: unset;">9060100052000003</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Success Card"</strong>. This card simulates a successful transaction!</td>
      </tr>
      <tr>
        <td style="word-break: unset;">9060101052900002</td>
        <td style="border-left: 1px solid #ddd;">Card for <strong>"simulating response codes" via the amount</strong>. <br /> The last two digits in the currency amount determine the issuance of the authorisation request. A successful payment is only triggered with a value equal to "00" or "01". While requests with the AMOUNT "00" simulate a request with an "enrolled" card, the amount "01" simulates a transaction without a liability shift. For all other values that are different to "00" or "01", a rejection is simulated with the authorisation.
        </td>
        </tr>
    </tbody>
  </table>
</div>

<a name="pm-myone"></a><div id="myone-cards" class="dropdown">My One &dArr;</div>
<div id="myone-cards-hider" style="display:none;">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Card Number</th>
        <th class="text-center">Test-case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="word-break: unset;">9080100052000009</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Success Card"</strong>. This card simulates a successful transaction!</td>
      </tr>
      <tr>
        <td style="word-break: unset;">9080101052900008</td>
        <td style="border-left: 1px solid #ddd;">Card for <strong>"simulating response codes" via the amount</strong>. <br /> The last two digits in the currency amount determine the issuance of the authorisation request. A successful payment is only triggered with a value equal to "00" or "01". While requests with the AMOUNT "00" simulate a request with an "enrolled" card, the amount "01" simulates a transaction without a liability shift. For all other values that are different to "00" or "01", a rejection is simulated with the authorisation.
        </td>
        </tr>
    </tbody>
  </table>
</div>

<a name="pm-bonus"></a><div id="bonus-cards" class="dropdown">Bonus Card &dArr;</div>
<div id="bonus-cards-hider" style="display:none;">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Card Number</th>
        <th class="text-center">Test-case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="word-break: unset;">9090100052000007</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Success Card"</strong>. This card simulates a successful transaction!</td>
      </tr>
      <tr>
        <td style="word-break: unset;">9090101052900006</td>
        <td style="border-left: 1px solid #ddd;">Card for <strong>"simulating response codes" via the amount</strong>. <br /> The last two digits in the currency amount determine the issuance of the authorisation request. A successful payment is only triggered with a value equal to "00" or "01". While requests with the AMOUNT "00" simulate a request with an "enrolled" card, the amount "01" simulates a transaction without a liability shift. For all other values that are different to "00" or "01", a rejection is simulated with the authorisation.
        </td>
        </tr>
    </tbody>
  </table>
</div>

<a name="pm-bc"></a><div id="bc-cards" class="dropdown">Bancontact &dArr;</div>
<div id="bc-cards-hider" style="display:none;">
  <div class="info">
    <p><strong>Note:</strong> Bancontact uses an authentication-procedure similar to 3D Secure with VISA and MasterCard. However the difference is, that Bancontact will automatically refuse all payments, that aren't fully authenticated. Due to this, there are only these few outcomes possible.</p>
  </div>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Card Number</th>
        <th class="text-center">Test-case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="word-break: unset;">91108000500000005</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"enrolled"</strong>. This card is subjected to the full 3D Secure authentication process! <br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> true</td>
      </tr>
      <tr>
        <td style="word-break: unset;">91108001501800005</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Authentication failed"</strong>. The card holder failed to authenticate him/herself!<br />
          <div class="warning">
            <p><strong>Important:</strong> In this case, the authorization will fail!</p>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<a name="pm-sepa"></a><div id="sepa-cards" class="dropdown">SEPA Direct Debit &dArr;</div> 
<div id="sepa-cards-hider" style="display:none;">
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>IBAN</th>
        <th class="text-center">Test-case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="word-break: unset;">DE17970000011234567890</td>
        <td style="border-left: 1px solid #ddd;"><strong>"Success IBAN"</strong>. IBAN to simulate a successful transaction.</td>
      </tr>
      <tr>
        <td style="word-break: unset;">DE52970000021234567890</td>
        <td style="border-left: 1px solid #ddd;">IBAN to <strong>"simulate response codes"</strong>. <br />
        IBAN for controlling authorisation codes via the amount.<br />
        210nn simumulates a decline, where "nn" is the simmulated decline code.<br />
        Requests with other amounts simumulate positive responses.
        </td>
      </tr>
    </tbody>
  </table>
</div>

<a name="pm-paypal"></a><div id="paypal-cards" class="dropdown">PayPal &dArr;</div>
<div id="paypal-cards-hider" style="display:none;">
  <p>PayPal payments can be operated by a simulator in the Saferpay test account. The first version of the simulator supports successful transactions and declines only. The range of function will be upgraded soon.</p>
</div>

<a name="pm-twint"></a><div id="twint-cards" class="dropdown">TWINT &dArr;</div>
<div id="twint-cards-hider" style="display:none;">
  <p>On the test environment, Saferpay offers a TWINT Simulator for the Currencies CHF only, since this Payment Method is only avalable for the swiss market.<br />
  The Simulator is controlled by submitting different amount-values to simulate the following cases:</p>

  <div class="info">
      <p><strong>Note:</strong> Any other amount will cause a success after 20 seconds!</p>
  </div>

  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Amount</th>
        <th class="text-center">Test-case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="word-break: unset;">6611</td>
        <td style="border-left: 1px solid #ddd;">The execution of the debit callback is delayed by 1 second.</td>
      </tr>
      <tr>
        <td style="word-break: unset;">6612</td>
        <td style="border-left: 1px solid #ddd;">The execution of the debit callback is delayed by 10 seconds.</td>
      </tr>
      <tr>
        <td style="word-break: unset;">6613</td>
        <td style="border-left: 1px solid #ddd;">The execution of the debit callback is delayed by 60 seconds.</td>
      </tr>
      <tr>
        <td style="word-break: unset;">6614</td>
        <td style="border-left: 1px solid #ddd;">The execution of the debit callback is delayed by 120 seconds.</td>
      </tr>
      <tr>
        <td style="word-break: unset;">6615</td>
        <td style="border-left: 1px solid #ddd;">The execution of the debit callback is delayed by 600 seconds.</td>
      </tr>
      <tr>
        <td style="word-break: unset;">6651</td>
        <td style="border-left: 1px solid #ddd;">Returns an authorization declined result</td>
      </tr>
      <tr>
        <td style="word-break: unset;">6661</td>
        <td style="border-left: 1px solid #ddd;">Returns an authorization expired result</td>
      </tr>
    </tbody>
  </table>
</div>
<a name="pm-ideal"></a><div id="ideal-cards" class="dropdown">iDeal &dArr;</div>
<div id="ideal-cards-hider" style="display:none;">
  <p>Saferpay does offer an extensive iDeal simulator. All test-cases are controlled through the simulator-ui, when opening up the payment page.</p>
</div>
<a name="pm-paydirekt"></a><div id="paydirekt-cards" class="dropdown">paydirekt &dArr;</div>
<div id="paydirekt-cards-hider" style="display:none;">
  <p>Saferpay does offer an extensive paydirekt simulator. All test-cases are controlled through the simulator-ui, when opening up the payment page.</p>
</div>
<a name="pm-unionpay"></a><div id="unionpay-cards" class="dropdown">UnionPay &dArr;</div>
<div id="unionpay-cards-hider" style="display:none;">
  <p>Saferpay does offer an extensive unionpay simulator. All test-cases are controlled through the simulator-ui, when opening up the Payment Page. However, you need to use the following test-card, in order to activate it: <strong>9100100052000005</strong></p>
</div>
<a name="pm-postfinance"></a><div id="postfinance-cards" class="dropdown">Postfinance&dArr;</div>
<div id="postfinance-cards-hider" style="display:none;">
  <p>Saferpay does offer an extensive Postfinance simulator, for Postfinance E-Finance and Postfinance Card. All test-cases are controlled through the simulator-ui. <a href="PostFinance.html#pf-alias">The Secure Card Data feature</a> is also supported!</p>
</div>
<a name="pm-applepay"></a><div id="applepay-cards" class="dropdown">Apple Pay&dArr;</div>
<div id="applepay-cards-hider" style="display:none;">
  <p>Saferpay does offer an extensive Apple Pay simulator. All test-cases are controlled through the simulator-ui. Unlike production, you do not need an Apple device, or browser, to test Apple Pay!</p>
</div>


<table class="table table-striped table-hover" style="display: none;">
    <thead>
      <tr>
          <th>Card Number (<strong>BROKEN! DO NOT USE THESE CARDS FOR NOW!</strong>)</th>
        <th class="text-center">Test-case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="word-break: unset;">9030101052000008</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"not enrolled"</strong>. Bank grants liability shift! <br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> false</td>
      </tr>
      <tr>
        <td style="word-break: unset;">9070101052000009</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"not enrolled"</strong>. Bank grants liability shift! <br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> false</td>
      </tr>
      <tr>
        <td style="word-break: unset;">9050101052000003</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"not enrolled"</strong>. Bank grants liability shift! <br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> false</td>
      </tr>
    </tbody>
</table>
