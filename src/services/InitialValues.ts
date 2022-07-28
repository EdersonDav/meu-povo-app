import { InitialValues as IInitialValues } from '../@types/interfaces';
import { api } from './api';


class InitialValues {
  public async getInitialValues(): Promise<IInitialValues> {
    try {
      const response = await api.get('category/initial');

      return response.data

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