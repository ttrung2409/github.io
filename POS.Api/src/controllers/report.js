import ReportService from '../services/reportService'

var express = require('express');
var router = express.Router();

let reportService = new ReportService();

router.post('/incomeByInvoice/summary', function (req, res) {
  reportService.getIncomeSummaryByInvoice(req.body).then(summary => {
    res.send(summary);
  });
});

router.post('/incomeByInvoice', function (req, res) {
  reportService.getIncomeByInvoice(req.body).then(invoices => {
    res.send(invoices);
  });
});

router.post('/incomeByCustomer', function (req, res) {
  reportService.getIncomeByCustomer(req.body).then(customers => {
    res.send(customers);
  });
});

module.exports = router;
