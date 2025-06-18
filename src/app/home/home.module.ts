import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import HomePage from './home.page';
import HomeRouting from './home-routing.module';

@NgModule({
  imports: [IonicModule, HomeRouting, HomePage],
})
export class HomePageModule {}
