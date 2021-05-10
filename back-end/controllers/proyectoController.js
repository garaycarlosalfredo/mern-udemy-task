const Proyecto = require('../models/Proyecto')
const {validationResult} = require('express-validator')

exports.crearProyecto = async(req,res)=>{
    //revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    
    try{
        //Crear Proyecto
        const proyecto = new Proyecto(req.body)
        
        //Guardar un nuevo proyecto
        proyecto.creador = req.usuario.id 

        proyecto.save()
        res.json(proyecto)

    }catch (error){
        console.log(error)
        res.status(500).send('Huno un error')
    }
}

//Obtiene todos los proyectos del usuario actual

exports.obtenerProyectos = async(req,res) => {
    try {
        const proyectos = await Proyecto.find({creador: req.usuario.id})
        res.json({proyectos})
    } catch (error) {
        res.status(500).send('Hubo un error')
    }
}

//Actualizar un proyect
exports.actualizarProyecto = async(req,res) => {
    //revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //extraer la información del proyecto
    const {nombre} = req.body
    const nuevoProyecto = {}

    if(nombre){
        nuevoProyecto.nombre = nombre
    }

    try {
        //Revisar el id
        let proyecto = await Proyecto.findById(req.params.id)

        //si exite el proyecto
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        
        //verificar el creador
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Update no autorizado'})
        }
     
        //Actualizar
        proyecto = await Proyecto.findByIdAndUpdate(
            {_id: req.params.id},
            {$set : nuevoProyecto},
            { new: true})
        res.json({proyecto})

    } catch (error) {
        res.status(500).send('error en el servidor update')
    }

}

//Eliminar un proyecto
exports.eliminarProyecto = async (req,res) => {
    try {
        //Revisar el id
        let proyecto = await Proyecto.findById(req.params.id)

        //si exite el proyecto
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }
        
        //verificar el creador
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'Update no autorizado'})
        }
        //Eliminar el proyecto
        await Proyecto.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Proyecto eliminado'})

    } catch (error) {
        res.status(500).send('Error en el servidor')
    }

}