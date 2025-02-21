import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productStore from '../../../stores/productStore';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selling_price, setSellingPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // To handle loading state

  const fetchProductById = productStore((state) => state.fetchProductById);
  const updateProduct = productStore((state) => state.updateProduct);

  useEffect(() => {
    if (!id) return; // Early exit if id is not available
    const fetchData = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      const product = await fetchProductById(id); // Use id from URL
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !selling_price) {
      setError('All fields are required');
      return;
    }

    const update_data = await updateProduct(id, {name,selling_price});

    setLoading(false);

    if (update_data) {
      alert("data gagal di update !");
    }else{
      alert("data berhasil di update !");
    }

  };

  if (loading) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

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
