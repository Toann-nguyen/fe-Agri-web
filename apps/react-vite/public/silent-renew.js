/* eslint-disable */
// Minimal silent renew helper — oidc-client-ts will handle via iframe
// This file exists so /silent-renew.html can complete PKCE code exchange if needed.
// The actual exchange is performed by UserManager.signinSilentCallback() in the iframe context.
if (typeof window !== 'undefined' && window.parent !== window) {
  // iframe silent renew — no-op, UserManager handles state
  void 0;
}
