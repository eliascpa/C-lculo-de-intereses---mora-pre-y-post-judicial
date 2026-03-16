
import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- Data Section ---
type RatePeriod = {
  start: string;
  end: string;
  government: number;
  other: number;
};

const INTEREST_RATES_DATA: RatePeriod[] = [
    { start: '1900-01-01', end: '1985-07-05', government: 6.00, other: 6.00 },
    { start: '1985-07-06', end: '1988-12-31', government: 12.00, other: 12.00 },
    { start: '1989-01-01', end: '1989-06-30', government: 8.50, other: 11.50 },
    { start: '1989-07-01', end: '1989-12-31', government: 8.50, other: 12.50 },
    { start: '1990-01-01', end: '1990-06-30', government: 8.00, other: 11.50 },
    { start: '1990-07-01', end: '1990-12-31', government: 7.50, other: 11.00 },
    { start: '1991-01-01', end: '1991-06-30', government: 7.00, other: 11.00 },
    { start: '1991-07-01', end: '1991-12-31', government: 5.50, other: 9.50 },
    { start: '1992-01-01', end: '1992-06-30', government: 4.50, other: 8.50 },
    { start: '1992-07-01', end: '1992-12-31', government: 4.00, other: 7.50 },
    { start: '1993-01-01', end: '1993-06-30', government: 3.50, other: 7.00 },
    { start: '1993-07-01', end: '1993-12-31', government: 3.00, other: 7.00 },
    { start: '1994-01-01', end: '1994-06-30', government: 3.50, other: 7.00 },
    { start: '1994-07-01', end: '1994-12-31', government: 5.00, other: 8.25 },
    { start: '1995-01-01', end: '1995-06-30', government: 6.00, other: 9.50 },
    { start: '1995-07-01', end: '1995-12-31', government: 5.50, other: 10.00 },
    { start: '1996-01-01', end: '1996-06-30', government: 5.50, other: 9.75 },
    { start: '1996-07-01', end: '1996-12-31', government: 5.50, other: 9.25 },
    { start: '1997-01-01', end: '1997-06-30', government: 5.00, other: 9.25 },
    { start: '1997-07-01', end: '1997-12-31', government: 5.50, other: 9.50 },
    { start: '1998-01-01', end: '1998-06-30', government: 5.50, other: 9.50 },
    { start: '1998-07-01', end: '1998-12-31', government: 5.50, other: 9.50 },
    { start: '1999-01-01', end: '1999-06-30', government: 4.50, other: 8.75 },
    { start: '1999-07-01', end: '1999-12-31', government: 5.00, other: 8.75 },
    { start: '2000-01-01', end: '2000-06-30', government: 5.50, other: 9.50 },
    { start: '2000-07-01', end: '2000-12-31', government: 6.00, other: 10.50 },
    { start: '2001-01-01', end: '2001-06-30', government: 6.00, other: 10.50 },
    { start: '2001-07-01', end: '2001-12-31', government: 3.50, other: 8.00 },
    { start: '2002-01-01', end: '2002-06-30', government: 2.00, other: 6.00 },
    { start: '2002-07-01', end: '2002-12-31', government: 1.50, other: 5.75 },
    { start: '2003-01-01', end: '2003-06-30', government: 1.50, other: 5.25 },
    { start: '2003-07-01', end: '2003-12-31', government: 1.00, other: 5.25 },
    { start: '2004-01-01', end: '2004-06-30', government: 1.00, other: 5.00 },
    { start: '2004-07-01', end: '2004-12-31', government: 1.50, other: 5.00 },
    { start: '2005-01-01', end: '2005-06-30', government: 2.50, other: 6.00 },
    { start: '2005-07-01', end: '2005-12-31', government: 3.00, other: 7.00 },
    { start: '2006-01-01', end: '2006-06-30', government: 4.00, other: 8.00 },
    { start: '2006-07-01', end: '2006-12-31', government: 5.00, other: 9.00 },
    { start: '2007-01-01', end: '2007-06-30', government: 5.00, other: 9.25 },
    { start: '2007-07-01', end: '2007-12-31', government: 5.00, other: 9.25 },
    { start: '2008-01-01', end: '2008-06-30', government: 3.00, other: 8.50 },
    { start: '2008-07-01', end: '2008-12-31', government: 2.00, other: 6.00 },
    { start: '2009-01-01', end: '2009-06-30', government: 0.50, other: 5.00 },
    { start: '2009-07-01', end: '2009-12-31', government: 0.50, other: 4.25 },
    { start: '2010-01-01', end: '2010-06-30', government: 0.50, other: 4.25 },
    { start: '2010-07-01', end: '2010-12-31', government: 0.50, other: 4.25 },
    { start: '2011-01-01', end: '2011-06-30', government: 0.50, other: 4.25 },
    { start: '2011-07-01', end: '2011-12-31', government: 0.50, other: 4.25 },
    { start: '2012-01-01', end: '2012-06-30', government: 0.50, other: 4.25 },
    { start: '2012-07-01', end: '2012-12-31', government: 0.50, other: 4.25 },
    { start: '2013-01-01', end: '2013-06-30', government: 0.50, other: 4.25 },
    { start: '2013-07-01', end: '2013-12-31', government: 0.50, other: 4.25 },
    { start: '2014-01-01', end: '2014-06-30', government: 0.50, other: 4.25 },
    { start: '2014-07-01', end: '2014-12-31', government: 0.50, other: 4.25 },
    { start: '2015-01-01', end: '2015-06-30', government: 0.50, other: 4.25 },
    { start: '2015-07-01', end: '2015-12-31', government: 0.50, other: 4.25 },
    { start: '2016-01-01', end: '2016-06-30', government: 0.50, other: 4.25 },
    { start: '2016-07-01', end: '2016-12-31', government: 0.50, other: 4.50 },
    { start: '2017-01-01', end: '2017-06-30', government: 0.50, other: 4.50 },
    { start: '2017-07-01', end: '2017-12-31', government: 1.00, other: 5.00 },
    { start: '2018-01-01', end: '2018-06-30', government: 1.50, other: 5.25 },
    { start: '2018-07-01', end: '2018-12-31', government: 2.00, other: 5.75 },
    { start: '2019-01-01', end: '2019-06-30', government: 2.50, other: 6.25 },
    { start: '2019-07-01', end: '2019-12-31', government: 2.50, other: 6.50 },
    { start: '2020-01-01', end: '2020-06-30', government: 1.50, other: 5.75 },
    { start: '2020-07-01', end: '2020-12-31', government: 0.50, other: 4.25 },
    { start: '2021-01-01', end: '2021-06-30', government: 0.50, other: 4.25 },
    { start: '2021-07-01', end: '2021-12-31', government: 0.50, other: 4.25 },
    { start: '2022-01-01', end: '2022-06-30', government: 0.50, other: 4.25 },
    { start: '2022-07-01', end: '2022-12-31', government: 2.00, other: 5.00 },
    { start: '2023-01-01', end: '2023-06-30', government: 4.50, other: 8.00 },
    { start: '2023-07-01', end: '2023-12-31', government: 5.50, other: 9.25 },
    { start: '2024-01-01', end: '2024-06-30', government: 5.50, other: 9.50 },
    { start: '2024-07-01', end: '2024-12-31', government: 5.50, other: 9.50 },
    { start: '2025-01-01', end: '2025-06-30', government: 4.50, other: 8.75 },
    { start: '2025-07-01', end: '2025-12-31', government: 4.50, other: 8.50 },
    { start: '2026-01-01', end: '2026-06-30', government: 4.00, other: 8.00 },
];

const parsedRates = INTEREST_RATES_DATA.map(r => ({
    ...r,
    startDate: new Date(r.start + 'T00:00:00'),
    endDate: new Date(r.end + 'T00:00:00'),
}));

// --- Helper Functions ---
const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const getRateForDate = (date: Date, defendantType: 'government' | 'other'): number => {
    const ratePeriod = parsedRates.find(p => date >= p.startDate && date <= p.endDate);
    if (!ratePeriod) return 0;
    return defendantType === 'government' ? ratePeriod.government : ratePeriod.other;
};

type CalculationSegment = {
    start: string;
    end: string;
    days: number;
    rate: number;
    daysInYear: number;
    interest: number;
};

type CalculationResult = {
    total: number;
    segments: CalculationSegment[];
};

const DISCLOSURE_TEXT = "Aviso Importante: Los cálculos presentados por esta herramienta son para fines ilustrativos y de referencia únicamente. No constituyen una opinión legal ni de ninguna otra índole, ni pretenden sustituir el asesoramiento profesional cualificado. Los resultados pueden variar según interpretaciones judiciales específicas de las Reglas de Procedimiento Civil de Puerto Rico.";

// --- Core Calculation Engine ---
const calculateDetailedInterest = (
    principal: number,
    start: Date,
    end: Date,
    defendantType: 'government' | 'other',
    fixedRate: number | null = null
): CalculationResult => {
    if (principal <= 0 || start >= end) return { total: 0, segments: [] };

    const segments: CalculationSegment[] = [];
    let currentDate = new Date(start);
    let totalInterest = 0;

    let segmentStart = new Date(currentDate);
    let currentSegmentInterest = 0;
    let currentSegmentDays = 0;

    while (currentDate < end) {
        const rate = fixedRate !== null ? fixedRate : getRateForDate(currentDate, defendantType);
        const daysInYear = isLeapYear(currentDate.getFullYear()) ? 366 : 365;
        const dailyRate = (rate / 100) / daysInYear;
        const dailyInterest = principal * dailyRate;

        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);

        const rateChanged = fixedRate === null && getRateForDate(nextDay, defendantType) !== rate;
        const yearChanged = nextDay.getFullYear() !== currentDate.getFullYear();
        const calculationFinished = nextDay >= end;

        currentSegmentInterest += dailyInterest;
        currentSegmentDays += 1;
        totalInterest += dailyInterest;

        if (rateChanged || yearChanged || calculationFinished) {
            segments.push({
                start: segmentStart.toISOString().split('T')[0],
                end: currentDate.toISOString().split('T')[0],
                days: currentSegmentDays,
                rate: rate,
                daysInYear: daysInYear,
                interest: currentSegmentInterest
            });

            segmentStart = new Date(nextDay);
            currentSegmentInterest = 0;
            currentSegmentDays = 0;
        }

        currentDate = nextDay;
    }

    return { total: totalInterest, segments };
};

// --- React Component ---
const App = () => {
    const [principal, setPrincipal] = useState<number | ''>('');
    const [defendantType, setDefendantType] = useState<'government' | 'other'>('other');
    const [hasMora, setHasMora] = useState(false);
    const [moraStartDate, setMoraStartDate] = useState('');
    const [moraEndDate, setMoraEndDate] = useState('');
    const [hasTemeridad, setHasTemeridad] = useState(false);
    const [hasCostas, setHasCostas] = useState(false);
    const [costasAmount, setCostasAmount] = useState<number | ''>('');
    const [preSentenceStartDate, setPreSentenceStartDate] = useState('');
    const [judgmentDate, setJudgmentDate] = useState('');
    const [postSentenceEndDate, setPostSentenceEndDate] = useState('');

    const [results, setResults] = useState<{
        principal: number;
        costas: number;
        mora: CalculationResult;
        preSentence: CalculationResult;
        postSentence: CalculationResult;
        costasInterest: CalculationResult;
        defendantType: string;
    } | null>(null);

    const isPreSentenceActive = useMemo(() => {
        return hasTemeridad && defendantType !== 'government';
    }, [hasTemeridad, defendantType]);

    const isFormValid = useMemo(() => {
        const isPrincipalValid = Number(principal) > 0;
        const isMoraValid = !hasMora || (moraStartDate && moraEndDate && moraStartDate < moraEndDate);
        const isPreSentenceValid = !isPreSentenceActive || (preSentenceStartDate && judgmentDate && preSentenceStartDate < judgmentDate);
        const isPostSentenceValid = judgmentDate && postSentenceEndDate && judgmentDate < postSentenceEndDate;
        const isCostasValid = !hasCostas || Number(costasAmount) > 0;
        return isPrincipalValid && isMoraValid && isPreSentenceValid && isPostSentenceValid && isCostasValid;
    }, [principal, hasMora, moraStartDate, moraEndDate, isPreSentenceActive, preSentenceStartDate, judgmentDate, postSentenceEndDate, hasCostas, costasAmount]);
    
    const handleCalculate = () => {
        if (!isFormValid || !principal) return;

        const moraRes = hasMora 
            ? calculateDetailedInterest(Number(principal), new Date(moraStartDate + 'T00:00:00'), new Date(moraEndDate + 'T00:00:00'), defendantType)
            : { total: 0, segments: [] };

        const judgmentDateObj = new Date(judgmentDate + 'T00:00:00');
        const rateAtJudgment = getRateForDate(judgmentDateObj, defendantType);

        const preRes = isPreSentenceActive
            ? calculateDetailedInterest(Number(principal), new Date(preSentenceStartDate + 'T00:00:00'), judgmentDateObj, defendantType, rateAtJudgment)
            : { total: 0, segments: [] };
        
        const postRes = calculateDetailedInterest(
            Number(principal),
            judgmentDateObj,
            new Date(postSentenceEndDate + 'T00:00:00'),
            defendantType,
            rateAtJudgment
        );

        const costasRes = hasCostas && costasAmount
            ? calculateDetailedInterest(
                Number(costasAmount),
                judgmentDateObj,
                new Date(postSentenceEndDate + 'T00:00:00'),
                defendantType,
                rateAtJudgment
            )
            : { total: 0, segments: [] };

        setResults({
            principal: Number(principal),
            costas: Number(costasAmount) || 0,
            mora: moraRes,
            preSentence: preRes,
            postSentence: postRes,
            costasInterest: costasRes,
            defendantType: defendantType === 'government' ? 'Gobierno/Municipio' : 'Entidad Privada'
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const formatRate = (rate: number) => rate.toFixed(2) + '%';

    const exportToCSV = () => {
        if (!results) return;
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "REPORTE DE LIQUIDACION DE INTERESES LEGALES - PUERTO RICO\n\n";
        csvContent += `Tipo de Demandado,${results.defendantType}\n`;
        csvContent += `Monto concedido en la Sentencia,${results.principal.toFixed(2)}\n`;
        if (results.costas > 0) {
            csvContent += `Costas Incurridas,${results.costas.toFixed(2)}\n`;
        }
        csvContent += `\n`;

        const addCategory = (title: string, data: CalculationResult) => {
            if (data.segments.length === 0) return;
            csvContent += `${title.toUpperCase()}\n`;
            csvContent += "Inicio,Fin,Dias,Tasa,Base Anual,Interes Tramo\n";
            data.segments.forEach(s => {
                csvContent += `${s.start},${s.end},${s.days},${s.rate}%,${s.daysInYear},${s.interest.toFixed(2)}\n`;
            });
            csvContent += `SUBTOTAL ${title.toUpperCase()},,,,,${data.total.toFixed(2)}\n\n`;
        };

        addCategory("Intereses por Mora", results.mora);
        addCategory("Intereses Pre-Sentencia", results.preSentence);
        addCategory("Intereses Post-Sentencia", results.postSentence);
        addCategory("Intereses sobre Costas", results.costasInterest);

        const total = results.principal + results.costas + results.mora.total + results.preSentence.total + results.postSentence.total + results.costasInterest.total;
        csvContent += `TOTAL GENERAL A PAGAR,,,,,${total.toFixed(2)}\n\n`;
        csvContent += `DIVULGACION: ${DISCLOSURE_TEXT.replace(/,/g, '')}\n`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `liquidacion_${new Date().getTime()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToPDF = () => {
        const resultsEl = document.getElementById('printable-results');
        if (!resultsEl) return;

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            window.print();
            return;
        }

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Liquidación de Intereses - Puerto Rico</title>
                <style>
                    body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #1e293b; line-height: 1.5; }
                    h1 { color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 12px; font-size: 1.8rem; margin-bottom: 30px; }
                    h2 { font-size: 1.4rem; margin-top: 30px; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
                    h3 { font-size: 1.1rem; color: #64748b; margin-top: 25px; }
                    .summary-box { background: #f8fafc; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #e2e8f0; }
                    .summary-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
                    .summary-row:last-child { border-bottom: none; }
                    .total { font-weight: bold; font-size: 1.6rem; color: #2563eb; margin-top: 15px; padding-top: 15px; border-top: 2px solid #2563eb; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 0.9rem; }
                    th, td { border: 1px solid #cbd5e1; padding: 12px; text-align: left; }
                    th { background: #f1f5f9; color: #475569; font-weight: 600; }
                    .disclosure { margin-top: 60px; font-size: 0.8rem; color: #94a3b8; text-align: justify; border-top: 1px solid #e2e8f0; padding-top: 20px; font-style: italic; }
                </style>
            </head>
            <body>
                <h1>Reporte de Liquidación Legal</h1>
                <div class="summary-box">
                    <div class="summary-row"><strong>Demandado:</strong> <span>${results?.defendantType}</span></div>
                    <div class="summary-row"><strong>Monto concedido:</strong> <span>${formatCurrency(results?.principal || 0)}</span></div>
                    ${results?.costas ? `<div class="summary-row"><strong>Costas Incurridas:</strong> <span>${formatCurrency(results.costas)}</span></div>` : ''}
                    ${hasMora ? `<div class="summary-row"><strong>Intereses Mora:</strong> <span>${formatCurrency(results?.mora.total || 0)}</span></div>` : ''}
                    ${isPreSentenceActive ? `<div class="summary-row"><strong>Intereses Pre-Sentencia:</strong> <span>${formatCurrency(results?.preSentence.total || 0)}</span></div>` : ''}
                    <div class="summary-row"><strong>Intereses Post-Sentencia:</strong> <span>${formatCurrency(results?.postSentence.total || 0)}</span></div>
                    ${results?.costas ? `<div class="summary-row"><strong>Intereses sobre Costas:</strong> <span>${formatCurrency(results.costasInterest.total)}</span></div>` : ''}
                    <div class="summary-row total"><strong>TOTAL ADEUDADO:</strong> <span>${formatCurrency((results?.principal || 0) + (results?.costas || 0) + (results?.mora.total || 0) + (results?.preSentence.total || 0) + (results?.postSentence.total || 0) + (results?.costasInterest?.total || 0))}</span></div>
                </div>
                ${resultsEl.innerHTML.replace(/<button.*?>.*?<\/button>/g, '')}
                <div class="disclosure">
                    <p>${DISCLOSURE_TEXT}</p>
                </div>
                <script>window.onload = function() { window.print(); window.onafterprint = function() { window.close(); } };</script>
            </body>
            </html>
        `;

        printWindow.document.write(html);
        printWindow.document.close();
    };

    const renderBreakdownTable = (title: string, result: CalculationResult) => {
        if (result.segments.length === 0) return null;
        return (
            <div className="breakdown-card">
                <details>
                    <summary className="breakdown-header">
                        <span className="breakdown-title">{title}</span>
                        <span className="breakdown-total">{formatCurrency(result.total)}</span>
                    </summary>
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Periodo</th>
                                    <th>Días</th>
                                    <th>Tasa</th>
                                    <th>Base</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.segments.map((seg, idx) => (
                                    <tr key={idx}>
                                        <td>{seg.start} al {seg.end}</td>
                                        <td>{seg.days}</td>
                                        <td className="rate-cell">{formatRate(seg.rate)}</td>
                                        <td>{seg.daysInYear}</td>
                                        <td className="amount-cell">{formatCurrency(seg.interest)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </details>
            </div>
        );
    };

    return (
        <div className="app-container">
            <header className="app-header no-print">
                <div className="logo-section">
                    <span className="logo-icon">⚖️</span>
                    <div className="logo-text">
                        <h1>Intereses PR</h1>
                        <p>Calculadora Legal Inteligente</p>
                    </div>
                </div>
            </header>
            
            <main className="main-content">
                <section className="form-grid no-print">
                    <div className="card form-card">
                        <h2>1. Configuración del Caso</h2>
                        <div className="input-group">
                            <label>Monto concedido en la Sentencia</label>
                            <div className="currency-input-container">
                                <span className="currency-symbol">$</span>
                                <input 
                                    type="number" 
                                    value={principal} 
                                    onChange={e => setPrincipal(parseFloat(e.target.value) || '')} 
                                    placeholder="0.00" 
                                />
                            </div>
                        </div>
                        
                        <div className="input-group">
                            <label>Jurisdicción / Tipo de Demandado</label>
                            <div className="segmented-control">
                                <button className={defendantType === 'other' ? 'active' : ''} onClick={() => setDefendantType('other')}>Entidad Privada</button>
                                <button className={defendantType === 'government' ? 'active' : ''} onClick={() => setDefendantType('government')}>Gobierno / Municipio</button>
                            </div>
                        </div>

                        <div className="options-grid">
                            <label className="checkbox-card">
                                <input type="checkbox" checked={hasMora} onChange={e => setHasMora(e.target.checked)} />
                                <div className="checkbox-content">
                                    <span className="checkbox-title">Intereses por Mora</span>
                                    <span className="checkbox-desc">Reclamación extrajudicial</span>
                                </div>
                            </label>
                            
                            <label className={`checkbox-card ${defendantType === 'government' ? 'disabled' : ''}`}>
                                <input type="checkbox" checked={hasTemeridad} onChange={e => setHasTemeridad(e.target.checked)} disabled={defendantType === 'government'} />
                                <div className="checkbox-content">
                                    <span className="checkbox-title">Temeridad Judicial</span>
                                    <span className="checkbox-desc">Intereses pre-sentencia</span>
                                </div>
                            </label>

                            <label className="checkbox-card">
                                <input type="checkbox" checked={hasCostas} onChange={e => setHasCostas(e.target.checked)} />
                                <div className="checkbox-content">
                                    <span className="checkbox-title">Costas Incurridas</span>
                                    <span className="checkbox-desc">Intereses desde la sentencia</span>
                                </div>
                            </label>
                        </div>

                        {hasCostas && (
                            <div className="input-group" style={{ marginTop: '20px' }}>
                                <label>Monto de Costas Incurridas</label>
                                <div className="currency-input-container">
                                    <span className="currency-symbol">$</span>
                                    <input 
                                        type="number" 
                                        value={costasAmount} 
                                        onChange={e => setCostasAmount(parseFloat(e.target.value) || '')} 
                                        placeholder="0.00" 
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="card form-card">
                        <h2>2. Cronología del Litigio</h2>
                        
                        {hasMora && (
                            <div className="timeline-section">
                                <h3>Fase Extrajudicial (Mora)</h3>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Inicio Reclamación</label>
                                        <input type="date" value={moraStartDate} onChange={e => setMoraStartDate(e.target.value)} />
                                    </div>
                                    <div className="input-group">
                                        <label>Fin Cómputo Mora</label>
                                        <input type="date" value={moraEndDate} onChange={e => setMoraEndDate(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="timeline-section">
                            <h3>Fase Judicial</h3>
                            <div className="input-stack">
                                {isPreSentenceActive && (
                                    <div className="input-group highlight">
                                        <label>Inicio Pre-Sentencia</label>
                                        <input type="date" value={preSentenceStartDate} onChange={e => setPreSentenceStartDate(e.target.value)} />
                                        <div className="info-box">
                                            <strong>Cómputo por Temeridad (Pre-Sentencia)</strong>
                                            <ul>
                                                <li><strong>Tasa aplicable:</strong> Tasa única vigente al momento de dictarse la sentencia (no es retrospectivo).</li>
                                                <li><strong>Inicio:</strong> Daños y perjuicios (fecha de demanda) | Cobro de dinero (surgimiento de la causa de acción).</li>
                                                <li><strong>Fin:</strong> Hasta la fecha en que se dicte la sentencia.</li>
                                                <li><strong>Base:</strong> Solo sobre la cuantía principal de la sentencia (excluye costas y honorarios).</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="input-group hito">
                                    <label>Hito: Fecha de Sentencia</label>
                                    <input type="date" value={judgmentDate} onChange={e => setJudgmentDate(e.target.value)} />
                                </div>

                                <div className="input-group">
                                    <label>Fecha de Pago Efectivo</label>
                                    <input type="date" value={postSentenceEndDate} onChange={e => setPostSentenceEndDate(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="actions-bar no-print">
                    <button className="primary-btn" onClick={handleCalculate} disabled={!isFormValid}>
                        Calcular Liquidación de Intereses
                    </button>
                </div>

                {results && (
                    <div className="results-area" id="printable-results">
                        <header className="results-header">
                            <h2>Resumen Ejecutivo de Liquidación</h2>
                            <div className="export-btns no-print">
                                <button className="outline-btn pdf-btn" onClick={exportToPDF}>📄 PDF</button>
                                <button className="outline-btn excel-btn" onClick={exportToCSV}>📊 Excel</button>
                            </div>
                        </header>

                        <div className="dashboard-grid">
                            <div className="metric-card main-total">
                                <span className="label">Total Adeudado</span>
                                <span className="value">{formatCurrency(results.principal + results.costas + results.mora.total + results.preSentence.total + results.postSentence.total + results.costasInterest.total)}</span>
                                <div className="status-badge success">Cálculo Verificado</div>
                            </div>
                            
                            <div className="metric-grid">
                                <div className="metric-subcard">
                                    <span className="label">Monto Sentencia</span>
                                    <span className="value-sub">{formatCurrency(results.principal)}</span>
                                </div>
                                {results.costas > 0 && (
                                    <div className="metric-subcard">
                                        <span className="label">Costas</span>
                                        <span className="value-sub">{formatCurrency(results.costas)}</span>
                                    </div>
                                )}
                                {hasMora && (
                                    <div className="metric-subcard highlight">
                                        <span className="label">Int. Mora</span>
                                        <span className="value-sub">{formatCurrency(results.mora.total)}</span>
                                    </div>
                                )}
                                {isPreSentenceActive && (
                                    <div className="metric-subcard highlight">
                                        <span className="label">Pre-Sentencia</span>
                                        <span className="value-sub">{formatCurrency(results.preSentence.total)}</span>
                                    </div>
                                )}
                                <div className="metric-subcard highlight">
                                    <span className="label">Post-Sentencia</span>
                                    <span className="value-sub">{formatCurrency(results.postSentence.total)}</span>
                                </div>
                                {results.costas > 0 && (
                                    <div className="metric-subcard highlight">
                                        <span className="label">Int. Costas</span>
                                        <span className="value-sub">{formatCurrency(results.costasInterest.total)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="breakdown-list">
                            <h3>Desglose Detallado de Cálculos</h3>
                            {renderBreakdownTable("Intereses por Mora", results.mora)}
                            {renderBreakdownTable("Intereses Pre-Sentencia", results.preSentence)}
                            {renderBreakdownTable("Intereses Post-Sentencia", results.postSentence)}
                            {renderBreakdownTable("Intereses sobre Costas", results.costasInterest)}
                        </div>
                    </div>
                )}

                <footer className="app-footer no-print">
                    <div className="disclosure-box">
                        <p>{DISCLOSURE_TEXT}</p>
                    </div>
                    <p className="version-tag">Beta v2.0 • Basado en Reglas Procedimiento Civil PR</p>
                </footer>
            </main>

            <style>{`
                :root {
                    --primary: #2563eb;
                    --primary-hover: #1d4ed8;
                    --bg: #f8fafc;
                    --card-bg: #ffffff;
                    --text-main: #0f172a;
                    --text-muted: #64748b;
                    --border: #e2e8f0;
                    --accent: #eff6ff;
                    --success: #10b981;
                    --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                }

                body {
                    background-color: var(--bg);
                    color: var(--text-main);
                    font-family: 'Inter', -apple-system, system-ui, sans-serif;
                    margin: 0;
                    padding: 0;
                    line-height: 1.6;
                    -webkit-font-smoothing: antialiased;
                }

                .app-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 40px 20px;
                }

                .app-header {
                    margin-bottom: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .logo-section {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .logo-icon {
                    font-size: 2.5rem;
                    background: white;
                    padding: 12px;
                    border-radius: 16px;
                    box-shadow: var(--shadow);
                }

                .logo-text h1 {
                    margin: 0;
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: var(--text-main);
                    letter-spacing: -0.025em;
                }

                .logo-text p {
                    margin: 0;
                    color: var(--text-muted);
                    font-size: 0.875rem;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                    margin-bottom: 32px;
                }

                .card {
                    background: var(--card-bg);
                    border-radius: 20px;
                    padding: 24px;
                    border: 1px solid var(--border);
                    box-shadow: var(--shadow);
                }

                .card h2 {
                    font-size: 1.125rem;
                    margin-bottom: 24px;
                    font-weight: 700;
                    color: var(--text-main);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .input-group {
                    margin-bottom: 20px;
                }

                .input-group label {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: var(--text-muted);
                }

                /* Rediseño del Input de Moneda para evitar solapamientos */
                .currency-input-container {
                    display: flex;
                    align-items: center;
                    background: white;
                    border: 1.5px solid var(--border);
                    border-radius: 12px;
                    padding: 0 16px;
                    transition: all 0.2s;
                }

                .currency-input-container:focus-within {
                    border-color: var(--primary);
                    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
                }

                .currency-symbol {
                    font-weight: 700;
                    color: var(--text-muted);
                    margin-right: 12px; /* Espacio garantizado entre el $ y el número */
                    user-select: none;
                }

                .currency-input-container input {
                    border: none !important;
                    background: transparent !important;
                    padding: 12px 0 !important;
                    margin: 0 !important;
                    box-shadow: none !important;
                    flex: 1;
                    font-size: 1rem;
                    color: var(--text-main);
                    width: 100%;
                }

                .currency-input-container input:focus {
                    outline: none;
                }

                input[type="number"], input[type="date"] {
                    width: 100%;
                    padding: 12px 14px;
                    border: 1.5px solid var(--border);
                    border-radius: 12px;
                    font-size: 1rem;
                    transition: all 0.2s;
                    box-sizing: border-box;
                    color: var(--text-main);
                    background-color: white;
                }

                input:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
                }

                .segmented-control {
                    display: flex;
                    background: var(--bg);
                    padding: 4px;
                    border-radius: 12px;
                    border: 1px solid var(--border);
                }

                .segmented-control button {
                    flex: 1;
                    padding: 10px;
                    border: none;
                    background: transparent;
                    font-weight: 600;
                    font-size: 0.875rem;
                    cursor: pointer;
                    border-radius: 8px;
                    transition: all 0.2s;
                    color: var(--text-muted);
                }

                .segmented-control button.active {
                    background: white;
                    color: var(--primary);
                    box-shadow: var(--shadow);
                }

                .options-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                    margin-top: 24px;
                }

                .checkbox-card {
                    display: flex;
                    gap: 12px;
                    padding: 14px;
                    border: 1.5px solid var(--border);
                    border-radius: 14px;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: var(--bg);
                }

                .checkbox-card:hover {
                    border-color: var(--primary);
                }

                .checkbox-card.disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                .checkbox-title {
                    display: block;
                    font-weight: 700;
                    font-size: 0.8125rem;
                    color: var(--text-main);
                }

                .checkbox-desc {
                    display: block;
                    font-size: 0.75rem;
                    color: var(--text-muted);
                }

                .timeline-section h3 {
                    font-size: 0.8125rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--text-muted);
                    margin-bottom: 12px;
                }

                .input-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                .input-group.highlight {
                    background: var(--accent);
                    padding: 12px;
                    border-radius: 12px;
                    border-left: 4px solid var(--primary);
                }

                .info-box {
                    margin-top: 12px;
                    padding: 12px;
                    background: rgba(37, 99, 235, 0.05);
                    border-radius: 8px;
                    font-size: 0.75rem;
                    color: var(--text-main);
                    border: 1px solid rgba(37, 99, 235, 0.1);
                }

                .info-box strong {
                    color: var(--primary);
                    display: block;
                    margin-bottom: 6px;
                    font-size: 0.8rem;
                }

                .info-box ul {
                    margin: 0;
                    padding-left: 16px;
                    color: var(--text-muted);
                }

                .info-box li {
                    margin-bottom: 4px;
                }

                .input-group.hito {
                    border: 2px dashed var(--primary);
                    padding: 12px;
                    border-radius: 12px;
                }

                .actions-bar {
                    text-align: center;
                    margin-bottom: 48px;
                }

                .primary-btn {
                    background: var(--primary);
                    color: white;
                    border: none;
                    padding: 18px 40px;
                    border-radius: 16px;
                    font-size: 1.125rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.4);
                    width: 100%;
                }

                .primary-btn:hover:not(:disabled) {
                    background: var(--primary-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.3);
                }

                .primary-btn:disabled {
                    background: var(--text-muted);
                    box-shadow: none;
                    cursor: not-allowed;
                }

                /* Results Area */
                .results-area {
                    background: white;
                    border-radius: 24px;
                    padding: 32px;
                    box-shadow: var(--shadow-lg);
                    border: 1px solid var(--border);
                    animation: slideUp 0.5s ease-out;
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .results-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                }

                .dashboard-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 24px;
                    margin-bottom: 40px;
                }

                .metric-card {
                    padding: 32px;
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .metric-card.main-total {
                    background: var(--text-main);
                    color: white;
                }

                .metric-card.main-total .label { color: #94a3b8; }
                .metric-card.main-total .value { font-size: 3rem; font-weight: 800; }

                .metric-subcard {
                    padding: 16px;
                    background: var(--bg);
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 12px;
                }

                .metric-subcard.highlight {
                    border-left: 3px solid var(--primary);
                }

                .metric-subcard .label { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
                .metric-subcard .value-sub { font-size: 1.125rem; font-weight: 700; color: var(--text-main); }

                .status-badge {
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    margin-top: 12px;
                    align-self: flex-start;
                }

                .status-badge.success { background: #064e3b; color: #10b981; }

                .export-btns { display: flex; gap: 8px; }
                
                .outline-btn {
                    padding: 10px 20px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 700;
                    transition: all 0.2s;
                    border: none;
                    box-shadow: var(--shadow);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: white;
                }

                .pdf-btn {
                    background: #ef4444; /* Rojo distintivo para PDF */
                }

                .pdf-btn:hover {
                    background: #dc2626;
                    transform: translateY(-1px);
                    box-shadow: var(--shadow-lg);
                }

                .excel-btn {
                    background: #10b981; /* Verde distintivo para Excel */
                }

                .excel-btn:hover {
                    background: #059669;
                    transform: translateY(-1px);
                    box-shadow: var(--shadow-lg);
                }

                /* Breakdown Styles */
                .breakdown-card {
                    margin-bottom: 16px;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    overflow: hidden;
                }

                .breakdown-header {
                    padding: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    background: var(--bg);
                    font-weight: 700;
                }

                .breakdown-title { color: var(--text-main); }
                .breakdown-total { color: var(--primary); }

                .table-wrapper { padding: 16px; }
                table { width: 100%; border-collapse: collapse; }
                th { text-align: left; padding: 12px; border-bottom: 1px solid var(--border); font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; }
                td { padding: 12px; border-bottom: 1px solid #f1f5f9; font-size: 0.875rem; }
                .amount-cell { font-weight: 700; text-align: right; }
                .rate-cell { font-family: monospace; }

                .app-footer {
                    margin-top: 48px;
                    text-align: center;
                    padding-bottom: 40px;
                }

                .disclosure-box {
                    padding: 24px;
                    background: white;
                    border-radius: 16px;
                    border: 1px dashed var(--border);
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    margin-bottom: 16px;
                    text-align: justify;
                }

                .version-tag { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }

                @media (max-width: 800px) {
                    .form-grid, .dashboard-grid { grid-template-columns: 1fr; }
                    .metric-card.main-total .value { font-size: 2rem; }
                }

                @media print {
                    .no-print { display: none !important; }
                    .app-container { padding: 0; margin: 0; width: 100%; }
                    .results-area { box-shadow: none; border: none; }
                }
            `}</style>
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
