import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterType, TodosService } from '../services/todos.service';



@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    FilterType = FilterType;

    @Input()
    activeFilter: FilterType;


    @Output()
    filterChange = new EventEmitter<FilterType>();

    searchForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private todosService: TodosService) { }


    ngOnInit(): void {

        this.searchForm = this.formBuilder.group({
            searchTerm: ['']
        });



        this.searchForm.controls.searchTerm.valueChanges.subscribe((value) => {
            this.todosService.onSearch(value)
        });
    }

    onClick(filterType: FilterType): void {
        this.filterChange.emit(filterType)
    }
}