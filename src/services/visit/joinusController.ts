import { request } from '@umijs/max';

const baseUrl = "/api/visit/recruit"


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
