import { request } from '@umijs/max';

const baseUrl = "/api/visit/news"

//获取新闻列表
export async function getNewsList(
    params: {
        pageSize: number,
        current: number
    }
) {
    return request(baseUrl + '/getNewsList', {
        method: 'GET',
        params:{
            ...params
        }
    })
}

//获取新闻详情
export async function getNewsByPaperId(
    params: {
        paperId: string
    }
) {
    return request(baseUrl + '/getNewsByPaperId', {
        method: 'GET',
        params: {
            ...params
        }
    })
}