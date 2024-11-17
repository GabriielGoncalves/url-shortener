import test from "ava";
import sinon from "sinon";
import { Authenticator } from "../../../common/utils/auth/authenticator";
import Encryption from "../../../utils/encryption";

let sut: Authenticator;

test.serial.afterEach.always(() => sinon.restore());

test.serial.beforeEach(() => {
  const repo: any = {
    async findOneByIdentification(data: any) {
      return {
        password: "pass",
      };
    },
  };

  sut = new Authenticator(repo);
});

test.serial("getFilter", (t) => {
  const data: any = { email: "email" };

  t.deepEqual(sut["getFilter"](data), data);
});

test.serial("login", async (t) => {
  sinon.stub(sut, <any>"getFilter").returns("filter");
  sinon.stub(Encryption, "decrypt").resolves(true);

  const data: any = { password: "pass" };

  const response = await sut.login(data);
  t.deepEqual(response, { isLogged: true, user: { password: "pass" } });
});

test.serial("login - user not found", async (t) => {
  sinon.stub(sut, <any>"getFilter").returns("filter");

  sinon.stub(sut["repo"], "findOneByIdentification").resolves(null);

  const data: any = {};

  await t.throwsAsync(
    async () => {
      await sut.login(data);
    },
    {
      message: "Usuário não está registrado!",
      instanceOf: Error,
    }
  );
});

test.serial("login - is not same password", async (t) => {
  sinon.stub(sut, <any>"getFilter").returns("filter");

  const stubDecrypt = sinon.stub(Encryption, "decrypt").resolves(false);
  const data: any = { password: "test" };

  const response = await sut.login(data);

  t.deepEqual(response, { isLogged: false });
  t.true(stubDecrypt.calledOnceWithExactly("pass", "test"));
});
