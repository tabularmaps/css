const fs = require("fs");

let markdown = `# @tabularmaps/css
`;

for (let i = 2; i < process.argv.length; i++) {
  const file = process.argv[i];
  const board = JSON.parse(fs.readFileSync(file, "UTF-8"));
  const name = file.split("/").pop().split(".").shift();

  markdown+= `
## ${name}

+ [Demo](${name}.html)
+ [CSS](${name}.css)

`;

  const css = [];
  css.push(`.tabularmaps {display: grid;grid-template-columns: repeat(${board[0].length}, 1fr);}`);
  board.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col !== null)
        css.push(`.tabularmaps>div.${col} {grid-row-start: ${y+1};grid-column-start: ${x+1};}`);
    });
  });
  fs.writeFileSync(`./docs/${name}.css`, css.join("\n"), "UTF-8");

  const names = [];
  board.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col !== null) names.push(`    <div class="${col}">${col}</div>`);
    });
  });

  names.sort();

  const html = `<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>${name}</title>
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" />
  <link rel="stylesheet" href="${name}.css" media="screen and (min-width:480px)"/>
  <style>
    .tabularmaps>div {
      background: #BDC7BC;
      font-weight: bold;
      color: white;
      padding: 3px;margin:3px;
    }
  </style>
</head>

<body>
  <h1>${name}</h1>
  <div class="tabularmaps">
${names.join("\n")}
  </div>
</body>
</html>
`;
  fs.writeFileSync(`./docs/${name}.html`, html, "UTF-8");
}

  fs.writeFileSync(`./docs/README.md`, markdown, "UTF-8");
