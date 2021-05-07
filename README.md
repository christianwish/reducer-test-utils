# Reducer-Test-Utils

![test status](https://travis-ci.com/christianheyn/reducer-test-utils.svg?branch=main "See the test status from travis-ci")
[![npm version](https://badge.fury.io/js/reducer-test-utils.svg)](https://badge.fury.io/js/reducer-test-utils)
![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)

Utilities for testing reducer functions

## `pipeActions`

`import { pipeActions } from "reducer-test-utils";`

Chains multiple reducer actions and lets you test desired states.
(Personally, I see it as a user journey that is treated as a reducer)

*Usage:*
```ts
import { pipeActions } from "reducer-test-utils";
import { myFeatureReducer, Action } from './myFeatureReducer'

describe("test my reducer function", () => {
  it("runs actions", () => {

    const userJourney = pipeActions(
      myFeatureReducer, // your reducer function
      { type: Action.ADD_1 } // actions and functions
      (state) => expect(state).toEqual(2),
      { type: Action.ADD_N, payload: 3 },
      { type: Action.ADD_1 },
      { type: Action.ADD_1 },
      (state) => expect(state).toEqual(7),
      { type: Action.SUB_2 },
      (state) => expect(state).toMatchSnapshot(),
    );

    const initialState = 1;

    userJourney(initialState);
    // userJourney(anotherInitialState);
  });
});
```

## `stateChanged`

`import { stateChanged, pipeActions } from "reducer-test-utils";`

You can pass the return value of `pipeActions` and a initial state to `stateChanged`.
All test functions are executed (exactly like `pipeActions`)
plus a boolean value is returned, indicating whether the state has changed or not.
(Deep equality test)

*Usage:*
```ts
import { stateChanged, pipeActions } from "reducer-test-utils";
import { myFeatureReducer, Action } from './myFeatureReducer'

describe("test my reducer function", () => {
  it("runs action", () => {

    const userJourney = pipeActions(
      myFeatureReducer,
      { type: Action.ADD_1 }
      (state) => expect(state).toEqual(2),
      { type: Action.ADD_N, payload: 3 },
      { type: Action.ADD_1 },
      { type: Action.ADD_1 },
      (state) => expect(state).toEqual(7),
    );

    const initialState = 1;
    const changed = stateChanged(userJourney, initialState);

    expect(changed).toBeTruthy();
  });
});
```
