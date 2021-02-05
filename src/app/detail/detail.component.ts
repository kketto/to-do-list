import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../app.component';
import { TodosService } from '../services/todos.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
    item: Todo;

    constructor(private route: ActivatedRoute, private todoService: TodosService) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const id = params.id as string;
            this.item = this.todoService.todoList.find((e) => {
                return e.id === +id
            });
        });
    }

    onAddComment(comment: string): void {

        this.todoService.onSaveComment(comment, this.item.id);
    }
}
