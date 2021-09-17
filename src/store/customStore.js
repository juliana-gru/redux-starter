import reducer from './reducer';

// This is how Redux works (basically)

function createStore(reducer) {
  let state;
  let listeners = [];

  function subscribe(listener) {    
    listeners.push(listener);
  }

  function dispatch(action) { // in Redux, you'd have some validation here to check if the action is valid
    state = reducer(state, action);

    for (let i = 0; i < listeners.length; i++)
      listeners[i]();      
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState
  }
}

export default createStore(reducer);