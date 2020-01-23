const initialState = {
  outfits: [],
  openOutfitItems: [],
  itemOutfits: []
}

export default function outfits(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_OUTFITS':
      return {
        ...state,
        outfits: [...action.outfits]
      }
    case 'ADD_OUTFIT':
      return {
        ...state,
        outfits: [...state.outfits, action.outfit]
      }
    case 'OPEN_OUTFIT':
      return {
        ...state,
        openOutfitItems: action.outfitItems
      }
    case 'OUTFITS_BY_ITEM':
      return {
        ...state,
        itemOutfits: action.outfits
      }
    default:
      return state;
  }
}