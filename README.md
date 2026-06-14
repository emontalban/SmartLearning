# SmartLearning

## Pasos para arreglar un proyecto nuevo

Estos son los cambios que hay que aplicar si se crea de nuevo este proyecto con la plantilla antigua de React, Redux, Router y Webpack 4.

## 1. Cambiar scripts en `package.json`

Archivo:

```text
package.json
```

### `start`

Antes:

```json
"start": "webpack-dev-server --config webpack/dev.config.js --watch"
```

Despues:

```json
"start": "cross-env NODE_OPTIONS=--openssl-legacy-provider webpack-dev-server --config webpack/dev.config.js --watch"
```

### `build`

Antes:

```json
"build": "cross-env NODE_ENV=production webpack --config webpack/prod.config.js --progress --display-error-details --color"
```

Despues:

```json
"build": "cross-env NODE_ENV=production NODE_OPTIONS=--openssl-legacy-provider webpack --config webpack/prod.config.js --progress --display-error-details --color"
```

### `prod`

Antes:

```json
"prod": "NODE_ENV=production node server.js"
```

Despues:

```json
"prod": "cross-env NODE_ENV=production node server.js"
```

Motivo:

- `NODE_OPTIONS=--openssl-legacy-provider` evita errores de OpenSSL con Webpack 4 en Node moderno.
- `cross-env` permite que las variables de entorno funcionen tambien en Windows.

## 2. Cambiar dependencias Sass en `package.json`

Archivo:

```text
package.json
```

Quitar `node-sass`:

```bash
npm uninstall node-sass
```

Instalar `sass` y actualizar `sass-loader`:

```bash
npm install sass sass-loader@^10.5.2
```

Resultado esperado en `package.json`:

```json
"sass": "...",
"sass-loader": "^10.5.2"
```

Motivo:

- `node-sass` es antiguo y da problemas con versiones modernas de Node.
- `sass` no necesita compilar binarios nativos.
- `sass-loader@10` sigue siendo compatible con Webpack 4.
- La version exacta de `sass` puede cambiar segun el momento en que se ejecute `npm install`.

## 3. Cambiar opciones de Sass en Webpack

Archivos:

```text
webpack/dev.config.js
webpack/prod.config.js
```

Buscar el bloque de `sass-loader`.

Antes:

```js
{
  loader: "sass-loader",
  options: {
    outputStyle: "expanded",
    sourceMap: true,
    sourceMapContents: true
  }
}
```

Despues:

```js
{
  loader: "sass-loader",
  options: {
    sourceMap: true,
    sassOptions: {
      outputStyle: "expanded"
    }
  }
}
```

Nota:

- En `webpack/dev.config.js` el proyecto usa comillas simples.
- En `webpack/prod.config.js` el proyecto usa comillas dobles.
- El cambio importante es mover `outputStyle` dentro de `sassOptions` y quitar `sourceMapContents`.

## 4. Cambiar minificacion en `webpack/prod.config.js`

Archivo:

```text
webpack/prod.config.js
```

### 4.1 Borrar este bloque de `plugins`

Quitar el `new UglifyJsPlugin(...)` que esta dentro del array `plugins`:

```js
new UglifyJsPlugin({
  uglifyOptions: {
    compress: {
      ie8: true,
      warnings: false
    },
    mangle: {
      ie8: true
    },
    output: {
      comments: false,
      ie8: true
    }
  },
  sourceMap: true
}),
```

### 4.2 Agregar este bloque al objeto principal

Agregar este bloque al mismo nivel que `output`, `module` y `plugins`:

```js
optimization: {
  minimizer: [
    new UglifyJsPlugin({
      parallel: false,
      uglifyOptions: {
        compress: {
          ie8: true,
          warnings: false
        },
        mangle: {
          ie8: true
        },
        output: {
          comments: false,
          ie8: true
        }
      },
      sourceMap: true
    })
  ]
},
```

Motivo:

- `parallel: false` evita que la minificacion abra workers/procesos hijos.
- Sin este cambio puede aparecer el error `spawn EPERM`.

## 5. Instalar dependencias

Despues de cambiar `package.json`, ejecutar:

```bash
npm install
```

Si en esta maquina aparece el error `UNABLE_TO_VERIFY_LEAF_SIGNATURE`, usar este workaround local:

```bash
npm install --strict-ssl=false
```

Nota:

- Usar `--strict-ssl=false` solo si aparece ese error de certificado.
- No hace falta guardar ese ajuste en `.npmrc`.

## 6. Instalar Redux-form

Necesitaamos instalar redux-form
```bash
npm install redux-form
```

## 7. Probar el proyecto

Para comprobar que compila:

```bash
npm run build
```

Para arrancar en desarrollo:

```bash
npm start
```

`npm start` levanta `webpack-dev-server`, asi que es normal que no termine y se quede la terminal abierta.

Abrir:

```text
http://localhost:3000
```


