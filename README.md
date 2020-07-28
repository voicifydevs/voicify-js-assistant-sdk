# Introduction 
This project includes the models and API methods for interacting with the Voicify Assistant API for JavaScript and TypeScript.

# Getting Started

You can install the package from npm:

```
npm i -s @voicify/voicify-sdk-assistant
```

If you're using TypeScript, all the types are included, so you don't need to install any additional packages.


Each service has its own API class, factory, or functional composer to use in order to make requests against it. 

This SDK has the ability to create and handle requests against:
- Alexa Skills
- Google Actions (with Dialogflow)
- Dialogflow Agents
- Bixby Capsules
- Cortana Skills
- Azure bots
- Custom assistants and bots

So whether you are using a custom Alexa Skill that makes requests to your Voicify app after processing existing requests or building your own assistant from scratch, this SDK has all the details you need as long as you have a Voicify app to make requests against and the `applicationId` and `applicationSecret` required to make requests.

## Making Requests

To make requests, create an instance of the API you need, then call the appropriate method (Usually `handleRequest`, although Bixby has many other endpoints to use.)

For example, we can make a request to the Voicify Custom Assistant API with just the text from the user:


```typeScript

const basePath = "https://assistant.voicify.com";
const appId = "your-voicify-app-id";
const appSecret = "your-voicify-app-secret";
const message = "whatever the user said";
const request = {
    requestId: uuidv4(),
    user: {
        id: 'sample',
        name: 'Sample'
    },
    device: {
        id: 'sample',
        name: 'Sample',
        supportsDisplayText: true,
        supportsTextInput: true
    },
    context: {
        channel: "Voicify Sample App",
        locale: "en-US",
        sessionId: uuidv4(),
        requestType: "IntentRequest",
        originalInput: message,
        requiresLanguageUnderstanding: true
    }
};


// functional composition
CustomAssistantApiFp().handleRequest(appId, appSecret, request)(null, basePath).then((value) => {
    console.log(value.outputSpeech); // do something with the response content
})


// OO - with classes
new CustomAssistantApi({
    basePath
}).handleRequest(appId, appSecret, request).then((value) => {
    console.log(value.outputSpeech);
})

// with a factory
CustomAssistantApiFactory({
    basePath
}).handleRequest(appId, appSecret, request).then((value) => {
    console.log(value.outputSpeech); // do something with the response content
})


// used to generate unique ids
uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

```

For the other APIs like Alexa, Dialogflow, and Bot Service, you can also use their native SDKs since the endpoints for those methods take the direct fulfillment calls.

For example, sending requests to the `AlexaApi` could also use the official alexa node sdk.


Voicify Partners and Customers can also check out the extended documentation and details at https://support.voicify.com

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