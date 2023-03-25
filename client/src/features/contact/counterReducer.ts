export const TANG_COUNTER = 'INCREMENT_COUNTER'
export const GIAM_COUNTER = 'DECREMENT_COUNTER'
export interface CounterState {
  data: number;
  title: string;
}
const initState: CounterState = {
  data: 41,
  title:"yet another redux counter."
}
export default function counterReducer(state = initState, action: any) {
  switch (action.type) {
    case TANG_COUNTER:
      return {
        ...state,
        data: state.data + action.payload
      };
    case GIAM_COUNTER:
      return {
        ...state,
        data: state.data - action.payload
      }
    default:
      return state;
  }
}