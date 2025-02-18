// store.js  
import axios from 'axios';
import { create } from 'zustand';
  
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
        set({ products: response.data.data, loading: false });  // Set the products to the data key in the response
        console.log(response.data.data); 
    } catch (error) {  
      set({ error: error.message, loading: false });  
    }  
  },  



  
  createProduct: async (product) => {  
    try {  
      // const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
      // if (csrfTokenMeta) {
      //     const csrfToken = csrfTokenMeta.getAttribute('content');
      //     axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
      // } else {
      //     console.error('CSRF token meta tag not found');
      // }
      
      // alert('berhasil',product);

      // const response = await axios.post('http://localhost:8000/api/products/store', product);
      // set((state) => ({ products: [...state.products, response.data] }));

      const response = await axios.post('http://localhost:8000/api/products/store', product);
      console.log('Product created:', response.data);

    } catch (error) { 
      alert('gaagal',error);
      alert(error);

      console.error(error);  
    }  
  },  
  
  updateProduct: async (id, updatedProduct) => {  
    try {  
      await axios.put(`https://fakestoreapi.com/products/${id}`, updatedProduct);  
      set((state) => ({  
        products: state.products.map((product) =>  
          product.id === id ? { ...product, ...updatedProduct } : product  
        ),  
      }));  
    } catch (error) {  
      console.error(error);  
    }  
  },  
  
  deleteProduct: async (id) => {  
    try {  
      await axios.delete(`https://fakestoreapi.com/products/${id}`);  
      set((state) => ({  
        products: state.products.filter((product) => product.id !== id),  
      }));  
    } catch (error) {  
      console.error(error);  
    }  
  },  




}));  
  
export default productStore;  
