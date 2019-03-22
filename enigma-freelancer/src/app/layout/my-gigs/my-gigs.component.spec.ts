import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGigsComponent } from './my-gigs.component';

describe('MyGigsComponent', () => {
  let component: MyGigsComponent;
  let fixture: ComponentFixture<MyGigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
