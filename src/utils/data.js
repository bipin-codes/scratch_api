const vet = require('./vet_clinics.json');
const dental = require('./dental_clinics.json');
const clinics = [...vet, ...dental];
console.log(clinics);
module.exports = { clinics };
