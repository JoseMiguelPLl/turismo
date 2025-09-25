const pool=require("../config/db")

exports.listarTipo=async()=>{
    const {rows}=await pool.query("SELECT * FROM ciudad Where estado='Activo'")
    return rows 
}

exports.crearTipo=async(idpais,descripcion)=>{
    const estado="Activo"
    const {rows}=await pool.query("INSERT INTO ciudad (idpais,descripcion,estado) VALUES($1,$2,$3)",[idpais,descripcion,estado])
    return rows[0]

}

exports.actualizarTipo=async(idpais,descripcion,id)=>{
    const {rows}=await pool.query("UPDATE ciudad SET idpais=$1, descripcion=$2  where id=$3 RETURNING *",[idpais,descripcion,id])
    return rows[0]
}

exports.softDeleteTipo = async (id) => {
    const estado = "Inactivo";
    const { rows } = await pool.query(
        "UPDATE ciudad SET estado = $1 WHERE id = $2 RETURNING *",
        [estado, id]
    );
    return rows[0];
};
