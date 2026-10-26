---
description: >-
    Base technologies, file structure, and configuration for new applications.
metadata:
    tags: [setup, tech-stack, file-structure, prettier, docker]
---

# Project setup

## Base technologies

When you start a new application, use these technologies:

- Bun
- TypeScript
- Hono
- Zod
- Pino (logs)
    - pino-pretty
    - pino-http
- Handlebars
- HTMX
- CSS (not Tailwind)
- Docker
- ESLint
- Prettier
- SQLite

Add these scripts to the `package.json` file of each application:

- `dev`: Run a development server and watch for changes.
- `build`: Build for production.
- `start`: Start a production server.
- `lint`: Lint the files.
- `lint:fix`: Lint the files and apply automatic fixes.
- `format`: Run Prettier on all the files.
- `typecheck`: Check the types, but do not emit the compiled files.
- `test`: Run all tests.

### Prettier configuration

Put this configuration in the `package.json` file:

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

Use a multi-stage Dockerfile to make the final Docker image as small as
possible.

### TypeScript

When you write TypeScript, use the
[typescript-style-guide](../../typescript-style-guide/SKILL.md) skill.

## File structure

- Put all tests in `__tests__`.
- Put all application code in a `src` directory.
    - You can put a `public` directory in the root for public frontend files.
- In a backend application, use these directories and files when necessary:
    - `src/components`: Contains a directory for each bounded context (data
      type) of the application. Each directory contains the controllers,
      routes, and models for its bounded context.
        - For example, `src/components/users` contains all the create, read,
          update, and delete (CRUD) operations for a user.
    - `src/services`: Contains all the logic that calls external APIs.
    - `src/utils`: Contains the logic for internal utility functions. For
      example, string and type conversions, and date logic.
    - `src/views`: Contains the views and partials.
    - `src/config.ts`: Maps environment variables and other configuration into
      an object that other files can use.
    - `src/index.ts`: Contains only the logic that runs the server.
    - `src/app.ts`: Contains the setup logic of the application. For example,
      top-level routes, cross-origin resource sharing (CORS), and
      session setup.
    - `src/db.ts`: Contains the setup and connection logic for the database.

### Component structure

Give each component (`src/components/*`) a separate file for each of these
parts:

- `router`: Defines the routes and the API of the component. Contains only the
  minimal logic that gets data from the request object and sends the response.
- `controller`: Contains most of the business logic. Does not use the request
  and response objects directly.
- `model`: Contains the data logic, for example the map from objects to
  database columns. This includes the functions that do actions on the
  database.
- `validator`: Uses Zod to validate all API request bodies.
