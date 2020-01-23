import { history } from '../router/history';

var domain = 'http://closetmap.herokuapp.com';

export const fetchOutfits = () => {
  return (dispatch, getState) => {
    return fetch(domain + '/outfits/', {
      method: 'GET',
      headers: {
        Authorization: `JWT ${getState().auth.token}`
      }
    })
      .then(res => res.json())
      .then(outfits => {
        console.log('Outfits', outfits)
        return dispatch({
          type: 'FETCH_OUTFITS',
          outfits: outfits
        })
      })
  }
}

/**
 *
 * @param {*} data
 */
export const addOutfit = (data) => {
  return (dispatch, getState) => {

    // TODO: Form data
    let form_data = new FormData();
    form_data.append('name', data.name);
    form_data.append('items', data.items);

    if (data.image) {
      form_data.append('image', data.image, data.image.name);
    }
    else {
      form_data.append('image', data.image);
    }

    return fetch(domain + '/add_outfit/', {
      headers: {
        Authorization: `JWT ${getState().auth.token}`
      },
      body: form_data,
      method: 'POST',
      mode: 'cors'
    })
      .then(res => res.json())
      .then(outfit => {
        console.log('Outfit', outfit)
        dispatch({
          type: 'ADD_OUTFIT',
          outfit: outfit
        })
        history.push(`/outfit/${outfit.pk}`, { outfit: outfit })
      })
  }
}

export const deleteOutfit = (outfit) => {
  return (dispatch, getState) => {
    return fetch(domain + '/del_outfit/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `JWT ${getState().auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: outfit.name })
    })
      .then(res => res.json())
      .then(deleteResponse => {
        console.log('Outfit deleted', deleteResponse)
        history.push('/outfits/')
        // TODO: Redirect?
      })
  }
}

export const updateOutfit = () => {

}

export const openOutfit = (outfit) => {
  return (dispatch, getState) => {
    return fetch(domain + '/open_outfit/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `JWT ${getState().auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ outfit: outfit.name })
    })
      .then(res => res.json())
      .then(items => {
        dispatch({
          type: 'OPEN_OUTFIT',
          outfitItems: items
        })
      })
  }
}

export const outfitsByItem = (item) => {
  return (dispatch, getState) => {
    // TODO: Remove
    console.log('Item name', item.name)

    return fetch(domain + '/item_outfits/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `JWT ${getState().auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item: item.name, user: getState().auth.user })
    })
      .then(res => res.json())
      .then(outfits => {
        console.log('OUTFITS by item', outfits)
        dispatch({
          type: 'OUTFITS_BY_ITEM',
          outfits: outfits
        })
      })
  }
}
