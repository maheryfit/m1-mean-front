# M1 Mean Front Mahery - Ny Avo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Folder structure in src/app 
Refers to: [Standalone folder structure](https://www.gerome.dev/blog/standalone-angular-folder-structure/)

```
src
└── app
    ├── core
    ├── features
    └── shared
```

Final structure: 
```
src
└── app
    ├── core
        ├── layout
        ├── auth
            ├── auth.service.ts
            ├── auth.service.spec.ts
            ├── auth.model.ts
            ├── auth.guard.ts
            ├── auth.guard.spec.ts
            ├── auth.routes.ts
            └── pages
                ├── login
                ├── register
                ├── password-recovery
        ├── services
            └── notification.service.ts
            └── notification.service.spec.ts
        ├── interceptors
            └── api.interceptor.ts
            └── api.interceptor.spec.ts
    └── features
        ├── product
        ├── cart
        ├── checkout
            ├── checkout.service.ts
            ├── checkout.service.spec.ts
            ├── checkout.model.ts
            ├── checkout.guard.ts
            ├── checkout.guard.spec.ts
            ├── checkout.routes.ts
            └── pages
                ├── address
                ├── payment
    └── shared
        ├── components
            ├── notification.component.ts
            ├── notification.component.spec.ts
            ├── notification.component.html
            ├── notification.component.css
        ├── pipes
            ├── date.pipe.ts
            ├── date.pipe.spec.ts
        ├── utils
            ├── array.utils.ts
            ├── array.utils.spec.ts
```

### Core Example
`Core` : A non-business feature is a feature that is not specific to the business domain of the application.
```
src
└── app
    └── core
        ├── services
            └── notification.service.ts
            └── notification.servicespec.ts
        ├── interceptors
            └── api.interceptor.ts
            └── api.interceptor.spec.ts
        ├── auth
            ├── auth.service.ts
            ├── auth.service.spec.ts
            ├── auth.model.ts
            ├── auth.guard.ts
            ├── auth.guard.spec.ts
            ├── auth.routes.ts
            └── pages
                ├── login
                ├── register
                ├── password-recovery
```

### Features Example
`Features`: A business feature is a feature that is specific to the business domain of the application. Some examples are for e-commerce applications: the product list, the loyalty program, the cart, and the checkout process.

``` 
src
└── app
    └── features
        ├── product
        ├── cart
        ├── checkout
            ├── checkout.service.ts
            ├── checkout.service.spec.ts
            ├── checkout.model.ts
            ├── checkout.guard.ts
            ├── checkout.guard.spec.ts
            ├── checkout.routes.ts
            └── pages
                ├── address
                ├── payment
```

### Shared Example
`Shared`: The shared code is the code that is shared between the different features of the application. There are two kind of code being shared between features:

+ the one including some business logic
+ the one that doesn’t.

```
src
└── app
    └── shared
        ├── components
            ├── notification.component.ts
            ├── notification.component.spec.ts
            ├── notification.component.html
            ├── notification.component.css
        ├── pipes
            ├── date.pipe.ts
            ├── date.pipe.spec.ts
        ├── utils
            ├── array.utils.ts
            ├── array.utils.spec.ts
```

