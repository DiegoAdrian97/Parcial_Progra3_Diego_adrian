CREATE DATABASE IF NOT EXISTS electronicsStore_db;
USE electronicsStore_db;


CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  precio DECIMAL(10,2),
  img VARCHAR(255),
  categoria VARCHAR(100)
);
CREATE TABLE IF NOT EXISTS compras (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_nombre VARCHAR(100) NOT NULL,
  productos TEXT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar los productos
INSERT INTO productos (nombre, precio, img, categoria) VALUES
('iPhone 14', 95000, 'Backend/src/assets/img/Iphon14.JPG', 'Celulares'),
('Samsung Galaxy S23', 870000, './assets/img/galaxy-s23.jpg', 'Celulares'),
('Motorola Edge 40', 520000, './assets/img/moto-edge40.jpg', 'Celulares'),
('Xiaomi Redmi Note 13', 380000, './assets/img/redminote13.jpg', 'Celulares'),
('iPhone SE (3ra Gen)', 450000, './assets/img/iphon-13promax.jpg', 'Celulares'),
('PlayStation 5', 890000, './assets/img/ps5.jpg', 'Consolas'),
('Xbox Series X', 870000, './assets/img/xbox-seriesx.jpg', 'Consolas'),
('Nintendo Switch OLED', 650000, './assets/img/switch-oled.jpg', 'Consolas'),
('PlayStation 4 Slim', 480000, './assets/img/ps4-slim.jpg', 'Consolas'),
('Xbox Series S', 520000, './assets/img/xbox-seriess.jpg', 'Consolas');

SELECT * FROM productos;