import {ObjectModel} from '../../object-model.model';

export interface Auth {
  username: string,
  password: string
}

export interface AuthObjectModel extends ObjectModel, Auth {}
