const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

function css(done) {
  //Compilar sass
  //Pasos: 1- Identificar archivo 2- Compilarla 3- Guardar el .css

  /* The line `src("src/scss/app.scss").pipe(sass()).pipe(dest("build/css"));` is performing the
  following actions: */

  /**
   * 1- src(): Busca el archivo y así poder identificarlo.
   * 2- sass(): Interpreta y compila el archivo sass.
   * 3- dest(): Guardamos.
   */

  /*Nota: Utilizamos pipes para saber cuándo ha finalizado una tarea y así poder ejecutar la siguiente.

  Por ejemplo: Con la función "src()" buscamos el archivo, sin embargo no sabemos con certeza el momento en que 
  gulp encuentra dicho archivo. Puede que no lo encuentre o que tarde más tiempo en localizar el archivo.
  Por esta razón, empleamos 'pipe()' para indicarle que, una vez que tenga el archivo, continúe con la siguiente tarea.
  */
  src("src/scss/app.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("build/css"));
  /* The `done()` function is used to signal the completion of the task. In this case, it is called at
  the end of the `css` function to indicate that the task has finished executing. */
  done();
}

function dev() {
  // Toma 2 valores: 1. De que archivo debe estar pendiente 2. Si hay cambios, se llama a la función encargada de compilar
  // watch("src/scss/app.scss", css);

  //Para estar pendiente por todos los cambios en todos los archivos .scss
  watch("src/scss/**/*.scss", css);
}

// function tareaDefault() {
//   console.log("Soy la tarea por default");
// }

exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);

// series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente
// parallel - Todas inician al mismo tiempo, van completandose de forma diferente
