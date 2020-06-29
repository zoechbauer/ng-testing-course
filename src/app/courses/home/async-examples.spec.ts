import { fakeAsync, flush, tick } from '@angular/core/testing';

fdescribe('Async Testing Examples', () => {
  it('Asynchronous test example with Jasmine done', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log('running assertions');
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  fit('Asynchronous test example with setTimeout: fakeAsync & tick', fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      console.log('running assertions');
      test = true;
    }, 1000);

    tick(500);
    console.log('some computations');
    tick(499);
    console.log('some computations');
    tick(1);

    expect(test).toBeTruthy();
  }));
});
