import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerSummaryComponent} from './player-summary.component';
import {routing} from 'app/player-summary/player-summary.routing';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {FlexModule} from '@angular/flex-layout';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacyOptionModule as MatOptionModule} from '@angular/material/legacy-core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlayersService} from 'app/_services/players.service';


@NgModule({
  declarations: [PlayerSummaryComponent],
  imports: [
    CommonModule,
    routing,
    MatToolbarModule,
    MatCardModule,
    FlexModule,
    MatListModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PlayersService],
  bootstrap: [PlayerSummaryComponent],
})
export class PlayerSummaryModule { }