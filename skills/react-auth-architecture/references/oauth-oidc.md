# OAuth and OIDC

## Roles

- Resource owner: the user or actor granting access.
- Client: the application requesting access.
- Authorization server: issues codes, tokens, and identity claims.
- Resource server: API that accepts access tokens.
- OpenID Provider: OAuth authorization server that also provides identity through OIDC.

## Browser App Flow

- Use Authorization Code with PKCE for browser-based sign-in.
- Generate a verifier and challenge before redirecting.
- Send the user to the authorization endpoint with state, nonce for OIDC, redirect URI, scopes, and PKCE challenge.
- Handle the callback by validating state and exchanging the code through a server-side route or secure auth backend when possible.
- Store session state according to the chosen architecture, usually via secure, HttpOnly, same-site cookies for web apps.

## Token Exchange and Storage

- Keep client secrets server-side.
- Prefer a backend-for-frontend or auth server session over exposing long-lived refresh tokens to React.
- Treat access tokens as short-lived. Refresh with explicit failure states.
- Do not use ID tokens as API access tokens.

## Callback Handling

- Validate `state` to prevent CSRF.
- Validate `nonce` for OIDC ID tokens.
- Check issuer, audience, expiry, signature, and authorized redirect URI.
- Normalize callback errors into user-safe states.

## Logout

- Clear local app session, backend session, and provider session when required.
- Handle front-channel or back-channel logout only when the provider and app architecture support it.
- Make logout idempotent and safe across tabs.
