/// <reference path="./types/photoshop.d.ts" />

import {Adobe, AppType} from './Adobe'

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
    let id47 = app.charIDToTypeID('setd');
    let desc11 = new ActionDescriptor();
    let id48 = app.charIDToTypeID('null');
    let ref11 = new ActionReference();
    let id49 = app.charIDToTypeID('Chnl');
    let id50 = app.charIDToTypeID('fsel');
    ref11.putProperty(id49, id50);
    desc11.putReference(id48, ref11);
    let id51 = app.charIDToTypeID('T   ');
    let ref12 = new ActionReference();
    let id52 = app.charIDToTypeID('Chnl');
    let id53 = app.charIDToTypeID('Chnl');
    let id54 = app.charIDToTypeID('Trsp');
    ref12.putEnumerated(id52, id53, id54);
    desc11.putReference(id51, ref12);
    app.executeAction(id47, desc11, DialogModes.NO);
  }
}
