import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main/main-page/main-page.component';
import { MovieCardComponent } from './main/main-page/movie-card-component/movie-card.component';
import { MovieService } from './services/movie-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviePageComponent } from './main/movie-page/movie-page.component';
import { MovieResolver } from './services/movie-resolver';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FavouriteMoviesService } from './services/favourite-movies-service';
import { FavouriteMoviesPageComponent } from './main/favourite-movies-page/favourite-movies-page.component';
import { HeaderComponent } from './layout/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'movie/:id',
    component: MoviePageComponent,
    resolve: [MovieResolver]
  },
  {
    path: 'favourites',
    component: FavouriteMoviesPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    MovieCardComponent,
    MoviePageComponent,
    FavouriteMoviesPageComponent,
  ],
  entryComponents: [
    MovieCardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),

    FlexModule,
    MatCardModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [
    MovieService,
    MovieResolver,
    FavouriteMoviesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
