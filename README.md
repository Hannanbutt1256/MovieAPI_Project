# Movie Details Chatbot API

This repository contains a Node.js-based API designed to fetch movie details and integrate seamlessly with [Dialogflow](https://dialogflow.cloud.google.com/) for building chatbots. The API utilizes the Open Movie Database (OMDb) to retrieve information about movies based on user queries.

## Features

- **Express.js Server:** The API is built using Express.js, a popular web application framework for Node.js.

- **Secure Communication:** The API uses the 'https' module for secure communication when making requests to the OMDb API.

- **Dialogflow Integration:** The API is structured to work seamlessly with Dialogflow, a powerful natural language understanding platform for building conversational interfaces.

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Hannanbutt1256/movie-details-chatbot-api.git
   cd movie-details-chatbot-api
2. **Install dependencies:**

   ```bash
   npm install

3. **Obtain an API key from OMDb:**

Register [here](https://www.omdbapi.com/) for free API Key and replace the placeholder in api_key.js with your actual API key.

## Usage
Once the server is running, the API endpoint /get-movie-details can be accessed via a POST request. It expects a JSON payload in the format provided by Dialogflow.

 ```
{
  "queryResult": {
    "parameters": {
      "any": "The Godfather"
    }
  }
}
```
The API will respond with details about the specified movie or default to "The Godfather" if no movie is specified.

## Error Handling
The API handles errors gracefully and provides appropriate responses in case of issues with API requests or parsing.

## Contributing
Feel free to contribute to this project by submitting issues or pull requests. Your feedback and contributions are highly appreciated!
