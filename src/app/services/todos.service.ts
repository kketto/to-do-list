import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../app.component';
import { LocalStorageService } from './local-storage.service';

export enum FilterType {

    All,
    Done,
    Pending

}

@Injectable({ providedIn: 'root' })
export class TodosService {
    private _todoList: Todo[] = this.localStorageService.getItem("keti") || [];

    get todoList(): Todo[] {

        const start = this.pageSize * this.pageIndex;
        return this.filteredList.slice(start, start + this.pageSize);
    }

    get totalCount(): number {
        return this.filteredList.length
    }

    private get filteredList(): Todo[] {
        let filteredList: Todo[];

        switch (this.activeFilter) {
            case FilterType.Done: {
                filteredList = this._todoList.filter(e => e.done);
                break;
            }
            case FilterType.Pending: {
                filteredList = this._todoList.filter(e => !e.done);
                break;
            }
            case FilterType.All: {
                filteredList = this._todoList;
                break;
            }
        }

        if (this.searchValue) {
            filteredList = filteredList.filter((e) => {
                return e.title.includes(this.searchValue)
            });
        }

        return filteredList;
    }


    count = this._todoList.length;
    editItem: Todo;
    pageSize = 10;
    pageIndex = 0;
    activeFilter = FilterType.All;
    searchValue: string;


    constructor(private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute) {
        const { pageSize, activeFilter, pageIndex } = this.route.snapshot.queryParams;
        if (pageIndex) {
            this.pageIndex = +pageIndex;
        }
        if (activeFilter) {
            this.activeFilter = +activeFilter;
        }
        if (pageSize) {
            this.pageSize = +pageSize;
        }

    }

    onSubmit(text: string): void {
        if (this.editItem) {
            const editItemIdex = this._todoList.findIndex((e) => {
                return e.id === this.editItem.id;
            });
            this._todoList[editItemIdex] = { ...this._todoList[editItemIdex], title: text }
            this.editItem = null;
        } else {
            this._todoList.unshift({ id: this.count, title: text, done: false });
            this.count++;
        }
        this.localStorageService.setItem("keti", this._todoList);

    }

    onDelete(item: Todo): void {
        this._todoList = this._todoList.filter((element) => {
            return element.id !== item.id;
        });
        this.localStorageService.setItem("keti", this._todoList);
    }

    onDone(item: Todo): void {
        const doneItem = this._todoList.find((e) => {
            return e.id === item.id;

        })
        doneItem.done = !doneItem.done;
        this.localStorageService.setItem("keti", this._todoList);
    }

    onEditStart(item: Todo): void {
        this.editItem = item;
    }

    onPageChange(pageIndex: number): void {
        this.pageIndex = pageIndex;
        this.updateQueryParams();
    }

    onFilterChange(filterType: FilterType): void {
        this.activeFilter = filterType;
        this.pageIndex = 0;
        this.updateQueryParams();

    }

    private updateQueryParams(): void {
        this.router.navigate([''], {
            queryParams: {
                pageIndex: this.pageIndex,
                activeFilter: this.activeFilter,
                pageSize: this.pageSize
            }
        })
    }

    onClear(): void {

        this._todoList = [];
        this.localStorageService.setItem("keti", this._todoList)

    }

    onSaveComment(comment: string, itemID: number): void {


        let item = this._todoList.find(e => e.id === itemID);
        if (!item.comments) {
            item.comments = [];
        }

        item.comments.unshift({
            text: comment,
            createDate: new Date()
        });

        this.localStorageService.setItem("keti", this._todoList);

        console.log(1111111111, this._todoList);
    }

    onSearch(value: string): void {

        this.searchValue = value;

    }
}