// import "reflect-metadata";
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "riot"], factory);
    }
})(function (require, exports) {
    "use strict";
    var riot = require("riot");
    /**
    * decorator on class that extends Tag.
    * that defines a riot tag with template and the class
    */
    function tag(name, template) {
        return function (target) {
            // target is the constructor function
            riot.tag(name, template, function (opts) {
                var _this = this;
                var obj = Object.create(target.prototype);
                var assign = function (key, val) {
                    var value = val || obj[key];
                    _this[key] = typeof value === 'function' ? value.bind(_this) : value;
                };
                var init = obj.init;
                obj.init = function () { return assign('init', init); }; // recovery original init function when mixin
                for (var key in obj) {
                    if (key !== 'init' && key !== 'constructor') {
                        assign(key);
                    }
                }
                this.mixin(obj);
                target.call(this, opts); //call constructor
                this.on('unmount', function () { return _this.dispose(); });
            });
        };
    }
    exports.tag = tag;
    var tag;
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = tag;
});
