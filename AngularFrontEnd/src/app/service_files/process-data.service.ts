import { Injectable } from '@angular/core';


import gDfJson from '../json_files/g_df.json';


@Injectable({
  providedIn: 'root'
})
export class ProcessDataService {
  gitaJson = gDfJson;
  constructor() {

    this.cleanAllSloka();
    this.getWordsForSlokas();
    console.log('Cleansed Sloka : ', this.gitaJson);
    console.log('Wordlist :', this.getAllSlokaWords());

    

    //const appCheck = firebase.appCheck();
    // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
    // key is the counterpart to the secret key you set in the Firebase console.
    //appCheck.activate(
    //  'Hello',

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    //true);
    
  }

  getGitaJson() {
    return this.gitaJson;
  }

  getSlokaWords(sloka: string) {
    let wordsList: String[] = [];
    //console.log(sloka);
    let line = sloka.split('|');
    for (let word of line[0].split(' ')) {
      //if (word.length > 0) wordsList.push(word.replace(/' '/g, ''));
      if (word.length > 0) wordsList.push(word.trim());
    }

    for (let word of line[1].split(' ')) {
      if (word.length > 0) wordsList.push(word.trim());
    }
    return wordsList;
  }
  getAllSlokaWords() {
    let wordList:String[] = [];
    let lines = [];
    for (let row of this.gitaJson) {
      row['words']?.forEach((x: any) => wordList.push(x));
      row['t_words']?.forEach((x: any) => wordList.push(x));

      lines = row['cleansed_sloka']?.split('|');
      wordList.push(lines[0]);
      wordList.push(lines[1]);

      row['cleansed_t_sloka']?.split('\n').forEach((x) => {
        wordList.push(x);
      });
    }
    wordList = [...new Set(wordList)];
    return wordList;
  }
  getWordsForSlokas() {
    for (let row of this.gitaJson) {
      row['words'] = this.getSlokaWords(row['cleansed_sloka']);
      row['t_words'] = [];
      row['cleansed_t_sloka']
        .replace(/'\\n'/g, ' ')
        .split(' ').forEach(word => row['t_words'].push(word.trim()));
    }
  }

  cleanAllSloka() {
    for (let row of this.gitaJson) {
       let tempString:String = row['text']
        .replace('??????\n ', '||')
        .replace('???\n\n', ' | ')
        .replace(/'???'/g, '|')
        .replace('??????', '||')
         .replace('??????', '||')
         .replace('???','|')
        .replace('?????????????????????????????? ????????????\n\n', '')
        .replace('??????????????? ????????????\n\n', '')
        .replace('??????????????? ????????????', '')
        .replace('?????????????????? ????????????\n\n', '')
        .replace('?????????????????? ????????????', '')
        .replace('???????????? ???????????????????????????\n\n', '')
        .replace('???????????? ???????????????????????????', '')
        .replace(/\n\n/g, ' ');
      row['cleansed_sloka'] = tempString;

      row['cleansed_t_sloka'] = row['transliteration']
        .replace('??hr??-bhagav??n uv??cha\n', '')
        .replace('sa??jaya uv??cha\n', '')
        .replace('dh???itar????htra uv??cha\n', '')
        .replace('arjuna uv??cha\n', '')
        .replace(/'\\n'/g, ' ');
    }
  }
}
