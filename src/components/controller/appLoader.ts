import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        if (!process.env.API_URL || !process.env.API_KEY) {
            throw new Error('Missing API_URL or API_KEY');
        }

        super(process.env.API_URL, {
            apiKey: process.env.API_KEY,
        });
    }
}

export default AppLoader;
