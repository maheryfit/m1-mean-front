import {ObjectModel} from '../../object-model.model';

export interface Auth {
  nom_utilisateur: string,
  mot_de_passe: string
}

export interface AuthObjectModel extends ObjectModel, Auth {}
