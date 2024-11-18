import test from "ava";
import sinon from "sinon";
import urlShortenerService from "../../../../modules/shortener/services";
import { UrlShortenerRepository } from "../../../../modules/shortener/repositories";
import environment from "../../../../utils/enviroment";

test.serial.afterEach.always(() => sinon.restore());

test.serial.beforeEach(() => {
  sinon.stub(environment, "base_url").value("base-url");
  sinon
    .stub(urlShortenerService, <any>"generateUrlIdentification")
    .returns("123456");
});

test.serial("instanceOf repo", (t) => {
  t.true(urlShortenerService["repo"] instanceof UrlShortenerRepository);
});

test.serial("generateUrlIdentification", (t) => {
  t.deepEqual(urlShortenerService["generateUrlIdentification"]().length, 6);
});

test.serial("persistInformation", async (t) => {
  sinon.stub(urlShortenerService["repo"], "save").resolves();

  const response = await urlShortenerService["persistInformation"]({});

  t.deepEqual(response, undefined);
});

test.serial("persistInformation - fail case", async (t) => {
  sinon.stub(urlShortenerService["repo"], "save").rejects(new Error("Failed"));

  await t.throwsAsync(
    async () => {
      await urlShortenerService["persistInformation"]({});
    },
    {
      message: "Failed",
      instanceOf: Error,
    }
  );
});

test.serial("shorten - there is no info_user", async (t) => {
  const response = await urlShortenerService["shorten"](<any>{});

  t.deepEqual(response, "base-url/123456");
});

test.serial("shorten", async (t) => {
  const stubPersist = sinon
    .stub(urlShortenerService, <any>"persistInformation")
    .resolves();

  const response = await urlShortenerService["shorten"](<any>{
    info_user: {
      id: "user",
    },
    url: "url",
  });

  t.deepEqual(response, "base-url/123456");
  t.true(
    stubPersist.calledOnceWithExactly({
      id: "123456",
      user: {
        id: "user",
      },
      originalUrl: "url",
    })
  );
});
