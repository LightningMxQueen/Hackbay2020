import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectShopComponent } from './object-shop.component';

describe('ObjectShopComponent', () => {
  let component: ObjectShopComponent;
  let fixture: ComponentFixture<ObjectShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
