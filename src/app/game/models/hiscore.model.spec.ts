import { Hiscore } from './hiscore.model'

describe('Hiscore model validation - premade 350 score test', () => {
    it('Validate calculation of score is 100', () => {
        let hiscore: Hiscore = new Hiscore(100, 3, 5, "Gilles");
        const calculatedScore = hiscore.calcScore(100);
        expect(calculatedScore).toBe(350);

    })
});

describe('Hiscore model validation - calc score with 0 kills', () => {
    it('Validate calculation of score is 100', () => {
        let kills = 0;
        let hiscore: Hiscore = new Hiscore(0, 1, kills, "Gilles");
        const calculatedScore = hiscore.calcScore();
        expect(calculatedScore).toBe(0);

    })
});

describe('Hiscore model validation - calc score should be > 1000', () => {
    it('Validate calculation of score is 100', () => {
        let kills = 50;
        let hiscore: Hiscore = new Hiscore(50000, 5, kills, "Gilles");
        //a = 50*50=2500  b = ((5 - 1) *50 = 200; a + b = 2700
        //d = 50 000 / 100 = 500  c = d / 5 = 100
        // score = (a + b) - c = 2700 - 100 = ~2600 > 1000
        const calculatedScore = hiscore.calcScore();
        expect(calculatedScore).toBeGreaterThan(1000);

    })
});