import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { Key } from 'ts-keycode-enum';

@Component({
  selector: 'app-no-product-found-dialog',
  templateUrl: './no-product-found-dialog.component.html',
  styleUrls: ['./no-product-found-dialog.component.scss']
})
export class NoProductFoundDialog implements OnInit, OnDestroy {
  private _hotkey: Hotkey;

  constructor(
    private dialogRef: MatDialogRef<NoProductFoundDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hotkeyService: HotkeysService) { }

  ngOnInit() {
    this.hotkeyService.add(this._hotkey = new Hotkey(['enter'], (e: KeyboardEvent) => {
      this.close();
      return false;
    }));  
  }

  ngOnDestroy() {
    this.hotkeyService.remove(this._hotkey);
  }

  close() {
    this.dialogRef.close();
  }
}
