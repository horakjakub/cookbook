import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[search]' })

export class SearchDirective {
    constructor(el: ElementRef) {
    }
 
}
