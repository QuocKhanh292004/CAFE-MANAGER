import request from "../utils/request";

export const getUser = async () => {
    try {
        const res = await request.get('/users');
        console.log('lấy data user ok !');
        return res.data;
    } catch (error) {

        console.log(error);
    }
};