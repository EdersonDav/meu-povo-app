export interface ILanguage {
  contact: string;
  nationality: string;
  phone: string;
  site: string;
  address: string;
  working_time: string;
  weekDays: string[];
  buttonLabel: string;
}

export interface ILanguages {
  en: ILanguage;
  pt: ILanguage
}


export const languages: ILanguages = {
  en: {
    contact: 'contact',
    nationality: 'nationality',
    phone: 'phone',
    site: 'site',
    address: 'addres',
    working_time: 'Working Time',
    weekDays: ['s', 'm', 't', 'w', 't', 'f', 's'],
    buttonLabel: 'en'
  },
  pt: {
    contact: 'contato',
    nationality: 'nacionalidade',
    phone: 'telefone',
    site: 'site',
    address: 'endereço',
    working_time: 'Horário de Funcionamento',
    weekDays: ['d', 's', 't', 'q', 'q', 's', 's'],
    buttonLabel: 'pt'
  }
}