-- Crear tabla para PostgreSQL
CREATE TABLE IF NOT EXISTS tarifas_envios (
    id SERIAL PRIMARY KEY,
    destino VARCHAR(100) NOT NULL,
    sobre NUMERIC(10,2) NOT NULL,
    menos_1kg NUMERIC(10,2) NOT NULL,
    cajas_1_10kg NUMERIC(10,2) NOT NULL,
    cajas_11_20kg NUMERIC(10,2) NOT NULL,
    cajas_21_30kg NUMERIC(10,2) NOT NULL
);

-- Insertar todos los datos (exactamente igual que en MySQL)
INSERT INTO tarifas_envios (destino, sobre, menos_1kg, cajas_1_10kg, cajas_11_20kg, cajas_21_30kg) VALUES
('Caborca, Sonora', 191.00, 287.00, 383.00, 575.00, 766.00),
('Ciudad Obregón, Son.', 163.00, 246.00, 327.00, 492.00, 656.00),
('Culiacán, Sin.', 124.00, 187.00, 250.00, 376.00, 501.00),
('Empalme, Sonora', 170.00, 256.00, 341.00, 512.00, 683.00),
('Guamúchil, Sinaloa', 134.00, 201.00, 268.00, 403.00, 537.00),
('Guasave, Sinaloa', 140.00, 211.00, 281.00, 423.00, 563.00),
('Guaymas, Sonora', 170.00, 256.00, 341.00, 512.00, 683.00),
('Imuris, Son.', 189.00, 283.00, 370.00, 568.00, 758.00),
('Los Mochis, Sin.', 144.00, 217.00, 290.00, 435.00, 581.00),
('Mazatlán, Sin.', 115.00, 173.00, 231.00, 346.00, 463.00),
('Mexicali, B.C.', 201.00, 302.00, 403.00, 604.00, 806.00),
('Navojoa Centro, Son.', 155.00, 233.00, 310.00, 466.00, 621.00),
('Nogales, Son.', 190.00, 286.00, 381.00, 571.00, 762.00),
('San Luis Río Colorado, Son.', 195.00, 294.00, 391.00, 588.00, 784.00),
('Santa Ana, Sonora', 184.00, 277.00, 369.00, 555.00, 740.00),
('Sonoyta, Sonora', 192.00, 289.00, 385.00, 578.00, 771.00),
('Tepic Terminal Colosio', 92.00, 138.00, 184.00, 277.00, 369.00),
('Tepic, Nay.', 92.00, 138.00, 184.00, 277.00, 369.00),
('Terminal Hermosillo, Son.', 174.00, 292.00, 349.00, 525.00, 700.00),
('Tijuana, B.C.', 203.00, 305.00, 407.00, 611.00, 815.00),
('Ciudad Guzman, Jal.', 95.00, 144.00, 193.00, 317.00, 423.00),
('Tuxpan Jal.', 84.00, 126.00, 168.00, 252.00, 336.00),
('Colima, Col.', 95.00, 144.00, 193.00, 317.00, 423.00),
('Manzanillo, Col.', 107.00, 162.00, 217.00, 357.00, 475.00);