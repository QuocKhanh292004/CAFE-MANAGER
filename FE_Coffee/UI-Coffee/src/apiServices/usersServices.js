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

export const branchUsers = async (branchId) => {
    try {
        const res = await request.get(
            `/users/branch/users?branch_id=${branchId}`
        );

        console.log('Lấy data theo nhánh OK');
        return res.data;
    } catch (error) {
        console.log(error, 'Lỗi khi lấy data theo nhánh');
        throw error;
    }
};

// xóa người dùng
export const deleteUser = async (id) => {
    const res = await request.delete(`/users/${id}`);
}