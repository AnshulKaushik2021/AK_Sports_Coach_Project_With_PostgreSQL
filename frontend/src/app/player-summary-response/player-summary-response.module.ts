import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerSummaryResponseComponent} from './player-summary-response.component';
import {routing} from 'app/player-summary-response/player-summary-response.routing';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {FlexModule} from '@angular/flex-layout';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatLegacyRadioModule as MatRadioModule} from '@angular/material/legacy-radio';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacyOptionModule as MatOptionModule} from '@angular/material/legacy-core';
import {PlayersService} from 'app/_services/players.service';


@NgModule({
  declarations: [PlayerSummaryResponseComponent],
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
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [PlayersService],
  bootstrap: [PlayerSummaryResponseComponent],
})
export class PlayerSummaryResponseModule { }