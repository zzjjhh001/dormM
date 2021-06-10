import {req} from './axiosFun'
//查询
export const dormList = (params) => { return req("post", "http://localhost:8081/dorm/select", params) };
export const dormadd = (params) => { return req("post", "http://localhost:8081/dorm/add", params) };
export const dormdelete = (params) => { return req("delete", "http://localhost:8081/dorm/delete/"+params) };