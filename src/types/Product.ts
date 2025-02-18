export interface Product {
    id: string;
    product_category_first_id: string;
    product_brand_id: string;
    sku: string | null;
    name: string;
    selling_price: string;
    discount_percentage: string;
    discount_value: string;
    nett_price: string;
    weight: number; // Tambahkan properti lain sesuai kebutuhan
}