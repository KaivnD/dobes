/// <reference path="../types/photoshop.d.ts" />

import {Adobe, AppType} from '../Adobe'
import { SelAllPixelInLayer, AutoSelect, PlaceFile, PlaceFileOptions } from './actions';

declare const app: Photoshop.Application

declare interface DocumentOptions {
  width?: UnitValue | number,
  height?: UnitValue | number,
  resolution?: number,
  name?: string,
  mode?: Photoshop.NewDocumentMode,
  initialFill?: Photoshop.DocumentFill,
  pixelAspectRatio?: number,
  bitsPerChannel?: Photoshop.BitsPerChannelType,
  colorProfileName?: string,
}

export class Ps extends Adobe {
  public Doc!: Photoshop.AdobeDocument
  public Layers!: Photoshop.ArtLayers
  public ActiveLayer!: Photoshop.Layer

  public constructor(opts?: DocumentOptions) {
    super(AppType.Photoshop)
    if(!opts) {
      if (app.documents.length === 0) {
        alert('Document not found')
        return
      }
      this.Doc = app.activeDocument
    } else {
      this.Doc = app.documents.add(
        opts.width,
        opts.height, 
        opts.resolution, 
        opts.name,
        opts.mode,
        opts.initialFill,
        opts.pixelAspectRatio,
        opts.bitsPerChannel,
        opts.colorProfileName
      )
    }
    this.Layers = this.Doc.artLayers
    this.ActiveLayer = this.Doc.activeLayer
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
  public AutoSelContentInLayer(layer?: Photoshop.ArtLayer): void {
    if (!layer) {
      alert('Select all in layer must have a layer')
      return
    }
    this.Doc.selection.deselect()
    AutoSelect()
    this.Doc.selection.invert()
  }

  /**
   * PlaceFile
   */
  public PlaceFile(file: string, width: number, opts?: PlaceFileOptions) {
    let currentWidth = width * this.Doc.resolution / 72
    let docWidth = Number(String(this.Doc.width).replace(/[^0-9]/ig, ''))

    PlaceFile(file, (docWidth / currentWidth) * 100, opts)
  }
}
