import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmDialogComponent } from './confirm-dialog.component';

class MatDialogRefMock {
  close(value = '') {

  }
}


describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let data: false;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponent ],
      providers : [{
        provide : MAT_DIALOG_DATA,
        useValue : data
      }, {provide: MatDialogRef, useClass: MatDialogRefMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onNoClick should set data correctly', () => {
    component.onNoClick();
    expect(component.data).toBeFalsy();
  });

  it('onYesClick should set data correctly', () => {
    component.onYesClick();
    expect(component.data).toBeTruthy();
  });
});
