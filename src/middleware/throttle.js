// an object used to store throttle
const throttled = {};

const middleware = () => next => action => {
  // look for a throttle flag in the action
  const time = action.meta && action.meta.throttle;

  // move on to the next action if there is no throttle flag
  if (!time) {
    return next(action);
  }

  // ignore the action if its already throttled
  // if the 'throttled' object contains a key associated with the action type and its value is true
  if (throttled[action.type]) {
    return;
  }

  // set the throttle for the upcoming action type
  throttled[action.type] = true;

  // clear the throttle
  setTimeout(
    () => throttled[action.type] = false,
    time
  );

  return next(action);
};

export default middleware;
