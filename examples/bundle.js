define(['riot', 'riot-typed'], function (riot, riotTyped) { 'use strict';

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}

var timerCount = 0;
var Timer = (function (Tag$$1) {
    function Timer() {
        var this$1 = this;

        Tag$$1.call(this);
        this.id = ++timerCount;
        this.count = 0;
        this.on('mount', function () {
            console.log(("" + (this$1.id)), this$1.opts);
            this$1.count = this$1.opts.initial;
            this$1.timerId = setInterval(function () {
                this$1.count++;
                this$1.update();
                console.log(((this$1.id) + " updating"));
            }, 1000);
        });
    }

    if ( Tag$$1 ) Timer.__proto__ = Tag$$1;
    Timer.prototype = Object.create( Tag$$1 && Tag$$1.prototype );
    Timer.prototype.constructor = Timer;
    Timer.prototype.dispose = function dispose () {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    };

    return Timer;
}(riotTyped.Tag));
Timer = __decorate([
    riotTyped.tag('timer', "\n<p>timer {id} - { count }</p>\n"),
    __metadata("design:paramtypes", [])
], Timer);
var Timer$1 = Timer;

var Logger = (function (Tag$$1) {
    function Logger() {
        Tag$$1.call(this);
        this.logs = ['line 1', 'line 2'];
    }

    if ( Tag$$1 ) Logger.__proto__ = Tag$$1;
    Logger.prototype = Object.create( Tag$$1 && Tag$$1.prototype );
    Logger.prototype.constructor = Logger;

    return Logger;
}(riotTyped.Tag));
Logger = __decorate([
    riotTyped.tag('logger', { tmpl: '<p class="color" each="{ item in logs }">{ item }</p>', css: '.color{color:gray;}' }),
    __metadata("design:paramtypes", [])
], Logger);
var Logger$1 = Logger;

//example of override css
var ErrorLogger = (function (Logger) {
    function ErrorLogger() {
        Logger.call(this);
        this.logs.push('!!!Error!!!');
    }

    if ( Logger ) ErrorLogger.__proto__ = Logger;
    ErrorLogger.prototype = Object.create( Logger && Logger.prototype );
    ErrorLogger.prototype.constructor = ErrorLogger;

    return ErrorLogger;
}(Logger$1));
ErrorLogger = __decorate([
    riotTyped.tag('error-logger', { css: 'error-logger .color{color:red;}' }),
    __metadata("design:paramtypes", [])
], ErrorLogger);
var ErrorLogger$1 = ErrorLogger;

var TAG_NAME = 'app';
var App = (function (Tag$$1) {
    function App() {
        var this$1 = this;

        Tag$$1.call(this);
        console.log('in App constructor');
        // this.title = 'Hello RiotJS';
        this.timers = [];
        this.on('mount', function () {
            console.log('app mounted');
            this$1.title = this$1.opts.title;
            this$1.refill();
            this$1.update();
            this$1.timerId = setInterval(this$1.refill, 3000);
        });
        this.init();
    }

    if ( Tag$$1 ) App.__proto__ = Tag$$1;
    App.prototype = Object.create( Tag$$1 && Tag$$1.prototype );
    App.prototype.constructor = App;
    App.prototype.init = function init () {
        console.log('in init');
    };
    App.prototype.refill = function refill () {
        var this$1 = this;

        if (this.timers.length === 0) {
            for (var i = 0; i < 10; i++) {
                this$1.timers.push({
                    initial: i * 15
                });
            }
        }
        else {
            this.timers.pop();
            this.update();
        }
    };
    App.prototype.dispose = function dispose () {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    };
    App.mount = function mount (opts) {
        riot.mount(TAG_NAME, opts);
    };

    return App;
}(riotTyped.Tag));
App = __decorate([
    riotTyped.tag(TAG_NAME, "\n<h1>{title}</h1>\n<p><b>Total timers:</b> {timers.length}</p>\n<timer each=\"{ item in timers }\" initial=\"{item.initial}\"></timer>\n<logger></logger>\n<error-logger></error-logger>\n"),
    __metadata("design:paramtypes", [])
], App);
var App$1 = App;

App$1.mount({ title: 'Hello riot-typed' });
console.log('==ready==');

});
