import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  data: any = [
    {
      id: 1,
      first_name: 'Jeanette',
      last_name: 'Penddreth',
      email: 'jpenddreth0@census.gov',
      gender: 'Female',
    },
    {
      id: 2,
      first_name: 'Giavani',
      last_name: 'Frediani',
      email: 'gfrediani1@senate.gov',
      gender: 'Male',
    },
    {
      id: 3,
      first_name: 'Noell',
      last_name: 'Bea',
      email: 'nbea2@imageshack.us',
      gender: 'Female',
    },
    {
      id: 4,
      first_name: 'Willard',
      last_name: 'Valek',
      email: 'wvalek3@vk.com',
      gender: 'Male',
    },
  ];

  currentData: any;
  maleFilter: boolean = true;
  femaleFilter: boolean = true;
  searchFilterText: any = '';
  createFirstName: any = '';
  createLastName: any = '';
  createEmail: any = '';
  createGender: any = 'Male';
  showMessage: boolean = false;
  message: string = '';
  isError: boolean = false;

  ngOnInit(): void {
    this.currentData = this.data;
  }

  onCheckBoxChange() {
    if (this.maleFilter && this.femaleFilter) {
      this.currentData = this.data;
    } else if (!this.maleFilter && !this.femaleFilter) {
      this.currentData = this.data;
    } else if (this.maleFilter && !this.femaleFilter) {
      this.currentData = this.data.filter((element) => {
        return element.gender === 'Male';
      });
    } else if (this.femaleFilter && !this.maleFilter) {
      this.currentData = this.data.filter((element) => {
        return element.gender === 'Female';
      });
    }
  }

  searchByTextFilter() {
    if (this.searchFilterText == '') {
      this.currentData = this.data;
      return;
    }
    let searchResult: any[] = [];
    //Search By First Name
    searchResult = this.data.filter((element) => {
      let fname: string = element.first_name;
      return fname === this.searchFilterText;
    });
    if (searchResult.length > 0) {
      this.currentData = searchResult;
      return;
    }
    //Search By Last Name
    searchResult = this.data.filter((element) => {
      let lname: string = element.last_name;
      return lname === this.searchFilterText;
    });
    if (searchResult.length > 0) {
      this.currentData = searchResult;
      return;
    }
    //Search By Email
    searchResult = this.data.filter((element) => {
      let email: string = element.email;
      return email === this.searchFilterText;
    });
    if (searchResult.length > 0) {
      this.currentData = searchResult;
      return;
    }
    //Not matched- Returning empty result
    this.currentData = [];
  }

  add() {
    this.message = '';
    this.isError = false;
    if (this.createFirstName == '') {
      this.message = 'First name is empty';
      this.showMessage = true;
      this.isError = true;
      return;
    }
    if (this.createLastName == '') {
      this.message = 'Last name is empty';
      this.isError = true;
      this.showMessage = true;
      return;
    }
    if (this.createEmail == '') {
      this.message = 'Email is empty';
      this.isError = true;
      this.showMessage = true;
      return;
    }
    let new_entry = {};
    new_entry['id'] = this.data.length + 1;
    new_entry['first_name'] = this.createFirstName;
    new_entry['last_name'] = this.createLastName;
    new_entry['email'] = this.createEmail;
    new_entry['gender'] = this.createGender;
    this.data.push(new_entry);
    this.currentData = this.data;
    this.clearForm();
  }

  clearForm() {
    this.createFirstName = '';
    this.createLastName = '';
    this.createEmail = '';
    this.createGender = 'Male';
  }
}
