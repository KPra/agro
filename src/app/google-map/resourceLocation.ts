export class ResourceLocation {
  constructor(public name: String, public lng: Number,public lat: Number, public info: String,
  public status: boolean, public place: String, public tractor: boolean, public tiller: boolean,
  public labor: boolean, public shredder: boolean, public mower: boolean, public trolley: boolean,
public sprayer: boolean, public land: boolean, public others: boolean, public requestButton: boolean,
public favoriteButton: boolean){}
}
