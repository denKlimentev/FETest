const Page =  require('../Page')

class stepTwoPage extends Page {

  get overview_tittle () { return $( "//span[text() = 'Checkout: Overview']") }
  get finish_button () { return $("[data-test=finish]") }
  get summaryInfo_box () { return $("div[class='summary_info']") }
  get subtotal_label () { return $(".//div[@class = 'summary_subtotal_label']") }
  get tax_label () { return $(".//div[@class = 'summary_tax_label']") }
  get total_label () { return $(".//div[@class = 'summary_total_label']") }

}

module.exports = new stepTwoPage()