const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

export type CounterState = {
  number: number;
  diff: number;
};

const initialState = {
  number: 0,
  diff: 1,
};

export default function counter(
  state: CounterState = initialState,
  action: any
): CounterState {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return state;
  }
}
