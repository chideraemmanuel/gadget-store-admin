export interface AdminInfoTypes {
  first_name: string;
  last_name: string;
  verified: boolean;
  auth_type: 'MANUAL_AUTH_SERVICE' | 'GOOGLE_AUTH_SERVICE';
  role: string;
  email: string;
}

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
  pagination: PaginationTypes;
}

export interface ProductUpdateTypes {
  product_name?: string;
  brand?: string;
  description?: string;
  price?: number;
  category?: string;
  // product_image?: File;
  product_image?: FileList;
  count_in_stock?: number;
  featured?: boolean;
}

export interface ProductFormDataTypes {
  product_name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  // product_image: File;
  product_image: FileList;
  count_in_stock: number;
  featured: boolean;
}

// export interface UpdateProductFormDataTypes {
//   product_name: string;
//   brand: string;
//   description: string;
//   price: number;
//   category: string;
//   product_image: FileList;
//   count_in_stock: number;
//   featured: boolean;
// }

export interface CategoryTypes {
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
export interface CategoryReturnTypes {
  data: CategoryTypes[];
  pagination: PaginationTypes;
}

export interface CategoryFormDataTypes {
  name: string;
  billboard: string;
}

export interface CategoryUpdateTypes {
  name?: string;
  billboard?: string;
}

export interface BrandTypes {
  _id: string;
  name: string;
  brand_logo: string;
}

export interface BrandReturnTypes {
  data: BrandTypes[];
  pagination: PaginationTypes;
}

export interface BrandFormDataTypes {
  name: string;
  // brand_logo: string;
  brand_logo: FileList;
}

export interface BrandUpdateTypes {
  name?: string;
  // brand_logo?: string;
  brand_logo?: FileList;
}

export interface BillboardTypes {
  _id: string;
  name: string;
  head_text: string;
  paragraph?: string;
  billboard_image: string;
}

export interface BillboardReturnTypes {
  data: BillboardTypes[];
  pagination: PaginationTypes;
}

export interface BillboardFormDataTypes {
  name: string;
  head_text: string;
  paragraph?: string;
  // billboard_image: File;
  billboard_image: FileList;
}

export interface BillboardUpdateTypes {
  name?: string;
  head_text?: string;
  paragraph?: string;
  // billboard_image: File;
  billboard_image?: FileList;
}

export interface PaginationTypes {
  total_records: number;
  total_pages: number;
  current_page: number;
  previous_page: number;
  next_page: number;
}

export interface LoginCredentialsTypes {
  email: string;
  password: string;
}

export interface AuthReturnTypes {
  first_name: string;
  last_name: string;
  email: string;
  verified: boolean;
  auth_type: 'MANUAL_AUTH_SERVICE' | 'GOOGLE_AUTH_SERVICE';
  role: string;
}

export interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}
