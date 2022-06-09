// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// factory function
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const dnaIndex = Math.floor(Math.random() * this.dna.length); //choose random number to be dna index
      let newBase = returnRandBase(); //returns a random base to replace original at dna index
      while (this.dna[dnaIndex] === newBase){ //while the random dna index is the same as the random base,
        newBase = returnRandBase();                   //return another random base
      }
    this.dna[dnaIndex] = newBase; // Now the random base is not the same as the dna index, replace it
    return this.dna;
    },

    compareDNA(object) {
      let totalSameBases = 0;
      for (i = 0; i < object.dna.length; i++){
        if (object.dna[i] === this.dna[i]){
          totalSameBases++
        }
      }
      let percentTotal = totalSameBases / 15 * 100;
      return `Specimen #${this.specimenNum} and specimen #${object.specimenNum} have ${percentTotal.toFixed(2)}% DNA in common.`;
    },

    willLikelySurvive() {
      let baseCorGTotal = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G'){
          baseCorGTotal = baseCorGTotal + 1;
        };
      }
      let survivalPercent = baseCorGTotal / 15 * 100;
       if (survivalPercent >= 60) {
          return true;
        } else {return false;}
    }
  }
}

const specimenGenerator = () => {
const survivors = [];
let count = 1;


while (survivors.length <= 30){
  const newSpecimen = pAequorFactory(count, mockUpStrand());
  if (newSpecimen.willLikelySurvive()) {
    survivors.push(newSpecimen);
    console.log(`Specimen #${newSpecimen.specimenNum}; DNA: ${newSpecimen.dna}`);
  }
  count++;
  
}
}


//test factory
/*console.log(pAequorFactory(1, mockUpStrand()))*/
let dave = pAequorFactory(3, mockUpStrand());
let frank = pAequorFactory(1, mockUpStrand());

//test compareDna
/*console.log(dave.dna);
console.log(frank.dna);
console.log(dave.compareDNA(frank));*/

//test willlikelysurvive
/*console.log(dave.dna);
console.log(dave.willLikelySurvive());*/

specimenGenerator();










