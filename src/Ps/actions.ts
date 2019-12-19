declare function charIDToTypeID(params: string): number

declare function executeAction(
  eventID: number,
  descriptor?: ActionDescriptor,
  displayDialogs?: DialogModes
): ActionDescriptor

export function SelAllPixelInLayer() {
  let id47 = charIDToTypeID('setd')
  let desc11 = new ActionDescriptor()
  let id48 = charIDToTypeID('null')
  let ref11 = new ActionReference()
  let id49 = charIDToTypeID('Chnl')
  let id50 = charIDToTypeID('fsel')
  ref11.putProperty(id49, id50)
  desc11.putReference(id48, ref11)
  let id51 = charIDToTypeID('T   ')
  let ref12 = new ActionReference()
  let id52 = charIDToTypeID('Chnl')
  let id53 = charIDToTypeID('Chnl')
  let id54 = charIDToTypeID('Trsp')
  ref12.putEnumerated(id52, id53, id54)
  desc11.putReference(id51, ref12)
  executeAction(id47, desc11, DialogModes.NO)
}

export function AutoSelect(
  x: number = 33,
  y: number = 33,
  tor: number = 32
): void {
  let idsetd = charIDToTypeID('setd')
  let desc150 = new ActionDescriptor()
  let idnull = charIDToTypeID('null')
  let ref43 = new ActionReference()
  let idChnl = charIDToTypeID('Chnl')
  let idfsel = charIDToTypeID('fsel')
  ref43.putProperty(idChnl, idfsel)
  desc150.putReference(idnull, ref43)
  let idT = charIDToTypeID('T   ')
  let desc151 = new ActionDescriptor()
  let idHrzn = charIDToTypeID('Hrzn')
  let idRlt1 = charIDToTypeID('#Rlt')
  desc151.putUnitDouble(idHrzn, idRlt1, x)
  let idVrtc = charIDToTypeID('Vrtc')
  let idRlt2 = charIDToTypeID('#Rlt')
  desc151.putUnitDouble(idVrtc, idRlt2, y)
  let idPnt = charIDToTypeID('Pnt ')
  desc150.putObject(idT, idPnt, desc151)
  let idTlrn = charIDToTypeID('Tlrn')
  desc150.putInteger(idTlrn, tor)
  let idAntA = charIDToTypeID('AntA')
  desc150.putBoolean(idAntA, true)
  executeAction(idsetd, desc150, DialogModes.NO)
}

export function ResetStyleList() {
  let idRset = charIDToTypeID('Rset')
  let desc163 = new ActionDescriptor()
  let idnull = charIDToTypeID('null')
  let ref48 = new ActionReference()
  let idPrpr = charIDToTypeID('Prpr')
  let idStyl = charIDToTypeID('Styl')
  ref48.putProperty(idPrpr, idStyl)
  let idcapp = charIDToTypeID('capp')
  let idOrdn = charIDToTypeID('Ordn')
  let idTrgt = charIDToTypeID('Trgt')
  ref48.putEnumerated(idcapp, idOrdn, idTrgt)
  desc163.putReference(idnull, ref48)
  executeAction(idRset, desc163, DialogModes.NO)
}

export function LoadStyleFile(path: string) {
  let idsetd = charIDToTypeID('setd')
  let desc171 = new ActionDescriptor()
  let idnull = charIDToTypeID('null')
  let ref50 = new ActionReference()
  let idPrpr = charIDToTypeID('Prpr')
  let idStyl = charIDToTypeID('Styl')
  ref50.putProperty(idPrpr, idStyl)
  let idcapp = charIDToTypeID('capp')
  let idOrdn = charIDToTypeID('Ordn')
  let idTrgt = charIDToTypeID('Trgt')
  ref50.putEnumerated(idcapp, idOrdn, idTrgt)
  desc171.putReference(idnull, ref50)
  let idT = charIDToTypeID('T   ')
  desc171.putPath(idT, new File(path))
  let idAppe = charIDToTypeID('Appe')
  desc171.putBoolean(idAppe, true)
  executeAction(idsetd, desc171, DialogModes.NO)
}
