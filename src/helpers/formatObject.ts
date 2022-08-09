export interface IReturnObject {
  value: string;
  label: string;
}

export const formatObject = (obj: Object): IReturnObject[] => {
  let newObject = [] as IReturnObject[];

  Object.keys(obj).forEach(item => {
    if (!!obj[item]) {
      newObject.push({
        label: item,
        value: obj[item],
      })
    }
  });

  return newObject
}