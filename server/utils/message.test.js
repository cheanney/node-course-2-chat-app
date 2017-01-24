var expect = require('expect');
var {generateMessage} = require('./message.js');
describe('generateMessage', ()=>{
  it('should generate message',()=>{
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    });
    //store res in variable
    //
  });
});
