import axios from 'axios';

export default axios.create({ baseURL: 'http://en.wikipedia.org/w/api.php' });
