# Payment Means for testing

In this Chapter you will find a list of payment means you can use for testing purposes!

### <span id="visa-cards"><a name="pm-visa"></a> VISA &dArr;</span>
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
