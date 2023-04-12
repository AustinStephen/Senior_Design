import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Mountain } from '../interfaces/interfaces';

@Component({
  selector: 'app-mountain-classifier-modal',
  templateUrl: './mountain-classifier-modal.component.html',
  styleUrls: ['./mountain-classifier-modal.component.scss'],
})
export class MountainClassifierModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MountainClassifierModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mountain
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
