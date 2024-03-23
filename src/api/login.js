import request from '@/utils/request'

export const userLogin = (loginForm) => {
    return request.post('/api/user/login', {
        'userortel': loginForm.userortel,
        'password': loginForm.password,
        'role': loginForm.role

    })
}

export const userReg = (regForm) => {
    return request.post('/api/user/register/test', {
        username: regForm.username,
        password: regForm.password,
        role: regForm.role,
        telephone:regForm.telephone
    })
}