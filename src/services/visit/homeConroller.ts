import { request } from '@umijs/max'

const baseUrl = '/api/visit/home'

//获取走马灯列表
export async function getCarousel() {
    return request(baseUrl + '/getCarousel', {
        method: 'GET'
    })
}


//获取科研成果列表
export async function getAchievementsPic() {
    return request(baseUrl + '/getAchievementsPic', {
        method: 'GET'
    })
}

//获取实验室简介
export async function getIntro() {
    return request(baseUrl + '/getIntro', {
        method: 'GET'
    })
}


//获取招聘列表
export async function getRecruitList() {
    return request(baseUrl + '/getRecruitList', {
        method: 'GET'
    })
}

//获取新闻列表
export async function getNewsList() {
    return request(baseUrl + '/getNewsList', {
        method: 'GET'
    })
}