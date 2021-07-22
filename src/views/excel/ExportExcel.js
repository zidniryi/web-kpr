import React from 'react'
import ReactExport from "react-export-excel"


const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

   const dataSet = [
      {
         jeniSukuBunga : "Putri",
         hargaBeliProperty : 17,
          uangMuka: "female",
      sukuBungaFloating : null, 
      lamaPinjaman : null,
      },
       {
         name : "Gilang",
         age : 29,
         gender : "male",
      },
       {
         name : "Rama",
         age : 18,
         gender : "male",
      },
       {
         name : "Aji",
         age : 30,
         gender : "female",
      }
   ]


export default function ExportExcel() {
   return (
   <div>
         <ExcelFile>
            <ExcelSheet data={dataSet} name="Human">
               <ExcelColumn label="nama" value="name"/>
               <ExcelColumn label="umur" value="age"/>
               <ExcelColumn label="jenis kelamin" value="gender"/>
            </ExcelSheet>
         </ExcelFile>
      </div>
   )
}
