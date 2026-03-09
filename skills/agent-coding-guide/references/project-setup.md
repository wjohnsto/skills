---
description: >-
    Base technologies, file structure, and configuration for new apps.
metadata:
    tags: [setup, tech-stack, file-structure, prettier, docker]
---

# Project Setup

## Base technologies

When starting a new app, use the following:

- Bun
- TypeScript
- Hono
- Zod
- Pino (logging)
    - pino-pretty
    - pino-http
- Handlebars
- HTMX
- CSS (not Tailwind)
- Docker
- Prettier
- SQLite

Every app should have the following scripts in the package.json:

- `dev` - run a dev server and watch for changes
- `build` - build for production
- `start` - start a production server
- `format` - run prettier on all the files
- `test` - run all tests

### Prettier config

Put this in the `package.json`:

```json
{
    "trailingComma": "all",
    "tabWidth": 2,
    "semi": true,
    "singleQuote": true,
    "printWidth": 80,
    "bracketSpacing": true,
    "arrowParens": "always",
    "overrides": [
        {
            "files": ["*.md"],
            "options": {
                "tabWidth": 4
            }
        }
    ]
}
```

### Docker

Use a multi-stage Dockerfile so the final Docker image is as small as possible.

### TypeScript

Use the [typescript-style-guide](../../typescript-style-guide/SKILL.md) skill when writing TypeScript.

## File structure

- `__tests__` should contain all tests
- Keep all app code in a `src` directory
    - It is okay to have a `public` directory on the root for public frontend files
- Within a backend app you should use the following folders when necessary:
    - `src/components` - stores all the controllers, routes, and models for a bounded context (data type) within the app within their own folders
        - e.g. `src/components/users` would contain all the CRUD operations for a user
    - `src/services` - contains all the logic needed to hit external APIs
    - `src/utils` - contains all the logic for internal utility functions such as string/type conversions, date logic, etc.
    - `src/views` - contains the views/partials
    - `src/config.ts` - maps environment variables and other configuration into an object that can be used in other files
    - `src/index.ts` - contains only the logic needed to run the server
    - `src/app.ts` - contains the app setup logic (e.g. top-level routes, cors, session setup, etc.)
    - `src/db.ts` - contains the setup and connection logic for the database

### Component structure

Each component (`src/components/*`) should have separate files for:

- `router` - Defines the routes/API for the component and contains minimal logic needed to pull data off of the request object and respond
- `controller` - Contains the bulk of the business logic. Should not interact with the request and response objects directly.
- `model` - Contains the data logic (i.e. mapping from objects to database columns, etc.). This includes functions for performing actions on the database.
- `validator` - Uses zod to validate all API request bodies
