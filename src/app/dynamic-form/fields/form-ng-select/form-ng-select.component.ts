import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent, NgSelectConfig } from '@ng-select/ng-select';
import * as _ from 'lodash';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FacadeFilterService } from '../../../../../../services/_system/facade.filter.service';
import { FormHelperService } from '../../../../../../services/_system/form.helper.service';
import { IField } from '../../interfaces/IField';
import { IFieldConfig } from '../../interfaces/IFieldConfig';
import { IFieldNgSelectInterface } from '../../interfaces/IFieldNgSelect';
import { DestroyComponent } from '../../../../../other/utils/destroy/destroy.component';

@Component({
    selector: 'form-ng-select',
    templateUrl: './form-ng-select.component.html',
    styleUrls: ['./form-ng-select.scss'],
    providers: [FacadeFilterService]
})
export class FormNgSelectComponent extends DestroyComponent implements OnInit, AfterViewInit, IField {

    @ViewChild('selectItem') selectItem: NgSelectComponent;
    config: IFieldConfig;
    ngSelect: IFieldNgSelectInterface;
    group: FormGroup;
    maxNumber = Number.MAX_SAFE_INTEGER;
    input$ = new Subject<string>();
    skipSelect = 0;
    loading$ = new BehaviorSubject(false);

    constructor(
        public formService: FormHelperService,
        private _cdr: ChangeDetectorRef,
        private _modalService: NgbModal,
        private _facadeFilterService: FacadeFilterService,
        private _configSelect: NgSelectConfig) {
        super();
        this._configSelect.notFoundText = 'No hay resultados';
        this._configSelect.loadingText = 'Cargando ...';
        this._configSelect.typeToSearchText = 'Escriba algo para buscar';
        this._configSelect.clearAllText = 'Limpiar todo';
    }

    ngOnInit(): void {
        this.ngSelect = this.config.ngSelect;
        if (this.ngSelect.itemService) {
            if (typeof this.ngSelect.itemService === 'string') {
                if (!this._facadeFilterService[this.ngSelect.itemService]) {
                    throw Error(`Not exist ${this.ngSelect.itemService} at FacadeFilterService, please first create this`);
                }
                this.ngSelect.itemService = this._facadeFilterService[this.ngSelect.itemService];
            }
        }

        if (!!this.ngSelect.dynamic) {
            this.input$
                .pipe(
                    takeUntil(this.destroy$),
                    debounceTime(400),
                    distinctUntilChanged(),
                    tap(() => this.loading$.next(true)),
                    switchMap(search => {
                        const query = { search };
                        if (!!this.ngSelect.filter) {
                            Object.assign(query, this.ngSelect.filter);
                        }
                        return this.getMethodToLoadItemsAtServer(query)
                            .pipe(
                                takeUntil(this.destroy$),
                                finalize(() => this.loading$.next(false)));
                    }))
                .pipe(tap((data) => {
                    if (!!this.ngSelect.transformData)
                        this.ngSelect.transformData(data.rows)
                    this.ngSelect.items = data.rows
                }))
                .subscribe(() => this._cdr.detectChanges());
        }
    }

    ngAfterViewInit(): void {
        if (!this.config.ngSelect.autoLoadItems) {
            return;
        }
        this.loadItems();
    }

    onScroll(searchTerm?) {
        if (!this.ngSelect.dynamic) {
            return;
        }
        this.skipSelect += 20;
        this.loadItems(searchTerm);
    }

    onSearch() {
        if (!this.ngSelect.dynamic) {
            return;
        }
        this.skipSelect = 0;
        this.config.ngSelect.items = [];
    }

    loadItems(searchTerm?) {
        const q = {};
        if (!!searchTerm) {
            Object.assign(q, { search: searchTerm });
        }
        if (!!this.ngSelect.filter) {
            Object.assign(q, this.ngSelect.filter);
        }
        this.loading$.next(true);
        if (!this.ngSelect.itemService && !this.ngSelect.items) {
            throw new Error(`Review the service injection in the constructor. 
            Maybe you forgot to import it in the component constructor and you used in this config field -> (${this.config.name})`);
        }
        if (!!this.ngSelect.itemService) {
            return this.getMethodToLoadItemsAtServer(q)
                .pipe(
                    takeUntil(this.destroy$),
                    finalize(() => this.loading$.next(false)),
                    map(data => !this.config.ngSelect.transformData ? data.rows : this.ngSelect.transformData(data.rows)))
                .subscribe(items => {
                    this.ngSelect.items = !this.ngSelect.items?.length ? items : _.unionWith(this.ngSelect.items, items, _.isEqual);
                    this._cdr.detectChanges();
                });
        }
    }

    getMethodToLoadItemsAtServer(q): Observable<any> {
        try {
            return this.ngSelect.method || this.ngSelect.itemService.all(q, this.skipSelect,
                !!this.ngSelect.dynamic ? 20 : Number.MAX_SAFE_INTEGER);
        } catch (e) {
            throw new Error('El método no existe en el servicio, por favor revise.');
        }
    }

    triggerModal() {
        const modalRef = this._modalService.open(this.ngSelect.plus.component, this.ngSelect.plus.modalOptions);
        modalRef.componentInstance.title = this.config.label;
        if (!!this.ngSelect.plus?.config) {
            modalRef.componentInstance.config = this.ngSelect.plus.config;
        }
        modalRef.componentInstance.service = this.ngSelect.plus.service || this.ngSelect.itemService;
        modalRef.result.then((data) => {
            this.skipSelect = 0;
            this.group.get(this.config.name).patchValue(data)
            this.loadItems();
        }, () => {
        });
    }

}
