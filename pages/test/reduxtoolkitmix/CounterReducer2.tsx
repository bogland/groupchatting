const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase2 = () => ({ type: INCREASE });
export const decrease2 = () => ({ type: DECREASE });

export type CounterState2 = {
  number: number;
  diff: number;
};

const initialState = {
  number: 0,
  diff: 1,
};

export default function counter(
  state: CounterState2 = initialState,
  action: any
): CounterState2 {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        number: state.number + 2,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - 2,
      };
    default:
      return state;
  }
}
