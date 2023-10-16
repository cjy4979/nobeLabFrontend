import { request } from "@umijs/max";

const baseUrl = '/api/admin/intro'

//获取实验室简介
export async function getIntro() {
    return request(baseUrl + '/getIntro', {
        method: 'GET'
    })
}

//添加实验室简介
export async function addIntro(
    params: {
        intro_cn: string,
        intro_en: string
    }
) {
    return request(baseUrl + '/addIntro', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//更新实验室简介
export async function updateIntro(
    params: {
        intro_cn: string,
        intro_en: string
    }
) {
    return request(baseUrl + '/updateIntro', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//获取实验室图片
export async function getIntroImages() {
    return request(baseUrl + '/getIntroImages', {
        method: 'GET'
    })
}

//添加实验室图片
export async function addIntroImages(
    params: {
        name_cn: string,
        name_en: string,
        picId: string,
        path: string,
        imageName: string,
        type: string
    }
) {
    return request(baseUrl + '/addIntroImages', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//更新实验室图片
export async function updateIntroImages(
    params: {
        isShow: number,
        name_cn: string,
        name_en: string,
        picId: string
    }
) {
    return request(baseUrl + '/updateIntroImages', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//删除实验室图片
export async function deleteIntroImages(
    params: {
        picId: string
    }) {
    return request(baseUrl + '/deleteIntroImages', {
        method: 'DELETE',
        params: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}