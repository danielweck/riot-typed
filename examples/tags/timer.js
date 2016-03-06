var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'riot-typed'], factory);
    }
})(function (require, exports) {
    "use strict";
    var riot_typed_1 = require('riot-typed');
    var timerCount = 0;
    var Timer = (function (_super) {
        __extends(Timer, _super);
        function Timer() {
            var _this = this;
            _super.call(this);
            this.id = ++timerCount;
            this.count = 0;
            this.on('mount', function () {
                console.log("" + _this.id, _this.opts);
                _this.count = _this.opts.initial;
                _this.timerId = setInterval(function () {
                    _this.count++;
                    _this.update();
                    console.log(_this.id + " updating");
                }, 1000);
            });
        }
        Timer.prototype.dispose = function () {
            if (this.timerId) {
                clearInterval(this.timerId);
                this.timerId = null;
            }
        };
        Timer = __decorate([
            riot_typed_1.tag('timer', "\n<p>timer {id} - { count }</p>\n"), 
            __metadata('design:paramtypes', [])
        ], Timer);
        return Timer;
    })(riot_typed_1.Tag);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Timer;
});
