// store.js  
import axios from 'axios';
import { create } from 'zustand';
  

interface Product {
  id: number;
  name: string;
  selling_price: number;
}

interface ProductStore {
  products: Product[];
  fetchProducts: () => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  updateProduct: () => Promise<void>;
  deleteProduct: () => Promise<void>;
  error: string | null;
}

const productStore = create((set) => ({  
  products: [],  
  loading: false,  
  error: null,  
  

  fetchProducts: async () => {  
    set({ loading: true });  
    try {  
        const response = await axios.get('http://localhost:8000/api/products', {
          params: {
            limit: 9, 
          },
        });
        set({ products: response.data, loading: false });  // Set the products to the data key in the response
    } catch (error) {  
      set({ error: error.message, loading: false });  
    }  
  },  
  

  createProduct: async (product) => {
    try {
        // Ambil token CSRF dari meta tag
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        // Mengirim permintaan POST menggunakan Fetch API
        let resp = await fetch(`http://127.0.0.1:8000/api/products/store`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken, // Menambahkan token CSRF
            },
            body: JSON.stringify(product), // Mengubah objek produk menjadi string JSON
        });

        // Memeriksa apakah permintaan berhasil
        if (resp.status == 200) {
            const data = await resp.json(); // Mengambil data dari respons
            set((state) => ({ products: [...state.products, data] })); // Menambahkan produk ke state

            // Menampilkan alert bahwa data berhasil dimasukkan
            alert("Data berhasil dimasukkan!");
        } else {
            // Menangani kesalahan jika permintaan tidak berhasil
            const errorData = await resp.json();
            alert(`Error: ${errorData.message || "Terjadi kesalahan!"}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengirim data!");
    }
  },


  updateProduct: async (id, updatedProduct) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Ambil token CSRF
    alert(id, updatedProduct);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/products/edit/${id}`,
        updatedProduct,
        {
          headers: {
            "X-CSRF-TOKEN": csrfToken,  // Menambahkan token CSRF
          },
        }
      );
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...product, ...response.data.data } : product
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },


  
  

  // Fungsi untuk menghapus produk
  deleteProduct: async (id) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Ambil token CSRF
    try {
      await axios.delete(`http://localhost:8000/api/products/delete/${id}`, {
        headers: {
          "X-CSRF-TOKEN": csrfToken,  // Menambahkan token CSRF
        },
      });
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  




}));  
  
export default productStore;  
