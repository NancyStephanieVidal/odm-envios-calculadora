const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Configuración para PostgreSQL (local o producción)
let poolConfig;

if (process.env.DATABASE_URL) {
    // Producción (Render) - usa la URL completa
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    };
} else {
    // Desarrollo local - usa credenciales directas
    poolConfig = {
        host: 'dpg-d6g4snbh46gs738op670-a.oregon-postgres.render.com',
        port: 5432,
        user: 'odm_user',      // Tu usuario de PostgreSQL
        password: '97fdhp0S9JdvPSmUp9pcnYRpfQiK16kB', // Tu contraseña de PostgreSQL
        database: 'odm_envios',
        ssl: false
    };
}

const pool = new Pool(poolConfig);

// Probar conexión
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Error conectando a PostgreSQL:');
        console.error('Detalle:', err.message);
        if (!process.env.DATABASE_URL) {
            console.log('\n📌 Para desarrollo local:');
            console.log('1. Asegúrate que PostgreSQL esté corriendo');
            console.log('2. Verifica que la base de datos "odm_envios" exista');
            console.log('3. Usa el usuario y contraseña correctos');
        }
        return;
    }
    console.log('✅ Conectado a PostgreSQL correctamente');
    console.log('📊 Base de datos: odm_envios');
    release();
});

// Endpoint de prueba
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Servidor funcionando',
        environment: process.env.DATABASE_URL ? 'production' : 'development',
        time: new Date().toLocaleString()
    });
});

// Endpoint para obtener todos los destinos
app.get('/api/destinos', async (req, res) => {
    console.log('📡 Obteniendo destinos...');
    
    try {
        const result = await pool.query('SELECT destino FROM tarifas_envios ORDER BY destino');
        const destinos = result.rows.map(r => r.destino);
        console.log(`✅ ${destinos.length} destinos encontrados`);
        res.json(destinos);
    } catch (err) {
        console.error('❌ Error en consulta:', err);
        res.status(500).json({ error: 'Error en la base de datos' });
    }
});

// Endpoint para calcular precio
app.post('/api/calcular', async (req, res) => {
    console.log('📡 Calculando precio...');
    console.log('Datos recibidos:', req.body);
    
    const { destino, peso } = req.body;
    
    if (!destino || !peso) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    
    // Determinar columna según peso
    let columna;
    let categoria;
    
    if (peso < 0.1) {
        columna = 'sobre';
        categoria = 'Sobre';
    } else if (peso < 1) {
        columna = 'menos_1kg';
        categoria = 'Paquete menos de 1kg';
    } else if (peso <= 10) {
        columna = 'cajas_1_10kg';
        categoria = 'Cajas 1-10kg';
    } else if (peso <= 20) {
        columna = 'cajas_11_20kg';
        categoria = 'Cajas 11-20kg';
    } else if (peso <= 30) {
        columna = 'cajas_21_30kg';
        categoria = 'Cajas 21-30kg';
    } else {
        return res.status(400).json({ error: 'Peso máximo 30 kg' });
    }
    
    // PostgreSQL usa $1 en lugar de ?
    const query = `SELECT ${columna} as precio FROM tarifas_envios WHERE destino = $1`;
    
    try {
        const result = await pool.query(query, [destino]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Destino no encontrado' });
        }
        
        const response = {
            precio: parseFloat(result.rows[0].precio),
            destino: destino,
            peso: peso,
            categoria: categoria
        };
        
        console.log('✅ Precio calculado:', response);
        res.json(response);
    } catch (err) {
        console.error('❌ Error en consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
    }
});

// Endpoint para obtener todas las tarifas
app.get('/api/tarifas', async (req, res) => {
    console.log('📡 Obteniendo todas las tarifas...');
    
    try {
        const result = await pool.query('SELECT * FROM tarifas_envios ORDER BY destino');
        console.log(`✅ ${result.rows.length} tarifas encontradas`);
        res.json(result.rows);
    } catch (err) {
        console.error('❌ Error en consulta:', err);
        return res.status(500).json({ error: 'Error en la base de datos' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
    console.log('📝 Endpoints:');
    console.log('   - GET  /api/test');
    console.log('   - GET  /api/destinos');
    console.log('   - GET  /api/tarifas');
    console.log('   - POST /api/calcular');
});