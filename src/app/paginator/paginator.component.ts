import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
    @Input()
    pageSize: number;

    @Input()
    pageIndex: number;

    @Input()
    totalCount: number;

    @Output()
    pageChange = new EventEmitter<number>();

    pages: number[];

    @Output()
    clearAll = new EventEmitter<void>();



    ngOnChanges(changes: SimpleChanges): void {
        if (changes.pageSize && changes.pageSize.currentValue !== changes.pageSize.previousValue
            || changes.totalCount && changes.totalCount.currentValue !== changes.totalCount.previousValue) {
            const pageCount = Math.ceil(this.totalCount / this.pageSize);
            this.pages = new Array(pageCount);
        }
    }


    onClick(pageIndex: number): void {
        this.pageChange.emit(pageIndex);

    }

    onClear(): void {
        this.clearAll.emit();
    }
}


