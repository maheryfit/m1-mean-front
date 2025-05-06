export class Niveau{
  private _idniveau:string="";
  private _nom:string="";
  private _coefficient_salarial:number=0;

  get coefficient_salarial(): number {
    return this._coefficient_salarial;
  }

  set coefficient_salarial(value: number) {
    this._coefficient_salarial = value;
  }

  get idniveau(): string {
    return this._idniveau;
  }

  set idniveau(value: string) {
    this._idniveau = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }
  init(obj:any){
    this.idniveau=obj._id;
    this.nom=obj.nom;
    this.coefficient_salarial=obj.coefficient_salarial;
  }
}
