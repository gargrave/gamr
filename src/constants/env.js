import authApi from '../modules/auth/authApi';
import authApiMock from '../modules/auth/authApiMock';
import platformApi from '../modules/platform/platformApi';
import platformApiMock from '../modules/platform/platformApiMock';
import gameApi from '../modules/game/gameApi';
import gameApiMock from '../modules/game/gameApiMock';


export const USE_MOCK_APIS = true;
export const MOCK_API_AUTO_LOGIN = true;
export const MOCK_API_DELAY = 1000;

export const AUTH_API = USE_MOCK_APIS ? authApiMock : authApi;
export const PLATFORM_API = USE_MOCK_APIS ? gameApiMock : gameApi;
export const GAME_API = USE_MOCK_APIS ? gameApiMock : gameApi;
