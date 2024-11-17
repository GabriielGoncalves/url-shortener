import test from "ava";
import sinon from "sinon";
import Authorizer from "../../../common/utils/auth/authorizer";
import jwt from "jsonwebtoken";
import environment from "../../../utils/enviroment";

let sut: Authorizer;

test.serial.afterEach.always(() => sinon.restore());

test.serial.beforeEach(() => {
  sut = new Authorizer();
  sinon.stub(environment, "secret_key").value("teste");
});

test.serial("generateToken", (t) => {
  const stubSign = sinon.stub(jwt, "sign").returns(<any>"token");

  const response = sut.generateToken(<any>{});

  t.deepEqual(response, { token: "token" });
  t.deepEqual(stubSign.args[0], [{ data: {} }, "teste", { expiresIn: "24h" }]);
});

test.serial("generateToken - fail case", (t) => {
  const stubSign = sinon.stub(jwt, "sign").throws(new Error("Failed"));

  t.throws(
    () => {
      sut.generateToken(<any>{});
    },
    {
      message: "Failed",
      instanceOf: Error,
    }
  );

  t.deepEqual(stubSign.args[0], [{ data: {} }, "teste", { expiresIn: "24h" }]);
});

test.serial("isValidToken", (t) => {
  const stubVerify = sinon.stub(jwt, "verify").returns(<any>"verified");

  const response = sut.isValidToken("token");

  t.deepEqual(response, "verified");
  t.deepEqual(stubVerify.args[0], [
    "token",
    "teste",
    { ignoreExpiration: false },
  ]);
});

test.serial("isValidToken - fail case", (t) => {
  const stubVerify = sinon.stub(jwt, "verify").throws(new Error("Failed"));

  t.throws(
    () => {
      sut.isValidToken("token");
    },
    {
      message: "Failed",
      instanceOf: Error,
    }
  );

  t.deepEqual(stubVerify.args[0], [
    "token",
    "teste",
    { ignoreExpiration: false },
  ]);
});
