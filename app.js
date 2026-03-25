require('dotenv').config();
const express=require("express")
const bodyParser = require("body-parser")

const fs=require("fs")
const path  =require("path")
const direccion= path.join(__dirname,'users.json')
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
///////////////POST API DATA
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
////////////////// users
app.get('/users',(req,res)=>{
    fs.readFile(direccion, 'utf8', (error,data)=>{
        if(error){
            return res.status(500).json({error:'Error con la conexion de datos'})
        }
        const usuarios = JSON.parse(data)
        res.json(usuarios)
    })
})

/////////////////POST USERS
app.post('/users',(req,res)=>{
    const newUser=req.body;
    const { id, name, email } = newUser;
    if (!id || !name || !email) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    fs.readFile(direccion,"utf-8",(error,data)=>{
        if(error){
            return res.status(500).json({error: "ERRORzASO DE LA BD"})
        }
        const usuarios = JSON.parse(data)
        usuarios.push(newUser)
        fs.writeFile(direccion,JSON.stringify(usuarios,null,2),(error)=>{
            if(error){
                return res.status(500).json({error:'Error al guardarrr'})
            }
            res.status(200).json(newUser)
        })
    })
})

/////////////////////////////7 PUT
app.put('/users/:id',(req,res)=>{
    const userId = parseInt(req.params.id,10)
    const actualiza = req.body;

fs.readFile(direccion,"utf-8",(error,data)=>{
    if(error){
        return res.status(500).json({error:"error de conexion"})
    }
    let users = JSON.parse(data)
    users = users.map((usuario)=>(usuario.id===userId ? {...usuario,...actualiza}: usuario))
    fs.writeFile(direccion,JSON.stringify(users,null,2),(error)=>{
        if(error){
            return res.status(500).json({error:"Error ACTUALZIADO"})
        }
        res.json(actualiza)
    })
})
})
////////////////////////// DELETE
app.delete('/users/:id',(req,res)=>{
    const userID = parseInt(req.params.id,10);
    fs.readFile(direccion,"utf-8",(error,data)=>{
        if(error){
            return res.status(500).json({error:"Erro de conexion"})
        }
        let userss = JSON.parse(data)
        userss=userss.filter((user)=>user.id!==userID)
        fs.writeFile(direccion,JSON.stringify(userss,null,2), (err)=>{
            if(err){
                return res.status(500).json({error:"Error al eliminar"})
            }
            res.status(204).send();
        })
    })
})




app.listen(PORT, ()=>{
    console.log("Funcionando");
})