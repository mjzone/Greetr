;(function(global, $) {
    // 'new' an object
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    };

    // hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'es'];

    // informal greetings    
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    // formal greeetings    
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    // logger messages    
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    }; 

    // prototype of the Greetr    
    Greetr.prototype = {
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        validate: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw 'Invalid language';
            }
        },
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        formalGreetings: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        greet: function(formal) {
            var msg;
            if (formal) {
                msg = this.formalGreetings();
            } else {
                msg = this.greeting();
            }
            if (console) {
                console.log(msg);
            }
            return this;
        },
        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            return this;
        },
        setLang: function(lang) {
            this.language = lang;
            this.validate();
            return this;
        },
        setHtml: function (selector, formal) {
            var msg;
            if (formal) {
                msg = this.formalGreetings();
            } else {
                msg = this.greeting();
            }
            $(selector).html(msg);
        },
        htmlGreeting: function (selector, formal) {
            if (!$) {
                throw 'jQuery is not loaded';
            }
            if (!selector) {
                throw 'Missing jQuery selector';
            }
            this.setHtml(selector, formal);
        }
    };

    // the actual object is created here. This allow to 'new' an object without calling 'new'    
    Greetr.init = function(firstName, lastName, language) {
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        self.validate();
    };

    // trick borrowed from jQuery so we don't have to use the 'new' keywork    
    Greetr.init.prototype = Greetr.prototype;

    // attach our Greetr to the global object, and provide a shorthand '$G'    
    G$ = global.Greetr = Greetr;

}(window, jQuery));