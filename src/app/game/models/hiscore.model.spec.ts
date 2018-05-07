import { Hiscore } from './hiscore.model'

describe('Hiscore model validation', () => {
    it('Validate calculation of score is 100', () => {
        let hiscore: Hiscore = new Hiscore(100, 3, 5, "Gilles");
        const calculatedScore = hiscore.calcScore(100);
        expect(calculatedScore).toBe(317);
        
    })

});