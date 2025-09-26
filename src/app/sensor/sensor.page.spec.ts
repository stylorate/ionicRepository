import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorPage } from './sensor.page';
import { DeviceMotion } from '@awesome-cordova-plugins/device-motion/ngx'; 

describe('SensorPage', () => {
  let component: SensorPage;
  let fixture: ComponentFixture<SensorPage>;

  beforeEach(async () => {
     await TestBed.configureTestingModule({
      imports: [SensorPage],
      providers: [
        {
          provide: DeviceMotion,
          useValue: {
            watchAcceleration: () => ({
              subscribe: () => {}
            }),
            getCurrentAcceleration: () => Promise.resolve({
              x: 0, y: 0, z: 0, timestamp: Date.now()
            })
          }
        }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SensorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
