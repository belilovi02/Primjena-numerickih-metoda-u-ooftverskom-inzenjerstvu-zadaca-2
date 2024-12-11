import { gaussJordan } from "./gauss-jordan.js";

// Funkcija za generisanje matrice A i vektora b na osnovu datih vrijednosti koeficijenata
function generateMatrixAndVector(k, G) {
    const [k1, k2, k3, k4, k5, k6] = k;
    const [G1, G2, G3, G4] = G;

    const A = [
        [k1 + k2 + k3, -k2, -k3, 0],
        [-k2, k2 + k4, -k4, 0],
        [-k3, -k4, k3 + k4 + k5, -k5],
        [0, 0, -k5, k5 + k6],
    ];

    const b = [G1, G2, G3, G4];

    return { A, b };
}

// Definicija problema prema zadatku
const kFactors = [
    24 / 2, // k1 = 12 N/m
    24,     // k2 = 24 N/m
    24 / 3, // k3 = 8 N/m
    24 / 2, // k4 = 12 N/m
    24 / 2, // k5 = 12 N/m
    24 / 3, // k6 = 8 N/m
];

const gFactors = [
    12 / 2, // G1 = 6 N
    12 / 4, // G2 = 3 N
    12 / 3, // G3 = 4 N
    12 / 2, // G4 = 6 N
];

const { A, b } = generateMatrixAndVector(kFactors, gFactors);
console.log("Generisana matrica A:", A);
console.log("Generisan vektor b:", b);

// Gauss-Jordan metoda
console.log("--- Gauss-Jordan Rješenje ---");
const gaussJordanResult = gaussJordan(JSON.parse(JSON.stringify(A)), [...b], A.length);
console.log("Rješenje (Gauss-Jordan):", gaussJordanResult);

// HTML prikaz rješenja i matrice A
document.getElementById('matricaA').innerHTML = `
  <table border="1" class="table table-bordered">
    ${A.map(
        row => `<tr>${row.map(value => `<td>${value.toFixed(2)}</td>`).join('')}</tr>`
    ).join('')}
  </table>
`;

document.getElementById('rjesenja').innerHTML = `
  <h5>Gauss-Jordan metoda:</h5>
  <p>[${gaussJordanResult.map(value => value.toFixed(6)).join(', ')}]</p>
`;
