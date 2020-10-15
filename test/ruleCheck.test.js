const ruleCheck = require('../src/ruleCheck');
const HandCard = require('../src/handCard');
const assert = require('assert');
const sinon = require('sinon');

describe('rule check test', () => {
    var hcard = new HandCard();

    let spy = sinon.spy(console, 'log');

    afterEach(() => {
        spy.restore();
    });

    it('chitoi test', async () =>{
        const chitoi = ['w2', 'w2', 'w3', 'w3', 's1', 's1', 's5', 's5r', 'p4', 'p4', 'p9', 'p9', '1E', '1E'];
        const notChitoi = ['w2', 'w2', 'w3', 'w3', 's1', 's1', 's5', 's5r', 'p4', 'p4', 'p9', 'p9', '1E', 's1'];

        hcard.deal(chitoi);
        assert(ruleCheck.chitoiCheck(hcard));
        hcard.deal(notChitoi);
        assert(!ruleCheck.chitoiCheck(hcard));
    });

    it('koukushi test', async () =>{
        const koukushi = ['w1', 'w9', 's1', 's9', 'p1', 'p9', '1E', '2S', '3W', '4N', '5H', '6F', '7C' , '7C'];
        const notKoukushi = ['w1', 'w9', 's1', 's9', 'p1', 'p9', '1E', '2S', '3W', '4N', '5H', '6F', '7C' , 'w2'];

        hcard.deal(koukushi);
        assert(ruleCheck.kokushiCheck(hcard));
        hcard.deal(notKoukushi);
        assert(!ruleCheck.kokushiCheck(hcard));
    });

    it('win test', async () =>{
        const winCard = ['p1', 'p1', 'p1', 'p2', 'p3', 'p3', 'p4', 'p5r', 'p5r', 'p5', 'p5', 'p6' , 'p7', 'p8'];

        hcard.deal(winCard);
        assert(ruleCheck.winCheck(hcard));
    });

    it('tenpai test', async () =>{
        const churen = ['w1', 'w1', 'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 'w9', 'w9'];
        const koukushi = ['w1', 'w9', 's1', 's9', 'p1', 'p9', '1E', '2S', '3W', '4N', '5H', '6F', '7C'];
        const chitoi = ['s1', 's1', 's3', 's3', 's5', 's5', 's7', 's7', 's9', 's9', 'w1', 'w1', 'w3'];

        hcard.deal(churen);
        assert.deepEqual(['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9'], ruleCheck.tenpaiCheck(hcard));
        hcard.deal(koukushi);
        assert.deepEqual(['p1', 'w1', 's1', 'p9', 'w9', 's9', '1E', '2S', '3W', '4N', '5H', '6F', '7C'], ruleCheck.tenpaiCheck(hcard));
        hcard.deal(chitoi);
        assert.deepEqual(['w3'], ruleCheck.tenpaiCheck(hcard));
    });

    it('richi test', async () =>{
        const card = ['w1', 'w1', 'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 'w9', 'w9', '1E'];

        hcard.deal(card);
        assert.deepEqual([
            [
              '1E',
              [
                'w1', 'w2', 'w3',
                'w4', 'w5', 'w6',
                'w7', 'w8', 'w9'
              ]
            ],
            [ 'w2', [ '1E' ] ],
            [ 'w5', [ '1E' ] ],
            [ 'w8', [ '1E' ] ]
          ], ruleCheck.richiCheck(hcard));
    });

    it('point test', async () =>{
        const winCard = ['p1', 'p1', 'p1', 'p2', 'p3', 'p3', 'p4', 'p5r', 'p5r', 'p5', 'p5', 'p6' , 'p7', 'p8'];
        hcard.deal(winCard);
       ruleCheck.pointCheck(hcard, '1E', '1E', false, false, false, false, false, ['p1'], ['p8']); 
    });

    it('', async () =>{
        
    });
});