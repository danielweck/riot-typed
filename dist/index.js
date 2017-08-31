// import "reflect-metadata";
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "riot"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var riot = require("riot");
    function register(name, tmpl, css, attrs, target) {
        riot.tag(name, tmpl, css, attrs, function (opts) {
            var _this = this;
            var obj = Object.create(target.prototype);
            var init = obj.init;
            if (typeof init !== 'undefined') {
                obj.init = function () { return _this['init'] = typeof init === 'function' ? init.bind(_this) : init; }; // recovery original init property when mixin
            }
            this.mixin(obj);
            target.call(this, opts); //call constructor
            this.on('unmount', function () { return _this.dispose(); });
        });
    }
    /**
    * decorator on class that extends Tag.
    * that defines a riot tag with template and the class.
    * see riot.tag()
    */
    function tag(name, template) {
        return function (target) {
            // target is the constructor function
            if (typeof template === 'object') {
                register(name, template.template, template.css, template.attrs, target);
            }
            else {
                register(name, template, null, null, target);
            }
        };
    }
    exports.tag = tag;
    (function (tag) {
        /**
         riot tag
        */
        var Tag = (function () {
            function Tag() {
            }
            /**
            * called when unmount
            */
            Tag.prototype.dispose = function () {
            };
            return Tag;
        }());
        tag.Tag = Tag;
    })(tag = exports.tag || (exports.tag = {}));
    exports.Tag = tag.Tag;
    exports.default = tag;
});
