import {ObjectModel} from '../../../object-model.model';

export interface RoleMecanicien extends ObjectModel{
    titre: string;
    salaire_mensuel: {
        $numberDecimal:number
    }
}
