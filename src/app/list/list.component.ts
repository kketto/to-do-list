import { Component, } from '@angular/core';
import { Todo } from '../app.component';
import { FilterType, TodosService } from '../services/todos.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {

    constructor(public todosService: TodosService) {
    }

    onSubmit(text: string): void {
        this.todosService.onSubmit(text);
    }

    onDelete(item: Todo): void {
        this.todosService.onDelete(item);
    }

    onDone(item: Todo): void {

        this.todosService.onDone(item);
    }

    onEditStart(item: Todo): void {
        this.todosService.onEditStart(item);
    }

    onPageChange(pageIndex: number): void {
        this.todosService.onPageChange(pageIndex);

    }

    onFilterChange(filterType: FilterType): void {
        this.todosService.onFilterChange(filterType);

    }

    onClear(): void {
        this.todosService.onClear();
    }


}

