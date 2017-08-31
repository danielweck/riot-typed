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
        var DEF_KEY = '_TAG_DEF';
        var assign = Object.assign || riot.util.misc.extend;
        var def = assign({}, target[DEF_KEY]);
        def.tmpl = tmpl || def.tmpl;
        def.css = css || def.css;
        def.attrs = attrs || def.attrs;
        target[DEF_KEY] = def;
        riot.tag(name, def.tmpl || '', def.css, def.attrs, function (opts) {
            var _this = this;
            var obj = Object.create(target.prototype);
            var init = obj.init;
            if (typeof init !== 'undefined') {
                // recovery original init property when mixin
                obj.init = function () { return _this.init = typeof init === 'function' ? init.bind(_this) : init; };
            }
            this.mixin(obj); //copy properties so the next line would not complain
            target.call(this, opts); //call constructor
            this.on('unmount', function () { return _this.dispose(); });
        });
    }
    /**
    * decorator on class that extends Tag.
    * that defines a riot tag with template and the class.
    * see riot.tag()
    */
    function tag(name, tmpl) {
        return function (target) {
            // target is the constructor function
            if (typeof tmpl === 'object') {
                register(name, tmpl.tmpl, tmpl.css, tmpl.attrs, target);
            }
            else {
                register(name, tmpl, null, null, target);
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
