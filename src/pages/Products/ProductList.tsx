// src/components/ProductList.js
import { useEffect } from 'react';
import useProductStore from '../../stores/productStore';

const ProductList = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Daftar Produk</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Harga: {product.selling_price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
