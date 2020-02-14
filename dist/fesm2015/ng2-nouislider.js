import { __decorate } from 'tslib';
import { create } from 'nouislider';
import { EventEmitter, ElementRef, Renderer2, Input, Output, Component, forwardRef, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

var NouisliderComponent_1;
class DefaultFormatter {
    to(value) {
        // formatting with http://stackoverflow.com/a/26463364/478584
        return String(parseFloat(parseFloat(String(value)).toFixed(2)));
    }
    from(value) {
        return parseFloat(value);
    }
}
let NouisliderComponent = NouisliderComponent_1 = class NouisliderComponent {
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
            let v = this.toValues(values);
            let emitEvents = false;
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
            let stepSize = this.slider.steps();
            let index = parseInt(e.target.getAttribute('data-handle'));
            let sign = 1;
            let multiplier = 1;
            let step = 0;
            let delta = 0;
            switch (e.which) {
                case 34: // PageDown
                    multiplier = this.config.pageSteps;
                case 40: // ArrowDown
                case 37: // ArrowLeft
                    sign = -1;
                    step = stepSize[index][0];
                    e.preventDefault();
                    break;
                case 33: // PageUp
                    multiplier = this.config.pageSteps;
                case 38: // ArrowUp
                case 39: // ArrowRight
                    step = stepSize[index][1];
                    e.preventDefault();
                    break;
                default:
                    break;
            }
            delta = sign * multiplier * step;
            let newValue;
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
    ngOnInit() {
        let inputsConfig = JSON.parse(JSON.stringify({
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
            for (let handle of this.handles) {
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
    toValues(values) {
        let v = values.map(this.config.format.from);
        return (v.length == 1 ? v[0] : v);
    }
    writeValue(value) {
        if (this.slider) {
            this.slider.set(value);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = !!isDisabled;
    }
};
NouisliderComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
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
                useExisting: forwardRef(() => NouisliderComponent_1),
                multi: true
            }
        ],
        styles: [`
        :host {
            display: block;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
    `]
    })
], NouisliderComponent);
let NouisliderModule = class NouisliderModule {
};
NouisliderModule = __decorate([
    NgModule({
        imports: [],
        exports: [NouisliderComponent],
        declarations: [NouisliderComponent],
    })
], NouisliderModule);

/**
 * Generated bundle index. Do not edit.
 */

export { DefaultFormatter, NouisliderComponent, NouisliderModule };
//# sourceMappingURL=ng2-nouislider.js.map
