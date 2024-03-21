import request from '@/utils/request'

export const userLogin = (loginForm) => {
    return request.post('/api/user/login', {
        'userortel': loginForm.userortel,
        'password': loginForm.password,
        'role':loginForm.role
        
    })
}