import { BACKEND } from '../lib/config'
import axios from "axios";


const API_URL = BACKEND.API_URL;

// ---------------------------------------------------------This file containsall the register api of the application---------------------------------------------------------


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

export {addNewColor}