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
  

const countPMT = (princ, terms, intr) => {
   var princ = princ
   var term  = terms
   var intr   = intr / 1200;
   var cicilan = princ * intr / (1 - (Math.pow(1/(1 + intr), term)));
   var res = parseFloat(cicilan).toFixed(2);
   return res

}

  const _calculateAnuitasInterest = () => {
    let propertyPrice = harga;
    let dpProperty = dp/100 * harga;
    // Left price 500 jt - dp
    let currentValueProperty = harga - dpProperty
    const longMonthInstalemnt = lamaTahun * 12

    let flatInterest = sukuBungaTahun / 12;
    let flatInterestYear = parseInt(lamaTahun);
    
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
   baseInstallment = sukuBungaTahun/12 * currentValueProperty / 100;
    monthlyInterest = totalDebtLeft * (flatInterest/12) / 100;
    totalMonthlyInstallment = baseInstallment + monthlyInterest;
    for (let i = 1; i <= (flatInterestYear * 12); ++i) {
        const finalScheme = schemaInstallmentDetail[i - 1].totalDebtLeft
        let totalMain =  countPMT(currentValueProperty, longMonthInstalemnt, sukuBungaTahun) - sukuBungaTahun/12 * finalScheme / 100
        totalDebtLeft = totalDebtLeft - totalMain;
         
        console.log(i-1)
        console.log()
        monthlySchema = {
            monthNumber: i,
            monthlyInterest: parseFloat(countPMT(currentValueProperty, longMonthInstalemnt, sukuBungaTahun)),
            baseInstallment: parseFloat(sukuBungaTahun/12 * finalScheme / 100),
            totalMonthlyInstallment: parseFloat(totalMain),
            totalDebtLeft: parseFloat(totalDebtLeft).toFixed(2)
        }

        
        schemaInstallmentDetail.push(monthlySchema);
        console.log(schemaInstallmentDetail)

    }



  setskemaTotalCicilan(schemaInstallmentDetail);
  setresultsDataKPR(schemaInstallmentDetail);
  }


  // const calculateKPR = () => {
  //   if (sukuBunga=="flat") _calculateFlatInterest()
  //   else _calculateEffectiveInterest()
  // }

  const calculateKPR = () => {
    _calculateAnuitasInterest()
  }


 const countYears = () => {
    const years = 23;
    let dataYears = []
    for (var i = 0; i < years; i++) {
       dataYears.push(i)
  }
  return dataYears
 }




  const _renderResultBorow = () => {
    const interesetMontly = sukuBungaTahun/12
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
                <CTableDataCell style={{ textAlign: 'left' }}>Rp {dp/100 * harga}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Tenor</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>{lamaTahun} Tahun</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Bunga</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>{sukuBungaTahun}% Tahun / {interesetMontly.toFixed(2)}% Bulan</CTableDataCell>
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
   const maxFloat = parseFloat(1).toFixed(2)

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
                <CTableDataCell> Rp {data.monthlyInterest}</CTableDataCell>
                <CTableDataCell>
                Rp {data.baseInstallment.toFixed(2)}</CTableDataCell>
                <CTableDataCell>Rp {data.totalMonthlyInstallment.toFixed(2)}</CTableDataCell>
                <CTableDataCell>Rp { data.totalDebtLeft < maxFloat ? 0 : data.totalDebtLeft.toLocaleString('id')  }</CTableDataCell>
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
              {/* <option value="efective">Efektif</option>
              <option value="flat">Flat</option> */}
              <option value="flat">Anuitas</option>
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
                placeholder="Harga Properti"
                aria-label="harga"
                aria-describedby="basic-addon1"
                // type="number"
                // min="0"
                onChange={(value) => setharga(value.target.value)}
              />
            </CInputGroup>
            <hr/>
            <b>Uang Muka</b>
            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon1">%</CInputGroupText>
              <CFormControl
                placeholder="Dalam persen"
                aria-label="harga"
                aria-describedby="basic-addon1"
                // type="number"
                // min="0"
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