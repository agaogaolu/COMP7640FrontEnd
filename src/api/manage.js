import request from '@/utils/request'

export const vendorGetProduct = (data) => {
    return request.post('/api/vendor/getproduct', {
        "vendor_id": data
    })
}

export const vendorAddProduct = (form) => {
    return request.post('/api/vendor/addproduct', {
        "product_name": form.product_name,
        "vendor_id": Number(form.vendor_id),
        "price_pd": Number(form.price_pd),
        "inventory": Number(form.inventory)
    })
}

export const vendorModifyProduct = (form) => {
    return request.post('/api/vendor/modifyproduct', {
        "new_product_name": form.new_product_name,
        "product_id": form.product_id,
        "new_price_pd": form.new_price_pd,
        "new_inventory": form.new_inventory
    })
}
export const vendorDelProduct = (id) => {
    return request.post('/api/vendor/deleteproduct', {
        "product_id": id
    })
}

export const vendorOrder = (id) => {
    return request.post('/api/vendor/vieworder', {
        "vendor_id": id
    })
}

export const vendorOrderUpdate = (data) => {
    return request.post('/api/vendor/updatestatus', {
        "order_id": data.order_id,
        "new_status": data.dispatcher_status
    })
}



