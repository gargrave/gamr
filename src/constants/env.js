import authApi from '../modules/auth/authApi';
import authApiMock from '../modules/auth/authApiMock';
import platformApi from '../modules/platform/platformApi';
import platformApiMock from '../modules/platform/platformApiMock';


export const USE_MOCK_APIS = false;
export const MOCK_API_AUTO_LOGIN = true;
export const MOCK_API_DELAY = 1000;

export const AUTH_API = USE_MOCK_APIS ? authApiMock : authApi;
export const PLATFORM_API = USE_MOCK_APIS ? platformApiMock : platformApi;
