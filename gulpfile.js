var g = require("gulp"),
    p = require("gulp-load-plugins")(),
    b = require("browser-sync"),
    u = {
        i: "app/index.html",
        html: "app/pages",
        css: "app/css",
        mcss: "app/css/main.min.css",
        scss: "app/scss/main.scss"
    };

g.task("s", function() {
    b({
        server: {
            baseDir: "app/"
        }
    })
});



g.task("w", ["s"], function() {
    g.watch(u.i, b.reload);
    g.watch(u.html, b.reload);
    g.watch(u.scss, ['scss']);
    g.watch(u.mcss, b.reload);
});

g.task("scss", function() {
    g.src(u.scss)
        .pipe(p.sass())
        .pipe(g.dest(u.css))
        .pipe(p.cssnano())
        .pipe(p.rename("main.min.css"))
        .pipe(g.dest(u.css));
});

g.task("default", ["w"]);