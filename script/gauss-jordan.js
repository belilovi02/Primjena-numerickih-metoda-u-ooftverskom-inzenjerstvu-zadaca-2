export function gaussJordan(matrix, b, n) {
  // Kombinacija Gauss-Jordan eliminacije
  for (let i = 0; i < n; i++) {
    let maxEl = Math.abs(matrix[i][i]);
    let maxRow = i;

    // Traženje maksimalnog elementa u koloni za stabilnost
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(matrix[k][i]) > maxEl) {
        maxEl = Math.abs(matrix[k][i]);
        maxRow = k;
      }
    }

    // Zamjena trenutnog reda s redom sa maksimalnim elementom
    for (let k = i; k < n; k++) {
      const temp = matrix[maxRow][k];
      matrix[maxRow][k] = matrix[i][k];
      matrix[i][k] = temp;
    }

    // Zamjena odgovarajućeg elementa u vektoru slobodnih članova
    const temp = b[maxRow];
    b[maxRow] = b[i];
    b[i] = temp;

    // Smanjenje vrijednosti ispod glavne dijagonale
    for (let j = i + 1; j < n; j++) {
      const factor = matrix[j][i] / matrix[i][i];
      for (let k = i; k < n; k++) {
        matrix[j][k] -= matrix[i][k] * factor;
      }
      b[j] -= b[i] * factor;
    }
  }

  // Invertiranje i normalizacija dijagonale
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = b[i] / matrix[i][i];
    for (let j = i - 1; j >= 0; j--) {
      b[j] -= matrix[j][i] * x[i];
    }
  }

  return x;
}

