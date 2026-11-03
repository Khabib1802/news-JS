import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        if (!process.env.API_URL) {
            throw new Error('Missing API_URL');
        }

        const options = process.env.API_KEY ? { apiKey: process.env.API_KEY } : {};

        super(process.env.API_URL, options);
    }
}

export default AppLoader;
