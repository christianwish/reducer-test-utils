import { pipeActions } from '../src/reducer-test-utils'

describe('pipeActions', () => {
    it('works with multiple actions', () => {
        enum Actions {
            ADD_1 = 'ADD_1',
            ADD_N = 'ADD_N',
            SUB_2 = 'SUB_2'
        }

        function reducer(state: number, action: { type: Actions; payload?: number }) {
            switch (action.type) {
                case Actions.ADD_1:
                    return state + 1
                case Actions.ADD_N:
                    if (typeof action.payload === 'number') {
                        return state + action.payload
                    }
                    return state
                case Actions.SUB_2:
                    return state - 2
                default:
                    return state
            }
        }

        const actionPipe = pipeActions(
            reducer,
            { type: Actions.ADD_1 },
            state => expect(state).toEqual(2),
            { type: Actions.ADD_N, payload: 3 },
            { type: Actions.ADD_1 },
            state => expect(state).toEqual(6),
            state => expect(state).toMatchSnapshot(),
            { type: Actions.SUB_2 },
            function(state) {
                expect(state).toEqual(4)
            }
        )

        expect(actionPipe(1)).toEqual(4)
    })

    it('works with single action', () => {
        enum Actions {
            ADD_1 = 'ADD_1',
            ADD_N = 'ADD_N',
            SUB_2 = 'SUB_2'
        }

        function reducer(state: number, action: { type: Actions; payload?: number }) {
            switch (action.type) {
                case Actions.ADD_1:
                    return state + 1
                case Actions.ADD_N:
                    if (typeof action.payload === 'number') {
                        return state + action.payload
                    }
                    return state
                case Actions.SUB_2:
                    return state - 2
                default:
                    return state
            }
        }

        const actionPipe = pipeActions(reducer, { type: Actions.ADD_1 })

        expect(actionPipe(1)).toEqual(2)
    })

    it('works with every propName for payload', () => {
        enum Actions {
            ADD_1 = 'ADD_1',
            ADD_N = 'ADD_N',
            SUB_2 = 'SUB_2'
        }

        function reducer(state: number, action: { type: Actions; n?: number }) {
            switch (action.type) {
                case Actions.ADD_1:
                    return state + 1
                case Actions.ADD_N:
                    if (typeof action.n === 'number') {
                        return state + action.n
                    }
                    return state
                case Actions.SUB_2:
                    return state - 2
                default:
                    return state
            }
        }

        const actionPipe = pipeActions(
            reducer,
            { type: Actions.ADD_1 },
            state => expect(state).toEqual(2),
            { type: Actions.ADD_N, n: 3 },
            { type: Actions.ADD_1 },
            state => expect(state).toEqual(6),
            { type: Actions.SUB_2 },
            function(state) {
                expect(state).toEqual(4)
            }
        )

        expect(actionPipe(1)).toEqual(4)
    })
})
