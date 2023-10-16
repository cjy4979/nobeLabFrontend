import { request } from '@umijs/max';

const baseUrl = "/api/admin/user"

export async function login(
    params: {
        username?: string,
        password?: string
    },
    options?: { [key: string]: any },
) {
    return request(baseUrl + '/login', {
        method: 'POST',
        data: {
            ...params,
        },
        ...(options || {}),
    });
}

export async function register(
    params: {
        username?: string,
        password?: string
    },
    options?: { [key: string]: any }
) {
    return request(baseUrl + '/register', {
        method: 'POST',
        data: {
            ...params,
        },
        ...(options || {})
    })
}

export async function logout(

) {
    return request(baseUrl + '/logout', {
        method: 'POST'
    })
}

export async function getLogin() {
    return request(baseUrl + '/getLogin', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
}