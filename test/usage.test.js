const assert = require('assert');
const sinon = require('sinon');

function sinonTest() {

}

describe('usage test', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('usage of assert', async () => {
        assert(true, 'won\'t throw error');
        //assert(false, 'throw error');
    });

    it('usage of equal', async () =>{
        // ==
        assert.equal(1, 1);
        assert.equal('1', 1);
        const obj1 = [1, 2, 3];
        const obj2 = [1, 2, 3];
        assert.equal(obj1, obj1);
        //assert.equal(obj1, obj2, throw error);
        //assert.equal({}, {}, 'throw error');
        //assert.equal([], [], 'throw error');

        assert.notEqual(1, 2);
    });

    it('usage of deepEqual', async () =>{
        const a = [1, 2, 3];
        const b = [1, 2, 3];
        const c = [4, 5, 6];
        assert.deepEqual(a, b);
        //assert.deepEqual(a, c, 'throw error');

        assert.notDeepEqual(b, c);
    });

    it('usage of deepStrictEqual', async () =>{
        const obj1 = [1, 2, 3];
        const obj2 = [1, 2, 3];
        // different prototype
        const son1 = Object.create(obj1);
        const son2 = Object.create(obj2);
        assert.deepEqual(son1, son2);
        //assert.deepStrictEqual(son1, son2, 'throw error');

        assert.notDeepStrictEqual(son1, son2);
    });

    it('usage of strictEqual', async () =>{
        // ===
        assert.strictEqual(1, 1);
        //assert.strictEqual('1', 1, 'throw error');

        assert.notStrictEqual('1', 1);
    });

    it('', async () =>{

    });

    it('', async () =>{

    });
});