let index: any = 'env';
let apiUrl: any = 'apiURL';
export const environment = {
  production: false,
  API_URL: window[index][apiUrl] || 'https://active-api.trueconnect.io.vn',
  name: window[index]['name'] || 'production',
  firebaseConfig: {
    apiKey: 'AIzaSyCZet-Z0nObrxeOwDjgvWAMXpo3gQJ8zLI',
    authDomain: 'webbandongho-91eee.firebaseapp.com',
    projectId: 'webbandongho-91eee',
    storageBucket: 'webbandongho-91eee.appspot.com',
    messagingSenderId: '258186288702',
    appId: '1:258186288702:web:f81e4828e995607066fb6f',
  },
  URL_Render: 'https://sendmail-and-pay-do-an.vercel.app',
};
