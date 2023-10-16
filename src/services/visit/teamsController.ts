import { request } from '@umijs/max';

const baseUrl = "/api/visit/teams"

//获取教师列表
export async function getTeachers() {
    return request(baseUrl + '/getTeachers', {
        method: 'GET'
    })
}

//根据职称获取教师列表
export async function getTeachersByTitle(
    params: {
        title: string
    }
) {
    return request(baseUrl + '/getTeachersByTitle', {
        method: 'GET',
        params: {
            ...params
        }
    })
}

//获取教师详细信息
export async function getTeacherByUid(
    params: {
        uid?: string
    }
) {
    return request(baseUrl + '/getTeacherByUid', {
        method: 'GET',
        params: {
            ...params
        }
    })
}

//获取学生列表
export async function getStudents() {
    return request(baseUrl + '/getStudents', {
        method: 'GET'
    })
}

//获取学生详细信息
export async function getStudentByUid(
    params: {
        uid?: string
    }
) {
    return request(baseUrl + '/getStudentByUid', {
        method: 'GET',
        params: {
            ...params
        }
    })
}

//获取过往学生列表
export async function getGraduated() {
    return request(baseUrl + '/getGraduated', {
        method: 'GET'
    })
}

//获取学生详细信息
export async function getGraduatedByUid(
    params: {
        uid?: string
    }
) {
    return request(baseUrl + '/getGraduatedByUid', {
        method: 'GET',
        params: {
            ...params
        }
    })
}
