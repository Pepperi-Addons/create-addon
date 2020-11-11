import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'addon-ngx-lib-examples',
  templateUrl: './pepperi-ngx-lib-examples.component.html',
  styleUrls: ['./pepperi-ngx-lib-examples.component.scss']
})
export class PepperiNgxLibExamplesComponent implements OnInit {

  title = 'client-side';

  constructor() { }

  ngOnInit(): void {
  }

}
