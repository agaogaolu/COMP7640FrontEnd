import request from '@/utils/request'

export const userGetVendor = () => {
    return request.get('/api/user/vendor')
}

export const userGetProduct = (data) => {
    return request.post('/api/user/product', {
        'vendor_id': data
    })
}



export const userAddData = (data) => {
    return request.post('/api/user/addorder', {
        'cons_addre': data.cons_addre,
        'cons_name': data.cons_name,
        'order_money': data.order_money,
        'order_way': data.order_way,
        'shop_name': data.shop_name

    })
}

export const userFinished = () => {
    return request.get('/api/user/sended')
}

export const userUnsendgGet = () => {
    return request.get('/api/user/unsend')
}

export const userUnsendChange = (data) => {
    return request.post('/api/user/unsend', {
        'cons_addre': data.cons_addre,
        'order_id': data.order_id,
        'cons_name': data.cons_name
    })
}

export const userUnsendDel = (data) => {
    return request.delete('/api/user/unsend', {
        data: {
            delete_id: data
        }
    })
}
export const userSendingGet = () => {
    return request.get('/api/user/sending');
}

export const userAddOrder = (data) => {
    return request.post('/api/user/addorder', {
        'customer_id':data.customer_id,
        'orderlist': data.orderlist

    })
}
