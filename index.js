const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log("Persona nueva en sistema")
  res.send("Bienvenido")
})

app.post('/register', (req,res)=>{
  var cliente = {"name":req.body.name,"lastname":req.body.lastname,"email":req.body.email,"contra":req.body.contra1}
  if(req.body.contra2==cliente.contra){
    //INSERTE AQUI CONSULTA MONGODB - USUARIO EXISTENTE
    var respuesta=false
    if(respuesta){
      res.status(200).json({
        "Estado" : "Usuario creado satisfactoriamente",
        "Nombre" : cliente.name,
        "Apellido" : cliente.lastname,
        "Correo" : cliente.email
      })
    }else{
      res.status(200).json({
        "Estado" : "Correo ya registrado"
      })
    }
  }else{
    res.status(200).json({
      "Estado" : "Contraseñas no coinciden"
    })
  }
})

app.get('/login/:correo&&:contra',(req,res) =>{
  var correo= req.params.email;
  var contra = req.params.contra;
  //INSERTE FIND/FINDONE MONGODB  
  var resultado=false
  if(resultado){
    req.cookies.email=correo;
    //req.cookies.name=usuario.name;
    
    console.log(req.cookies);
    res.status(200).json({
      "Estado" : "Logeado con exito",
      "Correo": req.cookies.email
    })
  }else{
    res.status(200).json({
      "Estado" : "El usuario no existe"
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})