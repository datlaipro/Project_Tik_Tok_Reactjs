const configDB = require('../config/database');

async function renderVideoDB() {

    try {
        const [results] = await configDB.query(
            'SELECT path FROM video WHERE visibility = ?', ['public'] // Truy vấn để lấy đường dẫn video có visibility là 'public'
        )
        return results;

    } catch (error) {
        console.error("Lỗi truy vấn:", error);
        return { success: false, message: 'Lỗi hệ thống' };
    }

}
module.exports = { renderVideoDB }; // Xuất hàm renderVideoDB để sử dụng trong các route khác