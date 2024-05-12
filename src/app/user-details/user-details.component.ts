import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  userDetails: any; // Declaration of userDetails property

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      if (!isNaN(this.userId) && this.userId > 0) {
        this.fetchUserDetails();
      } else {
        console.error('Invalid user ID:', this.userId);
      }
    });
  }

  fetchUserDetails(): void {
    this.userService.getUserDetails(this.userId).subscribe(
      (response: any) => {
        const userDetails = response.data;
        // Check if the fetched user ID matches the requested ID
        if (userDetails.id === this.userId) {
          this.userDetails = userDetails;
        } else {
          console.error(`Mismatched user ID. Requested: ${this.userId}, Fetched: ${userDetails.id}`);
        }
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  navigateBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
