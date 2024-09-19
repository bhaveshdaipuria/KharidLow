import { BACKEND } from '../lib/config'
import axios from "axios";


const API_URL = BACKEND.API_URL;

// ---------------------------------------------------------This file containsall the register api of the application---------------------------------------------------------


//service for adding new product
const addNewProduct = async (data) => {
    const url = `${API_URL}/addnewproduct`;

    console.log('daata', data);

    return new Promise(async (resolve, reject) => {
        await axios({
            method: 'post',
            url: url,
            data: data
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        });
    });
}


//service for adding new color to product
const addNewColor = async (id, data) => {
    const url = `${API_URL}/addnewcolor/${id}`;

    console.log('id', id);
    console.log('daata', data);

    //getting data from url
    // await new Promise(resject)
    return new Promise(async (resolve, reject) => {
        await axios({
            method: 'put',
            url: url,
            data: data
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        });
    });

}

 //methord for addig new price slab
 const addNewPriceSlab = async (id, data) => {
    const url = `${API_URL}/addnewpriceslab/${id}`;

    console.log('id', id);
    console.log('daata', data);

    //getting data from url
    // await new Promise(resject)
    return new Promise(async (resolve, reject) => {
        await axios({
            method: 'put',
            url: url,
            data: data
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        });
    });

}


//service for adding new user
const register = async (data) => {
    const url = `${API_URL}/register`;

    console.log('daata', data);

    return new Promise(async (resolve, reject) => {
        await axios({
            method: 'post',
            url: url,
            data: data
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        });
    });
}


export {addNewColor, addNewPriceSlab, addNewProduct, register}