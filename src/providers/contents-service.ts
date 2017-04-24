import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
// import Rx from 'rxjs/Rx';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ResourceService } from '../providers/resource-service';
import { ContentsList, OptionsModel } from '../models/contents.model';

@Injectable()
export class ContentsService {

    initialContentsList: any[] = [];

    contentsListInitialState: ContentsList = new ContentsList();
    optionsInitialState: OptionsModel = new OptionsModel();

    contentsListSubject: Subject<any[]> = new ReplaySubject<any[]>(1);
    isFetchingSubject: Subject<boolean> = new BehaviorSubject<boolean>(this.contentsListInitialState.isFetching);
    isMoreSubject: Subject<boolean> = new BehaviorSubject<boolean>(this.contentsListInitialState.isMore)

    constructor(public resourceService: ResourceService) {
        this.queryContentsList(new OptionsModel())
    }

    queryContentsList(options: OptionsModel = this.optionsInitialState, 
                      isAdd = false, 
                      prevContents = this.initialContentsList): void {
        this.resourceService.queryContentsList(options)
            .do(() => this.isFetchingSubject.next(true))
            .map((res: Response) => {
                let contents = res.json().contents.data;
                var array = [];
                for (var i = 0; i < contents.length; i++) {
                    if (contents[i].row <= options.itemsPerPage * options.currentPage 
                           && (options.currentPage - 1) * options.itemsPerPage + 1 <= contents[i].row) {
                        array.push(contents[i]);
                    }
                }
                if(array.length < options.itemsPerPage) {
                    this.isMoreSubject.next(false);
                }else{
                    this.isMoreSubject.next(true);
                }
                return array;
            })
            // .filter((content: any) => 
            //      content.row <= options.itemsPerPage * options.currentPage 
            //               && (options.currentPage - 1) * options.itemsPerPage + 1 <= content.row
            // )
            .reduce((acc, currentValue) => {
                if(isAdd){
                    return [...acc, ...currentValue];
                }else{
                    return [...currentValue];
                }
            }, prevContents)
            .subscribe(data => {
                this.isFetchingSubject.next(false);
                this.contentsListSubject.next(data);
            },(err)=>{
                this.isFetchingSubject.next(false);
            },()=>{
                this.isFetchingSubject.next(false);
            })
    }
}