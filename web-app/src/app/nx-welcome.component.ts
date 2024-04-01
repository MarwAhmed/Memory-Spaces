import { Component, ViewEncapsulation } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-nx-welcome',
  template: `
    <!--
     * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     This is a starter component and can be deleted.
     * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     Delete this file and get started with your project!
     * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     -->
    <mat-toolbar class="nav">

      <div class="logo-and-title">
        <img src="../../assets/story/logo1.png" alt="" style="margin-top: 8px" width="70" height="50" >
       
      </div>
      <span class="project-title" style="margin-left: 5px">Memory Spaces</span>
      <div class="spacer"></div> <!-- Add a spacer to push the links to the right -->

        <a mat-list-item routerLink="/project" class="mat-list-item">The Project</a>
        <a mat-list-item routerLink="/map" class="mat-list-item">Map</a>
        <a mat-list-item routerLink="/gallery" class="mat-list-item">Gallery</a>
        <a mat-list-item routerLink="/about" class="mat-list-item">About</a>
        <!-- Add more navigation links as needed -->

    </mat-toolbar>
  `,
  styles: [
    `
      

      /* Style the logo-and-title container */
      /* Style the navigation links */
      .mat-list-item {
        text-decoration: none;
        color: white; /* Text color for the links */
        margin-right: 10px; 
       
        /* Adjust the margin as needed */
      }
      
      .spacer {
        flex: 1; /* Make the spacer grow and occupy all available space */
      }
      
      .nav{
        background-color: #4c7d8a!important;
        color: white!important;
      }
      /* Define additional styles here */
    `

  ],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
