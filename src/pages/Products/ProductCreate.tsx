// src/components/ProductCreate.tsx
import React, { useState } from 'react';
import productStore from '../../stores/productStore';

const ProductCreate = () => {
  const [name, setName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [error, setError] = useState('');
  const createProduct = productStore((state) => state.createProduct);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !sellingPrice) {
      setError('Please fill in all fields');
      return;
    }

    const productData = {
      name,
      selling_price: sellingPrice,
      // Tambahkan field lain sesuai kebutuhan
    };

    await createProduct(productData);
    setName('');
    setSellingPrice('');
  };

  return (
    <div>
      <h2>Create Product</h2>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductCreate;
