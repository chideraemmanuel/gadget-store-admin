export interface ProductTypes {
  _id: string;
  product_name: string;
  // brand: string;
  brand: {
    _id: string;
    name: string;
    brand_logo: string;
  };
  description: string;
  price: number;
  category: {
    _id: string;
    name: string;
    billboard: {
      _id: string;
      name: string;
      head_text: string;
      paragraph?: string;
      billboard_image: string;
    };
  };
  product_image: string;
  count_in_stock: number;
  featured: boolean;
}

export interface ProductsReturnTypes {
  data: ProductTypes[];
  pagination: {
    total_records: number;
    total_pages: number;
    current_page: number;
    previous_page: number;
    next_page: number;
  };
}

export interface ProductUpdateTypes {
  product_name?: string;
  brand?: string;
  description?: string;
  price?: number;
  category?: string;
  product_image?: File;
  count_in_stock?: number;
  featured?: boolean;
}

export interface ProductFormDataTypes {
  product_name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  product_image: File;
  count_in_stock: number;
  featured: boolean;
}

export interface CategoryReturnTypes {
  _id: string;
  name: string;
  billboard: {
    _id: string;
    name: string;
    head_text: string;
    paragraph?: string;
    billboard_image: string;
  };
}

export interface CategoryFormDataTypes {
  name: string;
  billboard: string;
}

export interface CategoryUpdateTypes {
  name?: string;
  billboard?: string;
}

export interface BrandReturnTypes {
  _id: string;
  name: string;
  brand_logo: string;
}

export interface BrandFormDataTypes {
  name: string;
  brand_logo: string;
}

export interface BrandUpdateTypes {
  name?: string;
  brand_logo?: string;
}

export interface BillboardReturnTypes {
  _id: string;
  name: string;
  head_text: string;
  paragraph?: string;
  billboard_image: string;
}

export interface BillboardFormDataTypes {
  name: string;
  head_text: string;
  paragraph?: string;
  billboard_image: File;
}

export interface BillboardUpdateTypes {
  name?: string;
  head_text?: string;
  paragraph?: string;
}

export interface LoginCredentialsTypes {
  email: string;
  password: string;
}

export interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}
