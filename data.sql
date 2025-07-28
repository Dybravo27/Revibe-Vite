USE proyecto_revibe;

-- Elimina tablas existentes (sin permisos y permisos_rol)
DROP TABLE IF EXISTS 
    notificaciones,
    carritos,
    detalles_ventas_carros,
    ventas,
    fotos,
    comentarios,
    articulos,
    usuarios,
    categorias,
    roles,
    ciudades;

-- Crear tablas

CREATE TABLE ciudades (
    id_ciudad INT PRIMARY KEY AUTO_INCREMENT,
    nombre_ciudad VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(100) NOT NULL
);

CREATE TABLE categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(100) NOT NULL
);

CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    contraseña_usuario VARCHAR(100) NOT NULL,
    num_telefono VARCHAR(10) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    id_ciudad INT NOT NULL,
    id_rol INT NOT NULL,
    FOREIGN KEY (id_ciudad) REFERENCES ciudades(id_ciudad),
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

CREATE TABLE articulos (
    id_articulo INT PRIMARY KEY AUTO_INCREMENT,
    nombre_articulo VARCHAR(100) NOT NULL,
    precio_articulo DECIMAL(10,2) NOT NULL,
    condicion_articulo TEXT NOT NULL,
    stock INT NOT NULL,
    id_categoria INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE comentarios (
    id_comentario INT PRIMARY KEY AUTO_INCREMENT,
    comentario TEXT NOT NULL,
    calificacion INT NOT NULL,
    fecha_comentario DATETIME NOT NULL,
    id_articulo INT NOT NULL,
    CONSTRAINT chk_calificacion CHECK (calificacion >= 1 AND calificacion <= 5),
    FOREIGN KEY (id_articulo) REFERENCES articulos(id_articulo)
);

CREATE TABLE fotos (
    id_foto INT PRIMARY KEY AUTO_INCREMENT,
    nombre_foto VARCHAR(100) NOT NULL,
    ubicacion_foto VARCHAR(255) NOT NULL,
    id_articulo INT NOT NULL,
    FOREIGN KEY (id_articulo) REFERENCES articulos(id_articulo)
);

CREATE TABLE ventas (
    id_venta INT PRIMARY KEY AUTO_INCREMENT,
    fecha_venta DATETIME NOT NULL,
    metodo_pago VARCHAR(14) NOT NULL,
    total_pago DECIMAL(10,2) NOT NULL,
    id_usuario INT NOT NULL,
    estado_transaccion BOOLEAN,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE carritos (
    id_carrito INT PRIMARY KEY AUTO_INCREMENT,
    fecha_creacion DATETIME NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE detalles_ventas_carros (
    id_detalle_ventas_carro INT PRIMARY KEY AUTO_INCREMENT,
    id_articulo INT NOT NULL,
    id_venta INT NOT NULL,
    id_carrito INT NOT NULL,
    cantidad INT NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    FOREIGN KEY (id_articulo) REFERENCES articulos(id_articulo),
    FOREIGN KEY (id_carrito) REFERENCES carritos(id_carrito)
);

CREATE TABLE notificaciones (
    id_notificacion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_hora_envio DATETIME NOT NULL,
    id_venta INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta)
);

-- INSERTAR DATOS BASE

INSERT INTO ciudades (nombre_ciudad) VALUES 
('Piedecuesta'), ('Bucaramanga'), ('Giron');

INSERT INTO roles (nombre_rol) VALUES 
('Administrador'), ('Comprador'), ('Vendedor');

INSERT INTO categorias (nombre_categoria) VALUES 
('Moda'), ('Tecnología'), ('Hogar'), ('Otros');

INSERT INTO usuarios (nombre, apellido, correo_electronico, contraseña_usuario, num_telefono, direccion, id_ciudad, id_rol) VALUES 
('Ana', 'Rodríguez', 'ana.admin@example.com', 'admin123', '3001234567', 'Cra 1 #10-20', 1, 1),
('Luis', 'Martínez', 'luis.cliente@example.com', 'cliente456', '3019876543', 'Calle 5 #15-30', 2, 2),
('Carla', 'Fernández', 'carla.vendedor@example.com', 'vende789', '3024567890', 'Av. Central 90', 3, 3);

SELECT * FROM usuarios;
SELECT * FROM ciudades;
SELECT * FROM roles;
SELECT * FROM categorias;
SELECT * FROM articulos;
SELECT * FROM fotos;