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

  const pacsHeaderCols = [
    'MsgId', 'CreDtTm', 'BtchBookg', 'NbOfTxs', 'CtrlSum', 'SttlmMtd', 'Exportar'
  ];

  const pacsDetailCols = [
    'EndToEndId', 'TxId', 'SvcLvl', 'LclInstrm',
    'IntrBkSttlmAmt', 'IntrBkSttlmAmtCcy', 'IntrBkSttlmDt',
    'DbtrId', 'DbtrIssuer', 'DbtrBranch', 'DbtrAcctId', 'DbtrAcctTp', 'DbtrAcctCcy',
    'CdtrId', 'CdtrIssuer', 'CdtrBranch', 'CdtrAcctId', 'CdtrAcctTp', 'CdtrAcctCcy',
    'RmtInf'
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

  const toColumnMeta = (definitions) => Object.fromEntries(
    definitions.map(([key, label, path]) => [key, { label, path }])
  );

  const columnMeta = {
    pain: {
      header: toColumnMeta([
        ['PmtInfId', 'PmtInfId', 'PmtInf/PmtInfId'],
        ['PmtMtd', 'PmtMtd', 'PmtInf/PmtMtd'],
        ['NbOfTxs', 'NbOfTxs', 'PmtInf/NbOfTxs'],
        ['CtrlSum', 'CtrlSum', 'PmtInf/CtrlSum'],
        ['SvcLvl', 'SvcLvl.Cd', 'PmtInf/PmtTpInf/SvcLvl/Cd'],
        ['LclInstrm', 'LclInstrm.Prtry', 'PmtInf/PmtTpInf/LclInstrm/Prtry'],
        ['ReqdExctnDt', 'ReqdExctnDt', 'PmtInf/ReqdExctnDt'],
        ['DbtrNm', 'Dbtr.Nm', 'PmtInf/Dbtr/Nm'],
        ['DbtrAcctId', 'DbtrAcct.Id', 'PmtInf/DbtrAcct/Id/(IBAN|Othr/Id)'],
        ['DbtrAgtBIC', 'DbtrAgt.BIC', 'PmtInf/DbtrAgt/FinInstnId/BIC'],
        ['DbtrAgtMemberId', 'DbtrAgt.MmbId', 'PmtInf/DbtrAgt/FinInstnId/ClrSysMmbId/MmbId'],
        ['DbtrAgtCountry', 'DbtrAgt.Ctry', 'PmtInf/DbtrAgt/FinInstnId/PstlAdr/Ctry'],
        ['DbtrStreet', 'Dbtr.StrtNm', 'PmtInf/Dbtr/PstlAdr/StrtNm'],
        ['DbtrTown', 'Dbtr.TwnNm', 'PmtInf/Dbtr/PstlAdr/TwnNm'],
        ['DbtrCountryRes', 'Dbtr.CtryOfRes', 'PmtInf/Dbtr/CtryOfRes'],
      ]),
      detail: toColumnMeta([
        ['EndToEndId', 'EndToEndId', 'PmtInf/CdtTrfTxInf/PmtId/EndToEndId'],
        ['InstdAmt', 'InstdAmt', 'PmtInf/CdtTrfTxInf/Amt/InstdAmt'],
        ['InstdAmtCcy', 'InstdAmt.@Ccy', 'PmtInf/CdtTrfTxInf/Amt/InstdAmt/@Ccy'],
        ['CdtrNm', 'Cdtr.Nm', 'PmtInf/CdtTrfTxInf/Cdtr/Nm'],
        ['CdtrCountry', 'Cdtr.Ctry', 'PmtInf/CdtTrfTxInf/Cdtr/PstlAdr/Ctry'],
        ['CdtrOrgId', 'Cdtr.OrgId', 'PmtInf/CdtTrfTxInf/Cdtr/Id/OrgId/Othr/Id'],
        ['CdtrAcctId', 'CdtrAcct.Id', 'PmtInf/CdtTrfTxInf/CdtrAcct/Id/(IBAN|Othr/Id)'],
        ['CdtrAcctNm', 'CdtrAcct.Nm', 'PmtInf/CdtTrfTxInf/CdtrAcct/Nm'],
        ['CdtrAgtId', 'CdtrAgt.FinInstnId', 'PmtInf/CdtTrfTxInf/CdtrAgt/FinInstnId/(BIC|ClrSysMmbId/MmbId|Nm)'],
        ['CdtrAgtName', 'CdtrAgt.Nm', 'PmtInf/CdtTrfTxInf/CdtrAgt/FinInstnId/Nm'],
        ['CdtrAgtCountry', 'CdtrAgt.Ctry', 'PmtInf/CdtTrfTxInf/CdtrAgt/FinInstnId/PstlAdr/Ctry'],
        ['RmtInf', 'RmtInf.Ustrd', 'PmtInf/CdtTrfTxInf/RmtInf/Ustrd'],
      ]),
    },
    pacs: {
      header: toColumnMeta([
        ['MsgId', 'MsgId', 'FinInstnCdtTrf/GrpHdr/MsgId'],
        ['CreDtTm', 'CreDtTm', 'FinInstnCdtTrf/GrpHdr/CreDtTm'],
        ['BtchBookg', 'BtchBookg', 'FinInstnCdtTrf/GrpHdr/BtchBookg'],
        ['NbOfTxs', 'NbOfTxs', 'FinInstnCdtTrf/GrpHdr/NbOfTxs'],
        ['CtrlSum', 'CtrlSum', 'FinInstnCdtTrf/GrpHdr/CtrlSum'],
        ['SttlmMtd', 'SttlmMtd', 'FinInstnCdtTrf/GrpHdr/SttlmInf/SttlmMtd'],
        ['Exportar', 'Exportar', 'Descargar las transferencias del mensaje en Excel'],
      ]),
      detail: toColumnMeta([
        ['EndToEndId', 'EndToEndId', 'FinInstnCdtTrf/CdtTrfTxInf/PmtId/EndToEndId'],
        ['TxId', 'TxId', 'FinInstnCdtTrf/CdtTrfTxInf/PmtId/TxId'],
        ['SvcLvl', 'SvcLvl', 'FinInstnCdtTrf/CdtTrfTxInf/PmtTpInf/SvcLvl/(Cd|Prtry)'],
        ['LclInstrm', 'LclInstrm', 'FinInstnCdtTrf/CdtTrfTxInf/PmtTpInf/LclInstrm/(Cd|Prtry)'],
        ['IntrBkSttlmAmt', 'IntrBkSttlmAmt', 'FinInstnCdtTrf/CdtTrfTxInf/IntrBkSttlmAmt'],
        ['IntrBkSttlmAmtCcy', 'IntrBkSttlmAmt.@Ccy', 'FinInstnCdtTrf/CdtTrfTxInf/IntrBkSttlmAmt/@Ccy'],
        ['IntrBkSttlmDt', 'IntrBkSttlmDt', 'FinInstnCdtTrf/CdtTrfTxInf/IntrBkSttlmDt'],
        ['DbtrId', 'Dbtr.FinInstnId', 'FinInstnCdtTrf/CdtTrfTxInf/Dbtr/FinInstnId/Othr/Id'],
        ['DbtrIssuer', 'Dbtr.Issr', 'FinInstnCdtTrf/CdtTrfTxInf/Dbtr/FinInstnId/Othr/Issr'],
        ['DbtrBranch', 'Dbtr.BrnchId', 'FinInstnCdtTrf/CdtTrfTxInf/Dbtr/BrnchId/Id'],
        ['DbtrAcctId', 'DbtrAcct.Id', 'FinInstnCdtTrf/CdtTrfTxInf/DbtrAcct/Id/(IBAN|Othr/Id)'],
        ['DbtrAcctTp', 'DbtrAcct.Tp', 'FinInstnCdtTrf/CdtTrfTxInf/DbtrAcct/Tp/(Cd|Prtry)'],
        ['DbtrAcctCcy', 'DbtrAcct.Ccy', 'FinInstnCdtTrf/CdtTrfTxInf/DbtrAcct/Ccy'],
        ['CdtrId', 'Cdtr.FinInstnId', 'FinInstnCdtTrf/CdtTrfTxInf/Cdtr/FinInstnId/Othr/Id'],
        ['CdtrIssuer', 'Cdtr.Issr', 'FinInstnCdtTrf/CdtTrfTxInf/Cdtr/FinInstnId/Othr/Issr'],
        ['CdtrBranch', 'Cdtr.BrnchId', 'FinInstnCdtTrf/CdtTrfTxInf/Cdtr/BrnchId/Id'],
        ['CdtrAcctId', 'CdtrAcct.Id', 'FinInstnCdtTrf/CdtTrfTxInf/CdtrAcct/Id/(IBAN|Othr/Id)'],
        ['CdtrAcctTp', 'CdtrAcct.Tp', 'FinInstnCdtTrf/CdtTrfTxInf/CdtrAcct/Tp/(Cd|Prtry)'],
        ['CdtrAcctCcy', 'CdtrAcct.Ccy', 'FinInstnCdtTrf/CdtTrfTxInf/CdtrAcct/Ccy'],
        ['RmtInf', 'RmtInf.Ustrd', 'FinInstnCdtTrf/CdtTrfTxInf/RmtInf/Ustrd'],
      ]),
    },
    camt: {
      header: toColumnMeta([
        ['Cuenta', 'Acct.Id', 'Stmt/Acct/Id/Othr/Id'],
        ['Extracto', 'Id', 'Stmt/Id'],
        ['Tipo Extracto', 'Id[15]', 'Stmt/Id (carácter 15)'],
        ['Fecha Generación', 'CreDtTm', 'Stmt/CreDtTm'],
        ['Fecha Inicial', 'FrToDt.FrDtTm', 'Stmt/FrToDt/FrDtTm'],
        ['Fecha Final', 'FrToDt.ToDtTm', 'Stmt/FrToDt/ToDtTm'],
        ['constant', 'Acct.Tp.Prtry', 'Stmt/Acct/Tp/Prtry'],
        ['Moneda', 'Acct.Ccy', 'Stmt/Acct/Ccy'],
        ['Nombre Cuenta', 'Acct.Nm', 'Stmt/Acct/Nm'],
        ['Nit', 'Svcr.FinInstnId', 'Stmt/Acct/Svcr/FinInstnId/Othr/Id'],
        ['name_tesoreria', 'Svcr.Issr', 'Stmt/Acct/Svcr/FinInstnId/Othr/Issr'],
        ['branch_br', 'Svcr.BrnchId', 'Stmt/Acct/Svcr/BrnchId/Id'],
        ['type_initial', 'Bal[OPBD].Tp.Cd', 'Stmt/Bal[Tp/CdOrPrtry/Cd="OPBD"]/Tp/CdOrPrtry/Cd'],
        ['currency_initial', 'Bal[OPBD].Amt.@Ccy', 'Stmt/Bal[Tp/CdOrPrtry/Cd="OPBD"]/Amt/@Ccy'],
        ['Saldo Inicial', 'Bal[OPBD].Amt', 'Stmt/Bal[Tp/CdOrPrtry/Cd="OPBD"]/Amt'],
        ['credit_debit_indicator_initial', 'Bal[OPBD].CdtDbtInd', 'Stmt/Bal[Tp/CdOrPrtry/Cd="OPBD"]/CdtDbtInd'],
        ['date_initial', 'Bal[OPBD].Dt', 'Stmt/Bal[Tp/CdOrPrtry/Cd="OPBD"]/Dt/Dt'],
        ['type_final', 'Bal[CLBD].Tp.Cd', 'Stmt/Bal[Tp/CdOrPrtry/Cd="CLBD"]/Tp/CdOrPrtry/Cd'],
        ['currency_final', 'Bal[CLBD].Amt.@Ccy', 'Stmt/Bal[Tp/CdOrPrtry/Cd="CLBD"]/Amt/@Ccy'],
        ['Saldo Final', 'Bal[CLBD].Amt', 'Stmt/Bal[Tp/CdOrPrtry/Cd="CLBD"]/Amt'],
        ['credit_debit_indicator_final', 'Bal[CLBD].CdtDbtInd', 'Stmt/Bal[Tp/CdOrPrtry/Cd="CLBD"]/CdtDbtInd'],
        ['date_final', 'Bal[CLBD].Dt', 'Stmt/Bal[Tp/CdOrPrtry/Cd="CLBD"]/Dt/Dt'],
        ['Total Registros', 'TtlNtries.NbOfNtries', 'Stmt/TxsSummry/TtlNtries/NbOfNtries'],
        ['Suma Cantidades', 'TtlNtries.Sum', 'Stmt/TxsSummry/TtlNtries/Sum'],
        ['Neto Cred/Deb', 'TtlNtries.TtlNetNtryAmt', 'Stmt/TxsSummry/TtlNtries/TtlNetNtryAmt'],
        ['Naturaleza del Total', 'TtlNtries.CdtDbtInd', 'Stmt/TxsSummry/TtlNtries/CdtDbtInd'],
        ['Total Reg Créditos', 'TtlCdtNtries.NbOfNtries', 'Stmt/TxsSummry/TtlCdtNtries/NbOfNtries'],
        ['Suma Créditos', 'TtlCdtNtries.Sum', 'Stmt/TxsSummry/TtlCdtNtries/Sum'],
        ['Total Reg Débitos', 'TtlDbtNtries.NbOfNtries', 'Stmt/TxsSummry/TtlDbtNtries/NbOfNtries'],
        ['Suma Débitos', 'TtlDbtNtries.Sum', 'Stmt/TxsSummry/TtlDbtNtries/Sum'],
        ['Exportar', 'Exportar', 'Descargar los movimientos del extracto en Excel'],
      ]),
      detail: toColumnMeta([
        ['Valor Operación', 'Amt', 'Stmt/Ntry/Amt'],
        ['Moneda', 'Amt.@Ccy', 'Stmt/Ntry/Amt/@Ccy'],
        ['Tipo Movimiento', 'CdtDbtInd', 'Stmt/Ntry/CdtDbtInd'],
        ['status', 'Sts', 'Stmt/Ntry/Sts'],
        ['Fecha Operación', 'BookgDt.DtTm', 'Stmt/Ntry/BookgDt/DtTm'],
        ['Fecha Valor', 'ValDt.Dt', 'Stmt/Ntry/ValDt/Dt'],
        ['Concepto Bancario', 'BkTxCd.Prtry.Cd', 'Stmt/Ntry/BkTxCd/Prtry/Cd'],
        ['issuer_constant', 'BkTxCd.Prtry.Issr', 'Stmt/Ntry/BkTxCd/Prtry/Issr'],
        ['Referencia Operación', 'Refs.MsgId', 'Stmt/Ntry/NtryDtls/TxDtls/Refs/MsgId'],
        ['Nombre Transacción', 'Refs.AcctSvcrRef', 'Stmt/Ntry/NtryDtls/TxDtls/Refs/AcctSvcrRef'],
        ['Secuencia', 'Refs.TxId', 'Stmt/Ntry/NtryDtls/TxDtls/Refs/TxId'],
        ['Tipo Saldo', 'PrtryAmt.Tp', 'Stmt/Ntry/NtryDtls/TxDtls/AmtDtls/PrtryAmt/Tp'],
        ['after_transaction_balance', 'PrtryAmt.Amt', 'Stmt/Ntry/NtryDtls/TxDtls/AmtDtls/PrtryAmt/Amt'],
        ['after_transaction_currency', 'PrtryAmt.Amt.@Ccy', 'Stmt/Ntry/NtryDtls/TxDtls/AmtDtls/PrtryAmt/Amt/@Ccy'],
        ['nit_deudor', 'Dbtr.OrgId', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/Dbtr/Id/OrgId/Othr/Id'],
        ['nombre_deudor', 'Dbtr.Issr', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/Dbtr/Id/OrgId/Othr/Issr'],
        ['otro_deudor', 'Dbtr.CtctDtls.Othr', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/Dbtr/CtctDtls/Othr'],
        ['Cuenta Deudor (Sale)', 'DbtrAcct.Id', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/DbtrAcct/Id/Othr/Id'],
        ['Código Portafolio Deudor 1.1.10', 'DbtrAcct.Tp.Prtry', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/DbtrAcct/Tp/Prtry'],
        ['cuenta_deudor_ccy', 'DbtrAcct.Ccy', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/DbtrAcct/Ccy'],
        ['Nombre Tercero 9.1.0', 'UltmtDbtr.Nm', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/UltmtDbtr/Nm'],
        ['Cuenta Tercero', 'UltmtDbtr.OrgId', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/UltmtDbtr/Id/OrgId/Othr/Id'],
        ['Nombre Cuenta Débito 9.1.20', 'UltmtDbtr.Issr', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/UltmtDbtr/Id/OrgId/Othr/Issr'],
        ['nit_acreedor', 'Cdtr.OrgId', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/Cdtr/Id/OrgId/Othr/Id'],
        ['nombre_acreedor', 'Cdtr.Issr', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/Cdtr/Id/OrgId/Othr/Issr'],
        ['otro_acreedor', 'Cdtr.CtctDtls.Othr', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/Cdtr/CtctDtls/Othr'],
        ['Cuenta Acreedor (Entra)', 'CdtrAcct.Id', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/CdtrAcct/Id/Othr/Id'],
        ['cuenta_acreedor_ccy', 'CdtrAcct.Ccy', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/CdtrAcct/Ccy'],
        ['Código Portafolio Acreedor 1.1.10', 'CdtrAcct.Tp.Prtry', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/CdtrAcct/Tp/Prtry'],
        ['nombre_acreedor_final', 'UltmtCdtr.Nm', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/UltmtCdtr/Nm'],
        ['nombre_acreedor_final_id', 'UltmtCdtr.OrgId', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/UltmtCdtr/Id/OrgId/Othr/Id'],
        ['nombre_acreedor_final_issuer', 'UltmtCdtr.Issr', 'Stmt/Ntry/NtryDtls/TxDtls/RltdPties/UltmtCdtr/Id/OrgId/Othr/Issr'],
        ['recaudo_detail', 'AddtlNtryInf', 'Stmt/Ntry/AddtlNtryInf'],
      ]),
    },
  };

  global.GEW_MAPPINGS = {
    painHeaderCols,
    painDetailCols,
    pacsHeaderCols,
    pacsDetailCols,
    camtHeaderCols,
    camtDetailCols,
    allowedHeaderColsForExport,
    allowedDetailColsForExport,
    columnMeta,
  };
})(window);
