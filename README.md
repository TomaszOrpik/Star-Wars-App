# StarWarsApp

Single Page Application created to display data from SWApi

## Installation

Run `npm i` to install all required npm packages.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory

## Used Technologies

Application is based on Angular framework in version 13. Other libraries used in project:
- **Bootstrap** - styling components
- **firebase** - authentication process
- **rxjs** - asynchronous operations
- **chalk** - styling console output in e2e tests
- **jest** - unit tests
- **puppeteer** - automation tests
- **npm-run-all** - running parallel scripts in automation tests
- **ts-node** - running ts file withour compilation

## Used Design Patterns

Design patterns used in application:
- **Dependency Injection** - maintaining lifecycle of services
- **Facade** - organize communication between components and services
- **Adapter** - adapting response models to application objects
- **strategy** - optimilizing process of current element to display

## Tests

Project contains to type of test:

### Unit Tests

To run unit test run `npm run test`. Current test coverage it's ~85%.

### Automation Tests

To run e2e tests run `npm run test:e2e`. Commnad is created to serve application on port `4321` in background. To switch between headless/non-headless mode, override `options` value in `e2e/start.ts` file.

## Others

### Report Bug and improves

You can report encountered bugs or send ideas for improvement [here](https://github.com/TomaszOrpik/Star-Wars-App/issues)

### License

Application was uploaded under GENERAL PUBLIC LICENSE for more information check [license file](https://github.com/TomaszOrpik/Star-Wars-App/blob/master/LICENSE)

### Contact

Feel free to [Contact me!](https://github.com/TomaszOrpik)
