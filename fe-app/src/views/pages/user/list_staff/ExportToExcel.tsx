import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export interface props {
    prop: {
        apiData: any[];
        fileName: string;
    };
}

export const ExportToExcel: React.FunctionComponent<props> = ({ prop }): React.ReactElement => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (apiData: any[], fileName: string) => {
        const wb = XLSX.utils.book_new();
        wb.Props = {
            Title: 'Danh sách nhân viên',
            Subject: 'Zinza Intern',
            Author: 'Lam Tung',
            CreatedDate: new Date(),
        };

        wb.SheetNames.push('Danh sách nhân viên');
        const ws = XLSX.utils.json_to_sheet(apiData);
        wb.Sheets['Data'] = ws;

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        console.log(excelBuffer);
        const data = new Blob([excelBuffer], { type: fileType });

        console.log(apiData);
        console.log(data);

        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return <button onClick={() => exportToCSV(prop.apiData, prop.fileName)}>Export</button>;
};
