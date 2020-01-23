// Initial state for wardrobes
// (initial state can be any valid javascript type and I've just used an array as a placeholder here)
const initialState = {
  wardrobes: []
};

export default function wardrobes(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_WARDROBES':
      return {
        ...state,
        wardrobes: [...action.wardrobes]
      };
    case 'ADD_WARDROBE':
      return {
        ...state,
        wardrobes: [...state.wardrobes, action.wardrobe]
      };
    default:
      return state;
  }
}