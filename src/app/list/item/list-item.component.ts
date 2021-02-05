import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Todo } from 'src/app/app.component';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnChanges {

    isEditing: boolean;

    @Input()
    item: Todo;

    @Output()
    delete = new EventEmitter<void>();

    onDelete(): void {
        this.delete.emit();
    }

    @Output()
    done = new EventEmitter<void>();

    onDone(): void {
        this.done.emit();
    }

    @Output()
    edit = new EventEmitter<void>();

    onEdit(): void {
        this.isEditing = true;
        this.edit.emit();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.item.previousValue && changes.item.currentValue.title !== changes.item.previousValue.title) {
            this.isEditing = false;
        }
    }

}
