CREATE TABLE rezepte (
  id BIGSERIAL PRIMARY KEY,
  titel VARCHAR(255) NOT NULL,
  minuten INT,
  portionen INT,
  vegetarisch BOOLEAN DEFAULT FALSE,
  erstellt_am TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE zutaten (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE rezept_zutaten (
  rezept_id BIGINT NOT NULL REFERENCES rezepte(id) ON DELETE CASCADE,
  zutat_id INT NOT NULL REFERENCES zutaten(id),
  menge VARCHAR(100),
  PRIMARY KEY (rezept_id, zutat_id)
);

INSERT INTO rezepte (id, titel, minuten, portionen, vegetarisch) VALUES
(1, 'Spaghetti Carbonara', 20, 2, FALSE),
(2, 'Linsencurry mit Kokosmilch', 30, 4, TRUE),
(3, 'Pfannkuchen', 15, 2, TRUE),
(4, 'Ofengemüse mit Feta', 40, 3, TRUE),
(5, 'Chili sin Carne', 35, 4, TRUE);

INSERT INTO zutaten (id, name) VALUES
(1, 'Spaghetti'),
(2, 'Guanciale oder Speck'),
(3, 'Eigelb'),
(4, 'Pecorino'),
(5, 'Schwarzer Pfeffer'),
(6, 'Rote Linsen'),
(7, 'Kokosmilch'),
(8, 'Gehackte Tomaten'),
(9, 'Zwiebel'),
(10, 'Currypulver'),
(11, 'Mehl'),
(12, 'Eier'),
(13, 'Milch'),
(14, 'Salz'),
(15, 'Butter zum Braten'),
(16, 'Zucchini'),
(17, 'Paprika'),
(18, 'Kartoffeln'),
(19, 'Feta'),
(20, 'Olivenöl'),
(21, 'Rosmarin'),
(22, 'Kidneybohnen'),
(23, 'Mais'),
(24, 'Kreuzkümmel & Chili');

