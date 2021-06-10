import {req} from './axiosFun'

export const baoxiuList = (params) => { return req("post", "http://localhost:8081/baoxiu/select", params) };
export const baoxiuAdd = (params) => { return req("post", "http://localhost:8081/baoxiu/add", params) };
export const baoxiuUpdate = (params) => { return req("post", "http://localhost:8081/baoxiu/update",params) };