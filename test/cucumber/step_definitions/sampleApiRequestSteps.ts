import { When, Then } from "@cucumber/cucumber";
// import { UserApi } from "../../../services/user";
// import { AllureHelperMocha } from "../../../../../api";
import { expect } from "chai";
import axios from "axios";
import { ContentType } from "allure-js-commons";

When("I request to get users list", async function () {
  this.response = await axios.get(process.env.BASE_API_URL + "users", {
    headers: {
      "Content-Type": ContentType.JSON,
    },
  });
});

Then("I should receive a 200 status code", async function () {
  // await AllureHelperMocha.expectWithAllure(this.response.status, 200, "Status code");
  expect(await this.response.status).to.equal(200, "Status code");
});

When("I request to get user with id {int}", async function (id: number) {
  // this.response = await UserApi.getUserById(id);
  this.response = await axios.get(process.env.BASE_API_URL + "users", {
    headers: {
      "Content-Type": ContentType.JSON,
    },
    params: {
      id: id,
    },
  });
  await this.attach(
    JSON.stringify(this.response.data, null, 2),
    ContentType.JSON
  );
});

Then(
  "I should see {string} property with {int} value",
  async function (property: string, value: number) {
    expect(await this.response.data.data)
      .to.have.property(property)
      .that.eq(value);
  }
);

Then(
  "I should see {string} property with {string} value",
  async function (property: string, value: string) {
    expect(await this.response.data.data)
      .to.have.property(property)
      .that.eq(value);
  }
);
