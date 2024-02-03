const express = require("express");
const bodyParser = require("body-parser");
const https = require("https"); // Use the 'https' module for secure communication
const api_key = require("./api_key");
const { error } = require("console");

const server = express();
server.use(express.json()); // Use express.json() instead of bodyParser.json()
server.use(express.urlencoded({ extended: true })); // Use express.urlencoded() instead of bodyParser.urlencoded()

server.post("/get-movie-details", (req, res) => {
  const movieToSearch =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.any
      ? req.body.queryResult.parameters.any
      : "The Godfather";

  const reqUrl = encodeURI(
    `https://www.omdbapi.com/?t=${movieToSearch}&apikey=${api_key}`
  ); // Use HTTPS and update the query parameter to 'apikey'

  https.get(
    reqUrl,
    (responseFromAPI) => {
      let completeResponse = "";

      responseFromAPI.on("data", (chunk) => {
        completeResponse += chunk;
      });

      responseFromAPI.on("end", () => {
        try {
          const movie = JSON.parse(completeResponse);

          let datatoSend =
            movieToSearch === "The Godfather"
              ? "I don't have the required info on that. Here's some info on 'The Godfather' instead.\n"
              : "";

          datatoSend += `${movie.Title} is a ${movie.Actors} starer ${movie.Genre} movie, released in ${movie.Year}. It was directed by ${movie.Director}`;

          return res.json({
            fulfillmentMessages: [
              {
                text: {
                  text: [datatoSend],
                },
              },
            ],
          });
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
          return res.json({
            fulfillmentMessages: [
              {
                text: {
                  text: ["Error parsing API response!"],
                },
              },
            ],
          });
        }
      });
    },
    (requestError) => {
      console.error("Error making API request:", requestError);
      return res.json({
        fulfillmentMessages: [
          {
            text: {
              text: ["Something went wrong!"],
            },
          },
        ],
      });
    }
  );
});

server.listen(process.env.PORT || 80, () => {
  console.log("Server is up and running...");
});
