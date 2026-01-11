import { useState } from 'react';
import { Plus, Edit2, Trash2, Package, X } from 'lucide-react';
import { useProductStore } from '../../context/productStore';

export default function ProductsPage() {
    const { products, addProduct, updateProduct, deleteProduct, toggleActive } = useProductStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'CLEANSER',
        brand: '',
        keyIngredients: '',
        frequency: '',
        notes: '',
        startedDate: '',
    });

    const categories = ['CLEANSER', 'MOISTURIZER', 'SUNSCREEN', 'SERUM', 'TONER', 'MASK', 'TREATMENT', 'OTHER'];

    const handleOpenModal = (product?: any) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                category: product.category,
                brand: product.brand || '',
                keyIngredients: product.keyIngredients || '',
                frequency: product.frequency || '',
                notes: product.notes || '',
                startedDate: product.startedDate || '',
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                category: 'CLEANSER',
                brand: '',
                keyIngredients: '',
                frequency: '',
                notes: '',
                startedDate: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingProduct) {
            updateProduct(editingProduct.id, formData);
        } else {
            addProduct({ ...formData, active: true });
        }

        handleCloseModal();
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            CLEANSER: 'bg-blue-100 text-blue-800',
            MOISTURIZER: 'bg-green-100 text-green-800',
            SUNSCREEN: 'bg-yellow-100 text-yellow-800',
            SERUM: 'bg-purple-100 text-purple-800',
            TONER: 'bg-pink-100 text-pink-800',
            MASK: 'bg-indigo-100 text-indigo-800',
            TREATMENT: 'bg-red-100 text-red-800',
            OTHER: 'bg-gray-100 text-gray-800',
        };
        return colors[category] || colors.OTHER;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
                    <p className="text-gray-600">Manage your skincare product library</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md"
                >
                    <Plus className="mr-2 h-5 w-5" />
                    Add Product
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <p className="text-gray-600 text-sm">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{products.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <p className="text-gray-600 text-sm">Active</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                        {products.filter(p => p.active).length}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <p className="text-gray-600 text-sm">Categories</p>
                    <p className="text-2xl font-bold text-primary-600 mt-1">
                        {new Set(products.map(p => p.category)).size}
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className={`bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg ${
                            !product.active ? 'opacity-60' : ''
                        }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                                <Package className="h-8 w-8 text-primary-600 mr-3" />
                                <span className={`text-xs px-2 py-1 rounded font-medium ${getCategoryColor(product.category)}`}>
                  {product.category}
                </span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleOpenModal(product)}
                                    className="text-gray-400 hover:text-primary-600 transition-colors"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                        {product.brand && (
                            <p className="text-sm text-gray-600 mb-2">by {product.brand}</p>
                        )}

                        {product.keyIngredients && (
                            <div className="mb-3">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Key Ingredients</p>
                                <p className="text-sm text-gray-700">{product.keyIngredients}</p>
                            </div>
                        )}

                        {product.frequency && (
                            <div className="mb-3">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Frequency</p>
                                <p className="text-sm text-gray-700">{product.frequency}</p>
                            </div>
                        )}

                        {product.startedDate && (
                            <p className="text-xs text-gray-500 mt-3">
                                Started: {new Date(product.startedDate).toLocaleDateString()}
                            </p>
                        )}

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <button
                                onClick={() => toggleActive(product.id)}
                                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                                    product.active
                                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                }`}
                            >
                                {product.active ? 'Mark as Inactive' : 'Mark as Active'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                    <p className="text-gray-600 mb-4">Start building your skincare product library</p>
                    <button
                        onClick={() => handleOpenModal()}
                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                        <Plus className="mr-2 h-5 w-5" />
                        Add Your First Product
                    </button>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={handleCloseModal} />

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white px-6 pt-6 pb-4">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                                        </h3>
                                        <button type="button" onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Product Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                placeholder="e.g., CeraVe Moisturizing Cream"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Category *
                                            </label>
                                            <select
                                                required
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            >
                                                {categories.map((cat) => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Brand
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.brand}
                                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                placeholder="e.g., CeraVe"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Key Ingredients
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.keyIngredients}
                                                onChange={(e) => setFormData({ ...formData, keyIngredients: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                placeholder="e.g., Niacinamide, Hyaluronic Acid"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Frequency
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.frequency}
                                                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                placeholder="e.g., Twice daily"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Started Date
                                            </label>
                                            <input
                                                type="date"
                                                value={formData.startedDate}
                                                onChange={(e) => setFormData({ ...formData, startedDate: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Notes
                                            </label>
                                            <textarea
                                                value={formData.notes}
                                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                rows={3}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                placeholder="Any additional notes..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                                    >
                                        {editingProduct ? 'Update' : 'Add'} Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
