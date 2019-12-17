import { EventEmitter } from 'events'

export enum AppType {
  Illustrator,
  Photoshop
}

export class Adobe extends EventEmitter {
  public readonly name: AppType
  public constructor(type: AppType) {
    super()
    this.name = type
  }
}
