import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Lấy danh sách đồ uống theo category_id và branch_id
 * @param {number} categoryId - ID của danh mục
 * @param {number} branchId - ID của chi nhánh
 * @returns {Promise} - Danh sách đồ uống
 */
export const getBeverages = async (categoryId = null, branchId = null) => {
    try {
        let url = `${API_BASE_URL}/menu/items`;
        const params = new URLSearchParams();

        if (categoryId) {
            params.append('category_id', categoryId);
        }
        if (branchId) {
            params.append('branch_id', branchId);
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching beverages:', error);
        throw error;
    }
};

/**
 * Thêm đồ uống mới
 * @param {Object} beverageData - Dữ liệu đồ uống mới
 * @returns {Promise} - Đồ uống đã được tạo
 */
export const createBeverage = async (beverageData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/menu/items`, beverageData);
        return response.data;
    } catch (error) {
        console.error('Error creating beverage:', error);
        throw error;
    }
};

/**
 * Cập nhật thông tin đồ uống
 * @param {number} id - ID của đồ uống
 * @param {Object} beverageData - Dữ liệu cập nhật
 * @returns {Promise} - Đồ uống đã được cập nhật
 */
export const updateBeverage = async (id, beverageData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/menu/items/${id}`, beverageData);
        return response.data;
    } catch (error) {
        console.error('Error updating beverage:', error);
        throw error;
    }
};

/**
 * Xóa đồ uống
 * @param {number} id - ID của đồ uống cần xóa
 * @returns {Promise} - Kết quả xóa
 */
export const deleteBeverage = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/menu/items/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting beverage:', error);
        throw error;
    }
};

/**
 * Lấy thông tin chi tiết một đồ uống
 * @param {number} id - ID của đồ uống
 * @returns {Promise} - Thông tin đồ uống
 */
export const getBeverageById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/menu/items/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching beverage by id:', error);
        throw error;
    }
};

/**
 * Cập nhật trạng thái hết món
 * @param {number} id - ID của đồ uống
 * @param {boolean} outOfStock - Trạng thái hết món
 * @returns {Promise} - Kết quả cập nhật
 */
export const updateBeverageStock = async (id, outOfStock) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/menu/items/${id}`, {
            outOfStock
        });
        return response.data;
    } catch (error) {
        console.error('Error updating beverage stock:', error);
        throw error;
    }
};
