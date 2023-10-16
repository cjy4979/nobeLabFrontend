import { request } from '@umijs/max';

const baseUrl = "/api/admin/recruit"


//获取招聘列表
export async function getRecruitList() {
    return request(baseUrl + '/getRecruitList', {
        method: 'GET'
    })
}

//获取招聘详情
export async function getRecruitByType(
    params: {
        type: string
    }
) {
    return request(baseUrl + '/getRecruitByType', {
        method: 'GET',
        params: {
            ...params
        }
    })
}

//添加招聘
export async function addRecruitByType(
    params: {
        recruit_cn: {
            title: string,
            text: string,
            type: string
        },
        recruit_en: {
            title: string,
            text: string,
            type: string
        }
    }
) {
    return request(baseUrl + '/addRecruitByType', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//更新招聘
export async function updateRecruitByType(
    params: {
        type: string,
        recruit_cn: {
            title: string,
            text: string,
        },
        recruit_en: {
            title: string,
            text: string,
        }
    }
) {
    return request(baseUrl + '/updateRecruitByType', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}