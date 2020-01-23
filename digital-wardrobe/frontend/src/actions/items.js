import { history } from '../router/history';

var domain = 'http://closetmap.herokuapp.com';

export const addItem = (data) => {
  return (dispatch, getState) => {
    let form_data = new FormData();
    form_data.append('name', data.name);
    form_data.append('user', getState().auth.user.username);
    form_data.append('wardrobe', data.wardrobe);
    form_data.append('category', data.category);

    if (data.image) {
      form_data.append('image', data.image, data.image.name);
    } else {
      form_data.append('image', data.image)
    }

    return fetch(domain + '/add_item/', {
      headers: {
        Authorization: `JWT ${getState().auth.token}`
      },
      body: form_data,
      method: 'POST',
      mode: 'cors'
    })
      .then(res => res.json())
      .then(item => {
        console.log(item)
        dispatch({
          type: 'ADD_ITEM',
          item: item
        })
        history.push(`/items/${item.pk}`, { item: item })
        return item;
      })
      .catch((err) => {
        throw err;
      })
  }
}

export const deleteItem = (item) => {
  return (dispatch, getState) => {
    return fetch(domain + '/del_item/', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${getState().auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: item.name })
    })
      .then(res => res.json())
      .then(response => {
        // TODO: Would be better to redirect where the item was from
        history.push('/home')

        // Item: { username: username}
        /* return dispatch({
          type: 'DELETE_ITEM',
          item: item
        })*/
      })
      .catch((err) => {
        throw err;
      })
  }
}

export const modifyItem = (data) => {
  return (dispatch, getState) => {
    let form_data = new FormData();
    form_data.append('name', data.name);
    form_data.append('new_name', data.new_name);
    form_data.append('wardrobe', data.wardrobe);
    if (data.image) {
      form_data.append('image', data.image, data.image.name);
    }
    else {
      form_data.append('image', data.image);
    }
    form_data.append('category', data.category);

    return fetch(domain + '/mod_item/', {
      headers: {
        Authorization: `JWT ${getState().auth.token}`
      },
      body: form_data,
      method: 'POST',
      mode: 'cors'
    })
      .then(res => res.json())
      .then(item => {
        console.log('Modified item', item)
        return dispatch({
          type: 'MODIFY_ITEM',
          item: item
        })
      })
      .catch((err) => {
        throw err;
      })
  }
}

/**
 * This returns items in the wardrobe that don't belong to any category.
 */
export const fetchWardrobeItems = (wardrobe) => {
  return (dispatch, getState) => {
    let data = { wardrobe: wardrobe, category: '' };

    return fetch(domain + '/get_items/', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${getState().auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(items => {
        console.log('Fetch wardrobe items', items)
        return dispatch({
          type: 'FETCH_ITEMS',
          items: items
        })
      })
      .catch((err) => {
        throw err;
      })
  }
}

export const fetchWardrobeCategoryItems = (wardrobe, category) => {
  return (dispatch, getState) => {
    let data = { wardrobe: wardrobe, category: category }

    return fetch(domain + '/get_items/', {
      method: 'POST',
      headers: {
        Authorization: `JWT ${getState().auth.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(items => {
        console.log('Fetch wardrobe category items', items)
        return dispatch({
          type: 'FETCH_ITEMS_CATEGORY',
          items: items
        })
      })
      .catch((err) => {
        throw err;
      })
  }
}

export const fetchAllItems = () => {
  return (dispatch, getState) => {
    return fetch(domain + '/all_items/', {
      method: 'GET',
      headers: {
        Authorization: `JWT ${getState().auth.token}`
      },
    })
      .then(res => res.json())
      .then(items => {
        console.log('Fetch all items', items)
        return dispatch({
          type: 'FETCH_ALL_ITEMS',
          items: items
        })
      })
      .catch((err) => {
        throw err;
      })
  }
}
