// src/components/ProductEdit.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productStore from '../../../stores/productStore';

const ProductEdit = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [error, setError] = useState('');
  const updateProduct = productStore((state) => state.updateProduct);
  const products = productStore((state) => state.products);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Mengambil produk berdasarkan ID
        const product = await productStore.getProductById(id);
        if (product) {
          setName(product.name);
          setSellingPrice(product.selling_price);
        } else {
          setError('Produk tidak ditemukan');
        }
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data produk');
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const updatedProduct = {
      name,
      selling_price: sellingPrice,
    };

    try {
      await updateProduct(id, updatedProduct);
      alert(id, updatedProduct);
      alert('Product updated successfully!');
      navigate(`/product/edit/${id}`); // Redirect ke halaman utama atau daftar produk
    } catch (error) {
      setError('Failed to update product');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Selling Price:</label>
          <input
            type="text"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default ProductEdit;
