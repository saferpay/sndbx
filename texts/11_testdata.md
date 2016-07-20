# 11 - Test data

On the Saferpay Testsystem are various simulators available.
Those take different means of payment, that will trigger different behaviour.
In order to simulate specific cases, please choose from the tables below.

## IMPORTANT NOTES!

+ The simulators do not accept genuine credit cards or payment means. Those will **ALWAYS** trigger a failed transaction.
+ You can enter any value for the CVC and expiration date. Saferpay will only check for its existance and, in case of the expiration date, that it is valid (Not in the past).



## <a name="visa"></a> VISA

<table class="table table-striped">
  <thead>
    <tr>
      <th>Card number</th>
      <th>Behaviour</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>9010100052000004</td>
      <td>
        Card <b>enrolled</b>. This card is subjected to the full 3D Secure authentication process. <br />
        Liability shift: YES (ECI=1, Authenticated=true)
      </td>
    </tr>
  </tbody>
</table>
