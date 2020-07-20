# Introduction 
This project includes the models and API methods for interacting with the Voicify Assistant API for JavaScript and TypeScript.

# Getting Started

TODO

# Build and Test
There are some steps to autogenerate the TypeScript models from the swagger API models that Voicify outputs.

## Generate Models from Swagger

Sample:

```
java -jar swagger-codegen-cli.jar generate -i http://assistant.voicify.com/swagger/v1/swagger.json -l typescript-fetch -c ../typescript-options.json -o ../../src/generated
```

## Build output

Navigate to the generated folder where the package.json is and run:

```
npm install
```

then

```
npm run build
```