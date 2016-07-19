import authApi from '../modules/auth/authApi';
import authApiMock from '../modules/auth/authApiMock';


export const USE_MOCK_APIS = true;
export const MOCK_API_AUTO_LOGIN = true;
export const MOCK_API_DELAY = 1000;
export const AUTH_API = USE_MOCK_APIS ? authApiMock : authApi;
