# Currency Converter Service

This skeleton provides an implementation of a REST service to perform currency conversions.
You need to add the business logic for the conversion to work. These are the specs:

- The service must convert an amount from any currency to any other currency.
- You can find the definition and usage of the endpoint at http://localhost:8080/ or `routes/index.ts`.
- The data used for the conversion can be obtained from the `getExchangeRates` function.
- Every currency convertion transaction must be logged into a MongoDB database.
- Try to make your code as **clear** and **efficient** as possible.

## Acceptance criteria

- All tests must pass.
- Parameters must be valid numbers or integers and currency codes must conform to ISO-4217 (3 letters, uppercase).

## Setup

- Run `yarn install` or `npm install`.
- The app serves at `localhost:8080` by default. You can change this in the config.
- The app expects the MongoDB instance to be located at `localhost:27017` by default. You can change this in the config.
- You can use Docker Compose to start a local MongoDB instance ready to use.

## Configuration

You can configure the default hostnames and ports with these environment variables, or editing the `config/default.json` file.

- `api.port`: Port to use to serve the API endpoints.
- `mongodb.hostname`: Hostname of the MongoDB instance.
- `mongodb.port`: Port of the MongoDB instance.
- `mongodb.username`: Username of the MongoDB instance.
- `mongodb.password`: Password of the MongoDB instance.

