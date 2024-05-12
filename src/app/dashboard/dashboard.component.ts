import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CacheService } from '../cache.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient, private router: Router , private cacheService: CacheService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    const url = 'https://reqres.in/api/users?page=1'; 
    this.cacheService.get(url).subscribe((response: any) => {
      this.users = response.data.map((user: any) => {
        return {
          id: user.id,
          avatar: user.avatar,
          first_name: user.first_name,
          last_name: user.last_name
        };
      });
    });
  }

  navigateToUserDetails(userId: number): void {
    this.router.navigate(['/user', userId]);
  }
  searchUsers(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.search.emit(searchTerm);
    if (!searchTerm) {
      this.fetchUsers();
      return;
  }
    const url = `https://reqres.in/api/users/${searchTerm}`;
    this.http.get(url).subscribe(
      (response: any) => {
        this.router.navigate(['/user', searchTerm]);
      },
      (error: any) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
  focusSearchInput(input: HTMLInputElement): void {
    input.focus();
  }
  
}
