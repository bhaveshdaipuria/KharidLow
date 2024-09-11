import {BACKEND} from '../lib/config'
import axios from "axios";


const API_URL = BACKEND.API_URL;

// ---------------------------------------------------------------This file containsall the get data api of the application-------------------------------------------------------------

//service for getting category data
const getCategoryDataService = async() => {
    const url = `${API_URL}/getcategorydata`;

    //getting data from url
    // await new Promise(resject)
    return new Promise(async (resolve, reject) => {
        await axios({
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
            params: {}
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        });
    }); 
    

}

export {getCategoryDataService}