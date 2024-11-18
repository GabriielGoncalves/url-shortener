import test from "ava";
import sinon from "sinon";

test.serial.afterEach.always(() => sinon.restore());