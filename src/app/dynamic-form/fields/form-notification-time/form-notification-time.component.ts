import {Component} from '@angular/core';
import {NgSelectConfig} from '@ng-select/ng-select';
import {FormGroup} from '@angular/forms';
import {IFieldConfig} from '../../interfaces/IFieldConfig';
import {IField} from '../../interfaces/IField';
import {FormHelperService} from '../../../../../../services/_system/form.helper.service';

@Component({
    selector: 'form-notification-time',
    templateUrl: './form-notification-time.component.html',
    styleUrls: ['./../form-ng-select/form-ng-select.scss']
})
export class FormNotificationTimeComponent implements IField {

    config: IFieldConfig;
    group: FormGroup;
    items = [0, 5, 10, 15, 30, 60, 120, 180, 240, 300, 360, 720, 1440, 2880, 4320, 10180];

    constructor(
        private configSelect: NgSelectConfig,
        public formService: FormHelperService) {
        this.configSelect.notFoundText = 'No hay resultados';
        this.configSelect.loadingText = 'Cargando ...';
        this.configSelect.typeToSearchText = 'Escriba algo para buscar';
        this.configSelect.clearAllText = 'Limpiar todo';
    }

}
