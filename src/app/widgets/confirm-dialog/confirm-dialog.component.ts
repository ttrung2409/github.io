import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Key } from 'ts-keycode-enum';
import DialogResult from 'src/app/valueObjects/DialogResult';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  @HostListener('keydown', ['$event']) onKeydown(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.Y:
        this.ok();
        break;
      case Key.N:
        this.close();
        break;
    }
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close(DialogResult.Cancel);
  }

  ok() {
    this.dialogRef.close(DialogResult.OK);
  }
}

