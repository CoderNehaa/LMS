# Project Structure

## Project Architecture Overview

This project follows **OOP (Object-Oriented Programming)** principles. Each module consists of **Controller**, **Service**, **Schema**, **Type**, and **Validator**, designed for scalability and clean separation of concerns.

### OOP-Based Design Philosophy

* **Controllers** handle the incoming request but **never send raw responses**.
* All responses must be returned using methods from **BaseController** (`sendSuccessResponse`, `sendErrorResponse`, etc.) to maintain consistency.
* **Validators** ensure request validation before reaching the controller.
* **Services** contain business logic and communicate with database models.
* **Schemas** strictly define data models in Mongoose.
* **Types** strictly define interfaces for models.

server/
├── src/
│   ├── clients/
│   │   ├── email.service.ts
│   │   └── jwt.service.ts
│   │
│   ├── config/
│   │   └── environment.ts
│   │
│   ├── constants/
│   │   ├── auth.ts
│   │   ├── collection.ts
│   │   └── email.ts
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── errorHandler.middleware.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.route.ts
│   │   │   ├── auth.validator.ts
│   │   │   └── auth.controller.ts
│   │   │
│   │   ├── base/
│   │   │   ├── base.service.ts
│   │   │   ├── base.controller.ts
│   │   │   └── base.validator.ts
│   │   │
│   │   ├── otp/
│   │   │   ├── otp.schema.ts
│   │   │   └── otp.service.ts
│   │   │
│   │   ├── user/
│   │   │   ├── user.route.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.validator.ts
│   │   │   ├── user.type.ts
│   │   │   └── user.schema.ts
│   │   │
│   │   └── container.ts
│   │
│   ├── types/
│   │   └── express.d.ts
│   │
│   ├── app.ts
│   └── index.ts
│
├── tools/
│   └── module-generator/
│       ├── generate-module.js
│       ├── helpers.js
│       ├── updater.js
│       └── templates/
│           └── (...)
│
├── .gitignore
├── package-lock.json
├── package.json
└── tsconfig.json

