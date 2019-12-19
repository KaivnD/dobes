/// <reference path="../types/photoshop.d.ts" />

import {Adobe, AppType} from '../Adobe'
import { SelAllPixelInLayer, AutoSelect } from './actions';

declare const app: Photoshop.Application

export class Ps extends Adobe {
  public Doc: Photoshop.AdobeDocument
  public Layers: Photoshop.ArtLayers
  public DocName?: string

  public constructor(name?: string) {
    super(AppType.Photoshop)
    if(!name) {
      if (app.documents.length === 0) throw new Error('No any document in app')
      this.Doc = app.activeDocument
    } else {
      this.Doc = app.documents.add()
      this.DocName = name || ''
    }
    this.Layers = this.Doc.artLayers
  }

  /**
   * AddLayer
   */
  public AddLayer(name: string): Photoshop.ArtLayer {
    const layer = this.Layers.add()
    layer.name = name
    return layer
  }

  /**
   * FindLayer
   */
  public FindLayer(name: string): Photoshop.ArtLayer | void {
    try {
      return this.Layers.getByName(name)
    } catch (e) {
      alert(`${name} --- ${e.message}`)
    }
  }

  /**
   * SelectAllInLayer
   */
  public SelectAllInLayer(layer?: Photoshop.ArtLayer): void {
    if (!layer) {
      alert('Select all in layer must have a layer')
      return
    }
    this.Doc.activeLayer = layer
    this.Doc.selection
    SelAllPixelInLayer()
  }

  /**
   * AutoSelContentInLayer
   */
  public AutoSelContentInLayer() {
    this.Doc.selection.deselect()
    AutoSelect()
    this.Doc.selection.invert()
  }
}
