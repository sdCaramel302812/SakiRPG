const tsumoTable = {
    1: {
        30: [300, 500],
        40: [400, 700],
        50: [400, 800],
        60: [500, 1000],
        70: [600, 1200],
        80: [700, 1300],
        90: [800, 1500],
        100: [800, 1600]
    },
    2: {
        20: [400, 700],
        30: [500, 1000],
        40: [700, 1300],
        50: [800, 1600],
        60: [1000, 2000],
        70: [1200, 2300],
        80: [1300, 2600],
        90: [1500, 2900],
        100: [1600, 3200],
        110: [1800, 3600]
    },
    3: {
        20: [700, 1300],
        25: [800, 1600],
        30: [1000, 2000],
        40: [1300, 2600],
        50: [1600, 3200],
        60: [2000, 3900]
    },
    4: {
        20: [1300, 2600],
        25: [1600, 3200],
        30: [2000, 3900]
    },
    5 : [2000, 4000],
    6 : [3000, 6000],
    7 : [3000, 6000],
    8 : [4000, 8000],
    9 : [4000, 8000],
    10 : [4000, 8000],
    11 : [6000, 12000],
    12 : [6000, 12000],
    13 : [8000, 16000]
}
const ronTable = {
    1: {
        30: 1000,
        40: 1300,
        50: 1600,
        60: 2000,
        70: 2300,
        80: 2600,
        90: 2900,
        100: 3200,
        110: 3600
    },
    2: {
        25: 1600,
        30: 2000,
        40: 2600,
        50: 3200,
        60: 3900,
        70: 4500,
        80: 5200,
        90: 5800,
        100: 6400,
        110: 7100
    },
    3: {
        25: 3200,
        30: 3900,
        40: 5200,
        50: 6400,
        60: 7700
    },
    4: {
        25: 6400,
        30: 7700
    },
    5: 8000,
    6: 12000,
    7: 12000,
    8: 16000,
    9: 16000,
    10: 16000,
    11: 24000,
    12: 24000,
    13: 32000
}
var oyaTsumoTable = {
    1: {
        30: 500,
        40: 700,
        50: 800,
        60: 1000,
        70: 1200,
        80: 1300,
        90: 1500,
        100: 1600
    },
    2: {
        20: 700,
        30: 1000,
        40: 1300,
        50: 1600,
        60: 2000,
        70: 2300,
        80: 2600,
        90: 2900,
        100: 3200,
        110: 3600
    },
    3: {
        20: 1300,
        25: 1600,
        30: 2000,
        40: 2600,
        50: 3200,
        60: 3900
    },
    4: {
        20: 2600,
        25: 3200,
        30: 3900
    },
    5 : 4000,
    6 : 6000,
    7 : 6000,
    8 : 8000,
    9 : 8000,
    10 : 8000,
    11 : 12000,
    12 : 12000,
    13 : 16000
}
oyaRonTable = {
    1: {
        30: 1500,
        40: 2000,
        50: 2400,
        60: 2900,
        70: 3400,
        80: 3900,
        90: 4400,
        100: 4800,
        110: 5300
    },
    2: {
        25: 2400,
        30: 2900,
        40: 3900,
        50: 4800,
        60: 5800,
        70: 6800,
        80: 7700,
        90: 8700,
        100: 9600,
        110: 10600
    },
    3: {
        25: 4800,
        30: 5800,
        40: 7700,
        50: 9600,
        60: 11600
    },
    4: {
        25: 9600,
        30: 11600
    },
    5: 12000,
    6: 18000,
    7: 18000,
    8: 24000,
    9: 24000,
    10: 24000,
    11: 36000,
    12: 36000,
    13: 48000
}

class Point {
    property = {
        point: 0,
        han: 0,
        fu: 0,
        dora: 0,
        akadora: 0,
        uradora: 0,
        yakuman: false,
        noYaku: true
    }
    yaku = {
        PIN_HU: false,
        TAN_YAO: false,
        HAKU: false,
        FA: false,
        CHUN: false,
        CHAN_FON: false,
        MEN_FON: false,
        MEN_ZEN_TSUMO: false,
        I_PEI_KO: false,
        RIN_SHAN: false,
        CHAN_KAN: false,
        HAI_TEI: false,
        HOU_TEI: false,
        W_RICHI: false,
        RICHI: false,
        I_BATSU: false,
        TOI_TOI: false,
        SAN_SHUKU_J: false,
        SAN_SHUKU_K: false,
        IKKI: false,
        CHAN_TA: false,
        SAN_AN_KO: false,
        SAN_KAN_TSU: false,
        HON_RO_ROU: false,
        CHI_TOI: false,
        HON_I_TSU: false,
        RYAN_PEI_KO: false,
        JUN_CHAN: false,
        SHOU_SAN_GEN: false,
        CHIN_I_TSU: false,
        SU_AN_KO: false,
        DAI_SU_SHI: false,
        SHOU_SU_SHI: false,
        KOKUSHI: false,
        SU_KAN_TSU: false,
        DAI_SAN_GEN: false,
        CHIN_RO_TOU: false,
        TSU_I_SO: false,
        RYU_I_SO: false,
        CHU_REN: false,
        TEN_HO: false,
        CHI_HO: false,
        SU_AN_KO_DANKI: false,
        KOKUSHI_13: false,
        JUN_SEI_CHU_REN: false
    }

    /**
     * 
     * @param {boolean} oya 
     * @param {boolean} tsumo 
     */
    getPoint(oya, tsumo) {
        let han = this.property.han;
        let fu = this.property.fu;
        if ((han == 4 && fu > 30) || (han == 3 && fu > 60)) {
            han = 5;
        }
        if (oya) {
            if (tsumo) {
                if (han >= 5) {
                    return oyaTsumoTable[han];
                } else {
                    return oyaTsumoTable[han][fu];
                }
            } else {
                if (han >= 5) {
                    return oyaRonTable[han];
                } else {
                    return oyaRonTable[han][fu];
                }
            }
        } else {
            if (tsumo) {
                if (han >= 5) {
                    return tsumoTable[han];
                } else {
                    return tsumoTable[han][fu];
                }
            } else {
                if (han >= 5) {
                    return ronTable[han];
                } else {
                    return ronTable[han][fu];
                }
            }
        }
    }

    printYaku() {
        console.log('---  yaku ---');
        if (this.yaku.SU_AN_KO_DANKI) {
            console.log('SU_AN_KO_DANKI');
        } else if (this.yaku.SU_AN_KO) {
            console.log('SU_AN_KO');
        }
        if (this.yaku.DAI_SU_SHI) {
            console.log('DAI_SU_SHI');
        }  
        if (this.yaku.SHOU_SU_SHI) {
            console.log('SHOU_SU_SHI');
        }
        if (this.yaku.KOKUSHI_13) {
            console.log('KOKUSHI_13');
        } else if (this.yaku.KOKUSHI) {
            console.log('KOKUSHI');
        }
        if (this.yaku.SU_KAN_TSU) {
            console.log('SU_KAN_TSU');
        }
        if (this.yaku.DAI_SAN_GEN) {
            console.log('DAI_SAN_GEN');
        }
        if (this.yaku.CHIN_RO_TOU) {
            console.log('CHIN_RO_TOU');
        }
        if (this.yaku.TSU_I_SO) {
            console.log('TSU_I_SO');
        }
        if (this.yaku.RYU_I_SO) {
            console.log('RYU_I_SO');
        }
        if (this.yaku.JUN_SEI_CHU_REN) {
            console.log('JUN_SEI_CHU_REN');
        } else if (this.yaku.CHU_REN) {
            console.log('CHU_REN');
        }
        if (this.yaku.TEN_HO) {
            console.log('TEN_HO');
        }
        if (this.yaku.CHI_HO) {
            console.log('CHI_HO');
        }
        if (!this.property.yakuman) {
            if (this.yaku.PIN_HU) {
                console.log('PIN_HU');
            }
            if (this.yaku.TAN_YAO) {
                console.log('TAN_YAO');
            }
            if(this.yaku.HAKU || this.yaku.FA || this.yaku.CHUN || this.yaku.CHAN_FON || this.yaku.MEN_FON ) {
                console.log('YAKU_HAI');
            }
            if (this.yaku.MEN_ZEN_TSUMO) {
                console.log('MEN_ZEN_TSUMO');
            }
            if (this.yaku.RYAN_PEI_KO) {
                console.log('RYAN_PEI_KO');
            } else if (this.yaku.I_PEI_KO) {
                console.log('I_PEI_KO');
            }
            if (this.yaku.RIN_SHAN) {
                console.log('RIN_SHAN');
            }
            if (this.yaku.CHAN_KAN) {
                console.log('CHAN_KAN');
            }
            if (this.yaku.HAI_TEI) {
                console.log('HAI_TEI');
            }
            if (this.yaku.HOU_TEI) {
                console.log('HOU_TEI');
            }
            if (this.yaku.W_RICHI) {
                console.log('W_RICHI');
            } else if (this.yaku.RICHI) {
                console.log('RICHI');
            }
            if (this.yaku.I_BATSU) {
                console.log('I_BATSU');
            }
            if (this.yaku.TOI_TOI) {
                console.log('TOI_TOI');
            }
            if (this.yaku.SAN_SHUKU_J) {
                console.log('SAN_SHUKU_J');
            }
            if (this.yaku.SAN_SHUKU_K) {
                console.log('SAN_SHUKU_K');
            }  
            if (this.yaku.IKKI) {
                console.log('IKKI');
            }
            if (this.yaku.JUN_CHAN) {
                console.log('JUN_CHAN');
            } else if (this.yaku.CHAN_TA) {
                console.log('CHAN_TA');
            } 
            if (this.yaku.SAN_AN_KO) {
                console.log('SAN_AN_KO');
            }
            if (this.yaku.SAN_KAN_TSU) {
                console.log('SAN_KAN_TSU');
            }
            if (this.yaku.HON_RO_ROU) {
                console.log('HON_RO_ROU');
            }
            if (!this.yaku.RYAN_PEI_KO && this.yaku.CHI_TOI) {
                console.log('CHI_TOI');
            }
            if (this.yaku.CHIN_I_TSU) {
                console.log('CHIN_I_TSU');
            } else if (this.yaku.HON_I_TSU) {
                console.log('HON_I_TSU');
            }
            if (this.yaku.SHOU_SAN_GEN) {
                console.log('SHOU_SAN_GEN');
            }
        }
        console.log('---  yaku ---');
    }
}

module.exports = Point;