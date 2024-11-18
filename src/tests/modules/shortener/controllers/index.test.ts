import test from "ava";
import sinon from "sinon";
import UrlShortenerController from "../../../../modules/shortener/controllers";

let sut: UrlShortenerController;

test.serial.afterEach.always(() => sinon.restore());

test.serial.beforeEach(() => {
  const service = {
    async shorten(data: any) {
      return "ok";
    },
  };

  sut = new UrlShortenerController(<any>{}, service);
});

test.serial("execute", async (t) => {
  t.deepEqual(await sut.execute(), "ok");
});

test.serial("execute - fail case", async (t) => {
  sinon.stub(sut["shortenerService"], "shorten").rejects(new Error("Failed"));

  await t.throwsAsync(
    async () => {
      await sut.execute();
    },
    { message: "Failed", instanceOf: Error }
  );
});
