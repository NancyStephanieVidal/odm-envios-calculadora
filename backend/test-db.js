const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ✅ CONTRASEÑA CORRECTA
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'proyect2026_sitio', // ← AHORA ESTÁ CORRECTA
    database: 'odm_envios'
});

// Conectar a MySQL
db.connect(err => {
    if (err) {
        console.error('❌ Error conectando a MySQL:');
        console.error(err);
        return;
    }
    console.log('✅ Conectado a MySQL correctamente');
    console.log('📊 Base de datos: odm_envios');
});

// Endpoint de prueba
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Servidor funcionando',
        time: new Date().toLocaleString()
    });
});

// Endpoint para obtener todos los destinos
app.get('/api/destinos', (req, res) => {
    console.log('📡 Obteniendo destinos...');
    
    db.query('SELECT destino FROM tarifas_envios ORDER BY destino', (err, result) => {
        if (err) {
            console.error('❌ Error en consulta:', err);
            res.status(500).json({ error: 'Error en la base de datos' });
            return;
        }
        
        const destinos = result.map(r => r.destino);
        console.log(`✅ ${destinos.length} destinos encontrados`);
        res.json(destinos);
    });
});

// Endpoint para calcular precio
app.post('/api/calcular', (req, res) => {
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
    
    const query = `SELECT ${columna} as precio FROM tarifas_envios WHERE destino = ?`;
    
    db.query(query, [destino], (err, result) => {
        if (err) {
            console.error('❌ Error en consulta:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ error: 'Destino no encontrado' });
        }
        
        const response = {
            precio: result[0].precio,
            destino: destino,
            peso: peso,
            categoria: categoria
        };
        
        console.log('✅ Precio calculado:', response);
        res.json(response);
    });
});

// Endpoint para obtener todas las tarifas
app.get('/api/tarifas', (req, res) => {
    console.log('📡 Obteniendo todas las tarifas...');
    
    const query = 'SELECT * FROM tarifas_envios ORDER BY destino';
    
    db.query(query, (err, result) => {
        if (err) {
            console.error('❌ Error en consulta:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        
        console.log(`✅ ${result.length} tarifas encontradas`);
        res.json(result);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log('📝 Endpoints:');
    console.log('   - GET  /api/test');
    console.log('   - GET  /api/destinos');
    console.log('   - GET  /api/tarifas');
    console.log('   - POST /api/calcular');
});