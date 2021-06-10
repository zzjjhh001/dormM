import {req} from './axiosFun'
//查询
export const buildingList = (params) => { return req("post", "http://localhost:8081/building/select", params) };
export const buildingadd = (params) => { return req("post", "http://localhost:8081/building/add", params) };
export const buildingdelete = (params) => { return req("delete", "http://localhost:8081/building/delete/"+params) };