const Page =  require('../Page')

class stepOnePage extends Page {

  get firstName_input () { return $( "[data-test=firstName]") }
  get lastName_input () { return $("[data-test=lastName]") }
  get postalCode_input () { return $("[data-test=postalCode]") }
  get continue_button () { return $("[data-test=continue]") }

}

module.exports = new stepOnePage()