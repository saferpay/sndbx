# TLS Security and Communication Settings
We regularly review our security settings and try to find an optimal balance between maximum security and backward compatibility. Due to current developments in communication standards and regulatory requirements, it is nevertheless necessary to make occasional adjustments to our communication endpoints.

## TLS Version
For encrypted communication (HTTPS) with Saferpay, **TLS 1.2** must be used as protocol for transport encryption. Unencrypted communication (HTTP) or earlier versions of TLS or SSL are not supported.

## Cipher Suites
Furthermore, at least one of the following encryption algorithms (Cipher Suites) must be used to establish a connection to Saferpay:

- TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384
- TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256
- TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
- TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384
- TLS_DHE_RSA_WITH_AES_256_GCM_SHA384
- TLS_DHE_RSA_WITH_AES_128_GCM_SHA256
