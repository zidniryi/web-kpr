import React, { lazy, Fragment, useState } from 'react'

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
} from '@coreui/react'

const Dashboard = () => {
  const [sukuBunga, setsukuBunga] = useState('')
  const [sukuBungaTahun, setsukuBungaTahun] = useState('')
  const [subsidi, setsubsidi] = useState('')
  const [harga, setharga] = useState('')
  const [dp, setdp] = useState('')
  const [lamaTahun, setlamaTahun] = useState('')
  const [floatingBunga, setfloatingBunga] = useState('')

  const _renderResult = () => {
    return (
      <CCard style={{ width: '18rem' }}>
        <CCardHeader>Header</CCardHeader>
      </CCard>
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
              <option value="anuitas">Anuitas</option>
              <option value="flat">Flat</option>
            </CFormSelect>
            <hr />
            <b>Jenis Subsidi</b>
            <CFormSelect
              aria-label="Default select example"
              onChange={(value) => setsubsidi(value.target.value)}
            >
              <option value="non-subsidi">Subsidi</option>
              <option value="subsidi">Non Subsidi</option>
            </CFormSelect>
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
              <option value="1">1 Tahun</option>
              <option value="2">2 Tahun</option>
              <option value="3">3 Tahun</option>
            </CFormSelect>
            <hr />
            <b>Masa Kredit Fix</b>
            <CFormSelect aria-label="Default select example">
              <option value="1">1 Tahun</option>
              <option value="2">2 Tahun</option>
              <option value="3">3 Tahun</option>
            </CFormSelect>
            <hr />
            <b>Suku Bunga Floating</b>
            <CInputGroup className="mb-3">
              <CFormControl
                placeholder="Suku bunga floating"
                aria-describedby="basic-addon2"
                onChange={(value) => setfloatingBunga(value.target.value)}
              />
              <CInputGroupText id="basic-addon2">% per tahun</CInputGroupText>
            </CInputGroup>
            <hr />
            {/* <CButton href="#">Hitung</CButton>
             <CButton color="primary">Button</CButton> */}
            <div className="d-grid gap-2">
              <CButton
                onClick={() => alert('Helo')}
                color="primary"
                disabled={
                  sukuBunga &&
                  sukuBungaTahun &&
                  subsidi &&
                  harga &&
                  dp &&
                  lamaTahun &&
                  floatingBunga
                    ? false
                    : true
                }
              >
                Hitung
              </CButton>
            </div>
          </CCardBody>
        </CCard>

        {/* Here Result */}
      </Fragment>
    </>
  )
}

export default Dashboard
