import axios from 'axios'

const url = "http://localhost:3000/todo/"

export const getData = async()=>{
    const data = await axios.get(url);
    return data;
}

export const addData = async(inputData)=> {
    const response = await axios.post(url,inputData);
    return response;
}

export const modifyData = async(keyData,editData) => {
    const response = await axios.patch(url+keyData,editData)
    return response;
}

export const removeData = async(keyData) => {
    const response = await axios.delete(url+keyData);
    console.log(response);
    return response;
} 