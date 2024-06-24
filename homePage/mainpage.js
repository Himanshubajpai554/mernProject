const fs = require("fs");
const fsPromises = require("fs/promises");
const url = require("url");
const http = require("http");

const dataText = fs.readFileSync("data.json");
const data = JSON.parse(dataText);

const app = http.createServer(async (req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(query);
  switch (pathname) {
    case "/": {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      const bf = await fsPromises.readFile(`./page/mainpage.html`);
      let text = bf.toString();

      let productText = "";
      for (let i = 0; i < data.length; i++) {
        productText += `<div class="product-card"> <h3 class="headingOfTheCard">${data[i].title}</h3><img src="${data[i].thumbnail}" alt='product-image' class="imagee"><p>${data[i].description}</p>
          <a href="/view?id=${data[i].id}" target="_blank">more</a>
          </div>`;
      }

      text = text.replace("$Product$", productText);
      res.end(text);
      break;
    }
    case "/mainpage.css": {
      res.writeHead(200, {
        "Content-Type": "text/css",
      });
      const bf = await fsPromises.readFile(`./page/mainpage.css`);
      res.end(bf);
      break;
    }
    default: {
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      res.end(`<h2>Oops! Page is not found</h2>`);
    }
  }
});
// http://localhost:2703

app.listen(2703, () => {
  console.log("------------------Server Start------------------");
});
