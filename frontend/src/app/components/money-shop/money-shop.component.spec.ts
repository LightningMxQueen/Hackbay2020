import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyShopComponent } from './money-shop.component';

describe('MoneyShopComponent', () => {
  let component: MoneyShopComponent;
  let fixture: ComponentFixture<MoneyShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
