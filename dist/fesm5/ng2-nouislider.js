import { __values, __decorate } from 'tslib';
import { create } from 'nouislider';
import { EventEmitter, ElementRef, Renderer2, Input, Output, Component, forwardRef, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
        this.change = new EventEmitter(true);
        this.update = new EventEmitter(true);
        this.slide = new EventEmitter(true);
        this.set = new EventEmitter(true);
        this.start = new EventEmitter(true);
        this.end = new EventEmitter(true);
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
        this.slider = create(this.el.nativeElement.querySelector('div'), Object.assign(this.config, inputsConfig));
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
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "behaviour", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "connect", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "limit", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "min", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "max", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "step", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "format", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "pageSteps", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "config", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "ngModel", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "keyboard", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "onKeydown", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "formControl", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "tooltips", void 0);
    __decorate([
        Input()
    ], NouisliderComponent.prototype, "pips", void 0);
    __decorate([
        Output()
    ], NouisliderComponent.prototype, "change", void 0);
    __decorate([
        Output()
    ], NouisliderComponent.prototype, "update", void 0);
    __decorate([
        Output()
    ], NouisliderComponent.prototype, "slide", void 0);
    __decorate([
        Output()
    ], NouisliderComponent.prototype, "set", void 0);
    __decorate([
        Output()
    ], NouisliderComponent.prototype, "start", void 0);
    __decorate([
        Output()
    ], NouisliderComponent.prototype, "end", void 0);
    NouisliderComponent = NouisliderComponent_1 = __decorate([
        Component({
            selector: 'nouislider',
            host: {
                '[class.ng2-nouislider]': 'true'
            },
            template: '<div [attr.disabled]="disabled ? true : undefined"></div>',
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return NouisliderComponent_1; }),
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
        NgModule({
            imports: [],
            exports: [NouisliderComponent],
            declarations: [NouisliderComponent],
        })
    ], NouisliderModule);
    return NouisliderModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { DefaultFormatter, NouisliderComponent, NouisliderModule };
//# sourceMappingURL=ng2-nouislider.js.map
