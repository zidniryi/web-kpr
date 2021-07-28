import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer"
import PropTypes from "prop-types"

const COL_MONTH_WIDTH = 10
const COL_WIDTH = (100 - COL_MONTH_WIDTH) / 4

const styles = StyleSheet.create({
  body: {
    padding: 20
  },
  table: {
    display: "table",
    width: "auto",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableCol: {
    width: COL_WIDTH + "%",
    backgroundColor: "#dee9fc"
  },
  tableColLight: {
    width: COL_WIDTH + "%",
    backgroundColor: "#f1f8fa"
  },
  tableColHead: {
    width: COL_WIDTH + "%",
    backgroundColor: "#212951",
    color: "#fff",
    paddingVertical: 8,
  },
  tableCellHeader: {
    margin: "auto",
    fontSize: 12,
    fontWeight: 700,
    padding: 3
  },
  tableCell: {
    margin: "auto",
    fontSize: 10,
    padding: 3,
    paddingVertical: 8,
  },
  colMonth: {
    width: COL_MONTH_WIDTH + "%",
    backgroundColor: "#dee9fc"
  },
  coloMonthHead: {
    width: COL_MONTH_WIDTH + "%",
    backgroundColor: "#212951",
    color: "#fff"
  }
});

const formatData = (data) => {
  return parseFloat(data).toLocaleString("id-ID", { minimumFractionDigits: 2 }).slice(0, -2) + "00"
}

const maxFloat = parseFloat(1).toFixed(2)

function PdfDoc({ data }) {
  return (
    <Document>
      <Page style={styles.body}>
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
          {data ? data.map((item, index) => {
            return (
              <View style={styles.tableRow} key={index}>
                <View style={styles.colMonth}>
                  <Text style={styles.tableCell}>{item.monthNumber.toString()}</Text>
                </View>
                <View style={styles.tableColLight}>
                  <Text style={styles.tableCell}>Rp. {formatData(item.monthlyInterest.toFixed(2))}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Rp. {formatData(item.baseInstallment.toFixed(2))}</Text>
                </View>
                <View style={styles.tableColLight}>
                  <Text style={styles.tableCell}>Rp. {formatData(item.totalMonthlyInstallment.toFixed(2))}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Rp. {item.totalDebtLeft < maxFloat ? "0,00" : parseFloat(item.totalDebtLeft)
                    .toLocaleString("id-ID", { minimumFractionDigits: 2 }).slice(0, -2) + "00"
                  }</Text>
                </View>
              </View>
            )
          }) : ""
          }
        </View>
      </Page>
    </Document>
  )
}

PdfDoc.propTypes = {
  data: PropTypes.array
}

export default PdfDoc