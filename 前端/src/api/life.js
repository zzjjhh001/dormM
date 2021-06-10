import {req} from './axiosFun'

export const card = (params) => { return req("post", "http://localhost:8081/life/card", params) };
export const elec = (params) => { return req("post", "http://localhost:8081/life/elec", params) };
export const cardList = (params) => { return req("post", "http://localhost:8081/life/cardrecord", params) };
export const elecList = (params) => { return req("post", "http://localhost:8081/life/elecrecord", params) };
// export const baoxiuUpdate = (params) => { return req("post", "http://localhost:8081/baoxiu/update",params) };