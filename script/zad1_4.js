import { gaussJordan } from "./gauss-jordan.js";

const brojJednacina = document.getElementById("brojJednacina");
const koeficijenti = document.getElementById("koeficijenti");
const vektor = document.getElementById("vektor");
const automatskoPopunjavanje = document.getElementById("automatskoPopunjavanje");
const rijesiGauss = document.getElementById("rijesiGauss");
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

// Rješavanje sustava koristeći Gauss-Jordanovu metodu
rijesiGauss.addEventListener("click", () => {
    try {
        const n = parseInt(brojJednacina.value);
        const matrica = koeficijenti.value.split(";").map((row) =>
            row.split(",").map(Number)
        );
        const b = vektor.value.split(",").map(Number);

        const rezultat = gaussJordan(matrica, b, n);
        const zaokruzenRezultat = rezultat.map((r) => r.toFixed(2));
        rjesenje.innerHTML = `<strong>Rješenje:</strong> ${zaokruzenRezultat.join(", ")}`;
    } catch (error) {
        rjesenje.innerHTML = `<strong>Greška:</strong> ${error.message}`;
    }
});
