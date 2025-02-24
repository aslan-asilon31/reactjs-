// src/components/ProductList.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi
import useProductStore from '../../../stores/productStore';

export default function ProductList() {

  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const fetchProducts = useProductStore((state:any) => state.fetchProducts);
  const deleteProduct = useProductStore((state:any) => state.deleteProduct);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEdit = (id:any) => {
    navigate(`product/edit/${id}`); // Navigasi ke halaman edit produk
  };

  const handleDelete = async (id:any) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setLoading(true); // Set loading ke true sebelum memulai proses penghapusan
      try {
        const response = await deleteProduct(id); // Panggil fungsi deleteProduct dari store
  
        // Memeriksa apakah respons berhasil
        if (response.status === 200) {
          setMessage('Data berhasil dihapus!'); // Tampilkan pesan sukses
          fetchProducts(); // Refresh daftar produk setelah penghapusan
        } else {
          setMessage('Gagal menghapus data.'); // Tampilkan pesan kesalahan
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        setMessage('Terjadi kesalahan saat menghapus data.'); // Tampilkan pesan kesalahan
      } finally {
        setLoading(false); // Set loading ke false setelah proses selesai
      }
    }
  };

    // Function to handle navigation
    const handleCreate = () => {
      navigate('/product/create');
    };


  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Daftar Produk</h1>
      <div className="mt-4">
      <button
        onClick={handleCreate} // Add onClick event handler
        className="bg-green-600 text-white rounded-sm p-2"
      >
        Add Product +
      </button>
      </div>
        <table>
          <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>

          {Array.isArray(fetchProducts) && fetchProducts.map((product) => (
              <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.selling_price}</td>
              <td>
                <button onClick={() => handleEdit(product.id)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}

          </tbody>
        </table>

    </div>
  );
}
