import { Component, ViewEncapsulation } from '@angular/core';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [SharedModule],
  styleUrls: ['./nx-welcome.component.css'],
  templateUrl: './nx-welcome.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {
  readonly APP_NAME = 'M2Memorize';
}
