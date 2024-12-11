export function gaussSeidelRelaxation(matrix, b, omega, tolerance, maxIterations) {
  const n = matrix.length;
  const x = new Array(n).fill(0);
  const iteracije = [];

  // Provjera uslova konvergencije (dijagonalna dominacija)
  const isDiagonallyDominant = matrix.every((row, i) =>
      Math.abs(row[i]) > row.reduce((sum, val, j) => (i !== j ? sum + Math.abs(val) : sum), 0)
  );

  if (!isDiagonallyDominant) {
      throw new Error("Matrica ne zadovoljava uslove dijagonalne dominacije za konvergenciju.");
  }

  let iter = 0;
  let maxError = Infinity;

  while (maxError > tolerance && iter < maxIterations) {
      const xOld = [...x];

      for (let i = 0; i < n; i++) {
          let sigma = 0;
          for (let j = 0; j < n; j++) {
              if (j !== i) sigma += matrix[i][j] * x[j];
          }
          x[i] = (1 - omega) * xOld[i] + (omega * (b[i] - sigma)) / matrix[i][i];
      }

      // Izračun maksimalne greške
      maxError = Math.max(...x.map((val, i) => Math.abs(val - xOld[i])));

      // Pohrana trenutnog stanja iteracije
      iteracije.push({
          iteracija: iter + 1,
          aproksimacije: [...x],
          greska: maxError,
      });

      iter++;
  }

  if (iter === maxIterations && maxError > tolerance) {
      throw new Error(
          "Postignut maksimalan broj iteracija prije zadovoljenja kriterija tačnosti."
      );
  }

  return { rjesenje: x, iteracije };
}
