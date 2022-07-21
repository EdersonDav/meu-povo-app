import { ICommerce } from '../@types/interfaces';
import { api } from './api';

class Commerces {
  public async getAllCommerces(): Promise<ICommerce[]> {
    try {
      const response = await api.get('commerce');

      return response.data

    } catch (error) {
      console.log(error.message);

      return []
    }
  }
}

export const commerceClass = new Commerces()