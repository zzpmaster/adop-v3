import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ContentsService } from '../../providers/contents-service';
import { OptionsModel } from '../../models/contents.model';

@Component({
  selector: 'page-page1',
  templateUrl: 'contents.html'
})
export class Contents {

  contents: any[];
  options: OptionsModel;
  isMore: boolean;

  constructor(public navCtrl: NavController, public contentsService: ContentsService) {

    this.options = new OptionsModel();

    this.contentsService.contentsListSubject.subscribe((contents: any[]) => {
      this.contents = contents;
    });

    this.contentsService.isMoreSubject.subscribe((isMore: boolean) => {
    	this.isMore = isMore
    })

  }

  doRefresh(refresher) {
    this.contentsService.queryContentsList();
    setTimeout(() => {
      refresher.complete();
    }, 500);
  }

  doInfinite(infiniteScroll) {
    let currentPage = this.options.currentPage;
  	let newOptions = new OptionsModel(
  		++currentPage,
  		this.options.itemsPerPage)
		this.contentsService.queryContentsList(newOptions, true, this.contents);
    setTimeout(() => {
      infiniteScroll.complete();
      if (!this.isMore) {
				infiniteScroll.enable(false);
			}
		}, 500);
  }

}
