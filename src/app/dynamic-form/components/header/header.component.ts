import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-header-form',
    templateUrl: './header.component.html',
    styleUrls: ['./header.scss']
})
export class HeaderComponent {
    @Input() title: string;
    @Input() canGoBack = true;

    constructor(private location: Location) {
    }

    goBack() {
        this.location.back();
    }

}
