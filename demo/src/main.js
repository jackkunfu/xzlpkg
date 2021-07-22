import { createApp } from 'vue';
import App from './App.vue';

import xzlpkg, { Repeat } from '../../lib/index.js';

// import xzlpkg, { Repeat } from 'xzlpkg';
// import '../node_modules/xzlpkg/dist/style.css';
// console.log(Repeat);
// console.log(xzlpkg);

const app = createApp(App);
app.use(Repeat);
app.mount('#app');
