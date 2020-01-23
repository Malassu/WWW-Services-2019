const initialState = {
  categories: []
}

export default function categories(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CATEGORIES':
    case 'FETCH_ALL_CATEGORIES':
      return {
        ...state,
        categories: [...action.categories]
      }
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.category]
      }
    case 'DELETE_CATEGORY':
      return {
        // TODO: Implement
      }
    case 'MODIFY_CATEGORY':
      return {
        // TODO: Implement
      }
    default:
      return state
  }
}
