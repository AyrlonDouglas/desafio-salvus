import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../service/axios";
import { AxiosResponse } from "axios";
import {
  loadProfessional,
  loadProfessionalFail,
  loadProfessionalSuccess,
  createProfessionalFails,
  createProfessionalSuccess,
  createProfessional,
  loadAllProfessionals,
  loadAllProfessionalsFail,
  loadAllProfessionalsSuccess,
} from "./slice";

import { toast } from "react-toastify";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";

type Professional = {
  payload: {
    user_id: number;
    profession: string;
    registrationNumber: string;
    specialties: string;
    location: string;
    maximumDisplacement: string;
  };
  type: string;
};

function* createProfessionalRequest({ payload }: Professional) {
  console.log(" entrou em createProfessionalRequest", payload);
  const user_id = localStorage.getItem(LOCALSTORAGE.userId);
  try {
    const response: AxiosResponse = yield call(api.post, `/professionals/`, {
      ...payload,
      RegistrationNumber: payload.registrationNumber,
      user_id,
    });
    yield put(createProfessionalSuccess(response.data));
    yield put(loadAllProfessionals());
  } catch (error) {
    toast.error("Não foi possível cadastrar profissão");
    yield put(createProfessionalFails());
  }
}

function* loadProfessionalRequest({ payload }: Professional) {
  const userId = localStorage.getItem(LOCALSTORAGE.userId);
  try {
    const response: AxiosResponse = yield call(
      api.get,
      `/professionals/${userId}`
    );

    yield put(loadProfessionalSuccess(response.data));
  } catch (error: any) {
    toast.error("Erro ao carregar professional");

    yield put(loadProfessionalFail());
  }
}

function* loadAllProfessionalsRequest() {
  try {
    const response: AxiosResponse = yield call(api.get, `/professionals`);

    yield put(loadAllProfessionalsSuccess(response.data));
  } catch (error) {
    toast.error("Erro ao carregar professionais");

    yield put(loadAllProfessionalsFail);
  }
}

function* professionalSaga() {
  yield takeLatest(loadProfessional("").type, loadProfessionalRequest);
  yield takeLatest(createProfessional("").type, createProfessionalRequest);
  yield takeLatest(loadAllProfessionals().type, loadAllProfessionalsRequest);
}

export default professionalSaga;
