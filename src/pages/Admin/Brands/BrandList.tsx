// src/components/BrandList.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi
import useBrandStore from '../../../stores/brandStore';

interface Brand {
  id: number; // or string, depending on your data
  name: string;
}

export default function BrandList() {
  
  const { brands, error } = useBrandStore() as { brands: Brand; error: string | null };

  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchBrands = useBrandStore((state:any) => state.fetchBrands);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Daftar brand</h1>
        <table>
          <thead>
            <tr>
              <th>Nama brand</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(brands) && brands.map((brand) => (
              <tr key={brand.id}>
                <td>{brand.name}</td>
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
