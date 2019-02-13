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

    console.log('u', u);

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

export const covariance = (X, Y) => {
    let u = average(X);

    let sum = [];

    for(let i = 0; i < X.length; i++)
    {
        for(let j = 0; j < Y.length; j++)
        {
            sum[j] += ((X[i] - u) * (X[i+j] - u)) / (X.length - j);
        }
    }

};

export const generateRandomNumbers = (n) => {
    let E = [1];
    let Y = [];
    let X = [];
    let u = 0;

    for(let i = 1; i < n; i++)
    {
        E.push((E[i - 1] * a) % m);
    }

    for(let i = 0; i < n; i++)
    {
        Y.push(E[i] / m);
    }

    u = average(Y);

    for(let i = 0; i < n; i++)
    {
        X.push(-(u * Math.log10(Y[i])));
    }

    return X;
};