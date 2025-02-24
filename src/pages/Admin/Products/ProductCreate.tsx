import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import useProductStore from '../../../stores/productStore';



interface FormValues {
  product_category_first_id: string;
  product_brand_id: string;
  name: string;
  selling_price: number;
  nett_price: number;
  discount_persentage: number;
  discount_value: number;
  availability: boolean;
}

// Komponen ProductCreate
export default function ProductCreate() {
  const storeProduct = useProductStore((state:any) => state.storeProduct);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit: SubmitHandler<FormValues> = async data => {

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

    if (data.nett_price <= 0) {
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
        selling_price: data.selling_price,
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
            {...register("product_category_first_id", { required: "This field is required" })} 
          />
         
        </div>
        <div>
          <label htmlFor="product_brand_id">Produk Brand ID</label>
          <br />
          <input
            type="text"
            {...register("product_brand_id")} // Menghubungkan input dengan React Hook Form
          />
          {/* {errors.product_brand_id && <p style={{ color: 'red' }}>{errors.product_brand_id.message}</p>} */}
        </div>
        <div>
          <label htmlFor="name">Nama Produk</label>
          <br />
          <input
            type="text"
            {...register("name")}
          />
        </div>
        <div>
          <label htmlFor="selling_price">Selling Price</label>
          <br />
          <input
            type="number"
            {...register("selling_price")}
          />
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
        </div>

        <div>
          <label htmlFor="discount_value">Discount Value</label>
          <br />
          <input
            type="number"
            {...register("discount_value")}
          />
        </div>

        <div>
          <label htmlFor="nett_price">Net Price</label>
          <br />
          <input
            type="number"
            {...register("nett_price")}
          />
        </div>

        <div>
          <label htmlFor="availability">Availability</label>
          <br />
          <input
            type="number"
            {...register("availability")}
          />
        </div>
      </div>

      <button type="submit">Kirim</button>
    </form>
    </div>
  );
}
