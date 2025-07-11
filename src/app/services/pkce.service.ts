import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PkceService {

  async generatePKCEPair() {
    const randomVerifier = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => ('0' + b.toString(16)).slice(-2))
      .join('');

    const challenge = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(randomVerifier))
      .then(hashBuffer => btoa(String.fromCharCode(...new Uint8Array(hashBuffer)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));

    // Store in local storage if needed
    localStorage.setItem('pkceGeneratedCode', JSON.stringify({ verifier: randomVerifier, challenge }));

    return { verifier: randomVerifier, challenge: challenge };
  }
}
