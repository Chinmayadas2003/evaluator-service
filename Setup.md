## How to setup a new Typescript + express project

```
1.npm init -y

2.npm install -g typescript
2*.npm install -D typescript(getting problem for tsc --init) use npx tsc like npx nodemon

3.tsc --init

4. Add the followiing scripts in package.json
{
    "build": "npx tsc",
    "prestart": "npm run build",
    "watch": "npx tsc -w",
    "start": "npx nodemon dist/index.js",
    "dev": "npx concurrently --kill-others \"npm run watch\" \"npm start\""
}
// Make relevant config changes in tsconfig.json 

5.npm i concurrently before step 4.

6. npm run dev


```