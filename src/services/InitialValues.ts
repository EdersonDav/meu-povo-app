import { InitialValues as IInitialValues } from '../@types/interfaces';
import { api } from './api';


class InitialValues {
  public async getInitialValues(): Promise<IInitialValues> {
    try {
      const response = await api.get('category/initial');

      const categories = response.data.categories
      const countries = response.data.countries?.length ?
        response.data.countries.map(item => ({
          ...item, name: {
            en: item.name,
            pt: item.name
          }
        })) : []
      return {
        categories,
        countries
      }

    } catch (error) {
      console.log(error.message);

      return {
        categories: [],
        countries: []
      }
    }
  }
}

export const initialValuesClass = new InitialValues()