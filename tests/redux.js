import chai, {expect} from "chai";
import things from "chai-things";
chai.use(things);

import counter from "../client_src/something";

describe("counter", function () {
    it("should add, subtract, and do nothing", function () {
        expect(counter(0, {type: "INCREMENT"})).to.equal(1);
        expect(counter(0, {type: "DECREMENT"})).to.equal(-1);
        expect(counter(0, {type: "OTHER"})).to.equal(0);
    });
});
