export default function Pagination({ currentPage, totalPages, goToPage }) {
    return (
        <div className="flex items-center space-x-2">
            <span>Trang {currentPage}/{totalPages}</span>

            <div className="flex space-x-1">
                <button onClick={() => goToPage(1)} disabled={currentPage === 1}>&lt;&lt;</button>
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>

                <button className="px-3 py-1 border bg-blue-800 text-white">
                    {currentPage}
                </button>

                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
                <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>&gt;&gt;</button>
            </div>
        </div>
    );
}
