import React, { Fragment, useState } from 'react'
import '@coreui/react'
import {
  CButton,
  CCard,
  CCardBody,
  CFormControl,
  CInputGroupText,
  CCardHeader,
  CInputGroup,
  CCardText,
  CCardTitle,
  CFormSelect,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

import CurrencyInput from 'react-currency-input-field'
import ReactExport from "react-export-excel"
import PdfDoc from './pdfDoc'
import { PDFDownloadLink } from "@react-pdf/renderer";

const Dashboard = () => {
  const [interestType, setinterestType] = useState('')
  const [yearlyInterestReturn, setyearlyInterestReturn] = useState('')
  const [harga, setharga] = useState(0)
  const [dp, setdp] = useState(0)
  const [longYear, setlongYear] = useState(0)
  const [asurance, setAsurance] = useState(0)
  const [schemaInstallmentDetail, setschemaInstallmentDetail] = useState([])
  const [resultsDataKPR, setresultsDataKPR] = useState([]);
  // For float
  const [floatInterest, setfloatInterest] = useState(0)
  const [floatYears, setfloatYears] = useState(0)

  // PMT Formule
  const countPMT = (princ, terms, intr) => {
    var princ = princ
    var term = terms
    var intr = intr / 1200;
    var cicilan = princ * intr / (1 - (Math.pow(1 / (1 + intr), term)));
    var res = parseFloat(cicilan).toFixed(2);
    return res

  }

  // Annaual interest
  const _calculateAnuitasInterest = () => {
    // setNullData()
    let propertyPrice = harga;
    let dpProperty = dp / 100 * harga;
    // Left price 500 jt - dp
    let currentValueProperty = harga - dpProperty
    const longMonthInstalemnt = longYear * 12
    let flatInterest = yearlyInterestReturn / 12;

    let flatInterestYear = parseInt(longYear);

    let totalPropertyPrice = propertyPrice - dpProperty,
      monthlyInterest = 0,
      baseInstallment = 0,
      totalMonthlyInstallment = 0,
      totalDebtLeft = totalPropertyPrice - totalMonthlyInstallment;

    let monthlySchema = {
      monthNumber: 0,
      monthlyInterest: 0,
      baseInstallment: 0,
      totalMonthlyInstallment: 0,
      totalDebtLeft: currentValueProperty
    }
    schemaInstallmentDetail.push(monthlySchema);
    baseInstallment = yearlyInterestReturn / 12 * currentValueProperty / 100;
    monthlyInterest = totalDebtLeft * (flatInterest / 12) / 100;
    totalMonthlyInstallment = baseInstallment + monthlyInterest;
    for (let i = 1; i <= (flatInterestYear * 12); ++i) {
      const finalScheme = schemaInstallmentDetail[i - 1].totalDebtLeft
      let totalMain = countPMT(currentValueProperty, longMonthInstalemnt, yearlyInterestReturn) - yearlyInterestReturn / 12 * finalScheme / 100
      totalDebtLeft = totalDebtLeft - totalMain;

      monthlySchema = {
        monthNumber: i,
        monthlyInterest: parseFloat(countPMT(currentValueProperty, longMonthInstalemnt, yearlyInterestReturn)),
        baseInstallment: parseFloat(yearlyInterestReturn / 12 * finalScheme / 100),
        totalMonthlyInstallment: parseFloat(totalMain),
        totalDebtLeft: parseFloat(totalDebtLeft).toFixed(2)
      }
      schemaInstallmentDetail.push(monthlySchema);
    }

    setschemaInstallmentDetail(schemaInstallmentDetail);
    setresultsDataKPR(schemaInstallmentDetail);
  }

  // Mix interest
  const _calculateMixInterest = () => {
    // setNullData()
    let propertyPrice = harga;
    let dpProperty = dp / 100 * harga;
    let currentValueProperty = harga - dpProperty
    const longInstalmentMix = floatYears * 12
    const longMonthInstalemnt = longYear * 12
    const longResMinus = longMonthInstalemnt - longInstalmentMix

    let flatInterest = yearlyInterestReturn / 12;
    let flatInterestYear = parseInt(longYear);

    let totalPropertyPrice = propertyPrice - dpProperty,
      monthlyInterest = 0,
      baseInstallment = 0,
      totalMonthlyInstallment = 0,
      totalDebtLeft = totalPropertyPrice - totalMonthlyInstallment;

    let monthlySchema = {
      monthNumber: 0,
      monthlyInterest: 0,
      baseInstallment: 0,
      totalMonthlyInstallment: 0,
      totalDebtLeft: currentValueProperty
    }
    schemaInstallmentDetail.push(monthlySchema)
    baseInstallment = yearlyInterestReturn / 12 * currentValueProperty / 100;
    monthlyInterest = totalDebtLeft * (flatInterest / 12) / 100;
    totalMonthlyInstallment = baseInstallment + monthlyInterest;
    for (let i = 1; i <= (flatInterestYear * 12); ++i) {
      const mixCurrentValue = i >= parseInt(longInstalmentMix) ? parseInt(schemaInstallmentDetail[longInstalmentMix]?.totalDebtLeft) : " "

      const finalScheme = schemaInstallmentDetail[i - 1].totalDebtLeft
      let totalMain = i <= longInstalmentMix ? countPMT(currentValueProperty, longMonthInstalemnt, floatInterest) - floatInterest / 12 * finalScheme / 100 : countPMT(mixCurrentValue, longResMinus, yearlyInterestReturn) - yearlyInterestReturn / 12 * finalScheme / 100
      totalDebtLeft = totalDebtLeft - totalMain;

      monthlySchema = {
        monthNumber: i,
        monthlyInterest: i <= longInstalmentMix ? parseFloat(countPMT(currentValueProperty, longMonthInstalemnt, floatInterest)) : parseFloat(countPMT(mixCurrentValue, longResMinus, yearlyInterestReturn)),
        baseInstallment: i <= longInstalmentMix ? parseFloat(floatInterest / 12 * finalScheme / 100) : parseFloat(yearlyInterestReturn / 12 * finalScheme / 100),
        totalMonthlyInstallment: parseFloat(totalMain),
        totalDebtLeft: parseFloat(totalDebtLeft).toFixed(2)
      }
      schemaInstallmentDetail.push(monthlySchema);
    }

    setschemaInstallmentDetail(schemaInstallmentDetail);
    setresultsDataKPR(schemaInstallmentDetail);
  }


  // serbaguna interest
  const _calculateSerbaguna = () => {
    // setNullData()
    let propertyPrice = harga;
    let dpProperty = dp / 100 * harga;
    // Left price 500 jt - dp
    const longMonthInstalemnt = longYear * 12
    let flatInterest = yearlyInterestReturn / 12;

    let flatInterestYear = parseInt(longYear);

    let totalPropertyPrice = propertyPrice - dpProperty,
      monthlyInterest = 0,
      baseInstallment = 0,
      totalMonthlyInstallment = 0,
      totalDebtLeft = totalPropertyPrice - totalMonthlyInstallment;

    let monthlySchema = {
      monthNumber: 0,
      monthlyInterest: 0,
      baseInstallment: 0,
      totalMonthlyInstallment: 0,
      totalDebtLeft: harga
    }
    schemaInstallmentDetail.push(monthlySchema);
    baseInstallment = yearlyInterestReturn / 12 * harga / 100;
    monthlyInterest = totalDebtLeft * (flatInterest / 12) / 100;
    totalMonthlyInstallment = baseInstallment + monthlyInterest;
    for (let i = 1; i <= (flatInterestYear * 12); ++i) {
      const finalScheme = schemaInstallmentDetail[i - 1].totalDebtLeft
      let totalMain = countPMT(harga, longMonthInstalemnt, yearlyInterestReturn) - yearlyInterestReturn / 12 * finalScheme / 100
      totalDebtLeft = totalDebtLeft - totalMain;

      monthlySchema = {
        monthNumber: i,
        monthlyInterest: parseFloat(countPMT(harga, longMonthInstalemnt, yearlyInterestReturn)),
        baseInstallment: parseFloat(yearlyInterestReturn / 12 * harga / 100),
        totalMonthlyInstallment: parseFloat(totalMain),
        totalDebtLeft: parseFloat(totalDebtLeft).toFixed(2)
      }
      schemaInstallmentDetail.push(monthlySchema);
    }

    setschemaInstallmentDetail(schemaInstallmentDetail);
    setresultsDataKPR(schemaInstallmentDetail);
  }


  const setNullData = () => {
    setresultsDataKPR([])
    setschemaInstallmentDetail([])
  }

  const calculateKPR = () => {
    if (interestType === 'mix') _calculateMixInterest()
    else if (interestType === 'flat') _calculateAnuitasInterest()
    else if (interestType === 'serbaguna') _calculateSerbaguna()
  }

  // For list years
  const countYears = () => {
    const years = 16;
    let dataYears = []
    for (var i = 0; i < years; i++) {
      dataYears.push(i)
    }
    return dataYears
  }

  const _renderResultBorow = () => {

    const interesetMontly = yearlyInterestReturn / 12
    const monthlyInstallment = resultsDataKPR[1].monthlyInterest
    const adminCost = 5 * (harga - (dp / 100 * harga)) / 100
    const firstPayment = parseFloat(asurance) + parseFloat(adminCost) + parseFloat(monthlyInstallment.toFixed(2))
    
    return (
      <CCard>
        <CCardHeader component="h5">Rincian Pinjaman</CCardHeader>
        <CCardBody>
          <CTable>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">Harga Properti</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>Rp {parseFloat(harga).toLocaleString("id-ID")}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Uang Muka</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>Rp {parseFloat(dp / 100 * harga).toLocaleString("id-ID")} </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Tenor</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>{longYear} Tahun / {longYear * 12} Bulan</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Bunga</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>{yearlyInterestReturn}% Tahun / {interesetMontly.toFixed(2)}% Bulan</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Biaya Asuransi</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}> Rp {parseFloat(asurance).toLocaleString("id-ID")} </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Biaya Admin</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}> Rp {parseFloat(adminCost).toLocaleString("id-ID")} </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Angsuran Perbulan</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>
                  Rp {parseFloat(monthlyInstallment.toFixed(2)).toLocaleString("id-ID")}
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Pembayaran Pertama</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>
                  Rp {(firstPayment).toLocaleString("id-ID")}
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    )
  }


  const _renderTables = () => {

    const maxFloat = parseFloat(1).toFixed(2)
    const ExcelFile = ReactExport.ExcelFile
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

    const formatData = (data) => {
      return parseFloat(data).toLocaleString("id-ID", { minimumFractionDigits: 2 }).slice(0, -2) + "00"
    }

    return (
      <CCard>
        <CCardHeader component="h5">Biaya & Pajak</CCardHeader>
        <CCardBody>
          <CTable bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Bulan	</CTableHeaderCell>
                <CTableHeaderCell scope="col">Angsuran	</CTableHeaderCell>
                <CTableHeaderCell scope="col">Bunga	</CTableHeaderCell>
                <CTableHeaderCell scope="col">Pokok	</CTableHeaderCell>
                <CTableHeaderCell scope="col">Sisa pinjaman	</CTableHeaderCell>

              </CTableRow>
            </CTableHead>
            <CTableBody>
              {
                resultsDataKPR.map((data, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row"><center>{data.monthNumber}</center></CTableHeaderCell>
                    <CTableDataCell> Rp {parseFloat(data.monthlyInterest.toFixed(2)).toLocaleString("id-ID")}</CTableDataCell>
                    <CTableDataCell>
                      Rp {parseFloat(data.baseInstallment.toFixed(2)).toLocaleString("id-ID")}</CTableDataCell>
                    <CTableDataCell>Rp {parseFloat(data.totalMonthlyInstallment.toFixed(2)).toLocaleString("id-ID")}</CTableDataCell>
                    <CTableDataCell>Rp {data.totalDebtLeft < maxFloat ? 0 : parseFloat(data.totalDebtLeft).toLocaleString("id-ID")}</CTableDataCell>
                  </CTableRow>
                ))
              }
            </CTableBody>
          </CTable>

          <ExcelFile filename="Biaya dan Pajak KPR" element={<CButton color="primary"> Download Excel </CButton>}>
            <ExcelSheet data={resultsDataKPR} name="Result Data KPR">
              <ExcelColumn label="Bulan" value={(col) => col.monthNumber} />
              <ExcelColumn label="Angsuran" value={(col) => formatData(col.monthlyInterest.toFixed(2))} />
              <ExcelColumn label="Bunga" value={(col) => formatData(col.baseInstallment.toFixed(2))} />
              <ExcelColumn label="Pokok" value={(col) => formatData(col.totalMonthlyInstallment.toFixed(2))} />
              <ExcelColumn label="Sisa Pinjaman" value={(col) => {
                return col.totalDebtLeft < maxFloat ? "0,00" : parseFloat(col.totalDebtLeft)
                  .toLocaleString("id-ID", { minimumFractionDigits: 2 }).slice(0, -2) + "00"
              }} />
            </ExcelSheet>
          </ExcelFile>
          {resultsDataKPR ?
            <CButton color="info" style={{ marginLeft: 10 }} >
              <PDFDownloadLink document={<PdfDoc data={resultsDataKPR} />}
                fileName="Biaya dan Pajak KPR.pdf"
                style={{
                  textDecoration: "none",
                  color: "#fff"
                }}
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download Pdf"
                }
              </PDFDownloadLink>
            </CButton> : null}
        </CCardBody>
      </CCard>
    )
  }


  const _renderPageResult = () => {
    if (resultsDataKPR.length > 0)
      return (
        <div>
          {_renderResultBorow()}
          <hr />
          {_renderTables()}
        </div>
      )
  }

  const _renderMix = () => {
    if (interestType === 'mix') {
      return (
        <Fragment>
          <hr />
          <b>Suku Bunga FIX</b>
          <CInputGroup className="mb-3">
            <CFormControl
              placeholder="Suku bunga flat"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(value) => setfloatInterest(value.target.value)}
            />
            <CInputGroupText id="basic-addon2">% per tahun</CInputGroupText>
          </CInputGroup>
          <hr />
          <b>Masa Kredit FIX</b>
          <CFormSelect
            aria-label="Default select example"
            onChange={(value) => setfloatYears(value.target.value)}
          >
            {countYears().map((year, index) => (
              <option value={year} key={index}>{year} Tahun</option>
            ))}

          </CFormSelect>
          <hr />
        </Fragment>
      )
    }
  }

  let dpProperty = dp / 100 * harga;
  return (
    <>
      <Fragment>
        <CCard>
          <CCardHeader component="h5">Hitung KPR</CCardHeader>
          <CCardBody>
            <CCardTitle>Simulasi KPR</CCardTitle>
            <CCardText>Simulasikan KPR Anda dengan cepat, aman dan jelas</CCardText>
            <hr />
            <b>Jenis Suku Bunga</b>
            <CFormSelect
              aria-label="Default select example"
              onChange={(value) => setinterestType(value.target.value)}
            >
              {/* <option value="efective">Efektif</option>
              <option value="flat">Flat</option> */}
              <option value="">Pilih Jenis Bunga</option>
              <option value="flat">Anuitas</option>
              <option value="mix">Mix</option>
              <option value="serbaguna">Serba Guna</option>
            </CFormSelect>
            <hr />
            <b>Harga Beli Properti</b>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon1">Rp</CInputGroupText>
              {/* <CFormControl
                placeholder="Harga Properti"
                aria-label="harga"
                aria-describedby="basic-addon1"
                type="number"
                min="0"
                value={harga}
                onChange={(value) => setharga(value.target.value)}
              /> */}
              <CurrencyInput
                id="input-example"
                name="input-name"
                placeholder="Harga Properti"
                defaultValue={harga}
                decimalsLimit={2}
                onValueChange={(value, name) => {
                  setharga(value)
                }}
                style={{ width: '94.5%', borderColor: '#D8DBE0', borderWidth: 1, borderRadius: 5 }}
              />
            </CInputGroup>
            <hr />
            <b>Uang Muka</b>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon1">%</CInputGroupText>
              <CFormControl
                placeholder="Dalam persen"
                aria-label="harga"
                aria-describedby="basic-addon1"
                onChange={(value) => setdp(value.target.value)}
              />
              {/* <CFormControl
                placeholder="Total dalam rupiah"
                aria-label="harga"
                aria-describedby="basic-addon1"
                readOnly
                value={`Rp ${dpProperty.toLocaleString("id-ID")}`}
              /> */}
              <CInputGroupText id="basic-addon1" style={{ marginLeft: '1%', borderWidth: 0 }}>Rp</CInputGroupText>
              <CurrencyInput
                id="input-example"
                name="input-name"
                placeholder="Total dalam rupiah"
                defaultValue={0}
                value={dpProperty}
                decimalsLimit={2}
                readOnly
                style={{ width: '54.5%', backgroundColor: '#D8DBE0', borderWidth: 0, borderRadius: 1 }}
              />
            </CInputGroup>
            <hr />
            <b>Suku Bunga {interestType === 'serbaguna' ? "" : "Floating"} </b>
            <CInputGroup className="mb-3">
              <CFormControl
                placeholder="Suku bunga"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(value) => setyearlyInterestReturn(value.target.value)}
              />
              <CInputGroupText id="basic-addon2">% per tahun</CInputGroupText>
            </CInputGroup>
            <hr />
            <b>Lama Pinjaman</b>
            <CFormSelect
              aria-label="Default select example"
              onChange={(value) => setlongYear(value.target.value)}
            >
              {countYears().map((year, index) => (
                <option value={year} key={index}>{year} Tahun</option>
              ))}

            </CFormSelect>
            <hr />
            <b>Asuransi</b>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon1">Rp</CInputGroupText>
              <CurrencyInput
                id="input-example"
                name="input-name"
                placeholder="Harga Properti"
                defaultValue={asurance}
                decimalsLimit={2}
                onValueChange={(value, name) => {
                  setAsurance(value)
                }}
                style={{ width: '94.5%', borderColor: '#D8DBE0', borderWidth: 1, borderRadius: 5 }}
              />
            </CInputGroup>
            <hr />
            {_renderMix()}
            <div className="d-grid gap-2">
              <CButton
                onClick={calculateKPR}
                color="primary"
              >
                Hitung
              </CButton>
            </div>
          </CCardBody>
        </CCard>
        <hr />
        {_renderPageResult()}
      </Fragment>
    </>
  )
}

export default Dashboard