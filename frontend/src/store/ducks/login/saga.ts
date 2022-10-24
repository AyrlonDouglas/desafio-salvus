import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../service/axios";
import { AxiosResponse, AxiosError } from "axios";

import {
  loginFail,
  loginSuccess,
  loginRequest as load,
  loginRequest,
  signUpRequest,
  signUpFail,
  signUpSuccess,
} from "./slice";

import LOCALSTORAGE from "../../../helpers/constants/localStorage";

type Credentials = {
  payload: { password: string; username: string };
  type: string;
};
type signUpData = {
  payload: {
    email: string;
    gender: string;
    name: string;
    password: string;
    passwordConfirm: string;
    telephone: string;
    username: string;
  };
  type: string;
};

function* login({ payload }: Credentials) {
  try {
    const response: AxiosResponse = yield call(
      api.post,
      "/auth/login",
      payload
    );
    toast("Seja bem-vindo!");

    localStorage.setItem(LOCALSTORAGE.token, response.data.access_token);
    localStorage.setItem(LOCALSTORAGE.userId, response.data.id);

    yield put(loginSuccess(response.data));
  } catch (error: any) {
    if (error?.response?.data?.statusCode === 401) {
      toast.error("Usuário e/ou senha erradas");
    } else {
      toast.error("Não foi possível realizar login");
    }
    localStorage.setItem(LOCALSTORAGE.token, "");
    yield put(loginFail());
  }
}

function* signUp({ payload }: signUpData) {
  try {
    const response: AxiosResponse = yield call(api.post, "/users", payload);
    toast.success("Realize seu login para continuar");

    yield put(signUpSuccess());
  } catch (error: any) {
    toast.error("Usuário e/ou e-mail já cadastrados");

    yield put(signUpFail());
  }
}

export default function* userSaga() {
  yield takeLatest(loginRequest("").type, login);
  yield takeLatest(signUpRequest("").type, signUp);
}
