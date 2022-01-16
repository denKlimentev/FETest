const Page =  require('../Page')

class completePage extends Page {

  get complete_message () { return $("h2[class='complete-header']") }

}

module.exports = new completePage()