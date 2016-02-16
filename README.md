react redux project template
=============

## Usage

Clone into desired directory and run 
```js
npm install
```

Currently, to prevent build errors you will need to manually edit a few .babelrc files until those projects are all using Babel 6. Here is the snippet to use:

```js
"presets": ["es2015-loose", "stage-0"]
```

Update the following packages' .babelrc file:

-- base16

-- react-pure-render

-- redux-promise/node_modules/flux-standard-action


Now you can run
```js
npm start
```

and you will be able to view the output at: https://localhost:3002