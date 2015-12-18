import chai, {expect} from "chai";

import {createStore} from "../client_src/createStore";

const counter = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT": return state + 1;
        case "DECREMENT": return state - 1;
        default: return state;
    }
}
const store = createStore(counter);

describe("diy createStore", () => {
    describe("counter", () => {
        it("should add, subtract, and do nothing", () => {
            expect(counter(0, {type: "INCREMENT"})).to.equal(1);
            expect(counter(0, {type: "DECREMENT"})).to.equal(-1);
            expect(counter(0, {type: "OTHER"})).to.equal(0);
        });
    });

    describe("store", () => {
        it("#getState() and #dispatch()", () => {
            expect(store.getState()).to.equal(0);
            store.dispatch({type: "INCREMENT"});
            expect(store.getState()).to.equal(1);
        });

        it("#subscribe() - this is how rendering works", () => {
            let res = null;
            let render = () => {
                res = `subscribe ${store.getState()}`;
            };
            store.subscribe(render);
            render();

            expect(res).to.equal("subscribe 1");
            store.dispatch({type: "INCREMENT"});
            expect(res).to.equal("subscribe 2");
            store.dispatch({type: "DECREMENT"});
            expect(res).to.equal("subscribe 1");
        });
    });
});
