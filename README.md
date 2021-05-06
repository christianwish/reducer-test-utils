# Reducer-Test-Utils

![test status](https://travis-ci.com/christianheyn/reducer-test-utils.svg?branch=main "See the test status from travis-ci")

Utilities for testing reducer functions

## pipeActions

`import { pipeActions } from "reducer-test-utils";`

Concatenates multiple reducer actions and lets you test desired states.

*Usage:*
```ts
import { pipeActions } from "reducer-test-utils";
import { myReducer, Action } from './myReducer'

describe("test my reducer function", () => {
  it("works with multiple actions", () => {
    const initialState = 1;

    pipeActions(
      myReducer,
      { type: Action.ADD_1 },
      (state) => expect(state).toEqual(2),
      { type: Action.ADD_N, payload: 3 },
      { type: Action.ADD_1 },
      (state) => expect(state).toEqual(6),
      { type: Action.SUB_2 },
      (state) => expect(state).toEqual(4),
    )(initialState);
  });
});
```