import { Before } from "@cucumber/cucumber";
import axios from "axios";
import { ContentType } from "allure-js-commons";
import dotenv from "dotenv";

  Before(async function() {
    //setup dotenv
    dotenv.config();
    // perform some shared setup
    axios.interceptors.request.use(async (request) => {
      await this.attach(JSON.stringify(request, null, 2), ContentType.JSON);
      return request;
    });
    axios.interceptors.response.use(
      async (response) => {
        await this.attach(
          `Status: ${JSON.stringify(response.status, null, 2)} ${JSON.stringify(
            response.statusText,
            null,
            2
          )}\n${JSON.stringify(response.data, null, 2)}`,
          ContentType.JSON
        );
        return response;
      },
      async (error) => {
        if (error.response) {
          await this.attach(
            JSON.stringify(error.response, null, 2),
            ContentType.JSON
          );
        } else {
          await this.attach(JSON.stringify(error, null, 2), ContentType.JSON);
        }
        return Promise.reject(error);
      }
    );
  });

// After(function () {

// });

// Asynchronous Callback
// BeforeAll(function (callback) {
//   // perform some shared setup
//   // execute the callback (optionally passing an error when done)
// });

// Asynchronous Promise
// AfterAll(function () {
//   // perform some shared teardown
//   return Promise.resolve();
// });
