import test from "ava";
import sinon from "sinon";
import RegisterController from "../../../../modules/auth/controllers/register";

test.serial.afterEach.always(() => sinon.restore());

let instance: RegisterController;
let stubValidate: sinon.SinonStub;

test.serial.beforeEach(() => {
  const service = {
    async register(data: any) {
      return "ok";
    },
    getFilter(data: any) {},
  };
  instance = new RegisterController(<any>{ body: {} }, service);
  stubValidate = sinon.stub(instance, <any>"validateRequest");
});

test.serial("execute", async (t) => {
  const response = await instance.execute();

  t.deepEqual(response, "ok");
  t.true(stubValidate.calledOnceWithExactly());
});

test.serial("execute - fail case", async (t) => {
  sinon
    .stub(instance["registerService"], "register")
    .rejects(new Error("Failed"));

  await t.throwsAsync(
    async () => {
      await instance.execute();
    },
    {
      message: "Failed",
      instanceOf: Error,
    }
  );

  t.true(stubValidate.calledOnceWithExactly());
});
