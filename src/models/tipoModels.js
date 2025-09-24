const pool=require("../config/db")

exports.listarTipo=async()=>{
    const {rows}=await pool.query("SELECT * FROM ciudad Where estado='Activo'")
    return rows 
}

exports.crearTipo=async(descripcion)=>{
    const estado="Activo"
    const {rows}=await pool.query("INSERT INTO ciudad (descripcion,estado) VALUES($1,$2)",[descripcion,estado])
    return rows[0]

}

exports.actualizarTipo=async(descripcion,id)=>{
    const {rows}=await pool.query("UPDATE ciudad SET descripcion=$1 where id=$2 RETURNING *",[descripcion,id])
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
