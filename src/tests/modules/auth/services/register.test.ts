import test from "ava";
import sinon from "sinon";
import { IRepository } from "../../../../database/repositories/interfaces";
import { RegisterUserService } from "../../../../modules/auth/services/register";
import Encryption from "../../../../utils/encryption";

let sut: RegisterUserService;

test.serial.afterEach.always(() => sinon.restore());

test.serial.beforeEach(() => {
  const repo: IRepository = {
    async findOneByIdentification(filter: any) {
      return "";
    },
    async save(data: any) {
      return "";
    },
    async find() {},
  };

  sut = new RegisterUserService(repo);
});

test.serial("getFilter", (t) => {
  const response = sut.getFilter(<any>{
    email: "email",
  });

  t.deepEqual(response, { email: "email" });
});

test.serial("handleData", async (t) => {
  sinon.stub(Encryption, "encrypt").resolves("newPassword");

  const response = await sut["handleData"]("password");

  t.deepEqual(response, "newPassword");
});

test.serial("handleData - fail case", async (t) => {
  sinon.stub(Encryption, "encrypt").rejects(new Error("Failed"));

  await t.throwsAsync(
    async () => {
      await sut["handleData"]("password");
    },
    {
      message: "Failed",
      instanceOf: Error,
    }
  );
});

test.serial("register", async (t) => {
  sinon.stub(sut, "getFilter").returns(<any>"filter");
  const stubFindOne = sinon
    .stub(sut["repo"], "findOneByIdentification")
    .resolves();

  const stubSave = sinon.stub(sut["repo"], "save").resolves();

  const stubHandleData = sinon.stub(sut, <any>"handleData").resolves("newPass");

  const response = await sut.register(<any>{ password: "pass" });

  t.true(stubFindOne.calledOnceWithExactly("filter"));
  t.true(
    stubSave.calledOnceWithExactly({
      password: "newPass",
    })
  );
  t.true(stubHandleData.calledOnceWithExactly("pass"));

  t.deepEqual(response, "Usuário registrado com sucesso!");
});

test.serial("register - user found", async (t) => {
  sinon.stub(sut, "getFilter").returns(<any>"filter");
  const stubFindOne = sinon
    .stub(sut["repo"], "findOneByIdentification")
    .resolves({});

  const stubSave = sinon.stub(sut["repo"], "save").resolves();

  const stubHandleData = sinon.stub(sut, <any>"handleData").resolves();

  await t.throwsAsync(
    async () => {
      await sut.register(<any>{ password: "pass" });
    },
    {
      message: "Usuário já cadastrado!",
      instanceOf: Error,
    }
  );

  t.true(stubFindOne.calledOnceWithExactly("filter"));
  t.true(stubSave.notCalled);
  t.true(stubHandleData.notCalled);
});
