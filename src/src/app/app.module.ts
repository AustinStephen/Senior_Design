import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { ImageCropperModule } from 'ngx-image-cropper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MountainClassifierFormComponent } from './mountain-classifier-form/mountain-classifier-form.component';
import { MountainGalleryComponent } from './mountain-gallery/mountain-gallery.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { MountainClassifierModalComponent } from './mountain-classifier-modal/mountain-classifier-modal.component';
import { MathjaxModule } from 'mathjax-angular';
import { MountainCardComponent } from './mountain-card/mountain-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutUsComponent,
    ToolBarComponent,
    MountainClassifierFormComponent,
    MountainGalleryComponent,
    HowItWorksComponent,
    MountainClassifierModalComponent,
    MountainCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatDialogModule,
    ImageCropperModule,
    NgbModule,
    ReactiveFormsModule,
    MathjaxModule.forRoot(),
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
