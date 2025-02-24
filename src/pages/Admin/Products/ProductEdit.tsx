import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productStore from '../../../stores/productStore';
import { Product } from '../../../types/Product';



interface product {
  id: number; // or string, depending on your data
  name: string;
  selling_price: number;
}

const ProductEdit = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { id } = useParams<{ id: string }>(); // Extracting id from URL parameters
  const numericId = Number(id); // Convert id to a number
  const [name, setName] = useState('');
  const [selling_price, setSellingPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // const { fetchProductById, updateProduct } = productStore(); 

  const { fetchProductById } = productStore() as {
    fetchProductById: (id: number,) => Promise<Product>;
    updateProduct: (product: Product) => Promise<void>;
    error: string | null;
  };

  useEffect(() => {
    if (!id) return; // Early exit if id is not available
    const fetchData = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      const productId = Number(id); // Convert id to a number
      const product = await fetchProductById(productId); 
      if (product) {
        setName(product.name);
        setSellingPrice(product.selling_price);
        setError('');
      } else {
        setError('Product not found');
      }
      setLoading(false); // Set loading to false when data is fetched
    };

    fetchData();
  }, [id, fetchProductById]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updateData = { name, selling_price: parseFloat(selling_price) }; // Create the updated product object
      await updateProduct(numericId, updateData); // Pass id and updated data
      alert("Data berhasil diupdate!");
    } catch (error) {
      alert("Data gagal diupdate!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h1>Edit Product</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Selling Price:</label>
          <input
            type="number"
            value={selling_price}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="">Update Product</button>
      </form>
    </div>
  );
};

export default ProductEdit;
