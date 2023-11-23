CREATE TYPE gender_type as ENUM ('Male', 'Female', 'Other');
CREATE TYPE relationship_type as ENUM ('Accomplice', 'Enemy');

CREATE TABLE characters (
    character_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender gender_type NOT NULL,
    age INT NOT NULL,
    film_status BOOLEAN NOT NULL
);

CREATE TABLE character_relationships (
    relationship_id SERIAL PRIMARY KEY,
    character_id_1 INT NOT NULL,
    character_id_2 INT NOT NULL,
    relationship relationship_type NOT NULL,
    UNIQUE (character_id_1, character_id_2),
    FOREIGN KEY (character_id_1) REFERENCES characters(character_id),
    FOREIGN KEY (character_id_2) REFERENCES characters(character_id)
);

CREATE INDEX idx_relationship ON character_relationships (character_id_1, character_id_2);