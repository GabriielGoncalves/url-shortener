import test from "ava";
import sinon from "sinon";
import redirectorService from "../../../../modules/redirector/services";

test.serial.afterEach.always(() => sinon.restore());

test.serial("incrementClickCounter", (t) => {
  const response = redirectorService["incrementClickCounter"]({
    clicks_number: 1,
  });

  t.deepEqual(response, { clicks_number: 2 });
});

test.serial("execute - there is no document", async (t) => {
  const stubFind = sinon
    .stub(redirectorService["repo"], "findOneByIdentification")
    .resolves(null);

  const stubUpdate = sinon.stub(redirectorService["repo"], "updateDoc");
  const stubIncrement = sinon.stub(
    redirectorService,
    <any>"incrementClickCounter"
  );

  const response = await redirectorService["execute"]("id");

  t.deepEqual(response, null);

  t.true(stubFind.calledOnceWithExactly({ id: "id" }));
  t.true(stubIncrement.notCalled);
  t.true(stubUpdate.notCalled);
});

test.serial("execute", async (t) => {
  const stubFind = sinon
    .stub(redirectorService["repo"], "findOneByIdentification")
    .resolves({});

  const stubUpdate = sinon
    .stub(redirectorService["repo"], "updateDoc")
    .resolves();

  const stubIncrement = sinon
    .stub(redirectorService, <any>"incrementClickCounter")
    .returns({});

  const response = await redirectorService["execute"]("id");

  t.deepEqual(response, {});

  t.true(stubFind.calledOnceWithExactly({ id: "id" }));
  t.true(stubIncrement.calledOnceWithExactly({}));
  t.true(stubUpdate.calledOnceWithExactly({}));
});
