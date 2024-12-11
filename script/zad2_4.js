import { gaussJordanInverse, solveUsingMatrix } from "./gauss-jordan-inverse.js";

const brojJednacina = document.getElementById("brojJednacina");
const koeficijenti = document.getElementById("koeficijenti");
const vektor = document.getElementById("vektor");
const automatskoPopunjavanje = document.getElementById("automatskoPopunjavanje");
const rijesiMatrix = document.getElementById("rijesiMatrix");
const rjesenje = document.getElementById("rjesenje");

// Primjer matrice za automatsko popunjavanje
const primjerMatrice = {
    brojJednacina: 3,
    koeficijenti: "80,-20,-20;-20,40,-20;-20,-20,130",
    vektor: "20,20,20",
};

// Automatsko popunjavanje
automatskoPopunjavanje.addEventListener("change", () => {
    if (automatskoPopunjavanje.checked) {
        brojJednacina.value = primjerMatrice.brojJednacina;
        koeficijenti.value = primjerMatrice.koeficijenti;
        vektor.value = primjerMatrice.vektor;
    } else {
        brojJednacina.value = "";
        koeficijenti.value = "";
        vektor.value = "";
    }
});

// Rješavanje sustava
rijesiMatrix.addEventListener("click", () => {
  try {
      const n = parseInt(brojJednacina.value);
      const matrica = koeficijenti.value.split(";").map((row) =>
          row.split(",").map(Number)
      );
      const b = vektor.value.split(",").map(Number);

      const { inverznaMatrica, koraci } = gaussJordanInverse(matrica);
      const rezultat = solveUsingMatrix(inverznaMatrica, b);

      const koraciHTML = koraci
          .map(
              (korak, i) =>
                  `<strong>Korak ${i + 1}:</strong><pre>${korak
                      .map(row => row.map(x => x.toFixed(2).padStart(8)).join(" "))
                      .join("\n")}</pre>`
          )
          .join("<br><br>");

      const zaokruzenRezultat = rezultat.map((r) => r.toFixed(2).padStart(8));

      rjesenje.innerHTML = `
          <h4>Proširena matrica po koracima:</h4>
          ${koraciHTML}
          <h4>Rješenje:</h4>
          <pre>${zaokruzenRezultat.join("\n")}</pre>
      `;
  } catch (error) {
      rjesenje.innerHTML = `<strong>Greška:</strong> ${error.message}`;
  }
});