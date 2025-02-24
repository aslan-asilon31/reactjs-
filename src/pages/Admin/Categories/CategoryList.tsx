// src/components/CategoryList.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi
import useCategoryStore from '../../../stores/categoryStore';



interface Category {
  id: number; // or string, depending on your data
  name: string;
}


export default function CategoryList() {

  const { categories, error } = useCategoryStore() as { categories: Category; error: string | null };

  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const fetchCategories = useCategoryStore((state:any) => state.fetchCategories);
  const deleteCategory = useCategoryStore((state:any) => state.deleteCategory);


  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = (id:any) => {
    navigate(`product/edit/${id}`); // Navigasi ke halaman edit produk
  };



  const handleDelete = async (id:any) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setLoading(true); // Set loading ke true sebelum memulai proses penghapusan
      try {
        const response = await deleteCategory(id); // Panggil fungsi  dari store
  
        // Memeriksa apakah respons berhasil
        if (response.status === 200) {
          setMessage('Data berhasil dihapus!'); // Tampilkan pesan sukses
          fetchCategories(); // Refresh daftar produk setelah penghapusan
        } else {
          setMessage('Gagal menghapus data.'); // Tampilkan pesan kesalahan
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        setMessage('Terjadi kesalahan saat menghapus data.'); // Tampilkan pesan kesalahan
      } finally {
        setLoading(false); // Set loading ke false setelah proses selesai
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Daftar Produk</h1>
        <table>
          <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Harga</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>

          {Array.isArray(categories) && categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
  );
}
