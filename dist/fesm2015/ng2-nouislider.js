import { create } from 'nouislider';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, NgModule, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DefaultFormatter {
    /**
     * @param {?} value
     * @return {?}
     */
    to(value) {
        // formatting with http://stackoverflow.com/a/26463364/478584
        return String(parseFloat(parseFloat(String(value)).toFixed(2)));
    }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    from(value) {
        return parseFloat(value);
    }
}
class NouisliderComponent {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
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
        this.eventHandler = (emitter, values, handle, unencoded) => {
            let /** @type {?} */ v = this.toValues(values);
            let /** @type {?} */ emitEvents = false;
            if (this.value === undefined) {
                this.value = v;
                return;
            }
            if (Array.isArray(v) && this.value[handle] != v[handle]) {
                emitEvents = true;
            }
            if (!Array.isArray(v) && this.value != v) {
                emitEvents = true;
            }
            if (emitEvents) {
                emitter.emit(v);
                this.onChange(v);
            }
            if (Array.isArray(v)) {
                this.value[handle] = v[handle];
            }
            else {
                this.value = v;
            }
        };
        this.defaultKeyHandler = (e) => {
            let /** @type {?} */ stepSize = this.slider.steps();
            let /** @type {?} */ index = parseInt((/** @type {?} */ (e.target)).getAttribute('data-handle'));
            let /** @type {?} */ sign = 1;
            let /** @type {?} */ multiplier = 1;
            let /** @type {?} */ step = 0;
            let /** @type {?} */ delta = 0;
            switch (e.which) {
                case 34:
                    // PageDown
                    multiplier = this.config.pageSteps;
                case 40: // ArrowDown
                case 37:
                    // ArrowLeft
                    sign = -1;
                    step = stepSize[index][0];
                    e.preventDefault();
                    break;
                case 33:
                    // PageUp
                    multiplier = this.config.pageSteps;
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
            let /** @type {?} */ newValue;
            if (Array.isArray(this.value)) {
                newValue = [].concat(this.value);
                newValue[index] = newValue[index] + delta;
            }
            else {
                newValue = this.value + delta;
            }
            this.slider.set(newValue);
        };
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        let /** @type {?} */ inputsConfig = JSON.parse(JSON.stringify({
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
            for (let /** @type {?} */ handle of this.handles) {
                handle.setAttribute('tabindex', 0);
                handle.addEventListener('click', () => {
                    handle.focus();
                });
                if (this.config.onKeydown === undefined) {
                    handle.addEventListener('keydown', this.defaultKeyHandler);
                }
                else {
                    handle.addEventListener('keydown', this.config.onKeydown);
                }
            }
        }
        this.slider.on('set', (values, handle, unencoded) => {
            this.eventHandler(this.set, values, handle, unencoded);
        });
        this.slider.on('update', (values, handle, unencoded) => {
            this.update.emit(this.toValues(values));
        });
        this.slider.on('change', (values, handle, unencoded) => {
            this.change.emit(this.toValues(values));
        });
        this.slider.on('slide', (values, handle, unencoded) => {
            this.eventHandler(this.slide, values, handle, unencoded);
        });
        this.slider.on('start', (values, handle, unencoded) => {
            this.start.emit(this.toValues(values));
        });
        this.slider.on('end', (values, handle, unencoded) => {
            this.end.emit(this.toValues(values));
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.slider && (changes.min || changes.max || changes.step)) {
            setTimeout(() => {
                this.slider.updateOptions({
                    range: {
                        min: this.min,
                        max: this.max
                    },
                    step: this.step
                });
            });
        }
    }
    /**
     * @param {?} values
     * @return {?}
     */
    toValues(values) {
        let /** @type {?} */ v = values.map(this.config.format.from);
        return (v.length == 1 ? v[0] : v);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.slider) {
            this.slider.set(value);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = !!isDisabled;
    }
}
NouisliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'nouislider',
                host: {
                    '[class.ng2-nouislider]': 'true'
                },
                template: '<div [attr.disabled]="disabled ? true : undefined"></div>',
                styles: [`
        :host {
            display: block;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
    `],
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NouisliderComponent),
                        multi: true
                    }
                ]
            },] },
];
/** @nocollapse */
NouisliderComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
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
class NouisliderModule {
}
NouisliderModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [NouisliderComponent],
                declarations: [NouisliderComponent],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { DefaultFormatter, NouisliderComponent, NouisliderModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLW5vdWlzbGlkZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nMi1ub3Vpc2xpZGVyL25vdWlzbGlkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbm9VaVNsaWRlciBmcm9tICdub3Vpc2xpZGVyJztcbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBSZW5kZXJlcjIsXG4gICAgQWZ0ZXJWaWV3SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgRm9ybUNvbnRyb2wsXG4gICAgTkdfVkFMVUVfQUNDRVNTT1Jcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE5vdWlGb3JtYXR0ZXIge1xuICAgIHRvKHZhbHVlOiBudW1iZXIpOiBzdHJpbmc7XG5cbiAgICBmcm9tKHZhbHVlOiBzdHJpbmcpOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBpcHMge1xuICAgIG1vZGU6ICdyYW5nZSc7XG4gICAgZGVuc2l0eTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdEZvcm1hdHRlciBpbXBsZW1lbnRzIE5vdWlGb3JtYXR0ZXIge1xuICAgIHRvKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICAvLyBmb3JtYXR0aW5nIHdpdGggaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY0NjMzNjQvNDc4NTg0XG4gICAgICAgIHJldHVybiBTdHJpbmcocGFyc2VGbG9hdChwYXJzZUZsb2F0KFN0cmluZyh2YWx1ZSkpLnRvRml4ZWQoMikpKTtcbiAgICB9O1xuXG4gICAgZnJvbSh2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdub3Vpc2xpZGVyJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MubmcyLW5vdWlzbGlkZXJdJzogJ3RydWUnXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogJzxkaXYgW2F0dHIuZGlzYWJsZWRdPVwiZGlzYWJsZWQgPyB0cnVlIDogdW5kZWZpbmVkXCI+PC9kaXY+JyxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgICAgIH1cbiAgICBgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOb3Vpc2xpZGVyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5vdWlzbGlkZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIHB1YmxpYyBzbGlkZXI6IGFueTtcbiAgICBwdWJsaWMgaGFuZGxlczogYW55W107XG4gICAgQElucHV0KCkgcHVibGljIGRpc2FibGVkOiBib29sZWFuOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgQElucHV0KCkgcHVibGljIGJlaGF2aW91cjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjb25uZWN0OiBib29sZWFuW107XG4gICAgQElucHV0KCkgcHVibGljIGxpbWl0OiBudW1iZXI7XG4gICAgQElucHV0KCkgcHVibGljIG1pbjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBtYXg6IG51bWJlcjtcbiAgICBASW5wdXQoKSBwdWJsaWMgc3RlcDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmb3JtYXQ6IE5vdWlGb3JtYXR0ZXI7XG4gICAgQElucHV0KCkgcHVibGljIHBhZ2VTdGVwczogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjb25maWc6IGFueSA9IHt9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBuZ01vZGVsOiBudW1iZXIgfCBudW1iZXJbXTtcbiAgICBASW5wdXQoKSBwdWJsaWMga2V5Ym9hcmQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcHVibGljIG9uS2V5ZG93bjogYW55O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgQElucHV0KCkgcHVibGljIHRvb2x0aXBzOiBBcnJheTxhbnk+O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwaXBzOiBJUGlwcztcbiAgICBAT3V0cHV0KCkgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgdXBkYXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBzbGlkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgc2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBzdGFydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgZW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gICAgcHJpdmF0ZSB2YWx1ZTogYW55O1xuICAgIHByaXZhdGUgb25DaGFuZ2U6IGFueSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgICBwcml2YXRlIG9uVG91Y2hlZDogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBsZXQgaW5wdXRzQ29uZmlnID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBiZWhhdmlvdXI6IHRoaXMuYmVoYXZpb3VyLFxuICAgICAgICAgICAgY29ubmVjdDogdGhpcy5jb25uZWN0LFxuICAgICAgICAgICAgbGltaXQ6IHRoaXMubGltaXQsXG4gICAgICAgICAgICBzdGFydDogdGhpcy5mb3JtQ29udHJvbCAhPT0gdW5kZWZpbmVkID8gdGhpcy5mb3JtQ29udHJvbC52YWx1ZSA6IHRoaXMubmdNb2RlbCxcbiAgICAgICAgICAgIHN0ZXA6IHRoaXMuc3RlcCxcbiAgICAgICAgICAgIHBhZ2VTdGVwczogdGhpcy5wYWdlU3RlcHMsXG4gICAgICAgICAgICBrZXlib2FyZDogdGhpcy5rZXlib2FyZCxcbiAgICAgICAgICAgIG9uS2V5ZG93bjogdGhpcy5vbktleWRvd24sXG4gICAgICAgICAgICByYW5nZTogdGhpcy5jb25maWcucmFuZ2UgfHwge1xuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW4sXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBpcHM6IHRoaXMucGlwc1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgaW5wdXRzQ29uZmlnLmZvcm1hdCA9IHRoaXMuZm9ybWF0IHx8IHRoaXMuY29uZmlnLmZvcm1hdCB8fCBuZXcgRGVmYXVsdEZvcm1hdHRlcigpO1xuICAgICAgICBpbnB1dHNDb25maWcudG9vbHRpcHMgPSB0aGlzLnRvb2x0aXBzIHx8IHRoaXMuY29uZmlnLnRvb2x0aXBzO1xuXG4gICAgICAgIHRoaXMuc2xpZGVyID0gbm9VaVNsaWRlci5jcmVhdGUoXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2JyksXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBpbnB1dHNDb25maWcpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVzID0gW10uc2xpY2UuY2FsbCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5vVWktaGFuZGxlJykpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5rZXlib2FyZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLnBhZ2VTdGVwcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcucGFnZVN0ZXBzID0gMTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBoYW5kbGUgb2YgdGhpcy5oYW5kbGVzKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICAgICAgICAgICAgICBoYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5vbktleWRvd24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuZGVmYXVsdEtleUhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5jb25maWcub25LZXlkb3duKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNsaWRlci5vbignc2V0JywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcih0aGlzLnNldCwgdmFsdWVzLCBoYW5kbGUsIHVuZW5jb2RlZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2xpZGVyLm9uKCd1cGRhdGUnLCAodmFsdWVzOiBzdHJpbmdbXSwgaGFuZGxlOiBudW1iZXIsIHVuZW5jb2RlZDogbnVtYmVyW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlLmVtaXQodGhpcy50b1ZhbHVlcyh2YWx1ZXMpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zbGlkZXIub24oJ2NoYW5nZScsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLnRvVmFsdWVzKHZhbHVlcykpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNsaWRlci5vbignc2xpZGUnLCAodmFsdWVzOiBzdHJpbmdbXSwgaGFuZGxlOiBudW1iZXIsIHVuZW5jb2RlZDogbnVtYmVyW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyKHRoaXMuc2xpZGUsIHZhbHVlcywgaGFuZGxlLCB1bmVuY29kZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNsaWRlci5vbignc3RhcnQnLCAodmFsdWVzOiBzdHJpbmdbXSwgaGFuZGxlOiBudW1iZXIsIHVuZW5jb2RlZDogbnVtYmVyW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQuZW1pdCh0aGlzLnRvVmFsdWVzKHZhbHVlcykpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNsaWRlci5vbignZW5kJywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVuZC5lbWl0KHRoaXMudG9WYWx1ZXModmFsdWVzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5zbGlkZXIgJiYgKGNoYW5nZXMubWluIHx8IGNoYW5nZXMubWF4IHx8IGNoYW5nZXMuc3RlcCkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyLnVwZGF0ZU9wdGlvbnMoe1xuICAgICAgICAgICAgICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pbixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogdGhpcy5zdGVwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvVmFsdWVzKHZhbHVlczogc3RyaW5nW10pOiBhbnkgfCBhbnlbXSB7XG4gICAgICAgIGxldCB2ID0gdmFsdWVzLm1hcCh0aGlzLmNvbmZpZy5mb3JtYXQuZnJvbSk7XG4gICAgICAgIHJldHVybiAodi5sZW5ndGggPT0gMSA/IHZbMF0gOiB2KTtcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlci5zZXQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gISFpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgZXZlbnRIYW5kbGVyID0gKGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+LCB2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgICBsZXQgdiA9IHRoaXMudG9WYWx1ZXModmFsdWVzKTtcbiAgICAgICAgbGV0IGVtaXRFdmVudHMgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHY7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodikgJiYgdGhpcy52YWx1ZVtoYW5kbGVdICE9IHZbaGFuZGxlXSkge1xuICAgICAgICAgICAgZW1pdEV2ZW50cyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHYpICYmIHRoaXMudmFsdWUgIT0gdikge1xuICAgICAgICAgICAgZW1pdEV2ZW50cyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVtaXRFdmVudHMpIHtcbiAgICAgICAgICAgIGVtaXR0ZXIuZW1pdCh2KTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2Uodik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodikpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVbaGFuZGxlXSA9IHZbaGFuZGxlXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWZhdWx0S2V5SGFuZGxlciA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGxldCBzdGVwU2l6ZTogYW55W10gPSB0aGlzLnNsaWRlci5zdGVwcygpO1xuICAgICAgICBsZXQgaW5kZXggPSBwYXJzZUludCgoPEhUTUxFbGVtZW50PmUudGFyZ2V0KS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaGFuZGxlJykpO1xuICAgICAgICBsZXQgc2lnbiA9IDE7XG4gICAgICAgIGxldCBtdWx0aXBsaWVyOiBudW1iZXIgPSAxO1xuICAgICAgICBsZXQgc3RlcCA9IDA7XG4gICAgICAgIGxldCBkZWx0YSA9IDA7XG5cbiAgICAgICAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgICAgICAgICBjYXNlIDM0OiAgLy8gUGFnZURvd25cbiAgICAgICAgICAgICAgICBtdWx0aXBsaWVyID0gdGhpcy5jb25maWcucGFnZVN0ZXBzO1xuICAgICAgICAgICAgY2FzZSA0MDogIC8vIEFycm93RG93blxuICAgICAgICAgICAgY2FzZSAzNzogIC8vIEFycm93TGVmdFxuICAgICAgICAgICAgICAgIHNpZ24gPSAtMTtcbiAgICAgICAgICAgICAgICBzdGVwID0gc3RlcFNpemVbaW5kZXhdWzBdO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAzMzogIC8vIFBhZ2VVcFxuICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgPSB0aGlzLmNvbmZpZy5wYWdlU3RlcHM7XG4gICAgICAgICAgICBjYXNlIDM4OiAgLy8gQXJyb3dVcFxuICAgICAgICAgICAgY2FzZSAzOTogIC8vIEFycm93UmlnaHRcbiAgICAgICAgICAgICAgICBzdGVwID0gc3RlcFNpemVbaW5kZXhdWzFdO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbHRhID0gc2lnbiAqIG11bHRpcGxpZXIgKiBzdGVwO1xuICAgICAgICBsZXQgbmV3VmFsdWU6IG51bWJlciB8IG51bWJlcltdO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IFtdLmNvbmNhdCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlW2luZGV4XSA9IG5ld1ZhbHVlW2luZGV4XSArIGRlbHRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlICsgZGVsdGE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNsaWRlci5zZXQobmV3VmFsdWUpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXSxcbiAgICBleHBvcnRzOiBbTm91aXNsaWRlckNvbXBvbmVudF0sXG4gICAgZGVjbGFyYXRpb25zOiBbTm91aXNsaWRlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5vdWlzbGlkZXJNb2R1bGUge1xufVxuIl0sIm5hbWVzIjpbIm5vVWlTbGlkZXIuY3JlYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7OztJQStCSSxFQUFFLENBQUMsS0FBYTs7UUFFWixPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkU7Ozs7OztJQUVELElBQUksQ0FB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