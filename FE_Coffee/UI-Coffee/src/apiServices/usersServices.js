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
        const res = await request.get(`/users/branch/users?branch_id=${branchId}`);
        console.log('Lấy data theo nhánh OK');
        return res.data;
    } catch (error) {
        console.log(error, 'Lỗi khi lấy data theo nhánh');
        throw error;
    }
};

// Xóa người dùng khỏi hệ thống
export const deleteUser = async (id) => {
    const res = await request.delete(`/users/${id}`);
    return res.data;
};

// Cập nhật thông tin người dùng (username, email, is_locked)
export const updateUser = async (userId, userData) => {
    try {
        const res = await request.put(`/users/${userId}`, userData);
        console.log('Cập nhật người dùng OK');
        return res.data;
    } catch (error) {
        console.log(error, 'Lỗi khi cập nhật người dùng');
        throw error;
    }
};

// Cấp quyền cho người dùng
export const assignRole = async (userId, roleId) => {
    try {
        const res = await request.post('/users/assign-role', {
            user_id: userId,
            role_id: roleId,
        });
        console.log('Cấp quyền OK');
        return res.data;
    } catch (error) {
        console.log(error, 'Lỗi khi cấp quyền');
        throw error;
    }
};

// Gán người dùng vào chi nhánh
export const assignBranch = async (userId, branchId) => {
    try {
        const res = await request.post('/users/assign-branch', {
            user_id: userId,
            branch_id: branchId,
        });
        console.log('Gán chi nhánh OK');
        return res.data;
    } catch (error) {
        console.log(error, 'Lỗi khi gán chi nhánh');
        throw error;
    }
};

// Xóa người dùng khỏi chi nhánh
export const removeBranch = async (userId, branchId) => {
    try {
        const res = await request.post('/users/remove-branch', {
            user_id: userId,
            branch_id: branchId,
        });
        console.log('Xóa khỏi chi nhánh OK');
        return res.data;
    } catch (error) {
        console.log(error, 'Lỗi khi xóa khỏi chi nhánh');
        throw error;
    }
};