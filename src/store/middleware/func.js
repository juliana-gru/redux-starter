//this middleware is built-in in redux toolkit and it's called thunk.

const func = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function')
    action();
  else  
    next(action);
}

export default func;
