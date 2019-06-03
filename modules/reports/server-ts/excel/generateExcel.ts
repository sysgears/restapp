import * as xl from 'excel4node';

interface Data {
  id: number;
  name: string;
  phone: string;
  email: string;
}

const wb = new xl.Workbook();
const options = {
  sheetFormat: {
    defaultColWidth: 25
  }
};
const style = wb.createStyle({
  font: {
    color: '#000000',
    size: 12
  }
});

export default function generateBufferExcel(data: Data[]) {
  const ws = wb.addWorksheet('Report', options);
  const titles = Object.keys(data[0]);

  titles.forEach((title, i) => {
    const capitalized = title[0].toUpperCase() + title.slice(1);
    ws.cell(1, i + 1)
      .string(capitalized)
      .style(style);
  });

  data.forEach((item, i) => {
    const values = Object.values(item);
    values.forEach((value, j) => {
      ws.cell(i + 2, j + 1)
        .string(String(value))
        .style(style);
    });
  });

  return wb.writeToBuffer();
}
