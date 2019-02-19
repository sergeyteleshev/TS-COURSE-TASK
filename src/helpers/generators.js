const m = 2147483647;
const a =  630360016;

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
    let E = [1];
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