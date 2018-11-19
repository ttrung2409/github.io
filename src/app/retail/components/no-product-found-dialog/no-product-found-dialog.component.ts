import { Component, Inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Key } from 'ts-keycode-enum';

@Component({
  selector: 'app-no-product-found-dialog',
  templateUrl: './no-product-found-dialog.component.html',
  styleUrls: ['./no-product-found-dialog.component.scss']
})
export class NoProductFoundDialog implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<NoProductFoundDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  @HostListener('keyup', ['$event']) onKeyup(e: KeyboardEvent) {
    switch (e.keyCode) {
      case Key.Enter:
        this.close();
        break;
    }
  }

  ngOnInit() {    
  }

  close() {
    this.dialogRef.close();
  }
}
