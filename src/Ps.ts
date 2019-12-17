/// <reference path="./types/photoshop.d.ts" />

import {Adobe, AppType} from './Adobe'

declare const app: Photoshop.Application

export class Ps extends Adobe {
  public Doc: Photoshop.AdobeDocument
  public Layers: Photoshop.ArtLayers

  public constructor() {
    super(AppType.Photoshop)
    this.Doc = app.activeDocument
    this.Layers = this.Doc.artLayers
  }

  /**
   * AddLayer
   */
  public AddLayer(name: string): void {
    const layer = this.Layers.add()
    layer.name = name
  }

  public EventTest(): void{
    for(let i = 0; i < 1000; i++) {
      this.AddLayer(i.toString())
    }

    this.emit('test-done')
  }
}
