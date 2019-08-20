# Payment Means for testing

In this Chapter you will find a list of payment means you can use for testing purposes!
<div class="danger">
  <p><strong>Warning: DO NOT</strong> use real credit card details, when testing on the Saferpay test-environment! Even though the test accounts cannot process real payment means, it is also important to not share them in the first place on the test-system, for security reasons!</p>
</div>
<div class="info">
    <p><strong>Note:</strong> The CVC can be any value you want, same goes for the Expiration-date. However, the latter needs to be valid. If you enter a date set in the past, the card will be rejected, because it is expired!</p>
  </div>

<a name="pm-visa"></a><div class="dropdown" id="visa-cards">VISA &dArr;</div>
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
