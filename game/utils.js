

var arr = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9',
            'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9',
            's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9',
            '1E', '2S', '3W', '4N', '5H', '6F', '7C',
            'p5r', 'w5r', 's5r']

var dict = {'p1' : 0, 'p2' : 1, 'p3' : 2, 'p4' : 3, 'p5' : 4, 'p6' : 5, 'p7' : 6, 'p8' : 7, 'p9' : 8,
            'w1' : 9, 'w2' : 10, 'w3' : 11, 'w4' : 12, 'w5' : 13, 'w6' : 14, 'w7' : 15, 'w8' : 16, 'w9' : 17,
            's1' : 18, 's2' : 19, 's3' : 20, 's4' : 21, 's5' : 22, 's6' : 23, 's7' : 24, 's8' : 25, 's9' : 26,
            '1E' : 27, '2S' : 28, '3W' : 29, '4N' : 30, '5H' : 31, '6F' : 32, '7C' : 33,
            'p5r' : 34, 'w5r' : 35, 's5r' : 36}

var checkOrder = {'p1' : 1, 'p2' : 2, 'p3' : 3, 'p4' : 4, 'p5' : 5, 'p6' : 6, 'p7' : 7, 'p8' : 8, 'p9' : 9,
            'w1' : 11, 'w2' : 12, 'w3' : 13, 'w4' : 14, 'w5' : 15, 'w6' : 16, 'w7' : 17, 'w8' : 18, 'w9' : 19,
            's1' : 11, 's2' : 12, 's3' : 23, 's4' : 24, 's5' : 25, 's6' : 26, 's7' : 27, 's8' : 28, 's9' : 29,
            '1E' : 31, '2S' : 32, '3W' : 33, '4N' : 34, '5H' : 35, '6F' : 36, '7C' : 37,
            'p5r' : 5, 'w5r' : 15, 's5r' : 25}


/**
 * // regardless of red tile
 * @param {string} t1 
 * @param {string} t2
 * @returns {boolean} 
 */
function isSameTile(t1, t2) {
    if (t1[0] === t2[0] && t1[1] === t2[1]) {
        return true;
    } else {
        return false;
    }
}

function isWindTile(tile) {
    if (tile == '1E' || tile == '2S' || tile == '3W' || tile == '4N') {
        return true;
    } else {
        false;
    }
}

/**
 * //   三元牌
 * @param {string} tile 
 */
function isDragonTile(tile) {
    if (tile == '5H' || tile == '6F' || tile == '7C') {
        return true;
    } else {
        false;
    }
}

function isWordTile(tile) {
    if (isWindTile(tile) || isDragonTile(tile)) {
        return true;
    } else {
        return false;
    }
}

function is19(tile) {
    if (isWordTile(tile) || tile == 'w1' || tile == 'w9' ||  tile == 'p1' ||  tile == 'p9' ||  tile == 's1' ||  tile == 's9') {
        return true;
    } else {
        return false;
    }
}

/**
 * 
 * @param {string} str 
 * @param {number} start 
 * @param {number} number
 * @returns {string} 
 */
function strSplice(str, start, number, item) {
    if (item == undefined) {
        str = str.substr(0, start) + str.substr(start + number, str.length - 1);
    } else {
        str = str.substr(0, start) + item + str.substr(start + number, str.length - 1);
    }

    return str;
}

module.exports = {arr,
                dict,
                checkOrder,
                isSameTile,
                strSplice,
                isWindTile,
                isDragonTile,
                isWordTile,
                is19};


function test() {
    var t1 = 'p5r';
    var t2 = 'p5';
    var t3 = 'p6';
    console.log(isSameTile(t1, t2));
    console.log(isSameTile(t1, t3));
    var str = '123456789';
    console.log(strSplice(str, 2, 3));
    console.log(str);

}

if (require.main === module) {
    test();
}