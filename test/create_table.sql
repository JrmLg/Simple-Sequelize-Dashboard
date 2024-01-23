
-- Création de la table adminPermission
CREATE TABLE IF NOT EXISTS adminPermission (
    id SERIAL PRIMARY KEY,
    permission permission_enum NOT NULL,
    tableName TEXT NOT NULL,
    deletedAt DATE,
    createdAt DATE NOT NULL DEFAULT NOW(),
    updatedAt DATE,
    CONSTRAINT uniquePermissionTableName UNIQUE (tableName)
);

-- Création de la table adminRole
CREATE TABLE IF NOT EXISTS adminRole (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    deletedAt DATE,
    createdAt DATE NOT NULL DEFAULT NOW(),
    updatedAt DATE,
);

-- Création de la table adminUser
CREATE TABLE IF NOT EXISTS adminUser (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    isSuperAdmin BOOLEAN NOT NULL DEFAULT false,
    deletedAt DATE,
    createdAt DATE NOT NULL DEFAULT NOW(),
    updatedAt DATE
);

-- Création de la table de liaison adminUserRole
CREATE TABLE IF NOT EXISTS adminUserRole (
    id SERIAL PRIMARY KEY,
    adminUserId INT NOT NULL,
    adminRoleId INT NOT NULL,
    createdAt DATE NOT NULL DEFAULT NOW(),
    updatedAt DATE,
    FOREIGN KEY (adminUserId) REFERENCES adminUser(id),
    FOREIGN KEY (adminRoleId) REFERENCES adminRole(id)
);

-- Création de la table de liaison adminRolePermission
CREATE TABLE IF NOT EXISTS adminRolePermission (
    id SERIAL PRIMARY KEY,
    adminRoleId INT NOT NULL,
    adminPermissionId INT NOT NULL,
    createdAt DATE NOT NULL DEFAULT NOW(),
    updatedAt DATE,
    FOREIGN KEY (adminRoleId) REFERENCES adminRole(id),
    FOREIGN KEY (adminPermissionId) REFERENCES adminPermission(id)
);