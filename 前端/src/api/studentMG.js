import {req} from './axiosFun'
//查询
export const deptList = (params) => { return req("post", "http://localhost:8081/student/select", params) };
//删除
export const deptDelete = (params) => {return req("delete","http://localhost:8081/student/delete/"+params) };
//增加，修改
export const deptSave = (params) => { return req("post", "http://localhost:8081/student/add", params) };
