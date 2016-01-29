import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from 'angular2/core'
import {ControlContainer, NgForm, ControlValueAccessor, NgControl, Control, Validators}    from 'angular2/common';

@Component({
  selector: 'datepicker',
  templateUrl: 'app/controls/datepicker/datepicker.template.html',
})

export class DatePicker implements OnInit, ControlValueAccessor {
  @Input()  ngModel: Date;
  @Output() ngModelChange: EventEmitter<Date> = new EventEmitter<Date>();
  
  private _dateAsText: string;
  private _chineseDate: string;
  private _isRequired: boolean;
  private _onTouch: Function;
  private _onChange: Function;
  
  private _date: Control;
  
  updateDate(text: string) {
    if (text.split('-').length == 3 && 
       text.split('-').map(this.isNumericString).reduce((accu, curr) => accu && curr, true)) {
      let newDate = new Date();
      newDate.setFullYear(+text.split('-')[0], +text.split('-')[1] - 1, +text.split('-')[2])
      console.log(newDate);
      this._onChange();
      this.ngModelChange.emit(newDate);
    }
  }
  
  isNumericString(str: string) : boolean {
    if (str.length == 0) return false;
    let result = true;
    for (let index = 0; index < str.length; ++ index) {
      if (!(str.charCodeAt(index) >= '0'.charCodeAt(0) && str.charCodeAt(index) <= '9'.charCodeAt(0))) {
        result = false;
      }
    }
    
    return result;
  }
  
  touch() {
    this._onTouch();
  }
  
  writeValue(value: Date) : void {
    console.log('writeValue');
    if (value) {
      this._dateAsText = value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate();
      this._chineseDate = value.getFullYear() + ' 年 ' + (value.getMonth() + 1) + ' 月 ' + value.getDate() + ' 日';
    }
  }
  
  registerOnChange(fn: any) : void {
    this._onChange = fn;
  }
  
  registerOnTouched(fn: any) : void {
    this._onTouch = fn;
  }
  
  ngOnInit() {
    this._isRequired = false;
    if (this._elementRef.nativeElement.attributes.getNamedItem('required')) {
      this._isRequired = true;
    }
    this._control.valueAccessor = this;
    this._dateAsText = this.ngModel.getFullYear() + '-' + +(this.ngModel.getMonth() + 1) + '-' + +this.ngModel.getDate();
    this._chineseDate = this.ngModel.getFullYear() + ' 年 ' + (this.ngModel.getMonth() + 1) + ' 月 ' + this.ngModel.getDate() + ' 日';
  }
  
  constructor(private _elementRef: ElementRef, private _control: NgControl) {}
}