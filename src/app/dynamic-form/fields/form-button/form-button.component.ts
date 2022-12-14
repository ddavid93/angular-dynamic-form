import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'form-button',
    templateUrl: 'form-button.component.html'
})
export class FormButtonComponent {
    @Input() label: string = 'Guardar';
    @Input() group: FormGroup;
    @Input() isLoading: boolean;
}
