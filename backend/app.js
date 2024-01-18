const express = require('express');
const app = express();
const join = require('path').join
const fs = require('fs')
require("dotenv").config();
const bodyParser = require("body-parser");
var cors = require("cors");
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next(); 
  } else {
    bodyParser.json()(req, res, next);
  }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
}));
app.use('/media', express.static('vue/media'));
app.use('/img', express.static('vue/img'));
app.use('/uploads', express.static('uploads'));

app.use('/css', express.static('vue/css'));
app.use('/js', express.static('vue/js'));
app.use('/fonts', express.static('vue/fonts'));
app.use('/fonts', express.static('webfonts'));


app.use('/vue-fabric-editor/js', express.static('vue/js'));
app.use('/vue-fabric-editor/assets', express.static('vue/assets'));


app.use('/assets', express.static('vue/assets'));


app.get('/html',async (req,res,next)=>{
  // const browser = await puppeteer.launch({ headless: true });
  // const page = await browser.newPage();
  
  // await page.goto('http://localhost:8080/order', {waitUntil: 'networkidle0'});
  // const pdf = await page.pdf({ format: 'A4' });
 
  // await browser.close();
  // fs.writeFileSync('test.pdf', pdf, { encoding: 'base64' }) // utf8 will override this encoding
  // // const txtFile = fs.readFileSync('index.txt')
  // console.log(pdf)
  // res.send("asd")
})
const Routes = require("./routers");
Routes.init(app);
app.get('*', function (req, res) {
  const templatePath = join(__dirname, "/vue/index.html");
  fs.readFile(templatePath, "utf-8", (err, content) => {
    if (err) {
      console.log(err)
      console.log("can't open file");
    }
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    return res.end(content);
  });

});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message || "過程中出現錯誤",
  });
});





app.listen('3030',()=>{
  console.log("Listening at 3030")
})