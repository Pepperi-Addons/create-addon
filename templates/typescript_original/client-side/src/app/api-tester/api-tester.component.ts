import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AddonApiService } from '../addon-api.service';
// @ts-ignore
import { UserService } from "pepperi-user-service";

@Component({
  selector: 'app-api-tester',
  templateUrl: './api-tester.component.html',
  styleUrls: ['./api-tester.component.scss']
})
export class ApiTesterComponent implements OnInit {

  data: any
  apiEndpoint: string

  constructor(
    private translate: TranslateService,
    private backendApiService: AddonApiService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  testEndpoint(endpoint) {
    const self = this;
    this.backendApiService.get(endpoint).subscribe( 
      (res: any) => {
        self.data = res;
        self.userService.setShowLoading(false)
      },
    (error) => {},
    () => self.userService.setShowLoading(false)
    )
  }

}
