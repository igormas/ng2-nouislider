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
    ngOnInit() {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLW5vdWlzbGlkZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nMi1ub3Vpc2xpZGVyL25vdWlzbGlkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbm9VaVNsaWRlciBmcm9tICdub3Vpc2xpZGVyJztcbmltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE91dHB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBSZW5kZXJlcjIsXG4gICAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgICBGb3JtQ29udHJvbCxcbiAgICBOR19WQUxVRV9BQ0NFU1NPUlxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm91aUZvcm1hdHRlciB7XG4gICAgdG8odmFsdWU6IG51bWJlcik6IHN0cmluZztcblxuICAgIGZyb20odmFsdWU6IHN0cmluZyk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUGlwcyB7XG4gICAgbW9kZTogJ3JhbmdlJztcbiAgICBkZW5zaXR5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0Rm9ybWF0dGVyIGltcGxlbWVudHMgTm91aUZvcm1hdHRlciB7XG4gICAgdG8odmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIC8vIGZvcm1hdHRpbmcgd2l0aCBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjQ2MzM2NC80Nzg1ODRcbiAgICAgICAgcmV0dXJuIFN0cmluZyhwYXJzZUZsb2F0KHBhcnNlRmxvYXQoU3RyaW5nKHZhbHVlKSkudG9GaXhlZCgyKSkpO1xuICAgIH1cblxuICAgIGZyb20odmFsdWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbm91aXNsaWRlcicsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLm5nMi1ub3Vpc2xpZGVyXSc6ICd0cnVlJ1xuICAgIH0sXG4gICAgdGVtcGxhdGU6ICc8ZGl2IFthdHRyLmRpc2FibGVkXT1cImRpc2FibGVkID8gdHJ1ZSA6IHVuZGVmaW5lZFwiPjwvZGl2PicsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICAgICAgICB9XG4gICAgYF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTm91aXNsaWRlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOb3Vpc2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIHB1YmxpYyBzbGlkZXI6IGFueTtcbiAgICBwdWJsaWMgaGFuZGxlczogYW55W107XG4gICAgQElucHV0KCkgcHVibGljIGRpc2FibGVkOiBib29sZWFuOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lXG4gICAgQElucHV0KCkgcHVibGljIGJlaGF2aW91cjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjb25uZWN0OiBib29sZWFuW107XG4gICAgQElucHV0KCkgcHVibGljIGxpbWl0OiBudW1iZXI7XG4gICAgQElucHV0KCkgcHVibGljIG1pbjogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBtYXg6IG51bWJlcjtcbiAgICBASW5wdXQoKSBwdWJsaWMgc3RlcDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmb3JtYXQ6IE5vdWlGb3JtYXR0ZXI7XG4gICAgQElucHV0KCkgcHVibGljIHBhZ2VTdGVwczogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHB1YmxpYyBjb25maWc6IGFueSA9IHt9O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBuZ01vZGVsOiBudW1iZXIgfCBudW1iZXJbXTtcbiAgICBASW5wdXQoKSBwdWJsaWMga2V5Ym9hcmQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgcHVibGljIG9uS2V5ZG93bjogYW55O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgQElucHV0KCkgcHVibGljIHRvb2x0aXBzOiBBcnJheTxhbnk+O1xuICAgIEBJbnB1dCgpIHB1YmxpYyBwaXBzOiBJUGlwcztcbiAgICBAT3V0cHV0KCkgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgdXBkYXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBzbGlkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgc2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gICAgQE91dHB1dCgpIHB1YmxpYyBzdGFydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKHRydWUpO1xuICAgIEBPdXRwdXQoKSBwdWJsaWMgZW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIodHJ1ZSk7XG4gICAgcHJpdmF0ZSB2YWx1ZTogYW55O1xuICAgIHByaXZhdGUgb25DaGFuZ2U6IGFueSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgICBwcml2YXRlIG9uVG91Y2hlZDogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGxldCBpbnB1dHNDb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIGJlaGF2aW91cjogdGhpcy5iZWhhdmlvdXIsXG4gICAgICAgICAgICBjb25uZWN0OiB0aGlzLmNvbm5lY3QsXG4gICAgICAgICAgICBsaW1pdDogdGhpcy5saW1pdCxcbiAgICAgICAgICAgIHN0YXJ0OiB0aGlzLmZvcm1Db250cm9sICE9PSB1bmRlZmluZWQgPyB0aGlzLmZvcm1Db250cm9sLnZhbHVlIDogdGhpcy5uZ01vZGVsLFxuICAgICAgICAgICAgc3RlcDogdGhpcy5zdGVwLFxuICAgICAgICAgICAgcGFnZVN0ZXBzOiB0aGlzLnBhZ2VTdGVwcyxcbiAgICAgICAgICAgIGtleWJvYXJkOiB0aGlzLmtleWJvYXJkLFxuICAgICAgICAgICAgb25LZXlkb3duOiB0aGlzLm9uS2V5ZG93bixcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLmNvbmZpZy5yYW5nZSB8fCB7XG4gICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pbixcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGlwczogdGhpcy5waXBzXG4gICAgICAgIH0pKTtcblxuICAgICAgICBpbnB1dHNDb25maWcuZm9ybWF0ID0gdGhpcy5mb3JtYXQgfHwgdGhpcy5jb25maWcuZm9ybWF0IHx8IG5ldyBEZWZhdWx0Rm9ybWF0dGVyKCk7XG4gICAgICAgIGlucHV0c0NvbmZpZy50b29sdGlwcyA9IHRoaXMudG9vbHRpcHMgfHwgdGhpcy5jb25maWcudG9vbHRpcHM7XG5cbiAgICAgICAgdGhpcy5zbGlkZXIgPSBub1VpU2xpZGVyLmNyZWF0ZShcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdkaXYnKSxcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIGlucHV0c0NvbmZpZylcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmhhbmRsZXMgPSBbXS5zbGljZS5jYWxsKHRoaXMuZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubm9VaS1oYW5kbGUnKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmtleWJvYXJkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcucGFnZVN0ZXBzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5wYWdlU3RlcHMgPSAxMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGhhbmRsZSBvZiB0aGlzLmhhbmRsZXMpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGUuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICAgICAgICAgICAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm9uS2V5ZG93biA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5kZWZhdWx0S2V5SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmNvbmZpZy5vbktleWRvd24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2xpZGVyLm9uKCdzZXQnLCAodmFsdWVzOiBzdHJpbmdbXSwgaGFuZGxlOiBudW1iZXIsIHVuZW5jb2RlZDogbnVtYmVyW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyKHRoaXMuc2V0LCB2YWx1ZXMsIGhhbmRsZSwgdW5lbmNvZGVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zbGlkZXIub24oJ3VwZGF0ZScsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUuZW1pdCh0aGlzLnRvVmFsdWVzKHZhbHVlcykpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNsaWRlci5vbignY2hhbmdlJywgKHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZS5lbWl0KHRoaXMudG9WYWx1ZXModmFsdWVzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2xpZGVyLm9uKCdzbGlkZScsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIodGhpcy5zbGlkZSwgdmFsdWVzLCBoYW5kbGUsIHVuZW5jb2RlZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2xpZGVyLm9uKCdzdGFydCcsICh2YWx1ZXM6IHN0cmluZ1tdLCBoYW5kbGU6IG51bWJlciwgdW5lbmNvZGVkOiBudW1iZXJbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGFydC5lbWl0KHRoaXMudG9WYWx1ZXModmFsdWVzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc2xpZGVyLm9uKCdlbmQnLCAodmFsdWVzOiBzdHJpbmdbXSwgaGFuZGxlOiBudW1iZXIsIHVuZW5jb2RlZDogbnVtYmVyW10pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW5kLmVtaXQodGhpcy50b1ZhbHVlcyh2YWx1ZXMpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnNsaWRlciAmJiAoY2hhbmdlcy5taW4gfHwgY2hhbmdlcy5tYXggfHwgY2hhbmdlcy5zdGVwKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXIudXBkYXRlT3B0aW9ucyh7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdGVwOiB0aGlzLnN0ZXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9WYWx1ZXModmFsdWVzOiBzdHJpbmdbXSk6IGFueSB8IGFueVtdIHtcbiAgICAgICAgbGV0IHYgPSB2YWx1ZXMubWFwKHRoaXMuY29uZmlnLmZvcm1hdC5mcm9tKTtcbiAgICAgICAgcmV0dXJuICh2Lmxlbmd0aCA9PSAxID8gdlswXSA6IHYpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zbGlkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyLnNldCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSAhIWlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBldmVudEhhbmRsZXIgPSAoZW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4sIHZhbHVlczogc3RyaW5nW10sIGhhbmRsZTogbnVtYmVyLCB1bmVuY29kZWQ6IG51bWJlcltdKSA9PiB7XG4gICAgICAgIGxldCB2ID0gdGhpcy50b1ZhbHVlcyh2YWx1ZXMpO1xuICAgICAgICBsZXQgZW1pdEV2ZW50cyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2KSAmJiB0aGlzLnZhbHVlW2hhbmRsZV0gIT0gdltoYW5kbGVdKSB7XG4gICAgICAgICAgICBlbWl0RXZlbnRzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodikgJiYgdGhpcy52YWx1ZSAhPSB2KSB7XG4gICAgICAgICAgICBlbWl0RXZlbnRzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW1pdEV2ZW50cykge1xuICAgICAgICAgICAgZW1pdHRlci5lbWl0KHYpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh2KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZVtoYW5kbGVdID0gdltoYW5kbGVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHY7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRlZmF1bHRLZXlIYW5kbGVyID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgbGV0IHN0ZXBTaXplOiBhbnlbXSA9IHRoaXMuc2xpZGVyLnN0ZXBzKCk7XG4gICAgICAgIGxldCBpbmRleCA9IHBhcnNlSW50KCg8SFRNTEVsZW1lbnQ+ZS50YXJnZXQpLmdldEF0dHJpYnV0ZSgnZGF0YS1oYW5kbGUnKSk7XG4gICAgICAgIGxldCBzaWduID0gMTtcbiAgICAgICAgbGV0IG11bHRpcGxpZXI6IG51bWJlciA9IDE7XG4gICAgICAgIGxldCBzdGVwID0gMDtcbiAgICAgICAgbGV0IGRlbHRhID0gMDtcblxuICAgICAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMzQ6ICAvLyBQYWdlRG93blxuICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgPSB0aGlzLmNvbmZpZy5wYWdlU3RlcHM7XG4gICAgICAgICAgICBjYXNlIDQwOiAgLy8gQXJyb3dEb3duXG4gICAgICAgICAgICBjYXNlIDM3OiAgLy8gQXJyb3dMZWZ0XG4gICAgICAgICAgICAgICAgc2lnbiA9IC0xO1xuICAgICAgICAgICAgICAgIHN0ZXAgPSBzdGVwU2l6ZVtpbmRleF1bMF07XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDMzOiAgLy8gUGFnZVVwXG4gICAgICAgICAgICAgICAgbXVsdGlwbGllciA9IHRoaXMuY29uZmlnLnBhZ2VTdGVwcztcbiAgICAgICAgICAgIGNhc2UgMzg6ICAvLyBBcnJvd1VwXG4gICAgICAgICAgICBjYXNlIDM5OiAgLy8gQXJyb3dSaWdodFxuICAgICAgICAgICAgICAgIHN0ZXAgPSBzdGVwU2l6ZVtpbmRleF1bMV07XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsdGEgPSBzaWduICogbXVsdGlwbGllciAqIHN0ZXA7XG4gICAgICAgIGxldCBuZXdWYWx1ZTogbnVtYmVyIHwgbnVtYmVyW107XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gW10uY29uY2F0KHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgbmV3VmFsdWVbaW5kZXhdID0gbmV3VmFsdWVbaW5kZXhdICsgZGVsdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMudmFsdWUgKyBkZWx0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2xpZGVyLnNldChuZXdWYWx1ZSk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtdLFxuICAgIGV4cG9ydHM6IFtOb3Vpc2xpZGVyQ29tcG9uZW50XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtOb3Vpc2xpZGVyQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTm91aXNsaWRlck1vZHVsZSB7XG59XG4iXSwibmFtZXMiOlsibm9VaVNsaWRlci5jcmVhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7O0lBK0JJLEVBQUUsQ0FBQyxLQUFhOztRQUVaLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuRTs7Ozs7SUFFRCxJQUFJLENBQUMsS0FBYTtRQUNkLE9BQU8sVUFBVSxD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