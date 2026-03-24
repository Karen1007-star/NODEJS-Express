require('dotenv').config();
const express=require("express")
const bodyParser = require("body-parser")

const app = express()
// app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.send(`
    <h1>Curso Express.js v4</h1>
    <p>Esto es una aplicación Node.js con Express.js</p>
    <p>Corre en el puerto ${PORT}</p>
  `);
})
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Mostrar información del usuario con ID: ${userId}`);
});
app.get('/search', (req, res) => {
  const terms = req.query.termino || "no especificado";
  const category = req.query.categoria || "todas";
  
  res.send(`<h2>Resultados de búsqueda</h2>
            <p>Término: ${terms}</p>
            <p>Categoría: ${category}</p>`);
});
app.listen(PORT, ()=>{
    console.log("Funcionando");
})