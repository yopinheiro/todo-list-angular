import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/core/service/loader.service';

@Component({
  selector: 'loader',
  template: '<ngx-loading [show]="loading | async"></ngx-loading>',
})
export class LoaderComponent {
  public loading: Subject<boolean | any> = this.loadingService.isLoading;

  constructor(private loadingService: LoaderService) {}
}
