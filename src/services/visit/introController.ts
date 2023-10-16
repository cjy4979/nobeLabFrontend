import { request } from "@umijs/max";

const baseUrl = '/api/visit/intro'

//获取实验室简介
export async function getIntro() {
    return request(baseUrl + '/getIntro', {
        method: 'GET'
    })
}

//获取实验室图片
export async function getIntroImages() {
    return request(baseUrl + '/getIntroImages', {
        method: 'GET'
    })
}
