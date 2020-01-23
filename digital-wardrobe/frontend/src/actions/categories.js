var domain = 'http://closetmap.herokuapp.com';

// TODO: Handling failing requests
export const fetchWardrobeCategories = (wardrobeName) => {
  return (dispatch, getState) => {
    return fetch(domain + '/my_cats/', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${getState().auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ curr_wd: wardrobeName })
    })
      .then(res => res.json())
      .then(categories => {
        console.log('Wardrobe categories', categories) // TODO Remove
        return dispatch({
          type: 'FETCH_CATEGORIES',
          categories
        })
      })
  }
}

// TODO: Handling failing requests
export const fetchAllCategories = () => {
  return (dispatch, getState) => {
    fetch(domain + '/all_cats/', {
      headers: {
        Authorization: `JWT ${getState().auth.token}`
      }
    })
      .then(res => res.json())
      .then(categories => {
        console.log(categories) // TODO Remove
        return dispatch({
          type: 'FETCH_ALL_CATEGORIES',
          categories
        })
      })
  }
}

// TODO: Handle failing request
export const addCategory = (data) => {
  return (dispatch, getState) => {

    let formData = new FormData();
    formData.append('category', data.category)

    if (data.image) {
      formData.append('image', data.image, data.image.name)
    } else {
      formData.append('image', data.image)
    }

    return fetch(domain + '/add_cat/', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${getState().auth.token}`
      },
      mode: 'cors',
      body: formData
    })
      .then(res => res.json())
      .then(category => {
        console.log('Added category', category)
        return dispatch({
          type: 'ADD_CATEGORY',
          category
        })
      })
  }
}

export const modifyCategory = (e, data) => {
  e.preventDefault()

  return (dispatch, getState) => {
    return fetch(domain + '/mod_cat/', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${getState().auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log('Modied category response: ', json)
        // Response doesn't currently contain info about updated category
        // Hence: do not dispatch an event maybe?
        // TODO: Dispatch event
      })
  }
}

export const deleteCategory = (e, data) => {
  e.preventDefault()

  return (dispatch, getState) => {
    return fetch(domain + '/del_cat/', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${getState().auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log('Delete category', json)
        // TODO: Dispatch event?
      })
  }
}
