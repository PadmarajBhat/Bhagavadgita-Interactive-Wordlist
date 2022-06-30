import { Injectable } from '@angular/core';

@Injectable()
export class ChapterService {
  slokaContext: any;
  constructor() {}
  getSlokaContext() {
    return this.slokaContext;
  }

  setSlokaContext(context: any) {
    this.slokaContext = context;
  }
}
