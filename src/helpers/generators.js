export const m = 2147483647;
export const a =  630360016;
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

export const correlation = (X, Y) => {
    let u = average(X);
    let sum = 0;
    let k = [];
    let p = [];
    let disp = dispersion(X);

    for(let j = 0; j < Y.length; j++)
    {
        sum = 0;
        for(let i = 0; i < X.length - j; i++)
        {
            sum += ((X[i] - u) * (X[i+j] - u));
        }

        k[j] = sum / (X.length - 1 - j);
        p[j] = k[j] / disp;
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
    return Math.abs(Math.sqrt(X.length * ((average(X) - u0) / dispersion(X))));
};

export const histogramCheck = (X) =>
{
    console.log(X);
    const k = Math.ceil(1.72 * X.length ** (1/3));
    const dx = Math.ceil(X.length / k);
    const trustInt = trustInterval(X);
    let d_numbers = [];
    let intervals = [];

    for(let i = 1; i <= k; i++)
    {
        let el = 0;
        let er = 0;

        for(let j = 1; j <= i; j++)
        {
            er += X[j];

            if(j !== 1)
            {
                el += X[j - 1]
            }
        }

        intervals.push([el, er]);
    }


    for(let i = 0; i < X.length; i++)
    {
        for(let j = 0; j < k; j++)
        {
            if(X[i] >= intervals[j][0] && X[i] < intervals[j][1])
            {
                d_numbers.push(X[j]);
            }
        }
    }

    let freq = Array(d_numbers.length).fill(0);

    for(let i = 0; i < d_numbers.length; i++)
    {
        for(let j = 0; j < X.length; j++)
        {
            if (d_numbers[i] === X[j])
            {
                freq[j]++;
            }
        }
    }

    console.log('freq', freq);

    return freq;
};