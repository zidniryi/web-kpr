import React, {Fragment, useState } from 'react'
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

const Dashboard = () => {
  const [sukuBunga, setsukuBunga] = useState('')
  const [sukuBungaTahun, setsukuBungaTahun] = useState('')
  // const [subsidi, setsubsidi] = useState('')
  const [harga, setharga] = useState(0)
  const [dp, setdp] = useState(0)
  const [lamaTahun, setlamaTahun] = useState(0)
  // const [floatingBunga, setfloatingBunga] = useState('')
  const [schemaInstallmentDetail, setskemaTotalCicilan] = useState([])
  // const [skemaCicilanBulanan, setskemaCicilanBulanan] = useState('')
  const [resultsDataKPR, setresultsDataKPR] = useState([]);
  
  const _calculateEffectiveInterest = () => {
    let propertyPrice = harga;
    let dpProperty = dp;
    let effectiveInterest = sukuBungaTahun;
    let effectiveInterestYear = parseInt(lamaTahun);
    
    let totalPropertyPrice = propertyPrice - dpProperty,
        baseInstallment = 0,
        monthlyInterest = 0,
        totalMonthlyInstallment = 0,
        totalDebtLeft = totalPropertyPrice - totalMonthlyInstallment;

    let monthlySchema = {
      monthNumber: 0,
      baseInstallment: baseInstallment,
      monthlyInterest: monthlyInterest,
      totalMonthlyInstallment: totalMonthlyInstallment,
      totalDebtLeft: totalDebtLeft
    }
    monthlySchema = {
        monthNumber: 0,
        baseInstallment: 0,
        monthlyInterest: 0,
        totalMonthlyInstallment: 0,
        totalDebtLeft: propertyPrice
    }
    schemaInstallmentDetail.push(monthlySchema);
    baseInstallment = totalPropertyPrice / (effectiveInterestYear * 12);
    for (let i = 1; i <= (effectiveInterestYear * 12); ++i) {
        monthlyInterest = totalDebtLeft * ((effectiveInterest/12) / 100);
        totalMonthlyInstallment = baseInstallment + monthlyInterest;
        totalDebtLeft = totalDebtLeft - baseInstallment;
        monthlySchema = {
            monthNumber: i,
            baseInstallment: baseInstallment,
            monthlyInterest: monthlyInterest,
            totalMonthlyInstallment: totalMonthlyInstallment,
            totalDebtLeft: totalDebtLeft
        }
        schemaInstallmentDetail.push(monthlySchema);
    }
    setskemaTotalCicilan(schemaInstallmentDetail);
    setresultsDataKPR(schemaInstallmentDetail);
  }

console.log(resultsDataKPR)
  const _calculateFlatInterest = () => {
    let propertyPrice = harga;
    let dpProperty = dp;
    let flatInterest = sukuBungaTahun;
    let flatInterestYear = parseInt(lamaTahun);
    
    let totalPropertyPrice = propertyPrice - dpProperty,
        baseInstallment = 0,
        monthlyInterest = 0,
        totalMonthlyInstallment = 0,
        totalDebtLeft = totalPropertyPrice - totalMonthlyInstallment;

    let monthlySchema = {
        monthNumber: 0,
        baseInstallment: 0,
        monthlyInterest: 0,
        totalMonthlyInstallment: 0,
        totalDebtLeft: propertyPrice
    }
    schemaInstallmentDetail.push(monthlySchema);
    baseInstallment = totalPropertyPrice / (flatInterestYear * 12);
    monthlyInterest = totalDebtLeft * (flatInterest/12) / 100;
    totalMonthlyInstallment = baseInstallment + monthlyInterest;
    for (let i = 1; i <= (flatInterestYear * 12); ++i) {
        totalDebtLeft = totalDebtLeft - baseInstallment;
        monthlySchema = {
            monthNumber: i,
            baseInstallment: baseInstallment,
            monthlyInterest: monthlyInterest,
            totalMonthlyInstallment: totalMonthlyInstallment,
            totalDebtLeft: totalDebtLeft
        }
        schemaInstallmentDetail.push(monthlySchema);
    }
  setskemaTotalCicilan(schemaInstallmentDetail);
  setresultsDataKPR(schemaInstallmentDetail);
  }


  const calculateKPR = () => {
    if (sukuBunga=="flat") _calculateFlatInterest()
    else _calculateEffectiveInterest()
  }

 const countYears = () => {
    const years = 31;
    let dataYears = []
    for (var i = 0; i < years; i++) {
       dataYears.push(i)
  }
  return dataYears
 }




  const _renderResultBorow = () => {
    return (
      <CCard>
        <CCardHeader component="h5">Data Pinjaman Anda</CCardHeader>
        <CCardBody>
          <CTable>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">Harga KPR</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>Rp {harga}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Uang Muka</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>Rp {dp}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Tenor</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>{lamaTahun} Tahun</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Bunga</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>{sukuBungaTahun}%</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    )
  }

  // const _renderResultKpr = () => {
  //   return (
  //     <CCard>
  //       <CCardHeader component="h5">KPR Anda</CCardHeader>
  //       <CCardBody>
  //         <CTable>
  //           <CTableBody>
  //             <CTableRow>
  //               <CTableHeaderCell scope="row">Plafon Pinjaman</CTableHeaderCell>
  //               <CTableDataCell>:</CTableDataCell>
  //               <CTableDataCell style={{ textAlign: 'left' }}>Rp 400.000.000,00</CTableDataCell>
  //             </CTableRow>
  //             <CTableRow>
  //               <CTableHeaderCell scope="row">Angsuran per Periode</CTableHeaderCell>
  //               <CTableDataCell>:</CTableDataCell>
  //               <CTableDataCell style={{ textAlign: 'left' }}>Rp 6.355.768,43</CTableDataCell>
  //             </CTableRow>
  //             <CTableRow>
  //               <CTableHeaderCell scope="row">Total Periode</CTableHeaderCell>
  //               <CTableDataCell>:</CTableDataCell>
  //               <CTableDataCell style={{ textAlign: 'left' }}>120 bulan</CTableDataCell>
  //             </CTableRow>
  //           </CTableBody>
  //         </CTable>
  //       </CCardBody>
  //     </CCard>
  //   )
  // }

  // const _renderTax = () => {
  //   return (
  //     <CCard>
  //       <CCardHeader component="h5">Biaya & Pajak</CCardHeader>
  //       <CCardBody>
  //         <CTable>
  //           <CTableBody>
  //             <CTableRow>
  //               <CTableHeaderCell scope="row">
  //                 Biaya Provisi <br /> <i>(1.5 % plafon)</i>
  //               </CTableHeaderCell>
  //               <CTableDataCell>:</CTableDataCell>
  //               <CTableDataCell style={{ textAlign: 'left' }}>Rp 6.000.000,00</CTableDataCell>
  //             </CTableRow>
  //             <CTableRow>
  //               <CTableHeaderCell scope="row">Biaya Appraisal</CTableHeaderCell>
  //               <CTableDataCell>:</CTableDataCell>
  //               <CTableDataCell style={{ textAlign: 'left' }}>Rp 500.000,00</CTableDataCell>
  //             </CTableRow>
  //             <CTableRow>
  //               <CTableHeaderCell scope="row">Biaya Administrasi</CTableHeaderCell>
  //               <CTableDataCell>:</CTableDataCell>
  //               <CTableDataCell style={{ textAlign: 'left' }}>Rp 450.000,00</CTableDataCell>
  //             </CTableRow>
  //             <CTableRow>
  //               <CTableHeaderCell scope="row">Total Biaya & Pajak</CTableHeaderCell>
  //               <CTableDataCell>:</CTableDataCell>
  //               <CTableDataCell style={{ textAlign: 'left' }}>Rp 48.450.000,00</CTableDataCell>
  //             </CTableRow>
  //           </CTableBody>
  //         </CTable>
  //       </CCardBody>
  //     </CCard>
  //   )
  // }

  const _renderTables = () => {
    return (
      <CCard>
        <CCardHeader component="h5">Biaya & Pajak</CCardHeader>
        <CCardBody>
          <CTable bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Bulan	</CTableHeaderCell>
                <CTableHeaderCell scope="col">Angsuran Bunga	</CTableHeaderCell>
                <CTableHeaderCell scope="col">Angsuran Pokok	</CTableHeaderCell>
                <CTableHeaderCell scope="col">Total Angsuran	</CTableHeaderCell>
                <CTableHeaderCell scope="col">Sisa pinjaman	</CTableHeaderCell>

              </CTableRow>
            </CTableHead>
            <CTableBody>
              {
                resultsDataKPR.map((data, index) => (
               <CTableRow key={index}>
                <CTableHeaderCell scope="row"><center>{data.monthNumber}</center></CTableHeaderCell>
                <CTableDataCell>
                Rp {data.baseInstallment.toFixed()}</CTableDataCell>
                <CTableDataCell> Rp {data.monthlyInterest}</CTableDataCell>
                <CTableDataCell>Rp {data.totalMonthlyInstallment}</CTableDataCell>
                <CTableDataCell>Rp {data.totalDebtLeft}</CTableDataCell>
              </CTableRow> 
                ))
              }     
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    )
  }

  const _renderPageResult = () => {
  if (resultsDataKPR.length > 0)
  return (
      <div>
        {_renderResultBorow()}
        {/* <hr />
        {_renderResultKpr()} */}
        <hr />
        {/* {_renderTax()}
        <hr/> */}
       {_renderTables()}
      </div>
    )
  }

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
              onChange={(value) => setsukuBunga(value.target.value)}
            >
              <option value="efective">Efektif</option>
              <option value="flat">Flat</option>
            </CFormSelect>
            {/* <hr /> */}
            {/* <b>Jenis Subsidi</b>
            <CFormSelect
              aria-label="Default select example"
              onChange={(value) => setsubsidi(value.target.value)}
            >
              <option value="non-subsidi">Subsidi</option>
              <option value="subsidi">Non Subsidi</option>
            </CFormSelect> */}
            <hr />
            <b>Harga Beli Properti</b>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon1">Rp</CInputGroupText>
              <CFormControl
                placeholder="harga"
                aria-label="harga"
                aria-describedby="basic-addon1"
                type="number"
                onChange={(value) => setharga(value.target.value)}
              />
            </CInputGroup>
            <b>Uang Muka</b>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon1">Rp</CInputGroupText>
              <CFormControl
                placeholder="harga"
                aria-label="harga"
                aria-describedby="basic-addon1"
                type="number"
                onChange={(value) => setdp(value.target.value)}
              />
            </CInputGroup>
            <hr />
            <b>Suku Bunga Per Tahun</b>
            <CInputGroup className="mb-3">
              <CFormControl
                placeholder="Suku bunga"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(value) => setsukuBungaTahun(value.target.value)}
              />
              <CInputGroupText id="basic-addon2">% per tahun</CInputGroupText>
            </CInputGroup>
            <hr />
            <b>Lama Pinjaman</b>
            <CFormSelect
              aria-label="Default select example"
              onChange={(value) => setlamaTahun(value.target.value)}
            >
              {countYears().map((year, index) => (
               <option value={year} key={index}>{year} Tahun</option>
              ))}

            </CFormSelect>
            <hr />
            {/* <b>Masa Kredit Fix</b>
            <CFormSelect aria-label="Default select example">
              <option value="1">1 Tahun</option>
              <option value="2">2 Tahun</option>
              <option value="3">3 Tahun</option>
            </CFormSelect>
            <hr /> */}
            {/* <b>Suku Bunga Floating</b>
            <CInputGroup className="mb-3">
              <CFormControl
                placeholder="Suku bunga floating"
                aria-describedby="basic-addon2"
                onChange={(value) => setfloatingBunga(value.target.value)}
              />
              <CInputGroupText id="basic-addon2">% per tahun</CInputGroupText>
            </CInputGroup>
            <hr /> */}
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