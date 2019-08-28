const index = require('../index')

describe("test validateEmail function", () => {
  test("return true for correct email format", async (done) => {
    let email = 'laiandrew@hotmail.com'
  
    const res = await index.validateEmail(email);
    expect(typeof res).toBe('boolean');
    expect(res).toBe(true)
    done();
    
  });

  test("return false for incorrect email format", async (done) => {
    let email = 'laiandrew1234'
  
    const res = await index.validateEmail(email);
    expect(typeof res).toBe('boolean');
    expect(res).toBe(false);
    done();
  });

});
  
describe("test capitalizeFirstLetter function", () => {
  it("return the string with the uppercase for first letter", async (done) => {
    let name = 'andrewlai'
  
    const res = await index.capitalizeFirstLetter(name);
    expect(typeof res).toBe('string');
    expect(res).toBe("Andrewlai");
    done();
    
  });

  test("return the same string as the first character is a number string", async (done) => {
    let name = '12andrew'
    const res = await index.capitalizeFirstLetter(name);
    expect(typeof res).toBe('string');
    expect(res).toBe('12andrew');
    done();
  });

});

describe("test removeDuplicate function", () => {
  it("return the string with the uppercase for first letter", async (done) => {
    let names = [
      'andrew',
      'daniel',
      'melissa',
      'andrew',
      'eshan',
      'andrew'
    ]
  
    const res = await index.removeDuplicate(names);
    expect(res).toEqual([
      'andrew',
      'daniel',
      'melissa',
      'eshan'
    ])
    done();
  });
});

describe("test commonSet function", () => {
  it("return the string with the uppercase for first letter", async (done) => {
    let namesArray = [
      ['andrew', 'daniel', 'steve', 'mike', 'melissa'],
      ['melissa', 'andrew'],
      ['andrew', 'steve', 'jack', 'apple', 'melissa', 'daniel'],
      ['mike', 'melissa', 'jack', 'andrew']
    ]
  
    const res = await index.commonSet(namesArray);
    expect(res).toEqual([
      'andrew',
      'melissa'
    ])
    done();
  });
});