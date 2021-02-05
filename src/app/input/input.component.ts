import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../app.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Input()
  buttonName: string = 'Add Item';

  @Input()
  edit: Todo;

  @Input()
  buttonColor: string = 'palevioletred';

  @Output()
  save = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      text: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const trimedParamValue = this.form.value.text.trim();
    if (trimedParamValue !== '') {
      this.save.emit(trimedParamValue);
      this.form.controls.text.setValue('');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.edit && changes.edit?.currentValue !== changes.edit?.previousValue) {
      this.form.controls.text.setValue(this.edit.title);
    }
  }
}
