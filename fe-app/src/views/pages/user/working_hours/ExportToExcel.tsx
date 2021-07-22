import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from 'react-bootstrap';

export interface props {
    prop: {
        apiData: any[];
        fileName: string;
        // fields: any[];
    };
}

export const ExportToExcel: React.FunctionComponent<props> = ({ prop }): React.ReactElement => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (apiData: any[], fileName: string) => {
        const wb = XLSX.utils.book_new();
        wb.Props = {
            Title: 'Thống kê giờ làm việc',
            Subject: 'Zinza Intern',
            Author: 'Lam Tung',
            CreatedDate: new Date(),
        };
        wb.SheetNames.push('Data');
        console.log(Array(apiData));
        // const range = XLSX.utils.decode_range(ws['!ref']);
        // console.log(XLSX.utils.decode_range(ws['!ref']));
        // const header = Object.keys(apiData[0]); // columns name

        const ws = XLSX.utils.json_to_sheet(apiData);
        console.log(ws);
        wb.Sheets['Data'] = ws;

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return <Button onClick={() => exportToCSV(prop.apiData, prop.fileName)}>In ra File</Button>;
};
