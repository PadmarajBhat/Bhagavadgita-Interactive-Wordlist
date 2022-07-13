import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToolbarComponent } from './Components/toolbar/toolbar.component';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRippleModule } from '@angular/material/core';
import { AngularD3CloudModule } from 'angular-d3-cloud';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';


import { SearchWordsService } from './service_files/search-words.service';
import { GitaChaptersComponent } from './Components/gita-chapters/gita-chapters.component';
import { CommonService } from './service_files/common.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { ChapterService } from './service_files/chapter.service';
import { WordcloudComponent } from './Components/wordcloud/wordcloud.component';
import { WordcloudService } from './service_files/wordcloud.service';
import { WordlistComponent } from './Components/wordlist/wordlist.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProcessDataService } from './service_files/process-data.service';
import { SearchResultComponent } from './Components/search-result/search-result.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment.prod';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { BellComponentComponent } from './Components/toolbar/bell-component/bell-component.component';
import { DialogWindowComponent } from './Components/toolbar/bell-component/dialog-window/dialog-window.component';
import { HttpClientModule } from '@angular/common/http';
import { ProcessUserdataService } from './service_files/process-userdata.service';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    GitaChaptersComponent,
    WordlistComponent,
    SearchResultComponent,
    WordcloudComponent,
    BellComponentComponent,
    DialogWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatBadgeModule,
    MatRippleModule,
    BrowserAnimationsModule,
    MatSelectModule,
    AngularD3CloudModule,
    MatListModule,
    MatGridListModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    MatDialogModule,
    HttpClientModule
  ],
  providers: [ChapterService, CommonService, ProcessDataService, SearchWordsService, WordcloudService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, ProcessUserdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
