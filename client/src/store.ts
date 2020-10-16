import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
//import thunk from "redux-thunk";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const configureStore = () =>
  createStore(
    rootReducer,
  //  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
    composeEnhancers(applyMiddleware( sagaMiddleware))
  );

const store = configureStore();
sagaMiddleware.run(rootSaga);
export default store;
