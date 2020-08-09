export interface ICategoryValues {
  name: string;
  comment: string;
  color: string;
}
type serviceList = {
  id: number;
  name: string;
  price: number;
};

export interface IService {
  id: number;
  name: string;
  list: serviceList[];
}
export interface IstateService {
  servicesList: IService[];
  categoryIsAdded: boolean;
  categoryAddIsFail: boolean;
  categoryAdded: boolean;
  categoryAddError: string;
}
