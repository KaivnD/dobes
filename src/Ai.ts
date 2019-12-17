/// <reference path="./types/illustrator.d.ts" />
/**
 * The application object
 */
declare const app: Illustrator.Application

export class Ai{
  public doc: Illustrator.AdobeDocument
  public constructor() {
    this.doc = app.documents.add()
  }
}
