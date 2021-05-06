/**
 *
 * @example
 * ```
 *  const initialState = 1;
 *
 *  pipeActions(reducer,
 *    { type: ADD_1 },
 *    (state) => expect(state).toEqual(2),
 *    { type: ADD_N, payload: 3 },
 *    { type: ADD_1 },
 *    { type: SUB_1 },
 *    (state) => expect(state).toEqual(5),
 *  )(initialState);
 *
 * ```
 */
export const pipeActions = <STATE, ACTION>(
    reducer: (state: STATE, action: ACTION) => STATE,
    ...actions: (ACTION | ((state: STATE) => void))[]
) => (state: STATE): STATE => {

    const result: STATE = actions.reduce((acc, x) => {
        if (x instanceof Function) {
            x(acc);
            return acc;
        }
        return reducer(acc, x);
    }, state);

    return result;
}
