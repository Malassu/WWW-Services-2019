import { history } from '../router/history';

var domain = 'http://closetmap.herokuapp.com';

export const fetchWardrobes = () => {
  return (dispatch, getState) => {
    let headers = { "Content-Type": "application/json" };
    let token = getState().auth.token;

    if (token) {
      headers["Authorization"] = `JWT ${token}`;
    }

    return fetch(domain + '/my/', { headers, })
      .then(res => res.json())
      .then(wardrobes => {
        console.log(wardrobes) // TODO Remove
        return dispatch({
          type: 'FETCH_WARDROBES',
          wardrobes
        })
      })
  }
}

export const addWardrobe = (data) => {
  return (dispatch, getState) => {
    let formData = new FormData()
    formData.append('wardrobe', data.wardrobe)

    if (data.image) {
      formData.append('image', data.image, data.image.name)
    } else {
      formData.append('image', data.image)
    }

    return fetch(domain + '/add_wd/', {
      headers: {
        Authorization: `JWT ${getState().auth.token}`
      },
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(wardrobe => {
        console.log('Added wardrobe', wardrobe) // TODO Remove
        dispatch({
          type: 'ADD_WARDROBE',
          wardrobe
        })
        history.push(`/wrdbs/${wardrobe.pk}`, { name: wardrobe.name })
        return wardrobe;
      })
  }
}

export const deleteWardrobe = (wardrobeName) => {
  return (dispatch, getState) => {

    return fetch(domain + '/del_wd/', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${getState().auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ current_wd: wardrobeName })
    })
      .then(res => res.json())
      .then(json => {
        console.log('Delete wardrobe response', json)
        // TODO: Update redux aka dispatch event
        // TODO Redirect
        history.push('/home')
      })
  }
}

export const modifyWardrobe = (wardrobeName, newName) => {
  return (dispatch, getState) => {
    return fetch(domain + '/mod_wd/', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${getState().auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        current_wd: wardrobeName,
        new_name: newName
      })
    })
      .then(res => res.json())
      .then(wardrobe => {
        console.log('Modified wardrobe', wardrobe)
        // TODO: dispatch an action?
      })
  }
}
