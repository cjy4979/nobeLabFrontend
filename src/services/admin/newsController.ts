import { request } from '@umijs/max';

const baseUrl = "/api/admin/news"

//获取新闻列表
export async function getNewsList(
    params: {
        pageSize: number,
        current: number
    }
) {
    return request(baseUrl + '/getNewsList', {
        method: 'GET',
        params: {
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
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//添加新闻
export async function addNewsByPaperId(
    params: {
        news_cn: {
            paperId: string,
            title: string,
            text: string
        },
        news_en: {
            paperId: string,
            title: string,
            text: string
        }
    }
) {
    return request(baseUrl + '/addNewsByPaperId', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//更新新闻
export async function updateNewsByPaperId(
    params: {
        paperId: string,
        news_cn: {
            title: string,
            text: string
        },
        news_en: {
            title: string,
            text: string
        }
    }) {
    return request(baseUrl + '/updateNewsByPaperId', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}
//删除新闻
export async function deleteNewsByPaperId(
    params: {
        paperId: string
    }) {
    return request(baseUrl + '/deleteNewsByPaperId', {
        method: 'DELETE',
        params: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}