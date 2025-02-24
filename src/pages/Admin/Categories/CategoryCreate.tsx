import { useState } from 'react';
import { z } from 'zod';
import useProductStore from '../../../stores/productStore';

// Skema validasi menggunakan Zod
const productSchema = z.object({
  name: z.string().min(1, 'Nama produk harus diisi'),
  selling_price: z.number().min(0, 'Harga harus lebih besar dari 0'),
});

interface ProductCreate {
  createProduct: (product: { name: string; selling_price: number }) => Promise<void>;
  error: string | null;
}

interface ValidationErrors {
  name?: string; // Optional property for name validation error
  selling_price?: number; // Optional property for name validation error
}

export default function ProductCreate() {
  const { createProduct } = useProductStore() as { createProduct: (product: { name: string; selling_price: number }) => Promise<void>; error: string | null };

  const [name, setName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const handleSubmit = async (e:any) => {
    e.preventDefault(); // Mencegah reload halaman
    setLoading(true);
    setMessage('');
    setValidationErrors({});

    // Validasi data menggunakan Zod
    const result = productSchema.safeParse({
      name,
      selling_price: parseFloat(sellingPrice),
    });

    if (!result.success) {
      // Jika validasi gagal, set error
      const errors = result.error.format();
      setValidationErrors({
        name: errors.name ? errors.name[0].message : '',
        selling_price: errors.selling_price ? errors.selling_price[0].message : '',
      });
      setLoading(false);
      return;
    }

    // Jika validasi berhasil, simpan produk
    try {
      await createProduct({
        name,
        selling_price: parseFloat(sellingPrice),
      });
      setMessage('Produk berhasil ditambahkan!');
      setName('');
      setSellingPrice('');
    } catch (err) {
      setMessage('Terjadi kesalahan saat menambahkan produk.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Tambah Produk</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Produk:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {validationErrors.name && <p style={{ color: 'red' }}>{validationErrors.name}</p>}
        </div>
        <div>
          <label>Harga:</label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
          {validationErrors.selling_price && <p style={{ color: 'red' }}>{validationErrors.selling_price}</p>}
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
