# hello-build-test-frontend setup


A react project interface to login, create user, validate session, connect using GitHub OAuth to list all the repositories and the starred repositores, also with a search functionality and supports both _English_ and _Spanish_ languages .

## Tech Stack

- React
- TypeScript
- Vite
- Material UI
- Material UI Icons
- React Hook Form
- React Router
- i18next (multi-language support)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run in development mode

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

## Authentication

For security purposes, a **login and signup system was implemented**, using jwt tokens to authenticate users.


## Language Support

The app supports both _English_ and _Spanish_. You can switch languages using the LanguageSwitcher at the top right corner using the Dashboard or in the Login section just under the Log in button.

## Form Validations

- Email and password validation.
- No spaces allowed in input.
- No spaces allowed in input.
- Must start with a letter.
- All fields are required.

## Features

- Login.
- Language Switcher.
- GitHub OAuth redirection.
- List all the repositories from GitHub.
- List all the starred repositories from GitHub.
- Search functionality for repositories.
