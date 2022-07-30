import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DynamicFormComponent} from './dynamic-form.component';
import {DynamicFieldDirective} from './directives/dynamic-field.directive';
import {FormButtonComponent} from './fields/form-button/form-button.component';
import {FormInputComponent} from './fields/form-input/form-input.component';
import {FormTextareaComponent} from './fields/form-textarea/form-textarea.component';
import {RouterModule} from '@angular/router';
import {DynamicFormComponentsModule} from './components/dynamic-form.components.module';
import {FormNgSelectComponent} from './fields/form-ng-select/form-ng-select.component';
import {FormImageComponent} from './fields/form-image/form-image.component';
import {FormPasswordComponent} from './fields/form-password/form-password.component';
import {FormCheckboxComponent} from './fields/form-checkbox/form-checkbox.component';
import {FormJsonComponent} from './fields/form-json/form-json.component';
import {FormDatetimeComponent} from './fields/form-datetime/form-datetime.component';
import {FormRadioComponent} from './fields/form-radio/form-radio.component';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorTailorModule} from '@ngneat/error-tailor';
import {ValidationMessages} from '../../../../configs/validationMessages.config';
import {TranslateModule} from '@ngx-translate/core';
import {SvgModule} from '../../../other/svg/svg.module';
import {FormYearComponent} from './fields/form-year/form-year.component';
import {JsonControlComponent} from '../customFormControls/jsonControl/jsonControl.component';
import {PipeModule} from '../../../../pipes/pipe.module';
import {FormColorComponent} from './fields/form-color/form-color.component';
import {
  MAT_COLOR_FORMATS,
  NGX_MAT_COLOR_FORMATS,
  NgxMatColorPickerModule
} from '@angular-material-components/color-picker';
import {FormNotificationTimeComponent} from './fields/form-notification-time/form-notification-time.component';
import {FormDynamicCheckboxComponent} from './fields/form-dynamic-checkbox/form-dynamic-checkbox.component';
import {FormChipComponent} from './fields/form-chip/form-chip.component';
import {MAT_CHIPS_DEFAULT_OPTIONS, MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {UppyAngularDashboardModule} from '@uppy/angular';
import {UseHttpImageSourcePipeModule} from '@this-dot/ng-utils';
import {SecureImageModule} from '../../../other/secureImage/secureImage.module';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {PopoverModule} from 'ngx-bootstrap/popover'
import {FormTimeComponent} from './fields/form-time/form-time.component';
import {FormUppyComponent} from './fields/form-uppy/form-uppy.component';
import {FormFileComponent} from './fields/form-file/form-file.component';
import {SimpleFormComponent} from '../simple-form/simple-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DynamicFormComponentsModule,
    NgSelectModule,
    MaterialModule,
    InlineSVGModule,
    CoreModule,
    NgbPopoverModule,
    MatPasswordStrengthModule,
    MatFormFieldModule,
    ErrorTailorModule.forRoot({errors: {useValue: ValidationMessages}}),
    TranslateModule,
    SvgModule,
    PipeModule,
    NgxMatColorPickerModule,
    MatChipsModule,
    FormsModule,
    UppyAngularDashboardModule,
    UseHttpImageSourcePipeModule,
    SecureImageModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule,
    PopoverModule,
  ],
  providers: [
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    },
    {provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS}],
  declarations: [
    FormNotificationTimeComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormTextareaComponent,
    FormNgSelectComponent,
    FormImageComponent,
    FormPasswordComponent,
    FormCheckboxComponent,
    FormJsonComponent,
    FormDatetimeComponent,
    FormDynamicCheckboxComponent,
    FormRadioComponent,
    FormYearComponent,
    JsonControlComponent,
    FormColorComponent,
    FormChipComponent,
    FormUppyComponent,
    FormDatetimeComponent,
    FormTimeComponent,
    FormFileComponent,
    SimpleFormComponent,
  ],
  exports: [
    DynamicFormComponent,
    DynamicFieldDirective,
    JsonControlComponent,
    SimpleFormComponent,
  ]
})
export class DynamicFormModule {
}
