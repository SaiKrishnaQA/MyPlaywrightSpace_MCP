# Test Plan: SauceDemo Login

**Target:** https://www.saucedemo.com
**Seed:** tests/seed.spec.ts
**Date:** 2026-09-17

## Overview
Validate the SauceDemo login form for a successful standard-user login, a locked account, missing credentials, and invalid credentials. Each scenario starts from a fresh login page and uses `secret_sauce` wherever a password is required.

## Preconditions
- The SauceDemo site is reachable at `https://www.saucedemo.com`.
- Each scenario starts on a fresh login page with no previously entered values or authenticated state.
- Use `secret_sauce` as the password for all scenarios that submit a password.

## Scenarios

### Scenario 1.1 — Standard user logs in successfully
- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** Fresh SauceDemo login page is displayed.
- **Steps:**
  1. Enter `standard_user` in the Username field — expected: the username value is present.
  2. Enter `secret_sauce` in the Password field — expected: the password is masked and present.
  3. Select the Login button — expected: the application navigates to the inventory page.
- **Assertions:**
  - The URL is the inventory page (`/inventory.html`).
  - The Products heading and inventory content are visible.
- **Edge cases considered:**
  - Password is entered as a masked value.
  - The scenario must begin unauthenticated and must not depend on another scenario.

### Scenario 1.2 — Locked-out user is rejected
- **Priority:** P0
- **Tags:** @regression
- **Preconditions:** Fresh SauceDemo login page is displayed.
- **Steps:**
  1. Enter `locked_out_user` in the Username field — expected: the username value is present.
  2. Enter `secret_sauce` in the Password field — expected: the password is masked and present.
  3. Select the Login button — expected: login is rejected and the login page remains displayed.
- **Assertions:**
  - The error message `Epic sadface: Sorry, this user has been locked out.` is visible.
  - The application does not navigate to `/inventory.html`.
- **Edge cases considered:**
  - A valid password must not allow a locked account to authenticate.
  - The error should be associated with the login form and remain observable after submission.

### Scenario 1.3 — Empty username is rejected
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Fresh SauceDemo login page is displayed.
- **Steps:**
  1. Leave the Username field empty — expected: no username value is present.
  2. Enter `secret_sauce` in the Password field — expected: the password is masked and present.
  3. Select the Login button — expected: submission is rejected without navigation.
- **Assertions:**
  - The error message `Epic sadface: Username is required` is visible.
  - The application remains on the login page.
- **Edge cases considered:**
  - The password is supplied, so the username validation message is isolated.
  - No authenticated inventory state is created.

### Scenario 1.4 — Empty password is rejected
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Fresh SauceDemo login page is displayed.
- **Steps:**
  1. Enter `standard_user` in the Username field — expected: the username value is present.
  2. Leave the Password field empty — expected: no password value is present.
  3. Select the Login button — expected: submission is rejected without navigation.
- **Assertions:**
  - The error message `Epic sadface: Password is required` is visible.
  - The application remains on the login page.
- **Edge cases considered:**
  - The username is valid, so the password validation message is isolated.
  - The empty password must not be treated as an invalid-credentials attempt.

### Scenario 1.5 — Invalid credentials are rejected
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** Fresh SauceDemo login page is displayed.
- **Steps:**
  1. Enter an invalid username such as `invalid_user` in the Username field — expected: the username value is present.
  2. Enter `secret_sauce` in the Password field — expected: the password is masked and present.
  3. Select the Login button — expected: login is rejected and the login page remains displayed.
- **Assertions:**
  - The error message `Epic sadface: Username and password do not match any user in this service` is visible.
  - The application does not navigate to `/inventory.html`.
- **Edge cases considered:**
  - The password is valid for SauceDemo, but the username is not recognized.
  - The invalid-credentials message is distinct from the locked-user message.

## Not covered (and why)
- Logout and authenticated inventory behavior are outside the requested login-flow coverage.
- Other SauceDemo users, malformed input formats, and session persistence are not covered because they were not requested.