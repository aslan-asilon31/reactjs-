import { useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import productStore from '../stores/productStore';

export default function Product() {

  const { products, loading, error, fetchProducts } = productStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <>
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          products
        </h3>
        <div className="space-y-6">
          this is product

        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <h3>{product.name}</h3>
            <p>Harga: Rp {product.selling_price}</p>
            <p>Status: {product.availability}</p>
            <p>Rating: {product.rating}</p>
            {product.product_content.length > 0 && (
              <img
                src={`http://localhost:8000${product.product_content[0].image_url}`}
                alt={product.name}
                width="100"
              />
            )}
          </div>
        ))}

        </div>
      </div>
    </>
    </>
  );
}
