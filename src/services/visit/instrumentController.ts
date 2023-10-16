import { request } from '@umijs/max'

const baseUrl = '/api/visit/instruments'

//获取仪器设备图
export async function getInstruments() {
    return request(baseUrl + '/getInstruments', {
        method: 'GET'
    })
}


//获取仪器设备简介
export async function getInstrumentIntro() {
    return request(baseUrl + '/gettInstrumentIntro', {
        method: 'GET'
    })
}
