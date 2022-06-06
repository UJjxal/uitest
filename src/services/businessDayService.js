import { API_ROOT } from "../config";
import http from './httpService';

export function getBusinessDay() {
  return http.get(`${API_ROOT}listBusinessDay/`);
}

export function addBusinessDay(data) {
  return http.post(`${API_ROOT}businessDay/`, data);
}
