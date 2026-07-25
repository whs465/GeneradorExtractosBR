(function (global) {
  const NAMESPACE = 'urn:iso:std:iso:20022:tech:xsd:camt.053.001.02';

  const REQUIRED_EXCEL_COLUMNS = [
    'Cuenta',
    'Moneda',
    'Fecha Valor',
    'Fecha Operación',
    'Valor Operación',
    'Tipo Movimiento',
    'Concepto Bancario',
    'issuer_constant',
    'Referencia Operación',
    'Nombre Transacción',
    'Secuencia',
    'Nombre Cuenta Débito 9.1.20',
    'Saldo Inicial',
    'Saldo Final',
    'Total Registros',
    'Suma Cantidades',
    'Neto Cred/Deb',
    'Naturaleza del Total',
    'Total Reg Créditos',
    'Suma Créditos',
    'Total Reg Débitos',
    'Suma Débitos',
    'after_transaction_balance',
    'after_transaction_currency',
    'nit_deudor',
    'nombre_deudor',
    'otro_deudor',
    'Cuenta Deudor (Sale)',
    'Código Portafolio Deudor 1.1.10',
    'cuenta_deudor_ccy',
    'Nombre Tercero 9.1.0',
    'nit_acreedor',
    'nombre_acreedor',
    'otro_acreedor',
    'Cuenta Acreedor (Entra)',
    'cuenta_acreedor_ccy',
    'Código Portafolio Acreedor 1.1.10',
    'nombre_acreedor_final',
    'nombre_acreedor_final_id',
    'nombre_acreedor_final_issuer',
    'recaudo_detail'
  ];

  function getMissingColumns(rows, requiredColumns) {
    if (!Array.isArray(rows) || !rows.length) return requiredColumns.slice();
    const headerSet = new Set();
    rows.forEach((r) => {
      if (r && typeof r === 'object') {
        Object.keys(r).forEach((k) => headerSet.add(String(k).trim()));
      }
    });
    return requiredColumns.filter((col) => !headerSet.has(col));
  }

  function parseXmlSafe(xmlText) {
    const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
    const hasError = !!doc.getElementsByTagName('parsererror').length;
    return { doc, hasError };
  }

  function validateXmlKind(doc) {
    const hasPain = !!doc.getElementsByTagName('PmtInf').length;
    const hasCamt = !!doc.getElementsByTagName('Stmt').length;
    const namespace = doc.documentElement?.namespaceURI || '';
    const hasPacs = namespace.includes(':pacs.')
      && !!doc.getElementsByTagName('GrpHdr').length
      && !!doc.getElementsByTagName('CdtTrfTxInf').length;
    return { hasPain, hasCamt, hasPacs, ok: hasPain || hasCamt || hasPacs };
  }



  function getText(node, path) {
    let cur = node;
    for (const tag of path || []) {
      cur = cur?.getElementsByTagName(tag)[0];
      if (!cur) return '';
    }
    return (cur.textContent || '').trim();
  }

  function getSvcLvl(pmtInfNode) {
    return getText(pmtInfNode, ['PmtTpInf', 'SvcLvl', 'Cd']);
  }

  function formatAmount(value) {
    const raw = (typeof value === 'string'
      ? value
      : (value?.textContent || '')).trim().replace(',', '.');
    const num = parseFloat(raw) || 0;
    return num.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  global.GEW_SHARED = {
    NAMESPACE,
    REQUIRED_EXCEL_COLUMNS,
    getMissingColumns,
    parseXmlSafe,
    validateXmlKind,
    getText,
    getSvcLvl,
    formatAmount,
  };
})(window);
