import { __values } from 'tslib';
import { create } from 'nouislider';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, NgModule, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DefaultFormatter = /** @class */ (function () {
    function DefaultFormatter() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    DefaultFormatter.prototype.to = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // formatting with http://stackoverflow.com/a/26463364/478584
        return String(parseFloat(parseFloat(String(value)).toFixed(2)));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DefaultFormatter.prototype.from = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
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
            var /** @type {?} */ v = _this.toValues(values);
            var /** @type {?} */ emitEvents = false;
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
            var /** @type {?} */ stepSize = _this.slider.steps();
            var /** @type {?} */ index = parseInt((/** @type {?} */ (e.target)).getAttribute('data-handle'));
            var /** @type {?} */ sign = 1;
            var /** @type {?} */ multiplier = 1;
            var /** @type {?} */ step = 0;
            var /** @type {?} */ delta = 0;
            switch (e.which) {
                case 34:
                    // PageDown
                    multiplier = _this.config.pageSteps;
                case 40: // ArrowDown
                case 37:
                    // ArrowLeft
                    sign = -1;
                    step = stepSize[index][0];
                    e.preventDefault();
                    break;
                case 33:
                    // PageUp
                    multiplier = _this.config.pageSteps;
                case 38: // ArrowUp
                case 39:
                    // ArrowRight
                    step = stepSize[index][1];
                    e.preventDefault();
                    break;
                default:
                    break;
            }
            delta = sign * multiplier * step;
            var /** @type {?} */ newValue;
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
    /**
     * @return {?}
     */
    NouisliderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ inputsConfig = JSON.parse(JSON.stringify({
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
                for (var _a = __values(this.handles), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var handle = _b.value;
                    _loop_1(handle);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
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
        var e_1, _c;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NouisliderComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
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
    /**
     * @param {?} values
     * @return {?}
     */
    NouisliderComponent.prototype.toValues = /**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        var /** @type {?} */ v = values.map(this.config.format.from);
        return (v.length == 1 ? v[0] : v);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NouisliderComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.slider) {
            this.slider.set(value);
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NouisliderComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NouisliderComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NouisliderComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = !!isDisabled;
    };
    NouisliderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nouislider',
                    host: {
                        '[class.ng2-nouislider]': 'true'
                    },
                    template: '<div [attr.disabled]="disabled ? true : undefined"></div>',
                    styles: ["\n        :host {\n            display: block;\n            margin-top: 1rem;\n            margin-bottom: 1rem;\n        }\n    "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NouisliderComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    NouisliderComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    NouisliderComponent.propDecorators = {
        disabled: [{ type: Input }],
        behaviour: [{ type: Input }],
        connect: [{ type: Input }],
        limit: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        step: [{ type: Input }],
        format: [{ type: Input }],
        pageSteps: [{ type: Input }],
        config: [{ type: Input }],
        ngModel: [{ type: Input }],
        keyboard: [{ type: Input }],
        onKeydown: [{ type: Input }],
        formControl: [{ type: Input }],
        tooltips: [{ type: Input }],
        pips: [{ type: Input }],
        change: [{ type: Output }],
        update: [{ type: Output }],
        slide: [{ type: Output }],
        set: [{ type: Output }],
        start: [{ type: Output }],
        end: [{ type: Output }]
    };
    return NouisliderComponent;
}());
var NouisliderModule = /** @class */ (function () {
    function NouisliderModule() {
    }
    NouisliderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    exports: [NouisliderComponent],
                    declarations: [NouisliderComponent],
                },] },
    ];
    return NouisliderModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { DefaultFormatter, NouisliderComponent, NouisliderModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLW5vdWlzbGlkZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nMi1ub3Vpc2xpZGVyL25vdWlzbGlkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbm9VaVNsaWRlciBmcm9tICdub3Vpc2xpZGVyJztcbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBSZW5kZXJlcjIsXG4gICAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBGb3JtQ29udHJvbCxcbiAgICBOR19WQUxVRV9BQ0NFU1NPUlxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm91aUZvcm1hdHRlciB7XG4gICAgdG8odmFsdWU6IG51bWJlcik6IHN0cmluZztcblxuICAgIGZyb20odmFsdWU6IHN0cmluZyk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGlwcyB7XG4gICAgbW9kZTogJ3JhbmdlJztcbiAgICBkZW5zaXR5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0Rm9ybWF0dGVyIGltcGxlbWVudHMgTm91aUZvcm1hdHRlciB7XG4gICAgdG8odmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIC8vIGZvcm1hdHRpbmcgd2l0aCBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjQ2MzM2NC80Nzg1ODRcbiAgICAgICAgcmV0dXJuIFN0cmluZyhwYXJzZUZsb2F0KHBhcnNlRmxvYXQoU3RyaW5nKHZhbHVlKSkudG9GaXhlZCgyKSkpO1xuICAgIH1cblxuICAgIGZyb20odmFsdWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbm91aXNsaWRlcicsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm5nMi1ub3Vpc2xpZGVyXSc6ICd0cnVlJ1xuICAgIH0sXG4gICAgdGVtcGxhdGU6ICc8ZGl2IFthdHRyLmRpc2FibGVkXT1cImRpc2FibGVkID8gdHJ1ZSA6IHVuZGVmaW5lZFwiPjwvZGl2PicsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgICAgICB9XG4gICAgYF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm91aXNsaWRlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOb3Vpc2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIHB1YmxpYyBzbGlkZXI6IGFueTtcbiAgICBwdWJsaWMgaGFuZGxlczogYW55W107XG4gICAgQElucHV0KCkgcHVibGljIGRpc2FibGVkOiBib29sZWFuOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgQElucHV0KCkgcHVibGljIGJlaGF2aW91cjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjb25uZWN0OiBib29sZWFuW107XG4gICAgQElucHV0KCkgcHVibGljIGxpbWl0OiBudW1iZXI7XG4gICAgQElucHV0KCkgcHVibGljIG1pbjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBtYXg6IG51bWJlcjtcbiAgICBASW5wdXQoKSBwdWJsaWMgc3RlcDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmb3JtYXQ6IE5vdWlGb3JtYXR0ZXI7XG4gICAgQElucHV0KCkgcHVibGljIHBhZ2VTdGVwczogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjb25maWc6IGFueSA9IHt9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBuZ01vZGVsOiBudW1iZXIgfCBudW1iZXJbXTtcbiAgICBASW5wdXQoKSBwdWJsaWMga2V5Ym9hcmQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcHVibGljIG9uS2V5ZG93bjogYW55O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgQElucHV0KCkgcHVibGljIHRvb2x0aXBzOiBBcnJheTxhbnk+O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwaXBzOiBJUGlwcztcbiAgICBAT3V0cHV0KCkgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgdXBkYXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBzbGlkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgc2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBzdGFydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgZW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gICAgcHJpdmF0ZSB2YWx1ZTogYW55O1xuICAgIHByaXZhdGUgb25DaGFuZ2U6IGFueSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgICBwcml2YXRlIG9uVG91Y2hlZDogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGxldCBpbnB1dHNDb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGJlaGF2aW91cjogdGhpcy5iZWhhdmlvdXIsXG4gICAgICAgICAgICBjb25uZWN0OiB0aGlzLmNvbm5lY3QsXG4gICAgICAgICAgICBsaW1pdDogdGhpcy5saW1pdCxcbiAgICAgICAgICAgIHN0YXJ0OiB0aGlzLmZvcm1Db250cm9sICE9PSB1bmRlZmluZWQgPyB0aGlzLmZvcm1Db250cm9sLnZhbHVlIDogdGhpcy5uZ01vZGVsLFxuICAgICAgICAgICAgc3RlcDogdGhpcy5zdGVwLFxuICAgICAgICAgICAgcGFnZVN0ZXBzOiB0aGlzLnBhZ2VTdGVwcyxcbiAgICAgICAgICAgIGtleWJvYXJkOiB0aGlzLmtleWJvYXJkLFxuICAgICAgICAgICAgb25LZXlkb3duOiB0aGlzLm9uS2V5ZG93bixcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLmNvbmZpZy5yYW5nZSB8fCB7XG4gICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pbixcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGlwczogdGhpcy5waXBzXG4gICAgICAgIH0pKTtcblxuICAgICAgICBpbnB1dHNDb25maWcuZm9ybWF0ID0gdGhpcy5mb3JtYXQgfHwgdGhpcy5jb25maWcuZm9ybWF0IHx8IG5ldyBEZWZhdWx0Rm9ybWF0dGVyKCk7XG4gICAgICAgIGlucHV0c0NvbmZpZy50b29sdGlwcyA9IHRoaXMudG9vbHRpcHMgfHwgdGhpcy5jb25maWcudG9vbHRpcHM7XG5cbiAgICAgICAgdGhpcy5zbGlkZXIgPSBub1VpU2xpZGVyLmNyZWF0ZShcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdkaXYnKSxcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIGlucHV0c0NvbmZpZylcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmhhbmRsZXMgPSBbXS5zbGljZS5jYWxsKHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubm9VaS1oYW5kbGUnKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcucGFnZVN0ZXBzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5wYWdlU3RlcHMgPSAxMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGhhbmRsZSBvZiB0aGlzLmhhbmRsZXMpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICAgICAgICAgICAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm9uS2V5ZG93biA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5kZWZhdWx0S2V5SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmNvbmZpZy5vbktleWRvd24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2xpZGVyLm9uKCdzZXQnLCAodmFsdWVzOiBzdHJpbmdbXSwgaGFuZGxlOiBudW1iZXIsIHVuZW5jb2RlZDogbnVtYmVyW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyKHRoaXMuc2V0LCB2YWx1ZXMsIGhhbmRsZSwgdW5lbmNvZGVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zbGlkZXIub24oJ3VwZGF0ZScsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUuZW1pdCh0aGlzLnRvVmFsdWVzKHZhbHVlcykpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNsaWRlci5vbignY2hhbmdlJywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMudG9WYWx1ZXModmFsdWVzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2xpZGVyLm9uKCdzbGlkZScsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIodGhpcy5zbGlkZSwgdmFsdWVzLCBoYW5kbGUsIHVuZW5jb2RlZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2xpZGVyLm9uKCdzdGFydCcsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGFydC5lbWl0KHRoaXMudG9WYWx1ZXModmFsdWVzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2xpZGVyLm9uKCdlbmQnLCAodmFsdWVzOiBzdHJpbmdbXSwgaGFuZGxlOiBudW1iZXIsIHVuZW5jb2RlZDogbnVtYmVyW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW5kLmVtaXQodGhpcy50b1ZhbHVlcyh2YWx1ZXMpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnNsaWRlciAmJiAoY2hhbmdlcy5taW4gfHwgY2hhbmdlcy5tYXggfHwgY2hhbmdlcy5zdGVwKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXIudXBkYXRlT3B0aW9ucyh7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdGVwOiB0aGlzLnN0ZXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9WYWx1ZXModmFsdWVzOiBzdHJpbmdbXSk6IGFueSB8IGFueVtdIHtcbiAgICAgICAgbGV0IHYgPSB2YWx1ZXMubWFwKHRoaXMuY29uZmlnLmZvcm1hdC5mcm9tKTtcbiAgICAgICAgcmV0dXJuICh2Lmxlbmd0aCA9PSAxID8gdlswXSA6IHYpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zbGlkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnNldCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSAhIWlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBldmVudEhhbmRsZXIgPSAoZW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4sIHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICAgIGxldCB2ID0gdGhpcy50b1ZhbHVlcyh2YWx1ZXMpO1xuICAgICAgICBsZXQgZW1pdEV2ZW50cyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2KSAmJiB0aGlzLnZhbHVlW2hhbmRsZV0gIT0gdltoYW5kbGVdKSB7XG4gICAgICAgICAgICBlbWl0RXZlbnRzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodikgJiYgdGhpcy52YWx1ZSAhPSB2KSB7XG4gICAgICAgICAgICBlbWl0RXZlbnRzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW1pdEV2ZW50cykge1xuICAgICAgICAgICAgZW1pdHRlci5lbWl0KHYpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZVtoYW5kbGVdID0gdltoYW5kbGVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHY7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRlZmF1bHRLZXlIYW5kbGVyID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgbGV0IHN0ZXBTaXplOiBhbnlbXSA9IHRoaXMuc2xpZGVyLnN0ZXBzKCk7XG4gICAgICAgIGxldCBpbmRleCA9IHBhcnNlSW50KCg8SFRNTEVsZW1lbnQ+ZS50YXJnZXQpLmdldEF0dHJpYnV0ZSgnZGF0YS1oYW5kbGUnKSk7XG4gICAgICAgIGxldCBzaWduID0gMTtcbiAgICAgICAgbGV0IG11bHRpcGxpZXI6IG51bWJlciA9IDE7XG4gICAgICAgIGxldCBzdGVwID0gMDtcbiAgICAgICAgbGV0IGRlbHRhID0gMDtcblxuICAgICAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMzQ6ICAvLyBQYWdlRG93blxuICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgPSB0aGlzLmNvbmZpZy5wYWdlU3RlcHM7XG4gICAgICAgICAgICBjYXNlIDQwOiAgLy8gQXJyb3dEb3duXG4gICAgICAgICAgICBjYXNlIDM3OiAgLy8gQXJyb3dMZWZ0XG4gICAgICAgICAgICAgICAgc2lnbiA9IC0xO1xuICAgICAgICAgICAgICAgIHN0ZXAgPSBzdGVwU2l6ZVtpbmRleF1bMF07XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDMzOiAgLy8gUGFnZVVwXG4gICAgICAgICAgICAgICAgbXVsdGlwbGllciA9IHRoaXMuY29uZmlnLnBhZ2VTdGVwcztcbiAgICAgICAgICAgIGNhc2UgMzg6ICAvLyBBcnJvd1VwXG4gICAgICAgICAgICBjYXNlIDM5OiAgLy8gQXJyb3dSaWdodFxuICAgICAgICAgICAgICAgIHN0ZXAgPSBzdGVwU2l6ZVtpbmRleF1bMV07XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsdGEgPSBzaWduICogbXVsdGlwbGllciAqIHN0ZXA7XG4gICAgICAgIGxldCBuZXdWYWx1ZTogbnVtYmVyIHwgbnVtYmVyW107XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gW10uY29uY2F0KHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgbmV3VmFsdWVbaW5kZXhdID0gbmV3VmFsdWVbaW5kZXhdICsgZGVsdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMudmFsdWUgKyBkZWx0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2xpZGVyLnNldChuZXdWYWx1ZSk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtdLFxuICAgIGV4cG9ydHM6IFtOb3Vpc2xpZGVyQ29tcG9uZW50XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtOb3Vpc2xpZGVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm91aXNsaWRlck1vZHVsZSB7XG59XG4iXSwibmFtZXMiOlsibm9VaVNsaWRlci5jcmVhdGUiLCJ0c2xpYl8xLl9fdmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7SUE4QkE7Ozs7Ozs7SUFDSSw2QkFBRTs7OztJQUFGLFVBQUcsS0FBYTs7UUFFWixPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkU7Ozs7O0lBRUQs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