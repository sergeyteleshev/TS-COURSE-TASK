import chi from "chi-squared";

export const m = 2147483647;
export const a =  630360016;
export const b = 1663;
export const t = 1.96;
export const u0 = 0.25;

export const average = (X) => {
    let sum = 0;
    let u = 0;

    for(let i = 0; i < X.length; i++)
    {
        sum += X[i];
    }

    u = sum / X.length;

    return u;
};

export const dispersion = (X) =>
{
    let u = average(X);
    let sum = 0;

    for(let i = 0; i < X.length; i++)
    {
        sum += (X[i] - u) ** 2;
    }

    return sum / (X.length - 1);
};

export const correlation = (X) => {
    let u = average(X);
    let sum = 0;
    let k = [];
    let p = [];
    let disp = dispersion(X);

    for(let j = 1; j < X.length; j++)
    {
        sum = 0;
        for(let i = 1; i < X.length - j; i++)
        {
            sum += ((X[i] - u) * (X[i+j] - u));
        }

        k[j] = sum / (X.length - j);
        p[j] = k[j] / disp;
    }

    return p;
};

export const histogramPriority = (X, maxPriority) =>
{
    let freq =  Array(maxPriority + 1).fill(0);

    for(let i = 0; i < X.length; i++)
    {
        for(let j = 0; j <= maxPriority; j++)
        {
            if(X[i] === j + 1)
            {
                freq[j]++
            }
        }
    }

    return freq;
};

export const generatePriorityNumbers = (N) =>
{
    let X_current = 1;

    let p = [1];

    //%Вероятность появления X1
    let P_X1 = 0.4;

    //%Вероятность появления X2
    let P_X2 = 0.3;

    //%Вероятность появления X3
    let P_X3 = 0.2;

    //%Вероятность появления X4
    let P_X4 = 0.1;

    let i = 0;

    while(p.length < N)
    {
        i++;
        X_current = (a * X_current + b) % m;
        if(X_current / m < P_X1)
        {
            p[i] = 1;
        }
        else if (X_current / m < (P_X2 + P_X1))
        {
            p[i] = 2;
        }
        else if (X_current / m < (P_X3 + P_X2 + P_X1))
        {
            p[i] = 3;
        }
        else if (X_current / m < (P_X4 + P_X3 + P_X2 + P_X1))
        {
            p[i] = 4;
        }
    }

    return p;
};

export const generateRandomNumbers = (n, u) => {
    const E0 = 1;
    let E = [E0];
    let Y = [];
    let X = [];
    let set = {};

    for(let i = 1; i < n; i++)
    {
        E.push((E[i - 1] * a) % m);
    }

    for(let i = 0; i < n; i++)
    {
        Y.push(E[i] / m);
    }

    for(let i = 0; i < n; i++)
    {
        X.push(-(u * Math.log(Y[i])));
    }

    set = {...set, E,Y,X};

    return X;
};

export const trustInterval = (X) =>
{
    const u = average(X);
    const o = dispersion(X);
    const leftInterval = u - t * (Math.sqrt(o) / Math.sqrt(X.length));
    const rightInterval = u + t * (Math.sqrt(o) / Math.sqrt(X.length));

    return [leftInterval, rightInterval];
};

export const criteriaStatistics = (X) =>
{
    return Math.abs(Math.sqrt(X.length ) * ((average(X) - u0) / Math.sqrt(dispersion(X))));
};

export const chiSquare = (X) => {
    const n = X.length;
    const k = Math.ceil(1 + 3.3 * Math.log(n));
    let sum = 0;

    for(let i = 0; i < X.length; i++)
    {
        sum += chi.pdf(X[i], k);
    }

    return sum;
};

export const histogramCheck = (X) =>
{
    const k = Math.ceil(1.72 * Math.cbrt(X.length));

    let length = X.length;

    let min = X[0];
    let max = X[1];

    for (let i = 0; i < length; i++) {
        let item = X[i];
        if (item < min) min = item;
        else if (item > max) max = item;
    }

    let bins = Math.ceil((max - min + 1) / k);
    console.log('bins', bins);

    let histogram = new Array(bins).fill(0);

    for (let i = 0; i < length; i++)
        histogram[Math.floor((X[i] - min) / k)]++;

    return histogram;
};