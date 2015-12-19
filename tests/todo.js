import chai, {expect} from "chai";
import things from "chai-things";
chai.use(things);

import { todos } from "../client_src/todo";
import deepFreeze from "deep-freeze";

describe("todo", () => {
    it("should add todos", () => {
        const stateBefore = [];
        const action = {
            type: "ADD_TODO",
            id: 0,
            text: "todo!"
        };
        const stateAfter = [{
            id: 0,
            text: "todo!",
            completed: false
        }];

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(
            todos(stateBefore, action)
        ).to.deep.equal(stateAfter);
    });

    it("should ", () => {
    });
});
