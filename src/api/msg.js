import request from '@/utils/request'


export const msgInfoGet = () => {
    return request.get('/api/user/usermsg')
}

export const msgPwdChange = (data) => {
    return request.post('/api/user/pwd_chg', {
        'check_pwd': data.check_pwd,
        'new_pwd': data.new_pwd,
        'old_pwd': data.old_pwd
    })
}

