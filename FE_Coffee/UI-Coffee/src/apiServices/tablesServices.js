import request from "../utils/request.js";

export const getTables = async (id) => {
    try {
        const res = await request.get('tables',id);
        console.log('lấy data bàn oki');
        return res.data;
    } catch (error) {
        console.log( error);
    }
};