# Payment Means for testing

In this Chapter you will find a list of payment means you can use for testing purposes!

### <span id="visa-cards"><a name="pm-visa">VISA &dArr;</a></span>
<div id="visa-cards-hider" style="display:none;">
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
        <td style="word-break: unset;">9010101052000002</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"not enrolled"</strong>. Bank grants liability shift! <br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> false</td>
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

### <span id="master-cards"><a name="pm-mc"></a> Mastercard &dArr;</span>
<div id="master-cards-hider" style="display:none;">
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
        <td style="word-break: unset;">9030101052000008</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"not enrolled"</strong>. Bank grants liability shift! <br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> false</td>
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

### <span id="amex-cards"><a name="pm-amex"></a> American Express &dArr;</span>
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
        <td style="word-break: unset;">9070101052000009</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"not enrolled"</strong>. Bank grants liability shift! <br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> false</td>
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

### <span id="diners-cards"><a name="pm-diners"></a> Diners Club &dArr;</span>
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
        <td style="word-break: unset;">9050101052000003</td>
        <td style="border-left: 1px solid #ddd;">Card <strong>"not enrolled"</strong>. Bank grants liability shift! <br /><strong>Liability shift:</strong> YES, <strong>Authenticated:</strong> false</td>
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

### <span id="maestro-cards"><a name="pm-maestro"></a> Maestro International &dArr;</span>
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

### <span id="jcb-cards"><a name="pm-jcb"></a> JCB &dArr;</span>
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

### <span id="myone-cards"><a name="pm-myone"></a> My One &dArr;</span>
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

### <span id="bonus-cards"><a name="pm-bonus"></a> Bonus Card &dArr;</span>
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

### <span id="bc-cards"><a name="pm-bc"></a> Bancontact &dArr;</span>
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

### <span id="sepa-cards"><a name="pm-sepa"></a> SEPA Direct Debit &dArr;</span>
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

### <span id="paypal-cards"><a name="pm-paypal"></a> PayPal &dArr;</span>
<div id="paypal-cards-hider" style="display:none;">
  <p>PayPal payments can be operated by a simulator in the Saferpay test account. The first version of the simulator supports successful transactions and declines only. The range of function will be upgraded soon.</p>
</div>

### <span id="twint-cards"><a name="pm-twint"></a> TWINT &dArr;</span>
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
