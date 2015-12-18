import chai, {expect} from "chai";
import things from "chai-things";
chai.use(things);

// User deep freeze to protect from mutations in tests.
import deepFreeze from "deep-freeze";
import Immutable from "immutable";

const addCounterMutate = (list) => {
    list.push(0);
    return list;
};
// const addCounter = (list) => list.concat([0]);
const addCounter = (list) => [...list, 0];
const addCounterImmutable = (list) => list.push(0);

const removeCounterMutate = (list, index) => {
    list.splice(index, 1);
    return list;
};
// const removeCounter = (list, index) => list.slice(0, index).concat(list.slice(index + 1));
const removeCounter = (list, index) => [...list.slice(0, index), ...list.slice(index + 1)];
const removeCounterImmutable = (list, index) => list.delete(index);

const incrementCounterMutate = (list, index) => {
    list[index]++;
    return list
};
const incrementCounter = (list, index) => ([
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
]);
const incrementCounterImmutable = (list, index) => list.update(index, x => x + 1);

describe("counters", () => {
    describe("addCounter", () => {
        it("should work with mutations", () => {
            const listBefore = [];
            const listAfter = [0];

            expect(
                addCounterMutate(listBefore)
            ).to.deep.equal(listAfter);
        });

        it("should work without mutations", () => {
            const listBefore = [];
            const listAfter = [0];

            deepFreeze(listBefore);

            expect(
                addCounter(listBefore)
            ).to.deep.equal(listAfter);
        });

        it("should work with Immutable", () => {
            const listBefore = Immutable.List();
            const listAfter = [0];

            deepFreeze(listBefore);

            expect(
                addCounterImmutable(listBefore).toJS()
            ).to.deep.equal(listAfter);
        });
    });

    describe("removeCounter", () => {
        it("should work with mutations", () => {
            const listBefore = [0, 10, 20];
            const listAfter = [0, 20];

            expect(
                removeCounterMutate(listBefore, 1)
            ).to.deep.equal(listAfter);
        });

        it("should work without mutations", () => {
            const listBefore = [0, 10, 20];
            const listAfter = [0, 20];

            deepFreeze(listBefore);

            expect(
                removeCounter(listBefore, 1)
            ).to.deep.equal(listAfter);
        });

        it("should work with Immutable", () => {
            const listBefore = Immutable.List([0, 10, 20]);
            const listAfter = [0, 20];

            deepFreeze(listBefore);

            expect(
                removeCounterImmutable(listBefore, 1).toJS()
            ).to.deep.equal(listAfter);
        });
    });

    describe("incrementCounter", () => {
        it("should work with mutations", () => {
            const listBefore = [0, 10, 20];
            const listAfter = [0, 11, 20];

            expect(
                incrementCounterMutate(listBefore, 1)
            ).to.deep.equal(listAfter);
        });

        it("should work without mutations", () => {
            const listBefore = [0, 10, 20];
            const listAfter = [0, 11, 20];

            deepFreeze(listBefore);

            expect(
                incrementCounter(listBefore, 1)
            ).to.deep.equal(listAfter);
        });

        it("should work with Immutable", () => {
            const listBefore = Immutable.List([0, 10, 20]);
            const listAfter = [0, 11, 20];

            deepFreeze(listBefore);

            expect(
                incrementCounterImmutable(listBefore, 1).toJS()
            ).to.deep.equal(listAfter);
        });
    });
});

