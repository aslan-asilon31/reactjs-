import React from 'react';
import { useForm } from "react-hook-form";
import useProductStore from '../../../stores/productStore';

// Komponen ProductCreate
export default function ProductCreate() {
  const storeProduct = useProductStore((state) => state.storeProduct);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    if (!data.product_category_first_id) {
      alert('Nama Kategori harus diisi');
      return;
    }

    if (!data.product_brand_id) {
      alert('Nama Brand harus diisi');
      return;
    }

    if (!data.name) {
      alert('Nama produk harus diisi');
      return;
    }

    if (data.selling_price <= 0) {
      alert('Harga harus lebih besar dari 0');
      return;
    }

    
    if (!data.discount_persentage) {
      alert('discount Percentage harus diisi');
      return;
    }

    
    if (!data.discount_value) {
      alert('Discount value harus diisi');
      return;
    }

    if (!data.availability) {
      alert('availability harus diisi');
      return;
    }

    try {
      await storeProduct({
        product_category_first_id: data.product_category_first_id,
        product_brand_id: data.product_brand_id,
        name: data.name,
        selling_price: parseFloat(data.selling_price),
        discount_persentage: data.discount_persentage,
        discount_value: data.discount_value,
        nett_price: data.nett_price,
        availability: data.availability,
      });
      // Navigasi ke halaman lain jika diperlukan
    } catch (err) {
      console.error('Terjadi kesalahan saat menambahkan produk:', err);
    }
  };

  return (
    <div>
      <h1>Tambah Produk</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, marginRight: '10px' }}>
        <div>
          <label htmlFor="product_category_first_id">Produk Kategori ID</label>
          <br />
          <input
            type="text"
            {...register("product_category_first_id")} // Menghubungkan input dengan React Hook Form
          />
          {errors.product_category_first_id && <p style={{ color: 'red' }}>{errors.product_category_first_id.message}</p>}
        </div>
        <div>
          <label htmlFor="product_brand_id">Produk Brand ID</label>
          <br />
          <input
            type="text"
            {...register("product_brand_id")} // Menghubungkan input dengan React Hook Form
          />
          {errors.product_brand_id && <p style={{ color: 'red' }}>{errors.product_brand_id.message}</p>}
        </div>
        <div>
          <label htmlFor="name">Nama Produk</label>
          <br />
          <input
            type="text"
            {...register("name")}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="selling_price">Selling Price</label>
          <br />
          <input
            type="number"
            {...register("selling_price")}
          />
          {errors.selling_price && <p style={{ color: 'red' }}>{errors.selling_price.message}</p>}
        </div>
      </div>


      <div style={{ flex: 1, marginLeft: '10px' }}>
        <div>
          <label htmlFor="discount_persentage">Discount Percentage</label>
          <br />
          <input
            type="number"
            {...register("discount_persentage")}
          />
          {errors.discount_persentage && <p style={{ color: 'red' }}>{errors.discount_persentage.message}</p>}
        </div>

        <div>
          <label htmlFor="discount_value">Discount Value</label>
          <br />
          <input
            type="number"
            {...register("discount_value")}
          />
          {errors.discount_value && <p style={{ color: 'red' }}>{errors.discount_value.message}</p>}
        </div>

        <div>
          <label htmlFor="nett_price">Net Price</label>
          <br />
          <input
            type="number"
            {...register("nett_price")}
          />
          {errors.nett_price && <p style={{ color: 'red' }}>{errors.nett_price.message}</p>}
        </div>

        <div>
          <label htmlFor="availability">Availability</label>
          <br />
          <input
            type="number"
            {...register("availability")}
          />
          {errors.availability && <p style={{ color: 'red' }}>{errors.availability.message}</p>}
        </div>
      </div>

      <button type="submit">Kirim</button>
    </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
