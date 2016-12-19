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
        define(["require", "exports", 'riot', 'riot-typed', './timer', './logger'], factory);
    }
})(function (require, exports) {
    "use strict";
    var riot = require('riot');
    var riot_typed_1 = require('riot-typed');
    require('./timer'); //import timer so that timer tag can be mounted
    require('./logger');
    var TAG_NAME = 'app';
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            var _this = this;
            _super.call(this);
            console.log('in App constructor');
            // this.title = 'Hello RiotJS';
            this.timers = [];
            this.on('mount', function () {
                console.log('app mounted');
                _this.title = _this.opts.title;
                _this.refill();
                _this.update();
                _this.timerId = setInterval(_this.refill, 3000);
            });
            this.init();
        }
        App.prototype.init = function () {
            console.log('in init');
        };
        App.prototype.refill = function () {
            if (this.timers.length === 0) {
                for (var i = 0; i < 10; i++) {
                    this.timers.push({
                        initial: i * 15
                    });
                }
            }
            else {
                this.timers.pop();
                this.update();
            }
        };
        App.prototype.dispose = function () {
            if (this.timerId) {
                clearInterval(this.timerId);
                this.timerId = null;
            }
        };
        App.mount = function (opts) {
            riot.mount(TAG_NAME, opts);
        };
        App = __decorate([
            riot_typed_1.tag(TAG_NAME, "\n<h1>{title}</h1>\n<p><b>Total timers:</b> {timers.length}</p>\n<timer each=\"{ item in timers }\" initial=\"{item.initial}\"></timer>\n<logger></logger>\n"), 
            __metadata('design:paramtypes', [])
        ], App);
        return App;
    }(riot_typed_1.Tag));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = App;
});
