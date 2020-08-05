import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }
  logout(): void {
    this.accountService.logout();
  }
}
