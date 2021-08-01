import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import PropTypes from 'prop-types'

const COL_MONTH_WIDTH = 10
const COL_WIDTH = (100 - COL_MONTH_WIDTH) / 4

const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: COL_WIDTH + '%',
    backgroundColor: '#dee9fc',
  },
  tableColLight: {
    width: COL_WIDTH + '%',
    backgroundColor: '#f1f8fa',
  },
  tableColHead: {
    width: COL_WIDTH + '%',
    backgroundColor: '#212951',
    color: '#fff',
    paddingVertical: 8,
  },
  tableCellHeader: {
    margin: 'auto',
    fontSize: 12,
    fontWeight: 700,
    padding: 3,
  },
  tableCell: {
    margin: 'auto',
    fontSize: 10,
    padding: 3,
    paddingVertical: 8,
  },
  colMonth: {
    width: COL_MONTH_WIDTH + '%',
    backgroundColor: '#dee9fc',
  },
  coloMonthHead: {
    width: COL_MONTH_WIDTH + '%',
    backgroundColor: '#212951',
    color: '#fff',
  },

  tableDataLoan: {
    display: 'flex',
    width: 'auto',
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },

  rowDataLoan: {
    margin: 'auto',
    flexDirection: 'row',
  },

  colDataLoan: {
    width: '50%',
    backgroundColor: '#dee9fc',
  },

  colDataLoanLight: {
    width: '50%',
    backgroundColor: '#f1f8fa',
  },
  colDataLoanHead: {
    width: '50%',
    backgroundColor: '#212951',
    color: '#fff',
  },
})

const formatData = (data) => {
  return parseFloat(data).toLocaleString('id-ID', { minimumFractionDigits: 2 }).slice(0, -2) + '00'
}

const maxFloat = parseFloat(1).toFixed(2)

function PdfDoc({ dataInstallment, dataLoan }) {
  console.log(dataLoan)
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={{ marginBottom: 10 }}> Rincian Pinjaman </Text>
        <View style={styles.tableDataLoan}>
          <View style={styles.rowDataLoan}>
            <View style={styles.colDataLoanHead}>
              <Text style={styles.tableCell}>Nama</Text>
            </View>
            <View style={styles.colDataLoanHead}>
              <Text style={styles.tableCell}>Value</Text>
            </View>
          </View>

          <View style={styles.rowDataLoan}>
            <View style={styles.colDataLoan}>
              <Text style={styles.tableCell}>Harga Property</Text>
            </View>
            <View style={styles.colDataLoan}>
              <Text style={styles.tableCell}>{dataLoan.hargaProperty}</Text>
            </View>
          </View>
          <View style={styles.rowDataLoan}>
            <View style={styles.colDataLoanLight}>
              <Text style={styles.tableCell}>Uang Muka</Text>
            </View>
            <View style={styles.colDataLoanLight}>
              <Text style={styles.tableCell}>{dataLoan.uangMuka}</Text>
            </View>
          </View>
          <View style={styles.rowDataLoan}>
            <View style={styles.colDataLoan}>
              <Text style={styles.tableCell}>Tenor</Text>
            </View>
            <View style={styles.colDataLoan}>
              <Text style={styles.tableCell}>{dataLoan.tenor}</Text>
            </View>
          </View>
          <View style={styles.rowDataLoan}>
            <View style={styles.colDataLoanLight}>
              <Text style={styles.tableCell}>Bunga</Text>
            </View>
            <View style={styles.colDataLoanLight}>
              <Text style={styles.tableCell}>{dataLoan.bunga}</Text>
            </View>
          </View>
          <View style={styles.rowDataLoan}>
            <View style={styles.colDataLoan}>
              <Text style={styles.tableCell}>Biaya Asuransi</Text>
            </View>
            <View style={styles.colDataLoan}>
              <Text style={styles.tableCell}>{dataLoan.biayaAsuransi}</Text>
            </View>
          </View>
          <View style={styles.rowDataLoan}>
            <View style={styles.colDataLoanLight}>
              <Text style={styles.tableCell}>Biaya Admin</Text>
            </View>
            <View style={styles.colDataLoanLight}>
              <Text style={styles.tableCell}>{dataLoan.biayaAdmin}</Text>
            </View>
          </View>
          <View style={styles.rowDataLoan}>
            <View style={styles.colDataLoan}>
              <Text style={styles.tableCell}>Angsuran Perbulan</Text>
            </View>
            <View style={styles.colDataLoan}>
              <Text style={styles.tableCell}>{dataLoan.angsuranPerbulan}</Text>
            </View>
          </View>
          <View style={styles.rowDataLoan}>
            <View style={styles.colDataLoanLight}>
              <Text style={styles.tableCell}>Pembayaran Pertama</Text>
            </View>
            <View style={styles.colDataLoanLight}>
              <Text style={styles.tableCell}>{dataLoan.pembayaranPertama}</Text>
            </View>
          </View>
        </View>

        <Text style={{ marginVertical: 10 }}>Detail Angsuran</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.coloMonthHead}>
              <Text style={styles.tableCellHeader}>Bulan</Text>
            </View>
            <View style={styles.tableColHead}>
              <Text style={styles.tableCellHeader}>Angsuran</Text>
            </View>
            <View style={styles.tableColHead}>
              <Text style={styles.tableCellHeader}>Bunga</Text>
            </View>
            <View style={styles.tableColHead}>
              <Text style={styles.tableCellHeader}>Pokok</Text>
            </View>
            <View style={styles.tableColHead}>
              <Text style={styles.tableCellHeader}>Sisa Pinjaman</Text>
            </View>
          </View>
          {dataInstallment
            ? dataInstallment.map((item, index) => {
                return (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.colMonth}>
                      <Text style={styles.tableCell}>{item.monthNumber.toString()}</Text>
                    </View>
                    <View style={styles.tableColLight}>
                      <Text style={styles.tableCell}>
                        Rp. {formatData(item.monthlyInterest.toFixed(2))}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        Rp. {formatData(item.baseInstallment.toFixed(2))}
                      </Text>
                    </View>
                    <View style={styles.tableColLight}>
                      <Text style={styles.tableCell}>
                        Rp. {formatData(item.totalMonthlyInstallment.toFixed(2))}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        Rp.{' '}
                        {item.totalDebtLeft < maxFloat
                          ? '0,00'
                          : parseFloat(item.totalDebtLeft)
                              .toLocaleString('id-ID', { minimumFractionDigits: 2 })
                              .slice(0, -2) + '00'}
                      </Text>
                    </View>
                  </View>
                )
              })
            : ''}
        </View>
      </Page>
    </Document>
  )
}

PdfDoc.propTypes = {
  dataInstallment: PropTypes.array,
  dataLoan: PropTypes.object,
}

export default PdfDoc