export class User {
  constructor(
    public name: string,
    public password: string
  ) {}

  credentials() : string {
    return btoa(this.name + ":" + this.password);
  }
}
