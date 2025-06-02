import { Client } from "../Client"

export const baseURL = "http://localhost:8081"
export const registerUser = async (payload: any) => {
    const createUser = await Client("POST", `${baseURL}/users/register`, payload);
    return { status: createUser?.status, data: createUser?.data }
}

export const loginUser = async (payload: any) => {
    const loginUser = await Client("POST", `${baseURL}/users/login`, payload);
    return { status: loginUser?.status, data: loginUser?.data }
}

export const addProduct = async (payload: any) => {
    const addProduct = await Client("POST", `${baseURL}/users/products`, payload);
    return { status: addProduct?.status, data: addProduct?.data }
}

export const getProducts = async (email:any) => {
    const getProducts = await Client("GET", `${baseURL}/users/products/${email}`);
    console.log(getProducts);  
    return { status: getProducts?.status, data: getProducts?.data }
}

export const addLikedProducts = async (payload: any) => {
    const likedProducts = await Client("POST", `${baseURL}/users/like`, payload);
    return { status: likedProducts?.status, data: likedProducts?.data }
}

export const getLikedProducts = async (userId:any) => {
    const likedProducts = await Client("GET", `${baseURL}/users/likes/${userId}`);
    return { status: likedProducts?.status, data: likedProducts?.data }
}

export const addCartProducts = async (payload: any) => {
    const cartProducts = await Client("POST", `${baseURL}/users/cart`, payload);
    return { status: cartProducts?.status, data: cartProducts?.data }
}

export const getCartProducts = async (userId: any) => {
    const cartProducts = await Client("GET", `${baseURL}/users/cart/${userId}`);
    return { status: cartProducts?.status, data: cartProducts?.data }
}

export const sendQuery = async (payload: any) => {
    const query = await Client("POST", `${baseURL}/users/send-query`, payload);
    return { status: query?.status, data: query?.data }
}


export const sendReview = async (payload: any) => {
    const review = await Client("POST", `${baseURL}/users/send-review`, payload);
    return { status: review?.status, data: review?.data }
}

export const sendSubscribtion = async (payload: any) => {
    const review = await Client("POST", `${baseURL}/users/send-subscribtion`, payload);
    return { status: review?.status, data: review?.data }
}

export const getUserList = async()=>{
    const response = await Client("GET",`${baseURL}/users/get-user-list`)
    return{status:response?.status,data:response?.data}
}

export const getProductsSoldTodayService = async (payload: any) => {
    const review = await Client("GET", `${baseURL}/users/getProductsSoldTodayService`);
    return { status: review?.status, data: review?.data }
}

export const getProductsSoldThisWeekService = async()=>{
    const response = await Client("GET",`${baseURL}/users/getProductsSoldThisWeekService`)
    return{status:response?.status,data:response?.data}
}
export const getRevenueThisMonthService = async (payload: any) => {
    const review = await Client("GET", `${baseURL}/users/getRevenueThisMonthService`);
    return { status: review?.status, data: review?.data }
}

export const getWeeklySalesDataService = async()=>{
    const response = await Client("GET",`${baseURL}/users/getWeeklySalesDataService`)
    return{status:response?.status,data:response?.data}
}
export const getSalesByCategoryService = async (payload: any) => {
    const review = await Client("GET", `${baseURL}/users/getSalesByCategoryService`);
    return { status: review?.status, data: review?.data }
}

export const addOrderService = async (payload: any) => {
    const review = await Client("POST", `${baseURL}/users/create-order`, payload);
    return { status: review?.status, data: review?.data }
}

export const deleteProduct = async (payload: any) => {
    const review = await Client("POST", `${baseURL}/users/deleteProduct`, payload);
    return { status: review?.status, data: review?.data }
}

export const editProduct = async (payload: any) => {
    const review = await Client("POST", `${baseURL}/users/editProduct`, payload);
    return { status: review?.status, data: review?.data }
}

export const search = async (payload: any) => {
    const review = await Client("POST", `${baseURL}/users/search`, payload);
    return { status: review?.status, data: review?.data }
}

export const getFilteredProduct = async (payload: any) => {
    const review = await Client("POST", `${baseURL}/users/getFilteredProduct`, payload);
    return { status: review?.status, data: review?.data }
}

export const getProductDeatilsById = async (id: any) => {
    const cartProducts = await Client("GET", `${baseURL}/users/getProductById/${id}`);
    return { status: cartProducts?.status, data: cartProducts?.data }
}