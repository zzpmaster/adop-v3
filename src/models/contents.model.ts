export class ContentsList {
  isFetching: boolean
  isMore: boolean
  items: any[]
  constructor(isFetching?: boolean, isMore?: boolean, items?: any[]) {
    this.isFetching = isFetching || false
    this.isMore = isMore || true
    this.items = items || []
  }
}

export class OptionsModel {
  currentPage: number
  itemsPerPage: number
  constructor(currentPage?: number, itemsPerPage?: number) {
    this.currentPage = currentPage || 1;
    this.itemsPerPage = itemsPerPage || 8;
  }
}

