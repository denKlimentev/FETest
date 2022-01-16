const Page =  require('../Page')

class loginPage extends Page {

   get userName_input () { return $( "[data-test=username]") }
   get password_input () { return $( "[data-test=password]") }
   get submitBtn () { return $("[data-test=login-button]") }

}

module.exports = new loginPage()