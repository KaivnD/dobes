/// <reference path="./types/illustrator.d.ts" />

import {Adobe, AppType} from './Adobe'

declare const app: Illustrator.Application

export class Ai extends Adobe{
  public doc: Illustrator.AdobeDocument
  public constructor() {
    super(AppType.Illustrator)
    this.doc = app.documents.add()
  }
}
