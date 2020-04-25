# Numbify

A sample project to showcase a number verification application.

## Personal Review

Due to time limitations a few things are below standard:

1. Proper tests for frontend components
2. Adequate docker and docker-compose setup to make execution easier and reproducable
3. Proper UI/UX styling (to ensure adequate responsiveness and over-all quality)

These are deeply apologise for.

## Requirements

The following requirements are needed to run the project:

- NodeJS (>= v10.30.0)
- Yarn (>= v1.19.1)

## Start

You would need to have registered with [NumVerify](https://numverify.com/) as the
associated token is required.

```bash
make start token=<numverify-token-id> port=3030
```

Simply replace `<numverify-token-id>` with appropriate token.

To retrieve all verified data from the api, simply make the following http request with curl or any other tooling desired


```bash
curl http://localhost:3030/api/validations
```
