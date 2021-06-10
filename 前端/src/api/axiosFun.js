import axios from 'axios';
// 登录请求方法
const loginreq = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                return ret
            }
        ]
    });
};
// 通用公用方法
const req = (method, url, params) => {

    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token: (localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).token:null)
        },
        data: params,
        traditional: true,
        transformRequest: [
            function(data) {
                let ret = ''
                console.log(data)
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                }
                console.log(ret)
                return ret
            }
        ]
    });
};

export {
    loginreq,
    req
}