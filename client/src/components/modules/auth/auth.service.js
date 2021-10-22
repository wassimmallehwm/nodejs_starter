import Axios from 'axios';
import config from '../../../config/config';

const API_URL = config.apiUrl + "users/";

export const authenticate = (data) => {
    return Axios.post(API_URL + "login", data);
}
