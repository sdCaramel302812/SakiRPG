const ruleCheck = require('../game/ruleCheck');
const HandCard = require('../game/handCard');
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
        const winCard = ['1E', '1E', '1E', 'p1', 'p1', 'p1', 'p2', 'p3', 'p3', 'p4', 'p5', 'p6' , 'p7', 'p8'];

        hcard.deal(winCard);
        assert(ruleCheck.winCheck(hcard));
    });

    it('', async () =>{

    });
});