import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../service/axios";
import { AxiosResponse } from "axios";
import {
  loadUser,
  loadUserFail,
  loadUserSuccess,
  changePass,
  changePassFail,
  changePassSuccess,
  deleteUser,
  deleteUserFail,
  deleteUserSuccess,
} from "./slice";
import { toast } from "react-toastify";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";

type User = {
  payload: { user: number; password?: string };
  type: string;
};

function* loadUserRequest({ payload }: User) {
  const userId = localStorage.getItem(LOCALSTORAGE.userId);
  try {
    const response: AxiosResponse = yield call(api.get, `/users/${userId}`);

    yield put(loadUserSuccess(response.data));
  } catch (error: any) {
    toast.error("Erro ao carregar usuário");

    yield put(loadUserFail());
  }
}
function* changePassword({ payload }: User) {
  const userId = localStorage.getItem(LOCALSTORAGE.userId);
  const { password } = payload;
  try {
    const response: AxiosResponse = yield call(api.patch, `/users/${userId}`, {
      password,
    });
    toast.success("Senha trocada com sucesso");
    yield put(deleteUserSuccess());
  } catch (error) {
    toast.error("Erro ao salvar senha");
    yield put(changePassFail());
  }
}
function* handleDeleteUser() {
  try {
    const userId = localStorage.getItem(LOCALSTORAGE.userId);
    const response: AxiosResponse = yield call(api.delete, `/users/${userId}`);
    localStorage.removeItem(LOCALSTORAGE.token);
    localStorage.removeItem(LOCALSTORAGE.userId);
    toast.success("Usuário excluido com sucesso!");

    yield put(changePassSuccess());
  } catch (error) {
    toast.error("Erro ao excluir usuário");
    yield put(deleteUserFail());
  }
}

function* userSaga() {
  yield takeLatest(loadUser("").type, loadUserRequest);
  yield takeLatest(changePass("").type, changePassword);
  yield takeLatest(deleteUser().type, handleDeleteUser);
}

export default userSaga;
