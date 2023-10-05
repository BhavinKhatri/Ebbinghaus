import { Component, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from './local-storage.service';

@Component({
  standalone: true,
  imports: [RouterModule, NavigationComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ebb';
  constructor(private localStorageService: LocalStorageService) {
    this.localStorageService.isBrowser.set(
      isPlatformBrowser(inject(PLATFORM_ID))
    );
  }
}
