# Glossary





<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th class="text-center">Term</th>
      <th class="text-center">Explanation</th>
      <th class="text-center">Where to find it</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center"><strong>CustomerId</strong></td>
      <td><p>This is your primary account-number! Everything else about your Account is directly linked to this ID e.g.: Terminals, Card Aliases, Backoffice-Accounts, JSON-API Credentials and more!</p></td>
      <td><p>The CustomerId is part of many other things. For example your Backoffice userId: e<strong>123456</strong>001 . It also is contained within your JSON-API userId: API_<strong>123456</strong>_12345678. dditionally, it is displayed inside the Backoffice under <strong>Settings > JSON API Basic Authentication</strong> and <strong>Settings > JSON API Client Certificate</strong>.</p></td>
    </tr>
    <tr>
      <td class="text-center"><strong>TerminalId</strong></td>
      <td><p>A terminal always belongs to a Customerid and thus one account. The terminal contains certain payment methods, the connected contracts to those payment methods e.g. your acquiring contracts for credit cards, the supported currencies and other settings, like 3D Secure. Each terminal can only have one processor for a given payment method. If you want to process the same payment method over different processors, you need to have two different terminals. Each Saferpay account (CustomerId) can have multiple accounts beneath it. This could also be helpful, if you want to operate multiple shops under one Saferpay account (CustomerId).</p></td>
      <td><p>You can find each terminal inside the Saferpay Backoffice under <strong>Settings > Terminals</strong></p></td>
    </tr>
    <tr>
      <td class="text-center"><strong>Backoffice Login</strong></td>
      <td><p>This is your login to the Saferpay Backoffice and it is directly connected to your CustomerId and thus your Saferpay account. In fact it incorporates the CustomerId. A Backoffice login may look like this: e<strong>123456</strong>001. The first being the type of the login, e for E Commerce, t for technician for example, the second being your CustomerId and the last the overall number of the login for said account.</p></td>
      <td><p>The login will only be sent towards the login owner, that had be requested durign the signing of the Saferpay contract. New logins may be requested, but only through the contract holder of the Saferpay account him/herself.<p></td>
    </tr>
    <tr>
      <td class="text-center"><strong>API Credentials (API User/API Password)</strong></td>
      <td><p>These are your API authentication credentials. They're needed so your shop may authenticate itself which each request, towards our payment gateway. <strong> DO NOT CONFUSE THEM WITH YOUR BACKOFFICE LOGIN AND PASSWORD!</strong> Those are two different things. Each credential pair is linked directly to one CustomerId and only that Id. If you try to authenticate a different CustomerId, with credentials, that aren't connected to said Id, the request will fail. You can easily find out, if a CustomerId and API-user are connected together, by checking the userId itself. The customerId is part of said id: API_<strong>123456</strong>_12345678</a></p></td>
      <td><p>On the test-environment, you'll get these credentials automatically, with your registration mail. However on the live-system, you need to create them inside the Saferpay Backoffice under <a href="https://test.saferpay.com/BO/Settings/JsonApiLogin"><strong>Settings > JSON API Basic Authentication</strong>. There you'll also find a list with previously created  userIds (Also applies to the automatically created test-credentials!). However, please note, that we only save the password encrypted! There is no way to recover it, should you lose it, so keep it somewhere safe, like a password-safe! You can however always create new credentials. Up to 10 are supported per Saferpay account. After that, you need to delete previously created ones.</p></td>
    </tr>
  </tbody>
</table>
