import test from "ava";
import sinon from "sinon";
import urlShortenerRepository from "../../../../modules/shortener/repositories";

test.serial.afterEach.always(() => sinon.restore());

test.serial("updateDoc", async (t) => {
  const stubUpsert = sinon
    .stub(urlShortenerRepository["instanceRepository"], "upsert")
    .resolves();

  const response = await urlShortenerRepository.updateDoc({});

  t.deepEqual(response, undefined);
  t.true(stubUpsert.calledOnceWithExactly({}, ["id"]));
});
