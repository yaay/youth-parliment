import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ObjectProperty'
})

export class ObjectPropertyPipe implements PipeTransform {
    transform(obj: any, property: string): any {
        if (!obj || !property) {
            return null;
        }
        return obj[property];
    }
}