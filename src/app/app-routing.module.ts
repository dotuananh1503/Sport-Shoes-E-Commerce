import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { AdminComponent } from "./admin/admin.component";
import { AppComponent } from "./app.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ContactComponent } from "./contact/contact.component";
import { SucccessComponent } from "./contact/succcess/succcess.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { NewsDetailComponent } from "./news/news-detail/news-detail.component";
import { NewsEditComponent } from "./news/news-edit/news-edit.component";
import { NewsComponent } from "./news/news.component";
import { ProductCollectorComponent } from "./product/product-collector/product-collector.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { ProductComponent } from "./product/product.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";


const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'admin', component: AdminComponent},
    { path: 'login', component: LoginComponent},
    { path: 'profile', component: ProfileComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'cart', component: CartComponent},
    { path: 'news', component: NewsComponent},
    { path: 'about-us',component: AboutComponent},
    { path: 'checkout',component: CheckoutComponent},
    { path: 'success', component: SucccessComponent},
    { path: 'product-collector',component: ProductCollectorComponent},
    { path: 'news-detail/:id',component: NewsDetailComponent},
    { path: 'product-detail/:id', component: ProductDetailComponent },
    { path: '**', component: NotFoundComponent}
];
    /* { path: 'product-detail', component: ProductComponent, children : [
        {path: '', component: ProductListComponent},
        {path: ':id', component: ProductDetailComponent}
    ]}
]; */

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}