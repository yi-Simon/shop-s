import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const service = axios.create({
    baseURL: '/mock',
    timeout: 20000
})

service.interceptors.request.use(function(config) {
    NProgress.start()
    return config;
});

service.interceptors.response.use(function(response) {
    NProgress.done()
    return response;
}, function(error) {
    NProgress.done()
    return Promise.reject(error);
})

export default service