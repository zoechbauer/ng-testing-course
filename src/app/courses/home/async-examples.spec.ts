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

  it('Asynchronous test example with setTimeout: fakeAsync & tick', fakeAsync(() => {
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

  it('Asynchronous test example with setTimeout: fakeAsync & flush', fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      console.log('setTimeout immediate');
    });

    setTimeout(() => {
      console.log('setTimeout 1');
    }, 1500);

    setTimeout(() => {
      console.log('setTimeout 2: running assertions');
      test = true;
    }, 1000);

    flush();

    expect(test).toBeTruthy();
  }));

  fit('Asynchronous test example with setTimeout & Promise:', fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      console.log('setTimeout immediate callback triggered');
    });

    setTimeout(() => {
      console.log('setTimeout after 2 sec callback triggered');
    }, 2000);

    setTimeout(() => {
      console.log('setTimeout after 1 sec callback triggered');
      test = true;
    }, 1000);

    Promise.resolve()
      .then(() => {
        console.log('Promise first then evaluated');
        return Promise.resolve();
      })
      .then(() => {
        console.log('Promise second then evaluated');
        test = true;
      });

    flush();
    console.log('Running test assertion');
    expect(test).toBeTruthy();
  }));
});
