import { request } from '@umijs/max'

const baseUrl = '/api/admin/home'

//获取走马灯列表
export async function getCarousel() {
    return request(baseUrl + '/getCarousel', {
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

//添加走马灯图片
export async function addCarousel(
    params: {
        name_cn: string,
        name_en: string,
        picId: string,
        path: string,
        imageName: string,
        type: string
    }
) {
    return request(baseUrl + '/addCarousel', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//更新走马灯图片信息
export async function updateCarousel(params: {
    isShow: number,
    name_cn: string,
    name_en: string,
    picId: string
}) {
    return request(baseUrl + '/updateCarousel', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//删除走马灯
export async function deleteCarousel(
    params: {
        picId: string
    }) {
    return request(baseUrl + '/deleteCarousel', {
        method: 'DELETE',
        params: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//获取科研成果列表
export async function getAchievementsPic() {
    return request(baseUrl + '/getAchievementsPic', {
        method: 'GET'
    })
}

//添加科研成果图片
export async function addAchievementsPic(
    params: {
        name_cn: string,
        name_en: string
    }
) {
    return request(baseUrl + '/addAchievementsPic', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//更新科研成果图片信息
export async function updateAchievementsPic(params: {
    isShow: number,
    name_cn: string,
    name_en: string,
    picId: string
}) {
    return request(baseUrl + '/updateAchievementsPic', {
        method: 'POST',
        data: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

//删除科研成果
export async function deleteAchievementsPic(
    params: {
        picId: string
    }) {
    return request(baseUrl + '/deleteAchievementsPic', {
        method: 'DELETE',
        params: {
            ...params
        },
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}

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