import {req} from './axiosFun'
//查询
export const personalList = (params) => { return req("post", "http://localhost:8081/personal/select", params) };
export const updatepwd = (params) => { return req("post", "http://localhost:8081/personal/updatepwd", params) };