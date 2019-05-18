import ReportService from '../services/reportService'
import * as Excel from 'exceljs'

var express = require('express');
var moment = require('moment');
var router = express.Router();

let reportService = new ReportService();

router.post('/incomeByInvoice/summary', function (req, res) {
  reportService.getIncomeSummaryByInvoice(req.body).then(summary => {
    res.send(summary);
  });
});

router.post('/incomeByInvoice/export', function (req, res) {
  let params = Object.assign({}, req.body, { size: Math.pow(2, 31) - 1, index: 1 });
  reportService.getIncomeByInvoice(params).then(invoices => {
    let workbook = new Excel.stream.xlsx.WorkbookWriter({
      stream: res,
      useStyles: true
    });

    let worksheet = workbook.addWorksheet('Báo cáo doanh thu');
    worksheet.columns = [
      { header: 'Mã HĐ', key: 'no', width: 15 },
      { header: 'Ngày', key: 'createdAt', width: 15 },
      { header: 'Khách hàng', key: 'customer', width: 25 },
      { header: 'Doanh thu', key: 'total', width: 20, style: { numFmt: '#,##;(#,##)' } },
      { header: 'Giá vốn', key: 'totalCost', width: 20, style: { numFmt: '#,##;(#,##)' } },
      { header: 'Lợi nhuận', key: 'profit', width: 20, style: { numFmt: '#,##;(#,##)' } },
      { header: 'Thanh toán', key: 'amountPaid', width: 20, style: { numFmt: '#,##;(#,##)' } },
      { header: 'Nợ', key: 'balance', width: 20, style: { numFmt: '#,##;(#,##)' } }
    ];

    for (let invoice of invoices) {
      worksheet.addRow({
        no: invoice.no,
        createdAt: moment(invoice.createdAt).format('DD/MM/YYYY'),
        customer: invoice.customerName,
        total: parseFloat(invoice.total),
        totalCost: parseFloat(invoice.totalCost),
        profit: parseFloat(invoice.total - invoice.totalCost),
        amountPaid: parseFloat(invoice.amountPaid),
        balance: invoice.total - invoice.amountPaid
      });
    }

    let totalRow = worksheet.addRow({
      no: '',
      createdAt: '',
      customer: 'Tổng',
      total: invoices.reduce((acc, x) => acc += parseFloat(x.total), 0),
      totalCost: invoices.reduce((acc, x) => acc += parseFloat(x.totalCost), 0),
      profit: invoices.reduce((acc, x) => acc += parseFloat(x.total - x.totalCost), 0),
      amountPaid: invoices.reduce((acc, x) => acc += parseFloat(x.amountPaid), 0),
      balance: invoices.reduce((acc, x) => acc += parseFloat(x.total - x.amountPaid), 0),
    });

    totalRow.font = {
      size: 13,
      color: { argb: 'ff0000' },
      bold: true
    };

    totalRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffff00' },
        bgColor: { argb: 'ffff00' }
      }
    });

    worksheet.getRow(1).eachCell(cell => {
      cell.font = {
        color: { argb: 'ffffff' },
        bold: true
      };

      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '2a8ec1' },
        bgColor: { argb: '2a8ec1' }
      }
    });

    workbook.commit().then(() => {
      res.end();
    });
  });
});

router.post('/incomeByInvoice', function (req, res) {
  reportService.getIncomeByInvoice(req.body).then(invoices => {
    res.send(invoices);
  });
});

router.post('/incomeByCustomer/summary', function (req, res) {
  reportService.getIncomeSummaryByCustomer(req.body).then(summary => res.send(summary));
});

router.post('/incomeByCustomer/export', function (req, res) {
  let params = Object.assign({}, req.body, { size: Math.pow(2, 31) - 1, index: 1 });
  reportService.getIncomeByCustomer(params).then(customers => {
    let workbook = new Excel.stream.xlsx.WorkbookWriter({
      stream: res,
      useStyles: true
    });

    let worksheet = workbook.addWorksheet('Báo cáo doanh thu');
    worksheet.columns = [
      { header: 'Mã KH', key: 'no', width: 15 },
      { header: 'Tên KH', key: 'name', width: 25 },
      { header: 'Doanh thu', key: 'income', width: 20, style: { numFmt: '#,##;(#,##)' } },
      { header: 'Giá vốn', key: 'cost', width: 20, style: { numFmt: '#,##;(#,##)' } },
      { header: 'Lợi nhuận', key: 'profit', width: 20, style: { numFmt: '#,##;(#,##)' } },
      { header: 'Thanh toán', key: 'amountPaid', width: 20, style: { numFmt: '#,##;(#,##)' } },
      { header: 'Nợ', key: 'balance', width: 20, style: { numFmt: '#,##;(#,##)' } }
    ];

    for (let customer of customers) {
      worksheet.addRow({
        no: customer.no,
        name: customer.name,
        income: parseFloat(customer.income),
        cost: parseFloat(customer.cost),
        profit: parseFloat(customer.profit),
        amountPaid: parseFloat(customer.amountPaid),
        balance: parseFloat(customer.balance)
      });
    }

    let totalRow = worksheet.addRow({
      no: '',
      name: 'Tổng',
      income: customers.reduce((acc, x) => acc += parseFloat(x.income), 0),
      cost: customers.reduce((acc, x) => acc += parseFloat(x.cost), 0),
      profit: customers.reduce((acc, x) => acc += parseFloat(x.profit), 0),
      amountPaid: customers.reduce((acc, x) => acc += parseFloat(x.amountPaid), 0),
      balance: customers.reduce((acc, x) => acc += parseFloat(x.balance), 0),
    });

    totalRow.font = {
      size: 13,
      color: { argb: 'ff0000' },
      bold: true
    };

    totalRow.eachCell(cell => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffff00' },
        bgColor: { argb: 'ffff00' }
      }
    });

    worksheet.getRow(1).eachCell(cell => {
      cell.font = {
        color: { argb: 'ffffff' },
        bold: true
      };

      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '2a8ec1' },
        bgColor: { argb: '2a8ec1' }
      }
    });

    workbook.commit().then(() => {
      res.end();
    });
  });
});


router.post('/incomeByCustomer', function (req, res) {
  reportService.getIncomeByCustomer(req.body).then(customers => {
    res.send(customers);
  });
});


module.exports = router;
