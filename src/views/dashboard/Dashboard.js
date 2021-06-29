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
  const [subsidi, setsubsidi] = useState('')
  const [harga, setharga] = useState('')
  const [dp, setdp] = useState('')
  const [lamaTahun, setlamaTahun] = useState('')
  const [floatingBunga, setfloatingBunga] = useState('')

  const _renderResultBorow = () => {
    return (
      <CCard>
        <CCardHeader component="h5">Data Pinjaman Anda</CCardHeader>
        <CCardBody>
          <CTable>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">Data Nama</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>Rp 50000000</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Uang Muka</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>Rp 100.000.000,00</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Tenor</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>10 tahun</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Bunga</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>14.6 % / tahun</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    )
  }

  const _renderResultKpr = () => {
    return (
      <CCard>
        <CCardHeader component="h5">KPR Anda</CCardHeader>
        <CCardBody>
          <CTable>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">Plafon Pinjaman</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>Rp 400.000.000,00</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Angsuran per Periode</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>Rp 6.355.768,43</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Total Periode</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>120 bulan</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    )
  }

  const _renderTax = () => {
    return (
      <CCard>
        <CCardHeader component="h5">Biaya & Pajak</CCardHeader>
        <CCardBody>
          <CTable>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">
                  Biaya Provisi <br /> <i>(1.5 % plafon)</i>
                </CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>Rp 6.000.000,00</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Biaya Appraisal</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>Rp 500.000,00</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Biaya Administrasi</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>Rp 450.000,00</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">Total Biaya & Pajak</CTableHeaderCell>
                <CTableDataCell>:</CTableDataCell>
                <CTableDataCell style={{ textAlign: 'left' }}>Rp 48.450.000,00</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    )
  }

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
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>Mark</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>@mdo</CTableDataCell>
                <CTableDataCell>@mdo</CTableDataCell>


              </CTableRow>
              <CTableRow>
                <CTableHeaderCell scope="row">2</CTableHeaderCell>
                <CTableDataCell>Jacob</CTableDataCell>
                <CTableDataCell>Thornton</CTableDataCell>
                <CTableDataCell>@mdo</CTableDataCell>
                <CTableDataCell>@fat</CTableDataCell>
              </CTableRow>
      
            </CTableBody>
          </CTable>
        </CCardBody>
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
        <hr />
        {/* Here Result */}
        {_renderResultBorow()}
        <hr />
        {_renderResultKpr()}
        <hr />
        {_renderTax()}
        <hr/>
       {_renderTables()}
        
      </Fragment>
    </>
  )
}

export default Dashboard
