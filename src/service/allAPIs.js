import commonAPI from "./commonAPI";
import { serverURL } from "./ServerURL";

// api calls

// register
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/register`, reqBody)
}

// login api
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/login`, reqBody)
}

// Google login api
export const googleLoginAPI = async (reqBody) => {
    return await commonAPI("POST", `${serverURL}/google-login`, reqBody)
}

// add book
export const addBookAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${serverURL}/add-book`, reqBody, reqHeader)
}

// get home books
export const getHomeBooksAPI = async () => {
    return await commonAPI("GET", `${serverURL}/home-books`)
}

// get all books
export const getAllBooksAPI = async (searchKey, reqHeader) => {
    return await commonAPI("GET", `${serverURL}/all-books?search=${searchKey}`, {}, reqHeader) // query parameter
}

// get all user added books
export const getAllUserAddedBooksAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/user-books`, {}, reqHeader)
}

// remove user added book
export const removeUserAddedBookAPI = async (id, reqHeader) => {
    return await commonAPI("DELETE", `${serverURL}/remove-book/${id}`, {}, reqHeader)
}

// get user brought book
export const getUserBoughtBooksAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/user-boughtbook`, {}, reqHeader)
}

// view book
export const viewBookAPI = async (id, reqHeader) => {
    return await commonAPI("GET", `${serverURL}/view-book/${id}`, {}, reqHeader)
}

// user profile update
export const updateUserProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/update-profile`, reqBody, reqHeader)
}

// make-payment 
export const makePaymentAPI = async (reqBody, reqHeader)=>{
    return await commonAPI(`POST`, `${serverURL}/make-payment`, reqBody, reqHeader)
}

// ---------------------- admin --------------------------
// get all book
export const getAllAdminBooksAPI = async (reqHeader) => {
    return await commonAPI("GET", `${serverURL}/admin-allbooks`, {}, reqHeader)
}

// approve book
export const approveBookAPI = async (id, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/admin-updatebook/${id}`, {}, reqHeader)
}


// user profile update
export const updateAdminProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${serverURL}/admin-updateprofile`, reqBody, reqHeader)
}

// get all users 
export const getAllUsersAPI = async (reqHeader) => {
    return await commonAPI(`GET`, `${serverURL}/admin-allusers`, {}, reqHeader)
}
