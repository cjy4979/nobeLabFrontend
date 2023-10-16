import { request } from '@umijs/max';

const baseUrl = "/api/admin/teams"

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

//添加老师
export async function addTeacher(
    params: {
        teacher_cn: {
            uid: string,
            name: string,
            proTitle: string,
            title: string,
            education: string,
            researchDirection: string,
            email: string,
            imgpath: string,
            introDetail: string,
        },
        teacher_en: {
            uid: string,
            name: string,
            proTitle: string,
            title: string,
            education: string,
            researchDirection: string,
            email: string,
            imgpath: string,
            introDetail: string,
        }
    }
) {
    return request(baseUrl + '/addTeacher', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//更新老师信息
export async function updateTeacher(
    params: {
        uid: string,
        teacher_cn: {
            uid: string,
            name: string,
            proTitle: string,
            title: string,
            education: string,
            researchDirection: string,
            email: string,
            imgpath: string,
            introDetail: string,
        },
        teacher_en: {
            uid: string,
            name: string,
            proTitle: string,
            title: string,
            education: string,
            researchDirection: string,
            email: string,
            imgpath: string,
            introDetail: string,
        }
    }
) {
    return request(baseUrl + '/updateTeacher', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//删除老师
export async function deleteTeacherByUid(
    params: {
        uid: string
    }
) {
    return request(baseUrl + '/deleteTeacherByUid', {
        method: 'DELETE',
        params: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
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

//添加学生
export async function addStudent(
    params: {
        student_cn: {
            uid: string,
            name: string,
            eduQualification: string,
            hobby: string,
            year: string,
            researchDirection: string,
            graduatedSchool: string,
        },
        student_en: {
            uid: string,
            name: string,
            eduQualification: string,
            hobby: string,
            year: string,
            researchDirection: string,
            graduatedSchool: string,
        }
    }
) {
    return request(baseUrl + '/addStudent', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//更新学生信息
export async function updateStudent(
    params: {
        uid: string,
        student_cn: {
            uid: string,
            name: string,
            eduQualification: string,
            hobby: string,
            year: string,
            researchDirection: string,
            graduatedSchool: string,
        },
        student_en: {
            uid: string,
            name: string,
            eduQualification: string,
            hobby: string,
            year: string,
            researchDirection: string,
            graduatedSchool: string,
        }
    }
) {
    return request(baseUrl + '/updateStudent', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//删除学生
export async function deleteStudentByUid(
    params: {
        uid: string
    }
) {
    return request(baseUrl + '/deleteStudentByUid', {
        method: 'DELETE',
        params: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//获取过往学生列表
export async function getGraduated() {
    return request(baseUrl + '/getGraduated', {
        method: 'GET'
    })
}

//获取过往学生详细信息
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

//添加过往学生
export async function addGraduated(
    params: {
        graduated_cn: {
            uid: string,
            name: string,
            graduatedYear: string,
            graduatedSchool: string,
            graduationDestination: string,
            major: string,
            imgpath: string,
            eduQualification: string
        },
        graduated_en: {
            uid: string,
            name: string,
            graduatedYear: string,
            graduatedSchool: string,
            graduationDestination: string,
            major: string,
            imgpath: string,
            eduQualification: string
        }
    }
) {
    return request(baseUrl + '/addGraduated', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//更新过往学生信息
export async function updateGraduated(
    params: {
        uid: string,
        graduated_cn: {
            uid: string,
            name: string,
            graduatedYear: string,
            graduatedSchool: string,
            graduationDestination: string,
            major: string,
            imgpath: string,
            eduQualification: string
        },
        graduated_en: {
            uid: string,
            name: string,
            graduatedYear: string,
            graduatedSchool: string,
            graduationDestination: string,
            major: string,
            imgpath: string,
            eduQualification: string
        }
    }
) {
    return request(baseUrl + '/updateGraduated', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//删除学生
export async function deleteGraduatedByUid(
    params: {
        uid: string
    }
) {
    return request(baseUrl + '/deleteGraduatedByUid', {
        method: 'DELETE',
        params: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}