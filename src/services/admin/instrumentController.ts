import { request } from '@umijs/max'

const baseUrl = '/api/admin/instruments'

//获取仪器设备列表
export async function getInstruments() {
    return request(baseUrl + '/getInstruments', {
        method: 'GET'
    })
}

//添加图片
// export async function addImage(params:FormData) {
//     return request(baseUrl+"/image",{
//         method:"POST",
//         ...params,
// headers:{
//     'Content-Type': 'multipart/form-data',
//     'authorization': `Bearer ${sessionStorage.getItem('token')}`
// }
//     })
// }

//添加仪器设备图片
export async function addInstrument(
    params: {
        name_cn: string,
        name_en: string,
        picId: string,
        path: string,
        imageName: string,
        type: string
    }
) {
    return request(baseUrl + '/addInstruments', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//更新仪器设备图片信息
export async function updateInstrument(params: {
    isShow: number,
    name_cn: string,
    name_en: string,
    picId: string
}) {
    return request(baseUrl + '/updateInstruments', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//删除仪器设备
export async function deleteInstrument(
    params: {
        picId: string
    }) {
    return request(baseUrl + '/deleteInstruments', {
        method: 'DELETE',
        params: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//获取仪器设备简介
export async function getInstrumentIntro() {
    return request(baseUrl + '/getInstrumentIntro', {
        method: 'GET'
    })
}

//添加仪器设备简介
export async function addInstrumentIntro(
    params: {
        intro_cn: string,
        intro_en: string
    }
) {
    return request(baseUrl + '/addInstrumentIntro', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//更新仪器设备简介
export async function updateInstrumentIntro(
    params: {
        intro_cn: string,
        intro_en: string
    }
) {
    return request(baseUrl + '/updateInstrumentIntro', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}