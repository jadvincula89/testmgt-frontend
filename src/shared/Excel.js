import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

export  function Excel(JSONData,fileName) {
    const fileType ="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
       const ws = XLSX.utils.json_to_sheet(JSONData);
       const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
       const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
       const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
}

