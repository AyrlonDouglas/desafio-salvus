import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
// sagas
import loginSaga from "./ducks/login/saga";
import userSaga from "./ducks/user/saga";
import professionalSaga from "./ducks/professional/saga";

// reducers
import loginReducer from "./ducks/login/slice";
import userReducer from "./ducks/user/slice";
import professionalReducer from "./ducks/professional/slice";
const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    professional: professionalReducer,
  },
  middleware: [saga],
});
saga.run(loginSaga);
saga.run(userSaga);
saga.run(professionalSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
