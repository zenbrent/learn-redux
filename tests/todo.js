import chai, {expect} from "chai";
import things from "chai-things";
chai.use(things);

import { todos } from "../client_src/todo";

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

        expect(
            todos(stateBefore, action).toJS()
        ).to.deep.equal(stateAfter);
    });

    it("should ", () => {
    });
});
