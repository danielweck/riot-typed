(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './tags/app'], factory);
    }
})(function (require, exports) {
    "use strict";
    var app_1 = require('./tags/app');
    app_1.default.mount({ title: 'Hello riot-typed' });
    console.log('==ready==');
});
