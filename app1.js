const express = require("express")
const ruta = express()

ruta.use(express.json())

let usuarios = []

// READ
ruta.get("/usuarios",(req,res)=>{
    res.json()
})

// CREATE
ruta.post("/usuarios","utf-8",(req,res)=>{
    const nuevoUsuario = req.body;
    usuarios.push(nuevoUsuario)
    res.json({mensaje:"Existosamente", data:nuevoUsuario})
})

// ACTUALIZAR
ruta.put("",(req,res)=>{
    const id = req.params.id;
    const datos=req.body;
    usuarios[id]=datos;
    res.json({mensaje:"Actualizado", data:datos})
})

// DELETE
ruta.delete("/usuarios/:id",(req,res)=>{
    const id = req.params.id;
    usuarios.splice(id,1)
    res.json({mensaje:"Eliminado"})
})

ruta.listen(3000,()=>{
    console.log("Escuchando");
    
})