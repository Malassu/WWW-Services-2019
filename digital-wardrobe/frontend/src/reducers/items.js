// Initial state for items
const initialState = {
  items: []
};

export default function items(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_ALL_ITEMS':
    case 'FETCH_ITEMS_CATEGORY':
      return {
        ...state,
        items: [...action.items]
      }
    case 'FETCH_ITEMS':
      let filteredItems = action.items.filter((fetchedItem) => {
        return (state.items.findIndex(stateItem => {
          return stateItem.pk === fetchedItem.pk;
        }) === -1)
      })
      return {
        ...state,
        items: [...state.items, ...filteredItems]
      }
    case 'MODIFY_ITEM':
      let unmodifiedItems = state.items.filter((item) => {
        return (item.pk !== action.item)
      })
      return {
        ...state,
        items: [...unmodifiedItems, action.item]
      }
    // TODO: Update so it considers categories
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.item]
      }
    /* case 'DELETE_ITEM':
      return {
        ...state,
        items: [state.items.filter(item => item.pk !== action.item)]
      } */
    default:
      return state;
  }
}