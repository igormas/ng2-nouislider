(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('nouislider'), require('@angular/core'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ng2-nouislider', ['exports', 'nouislider', '@angular/core', '@angular/forms'], factory) :
    (global = global || self, factory(global['ng2-nouislider'] = {}, global.nouislider, global.ng.core, global.ng.forms));
}(this, (function (exports, nouislider, core, forms) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var DefaultFormatter = /** @class */ (function () {
        function DefaultFormatter() {
        }
        DefaultFormatter.prototype.to = function (value) {
            // formatting with http://stackoverflow.com/a/26463364/478584
            return String(parseFloat(parseFloat(String(value)).toFixed(2)));
        };
        DefaultFormatter.prototype.from = function (value) {
            return parseFloat(value);
        };
        return DefaultFormatter;
    }());
    var NouisliderComponent = /** @class */ (function () {
        function NouisliderComponent(el, renderer) {
            var _this = this;
            this.el = el;
            this.renderer = renderer;
            this.config = {};
            this.change = new core.EventEmitter(true);
            this.update = new core.EventEmitter(true);
            this.slide = new core.EventEmitter(true);
            this.set = new core.EventEmitter(true);
            this.start = new core.EventEmitter(true);
            this.end = new core.EventEmitter(true);
            this.onChange = Function.prototype;
            this.onTouched = Function.prototype;
            this.eventHandler = function (emitter, values, handle, unencoded) {
                var v = _this.toValues(values);
                var emitEvents = false;
                if (_this.value === undefined) {
                    _this.value = v;
                    return;
                }
                if (Array.isArray(v) && _this.value[handle] != v[handle]) {
                    emitEvents = true;
                }
                if (!Array.isArray(v) && _this.value != v) {
                    emitEvents = true;
                }
                if (emitEvents) {
                    emitter.emit(v);
                    _this.onChange(v);
                }
                if (Array.isArray(v)) {
                    _this.value[handle] = v[handle];
                }
                else {
                    _this.value = v;
                }
            };
            this.defaultKeyHandler = function (e) {
                var stepSize = _this.slider.steps();
                var index = parseInt(e.target.getAttribute('data-handle'));
                var sign = 1;
                var multiplier = 1;
                var step = 0;
                var delta = 0;
                switch (e.which) {
                    case 34: // PageDown
                        multiplier = _this.config.pageSteps;
                    case 40: // ArrowDown
                    case 37: // ArrowLeft
                        sign = -1;
                        step = stepSize[index][0];
                        e.preventDefault();
                        break;
                    case 33: // PageUp
                        multiplier = _this.config.pageSteps;
                    case 38: // ArrowUp
                    case 39: // ArrowRight
                        step = stepSize[index][1];
                        e.preventDefault();
                        break;
                    default:
                        break;
                }
                delta = sign * multiplier * step;
                var newValue;
                if (Array.isArray(_this.value)) {
                    newValue = [].concat(_this.value);
                    newValue[index] = newValue[index] + delta;
                }
                else {
                    newValue = _this.value + delta;
                }
                _this.slider.set(newValue);
            };
        }
        NouisliderComponent_1 = NouisliderComponent;
        NouisliderComponent.prototype.ngOnInit = function () {
            var e_1, _a;
            var _this = this;
            var inputsConfig = JSON.parse(JSON.stringify({
                behaviour: this.behaviour,
                connect: this.connect,
                limit: this.limit,
                start: this.formControl !== undefined ? this.formControl.value : this.ngModel,
                step: this.step,
                pageSteps: this.pageSteps,
                keyboard: this.keyboard,
                onKeydown: this.onKeydown,
                range: this.config.range || {
                    min: this.min,
                    max: this.max
                },
                pips: this.pips
            }));
            inputsConfig.format = this.format || this.config.format || new DefaultFormatter();
            inputsConfig.tooltips = this.tooltips || this.config.tooltips;
            this.slider = nouislider.create(this.el.nativeElement.querySelector('div'), Object.assign(this.config, inputsConfig));
            this.handles = [].slice.call(this.el.nativeElement.querySelectorAll('.noUi-handle'));
            if (this.config.keyboard) {
                if (this.config.pageSteps === undefined) {
                    this.config.pageSteps = 10;
                }
                var _loop_1 = function (handle) {
                    handle.setAttribute('tabindex', 0);
                    handle.addEventListener('click', function () {
                        handle.focus();
                    });
                    if (this_1.config.onKeydown === undefined) {
                        handle.addEventListener('keydown', this_1.defaultKeyHandler);
                    }
                    else {
                        handle.addEventListener('keydown', this_1.config.onKeydown);
                    }
                };
                var this_1 = this;
                try {
                    for (var _b = __values(this.handles), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var handle = _c.value;
                        _loop_1(handle);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            this.slider.on('set', function (values, handle, unencoded) {
                _this.eventHandler(_this.set, values, handle, unencoded);
            });
            this.slider.on('update', function (values, handle, unencoded) {
                _this.update.emit(_this.toValues(values));
            });
            this.slider.on('change', function (values, handle, unencoded) {
                _this.change.emit(_this.toValues(values));
            });
            this.slider.on('slide', function (values, handle, unencoded) {
                _this.eventHandler(_this.slide, values, handle, unencoded);
            });
            this.slider.on('start', function (values, handle, unencoded) {
                _this.start.emit(_this.toValues(values));
            });
            this.slider.on('end', function (values, handle, unencoded) {
                _this.end.emit(_this.toValues(values));
            });
        };
        NouisliderComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (this.slider && (changes.min || changes.max || changes.step)) {
                setTimeout(function () {
                    _this.slider.updateOptions({
                        range: {
                            min: _this.min,
                            max: _this.max
                        },
                        step: _this.step
                    });
                });
            }
        };
        NouisliderComponent.prototype.toValues = function (values) {
            var v = values.map(this.config.format.from);
            return (v.length == 1 ? v[0] : v);
        };
        NouisliderComponent.prototype.writeValue = function (value) {
            if (this.slider) {
                this.slider.set(value);
            }
        };
        NouisliderComponent.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        NouisliderComponent.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        NouisliderComponent.prototype.setDisabledState = function (isDisabled) {
            this.disabled = !!isDisabled;
        };
        var NouisliderComponent_1;
        NouisliderComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "disabled", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "behaviour", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "connect", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "limit", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "min", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "max", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "step", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "format", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "pageSteps", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "config", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "ngModel", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "keyboard", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "onKeydown", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "formControl", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "tooltips", void 0);
        __decorate([
            core.Input()
        ], NouisliderComponent.prototype, "pips", void 0);
        __decorate([
            core.Output()
        ], NouisliderComponent.prototype, "change", void 0);
        __decorate([
            core.Output()
        ], NouisliderComponent.prototype, "update", void 0);
        __decorate([
            core.Output()
        ], NouisliderComponent.prototype, "slide", void 0);
        __decorate([
            core.Output()
        ], NouisliderComponent.prototype, "set", void 0);
        __decorate([
            core.Output()
        ], NouisliderComponent.prototype, "start", void 0);
        __decorate([
            core.Output()
        ], NouisliderComponent.prototype, "end", void 0);
        NouisliderComponent = NouisliderComponent_1 = __decorate([
            core.Component({
                selector: 'nouislider',
                host: {
                    '[class.ng2-nouislider]': 'true'
                },
                template: '<div [attr.disabled]="disabled ? true : undefined"></div>',
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return NouisliderComponent_1; }),
                        multi: true
                    }
                ],
                styles: ["\n        :host {\n            display: block;\n            margin-top: 1rem;\n            margin-bottom: 1rem;\n        }\n    "]
            })
        ], NouisliderComponent);
        return NouisliderComponent;
    }());
    var NouisliderModule = /** @class */ (function () {
        function NouisliderModule() {
        }
        NouisliderModule = __decorate([
            core.NgModule({
                imports: [],
                exports: [NouisliderComponent],
                declarations: [NouisliderComponent],
            })
        ], NouisliderModule);
        return NouisliderModule;
    }());

    exports.DefaultFormatter = DefaultFormatter;
    exports.NouisliderComponent = NouisliderComponent;
    exports.NouisliderModule = NouisliderModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng2-nouislider.umd.js.map
