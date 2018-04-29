import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    OnChanges,
    Output,
    NgModule,
    AfterViewInit,
    ViewChild
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
    Options as INouisliderOptions,
    noUiSlider as INouislider,
    create as createNouislider
} from 'nouislider';

export interface NouiFormatter {
    to(value: number): string;

    from(value: string): number;
}

export class DefaultFormatter implements NouiFormatter {
    to(value: number): string {
        // formatting with http://stackoverflow.com/a/26463364/478584
        return String(parseFloat(parseFloat(String(value)).toFixed(2)));
    };

    from(value: string): number {
        return parseFloat(value);
    }
}

@Component({
    selector: 'nouislider',
    host: {
        '[class.ng2-nouislider]': 'true'
    },
    template: '<div [attr.disabled]="disabled ? true : null" #slider></div>',
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
})
export class NouisliderComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
    public slider: INouislider;

    @Input() public start: boolean;
    @Input() public disabled: boolean;
    @Input() public behaviour: string;
    @Input() public connect: boolean[];
    @Input() public limit: number;
    @Input() public min: number;
    @Input() public max: number;
    @Input() public step: number;
    @Input() public format: NouiFormatter;
    @Input() public pageSteps: number;
    @Input() public options: INouisliderOptions;
    @Input() public ngModel: number | number[];
    @Input() public keyboard: boolean;
    @Input() public onKeydown: any;
    @Input() public formControl: FormControl;
    @Input() public tooltips: Array<any>;
    @Output() public change: EventEmitter<any> = new EventEmitter(true);
    @Output() public update: EventEmitter<any> = new EventEmitter(true);
    @Output() public slide: EventEmitter<any> = new EventEmitter(true);
    @Output() public set: EventEmitter<any> = new EventEmitter(true);
    @Output() public startChange: EventEmitter<any> = new EventEmitter(true);
    @Output() public end: EventEmitter<any> = new EventEmitter(true);

    @ViewChild('slider') sliderElem: ElementRef;

    private value: any;
    private onChange: any = Function.prototype;
    private onTouched: any = Function.prototype;

    constructor(private el: ElementRef) {

    }

    ngOnInit(): void {
        // let inputsConfig = JSON.parse(JSON.stringify({
        //     behaviour: this.behaviour,
        //     connect: this.connect,
        //     limit: this.limit,
        //     start: this.formControl !== undefined ? this.formControl.value : this.ngModel,
        //     step: this.step,
        //     pageSteps: this.pageSteps,
        //     keyboard: this.keyboard,
        //     onKeydown: this.onKeydown,
        //     range: this.options.range || {
        //         min: this.min,
        //         max: this.max
        //     },
        //     tooltips: this.tooltips,
        // }));

        // inputsConfig.format = this.format || this.options.format || new DefaultFormatter();

        // createNouislider(
        //     this.el.nativeElement.querySelector('div'),
        // Object.assign(this.options, inputsConfig)
        // );


        // this.handles = [].slice.call(this.el.nativeElement.querySelectorAll('.noUi-handle'));

        // todo
        // if (this.options.keyboard) {
        //     if (this.options.pageSteps === undefined) {
        //         this.options.pageSteps = 10;
        //     }
        //     for (let handle of this.handles) {
        //         handle.setAttribute('tabindex', 0);
        //         handle.addEventListener('click', () => {
        //             handle.focus();
        //         });
        //         if (this.options.onKeydown === undefined) {
        //             handle.addEventListener('keydown', this.defaultKeyHandler);
        //         } else {
        //             handle.addEventListener('keydown', this.options.onKeydown);
        //         }
        //     }
        // }

        // this.slider.on('set', (values: string[], handle: number, unencoded: number[]) => {
        //     this.eventHandler(this.set, values, handle, unencoded);
        // });
        //
        // this.slider.on('update', (values: string[], handle: number, unencoded: number[]) => {
        //     this.update.emit(this.toValues(values));
        // });
        //
        // this.slider.on('change', (values: string[], handle: number, unencoded: number[]) => {
        //     this.change.emit(this.toValues(values));
        // });
        //
        // this.slider.on('slide', (values: string[], handle: number, unencoded: number[]) => {
        //     this.eventHandler(this.slide, values, handle, unencoded);
        // });
        //
        // this.slider.on('start', (values: string[], handle: number, unencoded: number[]) => {
        //     this.start.emit(this.toValues(values));
        // });
        //
        // this.slider.on('end', (values: string[], handle: number, unencoded: number[]) => {
        //     this.end.emit(this.toValues(values));
        // });
    }

    ngOnChanges(changes: any) {
        if (this.slider && (changes.min || changes.max || changes.step)) {
            setTimeout(() => {
                // this.slider.updateOptions({ todo
                //     range: {
                //         min: this.min,
                //         max: this.max
                //     },
                //     step: this.step
                // });
            });
        }
    }

    toValues(values: string[]): any | any[] {
        // let v = values.map(this.options.format.from); // todo
        // return (v.length == 1 ? v[0] : v);
    }

    writeValue(value: any): void {
        if (this.slider) {
            this.slider.set(value);
        }
    }

    registerOnChange(fn: (value: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = !!isDisabled;
    }

    ngAfterViewInit(): void {
        this.buildSlider();
    }

    private eventHandler = (emitter: EventEmitter<any>, values: string[], handle: number, unencoded: number[]) => {
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
        } else {
            this.value = v;
        }
    };

    private buildSlider(): INouislider {
        debugger;
        const options: INouisliderOptions = {
            ...this.options,

        };
        createNouislider(
            this.sliderElem.nativeElement,
            options
        );
        return this.sliderElem.nativeElement;
    }

    // private defaultKeyHandler = (e: KeyboardEvent) => {
    //     // let stepSize: any[] = this.slider.steps();
    //     // let index = parseInt((<HTMLElement>e.target).getAttribute('data-handle'));
    //     // let sign = 1;
    //     // let multiplier: number = 1;
    //     // let step = 0;
    //     // let delta = 0;
    //     //
    //     // switch (e.which) {
    //     //     case 34:  // PageDown
    //     //         multiplier = this.options.pageSteps;
    //     //     case 40:  // ArrowDown
    //     //     case 37:  // ArrowLeft
    //     //         sign = -1;
    //     //         step = stepSize[index][0];
    //     //         e.preventDefault();
    //     //         break;
    //     //
    //     //     case 33:  // PageUp
    //     //         multiplier = this.options.pageSteps;
    //     //     case 38:  // ArrowUp
    //     //     case 39:  // ArrowRight
    //     //         step = stepSize[index][1];
    //     //         e.preventDefault();
    //     //         break;
    //     //
    //     //     default:
    //     //         break;
    //     // }
    //     //
    //     // delta = sign * multiplier * step;
    //     // let newValue: number | number[];
    //     //
    //     // if (Array.isArray(this.value)) {
    //     //     newValue = [].concat(this.value);
    //     //     newValue[index] = newValue[index] + delta;
    //     // } else {
    //     //     newValue = this.value + delta;
    //     // }
    //     //
    // }
    //     // this.slider.set(newValue); todo
}

@NgModule({
    imports: [],
    exports: [NouisliderComponent],
    declarations: [NouisliderComponent],
})
export class NouisliderModule {
}
