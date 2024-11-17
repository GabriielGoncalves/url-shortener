import test from "ava";
import sinon from "sinon";
import Encryption from "../../utils/encryption";
import bcrypt from "bcrypt";
import environment from "../../utils/enviroment";

test.serial.afterEach.always(() => sinon.restore());

test.serial.beforeEach(() => {
  sinon.stub(environment, "salt").value(10);
});

test.serial("encrypt", async (t) => {
  const stubHash = sinon.stub(bcrypt, "hash").resolves("encrypted");

  const response = await Encryption.encrypt("text");

  t.deepEqual(response, "encrypted");
  t.deepEqual(stubHash.args[0], ["text", 10]);
});

test.serial("encrypt - fail case", async (t) => {
    const stubHash = sinon.stub(bcrypt, "hash").rejects(new Error());
  
    await t.throwsAsync(
      async () => {
        await Encryption.encrypt("");
      },
      {
        message: "Failed to encrypt text.",
        instanceOf: Error
      }
    );
  
    t.deepEqual(stubHash.args[0], ["", 10]);
  });

test.serial("decrypt", async (t) => {
  const stubCompare = sinon.stub(bcrypt, "compare").resolves("decrypted");

  const response = await Encryption.decrypt("encryptedText", "text");

  t.deepEqual(response, "decrypted");
  t.deepEqual(stubCompare.args[0], ["text", "encryptedText"]);
});

test.serial("decrypt - fail case", async (t) => {
  const stubHash = sinon.stub(bcrypt, "compare").rejects(new Error());

  await t.throwsAsync(
    async () => {
      await Encryption.decrypt("", "");
    },
    {
      message: "Failed to decrypt text.",
      instanceOf: Error
    }
  );

  t.deepEqual(stubHash.args[0], ["", ""]);
});
