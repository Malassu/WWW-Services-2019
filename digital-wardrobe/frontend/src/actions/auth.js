var domain = 'http://closetmap.herokuapp.com';

/**
 * Methods:
 * - login
 * - logout
 * - loadUser
 * - signup
 */

export const login = (username, password) => {
  return (dispatch, getState) => {
    return fetch(domain + '/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          })
        } else {
          console.log("Server error");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: 'LOGIN_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({ type: 'AUTHENTICATION_ERROR', data: res.data })
          // TODO: Dipslay error message to the user
          throw res.data;
        } else {
          dispatch({ type: 'LOGIN_FAILED', data: res.data });
          // TODO: Dipslay error message to the user
          throw res.data;
        }
      })
  }
}

// TODO
export const logout = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'USER_LOGOUT', data: { errors: [], user: null } })
  }
}

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'USER_LOADING' });
    return fetch(domain + '/current_user/',
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${getState().auth.token}`
        }
      })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data };
          })
        } else {
          console.log("Server error");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: 'USER_LOADED', user: res.data });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({ type: 'AUTHENTICATION_ERROR', data: res.data });
          throw res.data;
        }
      })
  }
}

export const signup = (username, password) => {
  return (dispatch, getState) => {
    return fetch(domain + '/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        console.log('RES', res)
        if (res.status < 500) {
          return res.json().then(data => {
            return { status: res.status, data: data };
          })
        } else {
          console.log("Server error");
          throw res;
        }
      })
      .then(result => {
        if (result.status === 200 || result.status === 201) {
          dispatch({ type: 'REGISTRATION_SUCCESSFUL', data: result.data });
          return result.data;
        } else if (result.status === 403 || result.status === 401) {
          dispatch({ type: 'AUTHENTICATION_ERROR', data: result.data });
          // TODO: Display error message to the user
          throw result.data;
        } else {
          dispatch({ type: 'REGISTRATION_FAILED', data: result.data });
          // TODO: Display error message to the user
          throw result.data;
        }
      })
  }
}
