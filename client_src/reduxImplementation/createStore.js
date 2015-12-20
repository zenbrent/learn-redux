const createStore = reducer => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = action => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = listener => {
        listeners.push(listener);

        // unsubscribe
        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    };

    // get initial value with a dummy action
    dispatch({});

    return {getState, subscribe, dispatch};
};

export {createStore};
