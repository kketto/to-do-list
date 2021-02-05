import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'ghost' })
export class GhostPipe implements PipeTransform {
    transform(value: string): string {
        return '👻 ' + value;
    }
}