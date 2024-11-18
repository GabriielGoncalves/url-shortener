import test from "ava";
import sinon from "sinon";
import RedirectorController from "../../../../modules/redirector/controllers";

let instance: RedirectorController;
let stubValidate: sinon.SinonStub;

test.serial.afterEach.always(() => sinon.restore());

test.serial.beforeEach(() => {
  const service = {
    async execute(data: any) {
      return "ok";
    },
  };

  instance = new RedirectorController(<any>{ body: {} }, service);

  stubValidate = sinon.stub(instance, <any>"validateRequest");
});

test.serial("execute", async (t) => {
  const response = await instance.execute();

  t.deepEqual(response, "ok");
  t.true(stubValidate.calledOnceWithExactly());
});

test.serial("execute - fail case", async (t) => {
  sinon.stub(instance["service"], "execute").rejects(new Error("Failed"));

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
