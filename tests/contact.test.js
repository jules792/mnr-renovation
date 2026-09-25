const {test} = require('node:test');
const assert = require('node:assert/strict');
const {createHandler} = require('../api/contact');
test('SMTP validation, fixed recipient, failure and success', async () => {
  const original = process.env.SMTP_PASSWORD;
  const body = {name:'Test',email:'client@example.com',town:'Dozulé',project:'Menuiserie',message:'Description de projet de test',website:''};
  let calls = 0;
  const run = async (overrides={}, send=async mail=>{calls++;assert.equal(mail.to,'contact@mnr-renovations.fr');assert.equal(mail.replyTo,body.email);return {accepted:[mail.to]};}) => {
    const res = {setHeader(){},status(code){this.code=code;return this;},json(data){this.data=data;return this;}};
    await createHandler(send)({method:'POST',headers:{origin:'https://mnr-renovation.vercel.app','content-type':'application/json'},body,...overrides},res);
    return res;
  };
  try {
    delete process.env.SMTP_PASSWORD;
    assert.equal((await run()).code,503);
    process.env.SMTP_PASSWORD='test-only';
    assert.equal((await run({method:'GET'})).code,405);
    assert.equal((await run({headers:{origin:'https://invalid.example'}})).code,403);
    assert.equal((await run({body:{...body,email:'invalid'}})).code,400);
    assert.equal((await run({body:{...body,name:'Test\r\nBcc: other@example.com'}})).code,400);
    assert.equal((await run({body:{...body,website:'bot'}})).code,400);
    assert.equal(calls,0);
    assert.equal((await run({},async()=>{throw new Error('SMTP rejected');})).code,502);
    assert.equal((await run({},async()=>({accepted:[]}))).code,502);
    assert.deepEqual((await run()).data,{success:true});
    assert.equal(calls,1);
  } finally {
    if(original===undefined)delete process.env.SMTP_PASSWORD;else process.env.SMTP_PASSWORD=original;
  }
});
