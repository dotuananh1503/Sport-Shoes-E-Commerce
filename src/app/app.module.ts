import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProductComponent } from './product/product.component';
import { ProductModule } from './product/product.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductService } from './product/product.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NewsComponent } from './news/news.component';
import { NewsModule } from './news/news.module';
import { NewsService } from './news/news.service';
import { AboutComponent } from './about/about.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from './cart/cart.service';
import { SucccessComponent } from './contact/succcess/succcess.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { ProfileComponent } from './profile/profile.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
import { CheckoutEditComponent } from './checkout/checkout-edit/checkout-edit.component';
import { CheckoutService } from './checkout/checkout.service';
import { CommentService } from './product/product-comment/comment.service';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [											
    AppComponent,
    ProductComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    CartComponent,
    NewsComponent,
    AboutComponent,
    CheckoutComponent,
    SucccessComponent,
    AdminComponent,
    ProfileComponent,
    CheckoutEditComponent
   ],
  imports: [
    BrowserModule,
    SharedModule,
    ProductModule,
    AppRoutingModule,
    NewsModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatExpansionModule,
    MatTabsModule,
    MatStepperModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    SocialLoginModule
  ],
  providers: [ProductService, NewsService, CartService, CheckoutService, CommentService,{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '386796005768-hegs7u1kjisu3t2hc4ds6d47e05hid4n.apps.googleusercontent.com'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
