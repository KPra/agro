export class Address {
  public long_name: string;
  public short_name: string;
  public types: string[];

  constructor(long_name: string, short_name: string, types: string[]){
   this.long_name = long_name;
   this.short_name = short_name;
   this.types = types;
  }
}
