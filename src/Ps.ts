/// <reference path="./types/photoshop.d.ts" />
/**
 * The application object
 */
declare const app: Photoshop.Application

export class Ps {
  public doc: Photoshop.AdobeDocument
  public constructor() {
    this.doc = app.activeDocument
  }
}
