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
///////////////POST
app.post('/form', (req, res) => {
    const name = req.body.name || "Anonimo";
    const email = req.body.email || "nada";
    
    res.json({
        message: 'datos recibidos',
        data:{
            name,email
        }
    })
    // Validación para asegurar que recibimos datos válidos
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            error: "No se recibieron datos"
        });
    }
    
    res.status(200).json({
        message: "Datos JSON recibidos",
        data
    });
});
///////////////POST
app.post('/api/data', (req, res) => {
    const clave1 = req.body.clave1 || "no hay";
    const clave2 = req.body.clave2 || "no hay";
    
    res.json({
        message: 'JSON recibidos',
        data:{
            clave1,clave2
        }
    })
    // Validación para asegurar que recibimos datos válidos
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            error: "No se recibieron datos"
        });
    }
    
    res.status(200).json({
        message: "Datos JSON recibidos",
        data
    });
});

app.listen(PORT, ()=>{
    console.log("Funcionando");
})