import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let calculator: CalculatorService;
  let loggerSpy: any;

  beforeEach(() => {
    console.log('calling beforeEach');
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy },
      ],
    });

    calculator = TestBed.get(CalculatorService);
  });

  it('should add 2 numbers', () => {
    console.log('add test');
    const result = calculator.add(2, 3);
    expect(result).toBe(5);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract 2 numbers', () => {
    console.log('subtract test');
    const result = calculator.subtract(5, 3);
    expect(result).toBe(2, 'unexpected substract result');
  });

  xit('should no be tested', () => {
    fail();
  });

  it('should be pending', () => {
    pending();
  });
});
