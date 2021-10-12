import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        NotFoundComponent
    ],
    imports: [
        RouterModule,
        MatBadgeModule,
        MatMenuModule,
        CommonModule
    ],
    exports: [
        HeaderComponent,
        NotFoundComponent,
        FooterComponent
    ],
    providers: [],
    bootstrap: []
})

export class SharedModule {}
