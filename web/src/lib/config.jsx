const TEST_ENV = false;
const PROD_ENV = false;

const BACKEND = {'POET': 3000, 'API_URL': PROD_ENV ? 'https://prod-api.url':TEST_ENV?'https://test-api.url':'http://localhost:3000/kharidlow'}

export {BACKEND}