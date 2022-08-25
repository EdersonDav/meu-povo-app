import { ICountry, InitialValues as IInitialValues } from '../@types/interfaces';
import { api } from './api';


class InitialValues {
  public async getInitialValues(): Promise<IInitialValues> {
    try {
      const response = await api.get('category/initial');

      const categories = response.data.categories
      const commerceCountries = response.data.countries?.commerceCountries?.length ?
        response.data.countries.commerceCountries.map((item: ICountry) => ({
          ...item, name: {
            en: item.name,
            pt: item.name
          }
        })) : []
      const selfEmployedCountries = response.data.countries?.selfEmployedCountries?.length ?
        response.data.countries.selfEmployedCountries.map((item: ICountry) => ({
          ...item, name: {
            en: item.name,
            pt: item.name
          }
        })) : []
      return {
        categories,
        countries: {
          commerceCountries,
          selfEmployedCountries
        }
      }

    } catch (error) {
      console.log(error.message);

      return {
        categories: [],
        countries: {
          commerceCountries: [],
          selfEmployedCountries: []
        }
      }
    }
  }
}

export const initialValuesClass = new InitialValues()