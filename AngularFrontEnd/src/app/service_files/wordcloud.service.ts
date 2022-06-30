import { Injectable } from '@angular/core';

@Injectable()
export class WordcloudService {
  context: any;
  constructor() {}
  setWordCloudContext(context: any) {
    this.context = context;
  }

  getWordCloudContext() {
    return this.context;
  }
}
