const logger = param => store => next => action => {
  console.log(param);
  next(action);
}

export default logger;