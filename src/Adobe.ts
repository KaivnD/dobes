export enum AppType {
  Illustrator,
  Photoshop
}

export class Adobe {
  public readonly name: AppType
  public constructor(type: AppType) {
    this.name = type
  }
}
