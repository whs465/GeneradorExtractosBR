(function (global) {
  const painHeaderCols = [
    'PmtInfId', 'PmtMtd', 'NbOfTxs', 'CtrlSum',
    'SvcLvl', 'LclInstrm', 'ReqdExctnDt', 'DbtrNm', 'DbtrAcctId',
    'DbtrAgtBIC', 'DbtrAgtMemberId', 'DbtrAgtCountry',
    'DbtrStreet', 'DbtrTown', 'DbtrCountryRes'
  ];

  const painDetailCols = [
    'EndToEndId', 'InstdAmt', 'InstdAmtCcy',
    'CdtrNm', 'CdtrCountry', 'CdtrOrgId', 'CdtrAcctId',
    'CdtrAcctNm', 'CdtrAgtId', 'CdtrAgtName', 'CdtrAgtCountry', 'RmtInf'
  ];

  const camtHeaderCols = [
    'Cuenta', 'Extracto', 'Tipo Extracto', 'Fecha Generación', 'Fecha Inicial', 'Fecha Final',
    'constant', 'Moneda', 'Nombre Cuenta', 'Nit', 'name_tesoreria', 'branch_br',
    'type_initial', 'currency_initial', 'Saldo Inicial', 'credit_debit_indicator_initial', 'date_initial',
    'type_final', 'currency_final', 'Saldo Final', 'credit_debit_indicator_final', 'date_final',
    'Total Registros', 'Suma Cantidades', 'Neto Cred/Deb', 'Naturaleza del Total',
    'Total Reg Créditos', 'Suma Créditos', 'Total Reg Débitos', 'Suma Débitos', 'Exportar'
  ];

  const camtDetailCols = [
    'Valor Operación', 'Moneda', 'Tipo Movimiento', 'status',
    'Fecha Operación', 'Fecha Valor', 'Concepto Bancario', 'issuer_constant',
    'Referencia Operación', 'Nombre Transacción', 'Secuencia', 'Tipo Saldo',
    'after_transaction_balance', 'after_transaction_currency',
    'nit_deudor', 'nombre_deudor', 'otro_deudor', 'Cuenta Deudor (Sale)', 'Código Portafolio Deudor 1.1.10',
    'cuenta_deudor_ccy', 'Nombre Tercero 9.1.0', 'Cuenta Tercero', 'Nombre Cuenta Débito 9.1.20',
    'nit_acreedor', 'nombre_acreedor', 'otro_acreedor', 'Cuenta Acreedor (Entra)',
    'cuenta_acreedor_ccy', 'Código Portafolio Acreedor 1.1.10', 'nombre_acreedor_final',
    'nombre_acreedor_final_id', 'nombre_acreedor_final_issuer', 'recaudo_detail'
  ];

  const allowedHeaderColsForExport = [
    'Cuenta', 'Saldo Inicial', 'Saldo Final', 'type_final', 'Total Registros',
    'Suma Créditos', 'Suma Débitos', 'Total Reg Créditos', 'Total Reg Débitos',
    'Neto Cred/Deb', 'Naturaleza del Total', 'Suma Cantidades'
  ];

  const allowedDetailColsForExport = [
    'Valor Operación', 'Moneda', 'Tipo Movimiento', 'status', 'Fecha Operación', 'Fecha Valor',
    'Concepto Bancario', 'issuer_constant', 'Referencia Operación', 'Nombre Transacción',
    'Secuencia', 'Tipo Saldo', 'after_transaction_balance', 'after_transaction_currency',
    'nit_deudor', 'nombre_deudor', 'otro_deudor', 'Cuenta Deudor (Sale)',
    'Código Portafolio Deudor 1.1.10', 'cuenta_deudor_ccy', 'Nombre Tercero 9.1.0',
    'Cuenta Tercero', 'Nombre Cuenta Débito 9.1.20', 'nit_acreedor', 'nombre_acreedor',
    'otro_acreedor', 'Cuenta Acreedor (Entra)', 'cuenta_acreedor_ccy',
    'Código Portafolio Acreedor 1.1.10', 'nombre_acreedor_final',
    'nombre_acreedor_final_id', 'nombre_acreedor_final_issuer', 'recaudo_detail'
  ];

  global.GEW_MAPPINGS = {
    painHeaderCols,
    painDetailCols,
    camtHeaderCols,
    camtDetailCols,
    allowedHeaderColsForExport,
    allowedDetailColsForExport,
  };
})(window);
