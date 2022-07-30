import {ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {IFieldConfig} from '../interfaces/IFieldConfig';
import {IField} from '../interfaces/IField';

@Directive({
    selector: '[dynamicField]'
})
export class DynamicFieldDirective implements IField, OnChanges, OnInit {
    @Input() config: IFieldConfig;
    @Input() group: FormGroup;
    component: ComponentRef<IField>;

    constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {
    }

    ngOnChanges() {
        if (this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    }

    ngOnInit() {
        const component = this.resolver.resolveComponentFactory<IField>(this.config.type);
        this.component = this.container.createComponent(component);
        this.config.component = this.component;
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
        this.component.changeDetectorRef.detectChanges();
    }
}
