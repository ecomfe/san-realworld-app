module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                browsers: ['last 2 versions', 'not ie <= 11']
            },
            useBuiltIns: 'usage',
            corejs: 3
        }],
        '@babel/preset-typescript'
    ]
};
