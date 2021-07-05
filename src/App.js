import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";

const EXTENSIONS = ['xlsx', 'xls', 'csv']
function App() {
  const [items, setItems] = useState([]);

  
  const getExtension=(file)=>{
    // console.log(file)
    const parts = file.name.split('.')
    const extension = parts[parts.length-1]
    // console.log(extension)
    return EXTENSIONS.includes(extension)
    }

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();

     if(file){
      if(getExtension(file)){
        fileReader.readAsArrayBuffer(file);
        }
        else{
          alert("Invalid file input! Select Excel, csv file")
        }
     }
     else{
       setItems([])
     }

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      

    });

    promise.then((d) => {
      console.log(d);
      setItems(d);
    });

    
    
  };
  

  return (
    <div>
    
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      

      <table className="table container table table-bordered">
        <thead>
          <tr>
            <th scope="col">EmployeeID</th>
            <th scope="col">EmployeeName</th>
            <th scope="col">Mobile</th>
            <th scope="col">Joining Date</th>
            <th scope="col">Email</th>
            <th scope="col">DOB</th>
            <th scope="col">DepartmentName</th>
       
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.EmployeeID}>
              <td className="employId">{d.EmployeeID}</td>
              <td className="employName">{d.EmployeeName}</td>
              <td className="employMobile">{d.Mobile}</td>
              <td className="employJoiningDate">{d.JoiningDate}</td>
              <td className="employEmail">{d.Email}</td>
              <td className="employDOB">{d.DOB}</td>
              <td className="employDepartmentName">{d.DepartmentName}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;



// MOCK API
// {
//   "page_title": "Upload Employee Data from excel.",
//   "max_allowed_rows": "5",
//   "column_titles": [
//     "Employee ID",
//     "Employee Name",
//     "Mobile",
//     "Joining Date",
//     "Email",
//     "DOB",
//     "Department Name"
//   ],
//   "validations": {
//     "Employee ID":"INTEGER",
//     "Employee Name": "STRING",
//     "Mobile": "INTEGER",
//     "Email": "STRING",
//     "Department":"STRING"
//   }
// }