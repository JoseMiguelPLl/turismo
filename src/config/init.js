const pool = require('./db'); // Importa la configuración de la BD

const initDatabase = async () => {
  try {
    console.log('Inicializando base de datos...');
    
    const createTables = `
      -- Tabla de usuarios
      CREATE TABLE IF NOT EXISTS usuario (
          id SERIAL PRIMARY KEY,
          usuario VARCHAR(100) NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS ciudad (
          id SERIAL PRIMARY KEY,
          descripcion VARCHAR(100) NOT NULL,
          estado VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
        
      CREATE TABLE IF NOT EXISTS pais (
          id SERIAL PRIMARY KEY,
          descripcion VARCHAR(100) NOT NULL,
          estado VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );


      -- Tabla de motos
      CREATE TABLE IF NOT EXISTS viaje (
          id SERIAL PRIMARY KEY,
          idpais INTEGER REFERENCES pais(id) ,
          idciudad INTEGER REFERENCES ciudad(id) ,
          imagen_url VARCHAR(255),
          detalle VARCHAR(500) NOT NULL,
          precio DECIMAL(10, 2) NOT NULL,
          estado VARCHAR(50) NOT NULL,
          titulo VARCHAR(100) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

    `;

    await pool.query(createTables);
    console.log('✅ Tablas creadas exitosamente');
    
  } catch (error) {
    console.error('❌ Error creando tablas:', error.message);
    throw error; // Propaga el error para manejarlo en app.js
  }
};

module.exports = initDatabase; // Exporta la función