-- =============================================
-- ESQUEMA DE LA BASE DE DATOS "parcial"
-- Proyecto: UnMinutoCampus
-- =============================================

DROP TABLE IF EXISTS materias;

CREATE TABLE materias (
  id             SERIAL PRIMARY KEY,
  nrc            VARCHAR(30)  NOT NULL UNIQUE,
  nombre_materia VARCHAR(150) NOT NULL,
  nombre_docente VARCHAR(150) NOT NULL,
  correo_docente VARCHAR(150) NOT NULL
);

-- Datos iniciales
INSERT INTO materias (nrc, nombre_materia, nombre_docente, correo_docente) VALUES
  ('NRC-60-73404', 'Electiva Cmd Ingen Sin Fronter', 'INES ROJAS VILLAMIL', 'ines.rojas.v@uniminuto.edu.co'),
  ('NRC-60-80884', 'Desarrollo Basado en Plataform', 'EDUARD ESTIVEN NUMPAQUE RODRIGUEZ', 'eduard.numpaque-r@uniminuto.edu.co');
