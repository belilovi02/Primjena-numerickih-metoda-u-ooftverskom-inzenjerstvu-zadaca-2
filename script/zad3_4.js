import { gaussSeidelRelaxation } from "./gauss-seidel.js";

const brojJednacina = document.getElementById("brojJednacina");
const koeficijenti = document.getElementById("koeficijenti");
const vektor = document.getElementById("vektor");
const koeficijentRelaksacije = document.getElementById("relaksacija");
const tacnost = document.getElementById("tacnost");
const rijesiGaussSeidel = document.getElementById("rijesiGaussSeidel");
const rjesenje = document.getElementById("rjesenje");

// Automatsko popunjavanje primjera
document.getElementById("automatskoPopunjavanje").addEventListener("change", (e) => {
    if (e.target.checked) {
        brojJednacina.value = 5;
        koeficijenti.value = "4,-1,0,1,0;-1,4,-1,0,1;0,-1,4,-1,0;1,0,-1,4,-1;0,1,0,-1,4";
        vektor.value = "100,100,100,100,100";
        koeficijentRelaksacije.value = 1.1;
        tacnost.value = 1e-6;
    } else {
        brojJednacina.value = "";
        koeficijenti.value = "";
        vektor.value = "";
        koeficijentRelaksacije.value = "";
        tacnost.value = "";
    }
});

// Rješavanje sistema
rijesiGaussSeidel.addEventListener("click", () => {
    try {
        const n = parseInt(brojJednacina.value);
        const matrica = koeficijenti.value.split(";").map((row) =>
            row.split(",").map(Number)
        );
        const b = vektor.value.split(",").map(Number);
        const omega = parseFloat(koeficijentRelaksacije.value);
        const tolerance = parseFloat(tacnost.value);
        const maxIterations = 800;

        let x = new Array(n).fill(0); // Initial approximation
        let iteracije = [];
        let converged = false;
        let iteration = 0;

        while (!converged && iteration < maxIterations) {
            let previousX = [...x];
            for (let i = 0; i < n; i++) {
                let sum = 0;
                for (let j = 0; j < n; j++) {
                    if (i !== j) {
                        sum += matrica[i][j] * x[j];
                    }
                }
                x[i] = (1 - omega) * previousX[i] + omega * (b[i] - sum) / matrica[i][i];
            }

            // Calculate the maximum difference for the stopping condition
            let maxDiff = Math.max(...x.map((xi, i) => Math.abs(xi - previousX[i])));
            converged = maxDiff < tolerance;

            // Store iteration data
            iteracije.push({
                iteracija: iteration + 1,
                aproksimacije: x.slice(),
                greska: maxDiff
            });
            iteration++;
        }

        // Prikaz rezultata u formatu tabele
        const iteracijeHTML = `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Iteracija</th>
                        ${Array.from({ length: n }, (_, i) => `<th>x${i + 1}</th>`).join('')}
                        <th>Greška</th>
                    </tr>
                </thead>
                <tbody>
                    ${iteracije
                        .map(
                            (step) =>
                                `<tr>
                                    <td>${step.iteracija}</td>
                                    ${step.aproksimacije.map(val => `<td>${val.toFixed(6)}</td>`).join('')}
                                    <td>${step.greska.toFixed(6)}</td>
                                </tr>`
                        )
                        .join("")}
                </tbody>
            </table>
        `;

        rjesenje.innerHTML = `
            <h4>Iterativni postupak:</h4>
            ${iteracijeHTML}
            <h4>Konačno rješenje:</h4>
            ${Array.from({ length: n }, (_, i) => `x${i + 1}: ${x[i].toFixed(6)}`).join(', ')}
        `;
    } catch (error) {
        rjesenje.innerHTML = `<strong>Greška:</strong> ${error.message}`;
    }
});
