import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://react-my-burger-8755e.firebaseio.com/'
});

export default instance;