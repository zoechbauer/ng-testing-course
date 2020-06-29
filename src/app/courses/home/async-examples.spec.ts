fdescribe('Async Testing Examples', () => {
  it('Asynchronous test examole with Jasmine done', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log('running assertions');
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });
});
