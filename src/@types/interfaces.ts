export interface ICommerce {
  _id: string;
  name: string;
  descripition: string;
  image: string;
  phone: number;
  site: string;
  category: ICategory;
  working_time: string[];
  address: IAddress;
}

export interface IAddress {
  _id: string;
  country: string;
  address_number: number;
  complement: string;
  street: string;
  township: string;
  postalCode: number;
  city: string;
  latitude: number;
  longitude: number;
}

export interface ICategory {
  _id: string;
  name: string;
  code: string;
}

export interface ICountry {
  name: string;
  code: string;
}

export interface InitialValues {
  categories: ICategory[];
  countries: ICountry[];
}