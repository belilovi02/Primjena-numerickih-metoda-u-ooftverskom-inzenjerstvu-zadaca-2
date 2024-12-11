export function gaussJordanInverse(matrix) {
    const n = matrix.length;
    const extended = matrix.map((row, i) =>
        row.concat(Array(n).fill(0).map((_, j) => (i === j ? 1 : 0)))
    );
    const koraci = []; // Lista za spremanje svakog koraka

    for (let i = 0; i < n; i++) {
        let pivot = extended[i][i];
        if (pivot === 0) throw new Error("Matrica nije invertibilna!");

        // Normalizacija reda s pivotom
        for (let j = 0; j < 2 * n; j++) {
            extended[i][j] /= pivot;
        }
        koraci.push(extended.map(row => [...row])); // Spremi trenutni korak

        // Eliminacija svih ostalih elemenata u stupcu
        for (let k = 0; k < n; k++) {
            if (k === i) continue;
            const factor = extended[k][i];
            for (let j = 0; j < 2 * n; j++) {
                extended[k][j] -= factor * extended[i][j];
            }
        }
        koraci.push(extended.map(row => [...row])); // Spremi trenutni korak
    }

    // Vraćamo i korake i inverznu matricu
    return {
        inverznaMatrica: extended.map(row => row.slice(n)),
        koraci
    };
}

export function solveUsingMatrix(inverseMatrix, vector) {
    return inverseMatrix.map((row) =>
        row.reduce((acc, val, i) => acc + val * vector[i], 0)
    );
}

