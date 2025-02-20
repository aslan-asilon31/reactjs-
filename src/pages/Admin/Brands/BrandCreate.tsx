import { useState } from 'react';
import { z } from 'zod';
import useBrandStore from '../../../stores/brandStore';

// Skema validasi menggunakan Zod
const brandSchema = z.object({
  name: z.string().min(1, 'Nama produk harus diisi'),
  selling_price: z.number().min(0, 'Harga harus lebih besar dari 0'),
});

export default function BrandCreate() {
  const { createBrand, error } = useBrandStore();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setLoading(true);
    setMessage('');
    setValidationErrors({});

    // Validasi data menggunakan Zod
    const result = BrandSchema.safeParse({
      name,
      selling_price: parseFloat(sellingPrice),
    });

    if (!result.success) {
      // Jika validasi gagal, set error
      const errors = result.error.format();
      setValidationErrors({
        name: errors.name ? errors.name[0].message : '',
      });
      setLoading(false);
      return;
    }

    // Jika validasi berhasil, simpan produk
    try {
      await createBrand({
        name,
      });
      setMessage('Brand berhasil ditambahkan!');
      setName('');
    } catch (err) {
      setMessage('Terjadi kesalahan saat menambahkan produk.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Tambah Brand</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Brand:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {validationErrors.name && <p style={{ color: 'red' }}>{validationErrors.name}</p>}
        </div>
      
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Tambah Produk'}
        </button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
