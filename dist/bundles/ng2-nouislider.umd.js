(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('nouislider'), require('@angular/core'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ng2-nouislider', ['exports', 'nouislider', '@angular/core', '@angular/forms'], factory) :
    (factory((global['ng2-nouislider'] = {}),null,global.ng.core,global.ng.forms));
}(this, (function (exports,noUiSlider,core,forms) { 'use strict';

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
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DefaultFormatter = (function () {
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
    var NouisliderComponent = (function () {
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
                var /** @type {?} */ index = parseInt(((e.target)).getAttribute('data-handle'));
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
                this.slider = noUiSlider.create(this.el.nativeElement.querySelector('div'), Object.assign(this.config, inputsConfig));
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
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
            { type: core.Component, args: [{
                        selector: 'nouislider',
                        host: {
                            '[class.ng2-nouislider]': 'true'
                        },
                        template: '<div [attr.disabled]="disabled ? true : undefined"></div>',
                        styles: ["\n        :host {\n            display: block;\n            margin-top: 1rem;\n            margin-bottom: 1rem;\n        }\n    "],
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(function () { return NouisliderComponent; }),
                                multi: true
                            }
                        ]
                    },] },
        ];
        /** @nocollapse */
        NouisliderComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Renderer2 }
            ];
        };
        NouisliderComponent.propDecorators = {
            disabled: [{ type: core.Input }],
            behaviour: [{ type: core.Input }],
            connect: [{ type: core.Input }],
            limit: [{ type: core.Input }],
            min: [{ type: core.Input }],
            max: [{ type: core.Input }],
            step: [{ type: core.Input }],
            format: [{ type: core.Input }],
            pageSteps: [{ type: core.Input }],
            config: [{ type: core.Input }],
            ngModel: [{ type: core.Input }],
            keyboard: [{ type: core.Input }],
            onKeydown: [{ type: core.Input }],
            formControl: [{ type: core.Input }],
            tooltips: [{ type: core.Input }],
            pips: [{ type: core.Input }],
            change: [{ type: core.Output }],
            update: [{ type: core.Output }],
            slide: [{ type: core.Output }],
            set: [{ type: core.Output }],
            start: [{ type: core.Output }],
            end: [{ type: core.Output }]
        };
        return NouisliderComponent;
    }());
    var NouisliderModule = (function () {
        function NouisliderModule() {
        }
        NouisliderModule.decorators = [
            { type: core.NgModule, args: [{
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

    exports.DefaultFormatter = DefaultFormatter;
    exports.NouisliderComponent = NouisliderComponent;
    exports.NouisliderModule = NouisliderModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLW5vdWlzbGlkZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOltudWxsLCJuZzovL25nMi1ub3Vpc2xpZGVyL25vdWlzbGlkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBub1VpU2xpZGVyIGZyb20gJ25vdWlzbGlkZXInO1xuaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT3V0cHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIFJlbmRlcmVyMixcbiAgICBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIEZvcm1Db250cm9sLFxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGludGVyZmFjZSBOb3VpRm9ybWF0dGVyIHtcbiAgICB0byh2YWx1ZTogbnVtYmVyKTogc3RyaW5nO1xuXG4gICAgZnJvbSh2YWx1ZTogc3RyaW5nKTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQaXBzIHtcbiAgICBtb2RlOiAncmFuZ2UnO1xuICAgIGRlbnNpdHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRGb3JtYXR0ZXIgaW1wbGVtZW50cyBOb3VpRm9ybWF0dGVyIHtcbiAgICB0byh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgLy8gZm9ybWF0dGluZyB3aXRoIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NDYzMzY0LzQ3ODU4NFxuICAgICAgICByZXR1cm4gU3RyaW5nKHBhcnNlRmxvYXQocGFyc2VGbG9hdChTdHJpbmcodmFsdWUpKS50b0ZpeGVkKDIpKSk7XG4gICAgfVxuXG4gICAgZnJvbSh2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdub3Vpc2xpZGVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubmcyLW5vdWlzbGlkZXJdJzogJ3RydWUnXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogJzxkaXYgW2F0dHIuZGlzYWJsZWRdPVwiZGlzYWJsZWQgPyB0cnVlIDogdW5kZWZpbmVkXCI+PC9kaXY+JyxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgICAgIH1cbiAgICBgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3Vpc2xpZGVyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5vdWlzbGlkZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgcHVibGljIHNsaWRlcjogYW55O1xuICAgIHB1YmxpYyBoYW5kbGVzOiBhbnlbXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQ6IGJvb2xlYW47IC8vIHRzbGludDpkaXNhYmxlLWxpbmVcbiAgICBASW5wdXQoKSBwdWJsaWMgYmVoYXZpb3VyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcHVibGljIGNvbm5lY3Q6IGJvb2xlYW5bXTtcbiAgICBASW5wdXQoKSBwdWJsaWMgbGltaXQ6IG51bWJlcjtcbiAgICBASW5wdXQoKSBwdWJsaWMgbWluOiBudW1iZXI7XG4gICAgQElucHV0KCkgcHVibGljIG1heDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzdGVwOiBudW1iZXI7XG4gICAgQElucHV0KCkgcHVibGljIGZvcm1hdDogTm91aUZvcm1hdHRlcjtcbiAgICBASW5wdXQoKSBwdWJsaWMgcGFnZVN0ZXBzOiBudW1iZXI7XG4gICAgQElucHV0KCkgcHVibGljIGNvbmZpZzogYW55ID0ge307XG4gICAgQElucHV0KCkgcHVibGljIG5nTW9kZWw6IG51bWJlciB8IG51bWJlcltdO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBrZXlib2FyZDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBwdWJsaWMgb25LZXlkb3duOiBhbnk7XG4gICAgQElucHV0KCkgcHVibGljIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcbiAgICBASW5wdXQoKSBwdWJsaWMgdG9vbHRpcHM6IEFycmF5PGFueT47XG4gICAgQElucHV0KCkgcHVibGljIHBpcHM6IElQaXBzO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyB1cGRhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHNsaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBzZXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgICBAT3V0cHV0KCkgcHVibGljIHN0YXJ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBlbmQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcih0cnVlKTtcbiAgICBwcml2YXRlIHZhbHVlOiBhbnk7XG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICAgIHByaXZhdGUgb25Ub3VjaGVkOiBhbnkgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlucHV0c0NvbmZpZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgYmVoYXZpb3VyOiB0aGlzLmJlaGF2aW91cixcbiAgICAgICAgICAgIGNvbm5lY3Q6IHRoaXMuY29ubmVjdCxcbiAgICAgICAgICAgIGxpbWl0OiB0aGlzLmxpbWl0LFxuICAgICAgICAgICAgc3RhcnQ6IHRoaXMuZm9ybUNvbnRyb2wgIT09IHVuZGVmaW5lZCA/IHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgOiB0aGlzLm5nTW9kZWwsXG4gICAgICAgICAgICBzdGVwOiB0aGlzLnN0ZXAsXG4gICAgICAgICAgICBwYWdlU3RlcHM6IHRoaXMucGFnZVN0ZXBzLFxuICAgICAgICAgICAga2V5Ym9hcmQ6IHRoaXMua2V5Ym9hcmQsXG4gICAgICAgICAgICBvbktleWRvd246IHRoaXMub25LZXlkb3duLFxuICAgICAgICAgICAgcmFuZ2U6IHRoaXMuY29uZmlnLnJhbmdlIHx8IHtcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluLFxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwaXBzOiB0aGlzLnBpcHNcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGlucHV0c0NvbmZpZy5mb3JtYXQgPSB0aGlzLmZvcm1hdCB8fCB0aGlzLmNvbmZpZy5mb3JtYXQgfHwgbmV3IERlZmF1bHRGb3JtYXR0ZXIoKTtcbiAgICAgICAgaW5wdXRzQ29uZmlnLnRvb2x0aXBzID0gdGhpcy50b29sdGlwcyB8fCB0aGlzLmNvbmZpZy50b29sdGlwcztcblxuICAgICAgICB0aGlzLnNsaWRlciA9IG5vVWlTbGlkZXIuY3JlYXRlKFxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdicpLFxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmNvbmZpZywgaW5wdXRzQ29uZmlnKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlcyA9IFtdLnNsaWNlLmNhbGwodGhpcy5lbC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub1VpLWhhbmRsZScpKTtcblxuICAgICAgICBpZiAodGhpcy5jb25maWcua2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5wYWdlU3RlcHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnBhZ2VTdGVwcyA9IDEwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaGFuZGxlIG9mIHRoaXMuaGFuZGxlcykge1xuICAgICAgICAgICAgICAgIGhhbmRsZS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgICAgICAgICAgICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGUuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcub25LZXlkb3duID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmRlZmF1bHRLZXlIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuY29uZmlnLm9uS2V5ZG93bik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zbGlkZXIub24oJ3NldCcsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIodGhpcy5zZXQsIHZhbHVlcywgaGFuZGxlLCB1bmVuY29kZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNsaWRlci5vbigndXBkYXRlJywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZS5lbWl0KHRoaXMudG9WYWx1ZXModmFsdWVzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2xpZGVyLm9uKCdjaGFuZ2UnLCAodmFsdWVzOiBzdHJpbmdbXSwgaGFuZGxlOiBudW1iZXIsIHVuZW5jb2RlZDogbnVtYmVyW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy50b1ZhbHVlcyh2YWx1ZXMpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zbGlkZXIub24oJ3NsaWRlJywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcih0aGlzLnNsaWRlLCB2YWx1ZXMsIGhhbmRsZSwgdW5lbmNvZGVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zbGlkZXIub24oJ3N0YXJ0JywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0LmVtaXQodGhpcy50b1ZhbHVlcyh2YWx1ZXMpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zbGlkZXIub24oJ2VuZCcsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbmQuZW1pdCh0aGlzLnRvVmFsdWVzKHZhbHVlcykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVyICYmIChjaGFuZ2VzLm1pbiB8fCBjaGFuZ2VzLm1heCB8fCBjaGFuZ2VzLnN0ZXApKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlci51cGRhdGVPcHRpb25zKHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IHRoaXMuc3RlcFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b1ZhbHVlcyh2YWx1ZXM6IHN0cmluZ1tdKTogYW55IHwgYW55W10ge1xuICAgICAgICBsZXQgdiA9IHZhbHVlcy5tYXAodGhpcy5jb25maWcuZm9ybWF0LmZyb20pO1xuICAgICAgICByZXR1cm4gKHYubGVuZ3RoID09IDEgPyB2WzBdIDogdik7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNsaWRlcikge1xuICAgICAgICAgICAgdGhpcy5zbGlkZXIuc2V0KHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9ICEhaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGV2ZW50SGFuZGxlciA9IChlbWl0dGVyOiBFdmVudEVtaXR0ZXI8YW55PiwgdmFsdWVzOiBzdHJpbmdbXSwgaGFuZGxlOiBudW1iZXIsIHVuZW5jb2RlZDogbnVtYmVyW10pID0+IHtcbiAgICAgICAgbGV0IHYgPSB0aGlzLnRvVmFsdWVzKHZhbHVlcyk7XG4gICAgICAgIGxldCBlbWl0RXZlbnRzID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHYpICYmIHRoaXMudmFsdWVbaGFuZGxlXSAhPSB2W2hhbmRsZV0pIHtcbiAgICAgICAgICAgIGVtaXRFdmVudHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2KSAmJiB0aGlzLnZhbHVlICE9IHYpIHtcbiAgICAgICAgICAgIGVtaXRFdmVudHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbWl0RXZlbnRzKSB7XG4gICAgICAgICAgICBlbWl0dGVyLmVtaXQodik7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHYpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlW2hhbmRsZV0gPSB2W2hhbmRsZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGVmYXVsdEtleUhhbmRsZXIgPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICBsZXQgc3RlcFNpemU6IGFueVtdID0gdGhpcy5zbGlkZXIuc3RlcHMoKTtcbiAgICAgICAgbGV0IGluZGV4ID0gcGFyc2VJbnQoKDxIVE1MRWxlbWVudD5lLnRhcmdldCkuZ2V0QXR0cmlidXRlKCdkYXRhLWhhbmRsZScpKTtcbiAgICAgICAgbGV0IHNpZ24gPSAxO1xuICAgICAgICBsZXQgbXVsdGlwbGllcjogbnVtYmVyID0gMTtcbiAgICAgICAgbGV0IHN0ZXAgPSAwO1xuICAgICAgICBsZXQgZGVsdGEgPSAwO1xuXG4gICAgICAgIHN3aXRjaCAoZS53aGljaCkge1xuICAgICAgICAgICAgY2FzZSAzNDogIC8vIFBhZ2VEb3duXG4gICAgICAgICAgICAgICAgbXVsdGlwbGllciA9IHRoaXMuY29uZmlnLnBhZ2VTdGVwcztcbiAgICAgICAgICAgIGNhc2UgNDA6ICAvLyBBcnJvd0Rvd25cbiAgICAgICAgICAgIGNhc2UgMzc6ICAvLyBBcnJvd0xlZnRcbiAgICAgICAgICAgICAgICBzaWduID0gLTE7XG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXBTaXplW2luZGV4XVswXTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMzM6ICAvLyBQYWdlVXBcbiAgICAgICAgICAgICAgICBtdWx0aXBsaWVyID0gdGhpcy5jb25maWcucGFnZVN0ZXBzO1xuICAgICAgICAgICAgY2FzZSAzODogIC8vIEFycm93VXBcbiAgICAgICAgICAgIGNhc2UgMzk6ICAvLyBBcnJvd1JpZ2h0XG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXBTaXplW2luZGV4XVsxXTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBkZWx0YSA9IHNpZ24gKiBtdWx0aXBsaWVyICogc3RlcDtcbiAgICAgICAgbGV0IG5ld1ZhbHVlOiBudW1iZXIgfCBudW1iZXJbXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnZhbHVlKSkge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBbXS5jb25jYXQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBuZXdWYWx1ZVtpbmRleF0gPSBuZXdWYWx1ZVtpbmRleF0gKyBkZWx0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy52YWx1ZSArIGRlbHRhO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zbGlkZXIuc2V0KG5ld1ZhbHVlKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW10sXG4gICAgZXhwb3J0czogW05vdWlzbGlkZXJDb21wb25lbnRdLFxuICAgIGRlY2xhcmF0aW9uczogW05vdWlzbGlkZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOb3Vpc2xpZGVyTW9kdWxlIHtcbn1cbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJub1VpU2xpZGVyLmNyZWF0ZSIsInRzbGliXzEuX192YWx1ZXMiLCJDb21wb25lbnQiLCJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJFbGVtZW50UmVmIiwiUmVuZGVyZXIyIiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0Esc0JBNEZ5QixDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNO29CQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDM0M7U0FDSixDQUFDO0lBQ04sQ0FBQzs7Ozs7O1FDckZEOzs7Ozs7O1FBQ0ksNkJBQUU7Ozs7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