const pool = require("../config/db")

exports.listarProducto = async () => {
    const {rows} = await pool.query("SELECT * FROM viaje Where estado='Activo'")
    return rows 
}

exports.obtenerProductoPorId = async (id) => {
    const { rows } = await pool.query("SELECT * FROM viaje WHERE id = $1", [id]);
    return rows[0];
};

// Modificar para guardar la URL completa en lugar del nombre de archivo
exports.crearProducto = async (idpais, idciudad, imagen, detalle, precio, titulo) => {
    const estado = "Activo";
    const { rows } = await pool.query(
        "INSERT INTO viaje (idpais, idciudad, imagen_url, detalle, precio, estado, titulo) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [idpais, idciudad, imagen, detalle, precio, estado, titulo]
    );
    return rows[0];
};

exports.actualizarProducto = async (idpais, idciudad, imagen, detalle, precio, titulo, id) => {
    const {rows} = await pool.query(
        "UPDATE viaje SET idpais=$1, idciudad=$2, imagen_url=$3, detalle=$4, precio=$5, titulo=$6 WHERE id=$7 RETURNING *",
        [idpais, idciudad, imagen, detalle, cilindrada, precio, titulo, id]
    );
    return rows[0];
}

exports.softDeleteProducto = async (id) => {
    const estado = "Inactivo";
    const { rows } = await pool.query(
        "UPDATE viaje SET estado = $1 WHERE id = $2 RETURNING *",
        [estado, id]
    );
    return rows[0];
};