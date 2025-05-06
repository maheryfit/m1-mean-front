export class Role{
  private _idrole:string="";
  private _nom:string="";
  private _salaire_mensuel:number=0;

  get idrole(): string {
    return this._idrole;
  }

  set idrole(value: string) {
    this._idrole = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get salaire_mensuel(): number {
    return this._salaire_mensuel;
  }

  set salaire_mensuel(value: number) {
    this._salaire_mensuel = value;
  }

  init(obj:any){
    this.idrole=obj._id;
    this.nom=obj.nom;
    this.salaire_mensuel=obj.salaire_mensuel;
  }
}
