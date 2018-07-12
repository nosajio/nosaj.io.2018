const Cache = require('./memory-cache');

const tenMinsAsMs = 600000;
const twelveMinsAsMs = 720000;

describe('Static methods', () => {
  describe('.minsToMs', () => {
    test('should convert minute value to a ms value', () =>{
      expect(Cache.minsToMs(12)).toBe(twelveMinsAsMs);
    });
  });
  
  
  describe('.getDateAfter', () => {
    test('should return a new Date', () => {
      const newDate = Cache.getDateAfter(tenMinsAsMs);
      expect(newDate).toBeInstanceOf(Date);
    });

    test('should return a date with correct ms added', () => {
      const now = new Date();
      const newDate = Cache.getDateAfter(tenMinsAsMs, now);
      const delta = newDate.getTime() - now.getTime();
      expect(delta).toBe(tenMinsAsMs);
    });
  });
  

  describe('.timeDelta', () => {
    test('should return 0 when start is after end', () => {
      const delta = Cache.timeDelta(new Date('01-01-1999'), new Date());
      expect(delta).toBe(0);
    });
    
    test('should return ms between two times', () => {
      const now = new Date();
      const then = Cache.getDateAfter(twelveMinsAsMs, now);
      const delta = Cache.timeDelta(then, now);
      expect(delta).toBe(twelveMinsAsMs);
    });
  });
})


describe('Constructor', () => {
  test('should set internal expiry time when passed', () => {
    const inst = new Cache({ expires: 3600 });
    expect(inst._expires).toBe(3600);
  });

  test('should default to 10 minutes when expires is not set', () => {
    const inst = new Cache();
    expect(inst._expires).toBe(tenMinsAsMs);
  });
});


describe('.set', () => {
  let inst;
  
  beforeEach(() => {
    inst = new Cache();
  });

  test('should add a thing to the cache', () => {
    inst.set('test-add', 100);
    const added = inst._cache.get('test-add');
    expect(added.value).toBe(100);
  });

  test('should overwrite a set value', () => {
    inst.set('test-add', 200);
    const added = inst._cache.get('test-add');
    expect(added.value).toBe(200);
  });
});


describe('.get', () => {
  let inst;

  beforeAll(() => {
    inst = new Cache({ expires: 4000 });  
    inst.set('test-get', 123);
  });

  test('should return undefined when thing isn\'t cached', () => {
    expect( inst.get('non-existent-key') ).toBe(undefined);
  });

  test('should return the set value', () => {
    expect( inst.get('test-get') ).toBe(123);
  });
  
  test('should return undefined when value is requested after expiry time', (done) => {
    setTimeout(() => {
      expect( inst.get('test-get') ).toBe(undefined);
      done();
    }, 4500);
  });

});


describe('.delete', () => {
  let inst;

  beforeAll(() => {
    inst = new Cache();  
    inst.set('test-delete', 1234);
  });

  test('should return undefined when called for non existent key', () => {
    expect( inst.delete('non-existent-key') ).toBe(undefined);    
  });

  test('should return the deleted value', () => {
    const deletedValue = inst.delete('test-delete');
    expect(deletedValue).toBe(1234);
  });
});