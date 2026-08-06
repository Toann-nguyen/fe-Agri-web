# ACK NestJS Boilerplate — Database Schema

## Database Engine

- **Primary**: MongoDB v8.0.x (replica set required for transactions)
- **ORM**: Prisma v6.19.x
- **Alternative support**: PostgreSQL, MySQL, SQLite, SQL Server, CockroachDB

## Key Entities

### User

| Field                | Type     | Description                                    |
| -------------------- | -------- | ---------------------------------------------- |
| `id`                 | ObjectId | Unique identifier                              |
| `email`              | String   | Unique email address                           |
| `profile.full_name`  | String   | Display name                                   |
| `profile.bio`        | String   | User biography                                 |
| `profile.avatar`     | String   | S3 URL for avatar image                        |
| `roles`              | String[] | Assigned roles (e.g., `['USER']`, `['ADMIN']`) |
| `password_hash`      | String   | Hashed password (bcrypt)                       |
| `two_factor_enabled` | Boolean  | Whether 2FA is active                          |
| `two_factor_secret`  | String   | TOTP secret (encrypted)                        |
| `backup_codes`       | String[] | Recovery codes for 2FA                         |
| `status`             | Enum     | Account status (active, inactive, suspended)   |
| `createdAt`          | DateTime | Account creation timestamp                     |
| `updatedAt`          | DateTime | Last update timestamp                          |

### Role

| Field         | Type     | Description                       |
| ------------- | -------- | --------------------------------- |
| `id`          | ObjectId | Unique identifier                 |
| `name`        | String   | Role name (e.g., `USER`, `ADMIN`) |
| `abilities`   | String[] | List of permission abilities      |
| `description` | String   | Role description                  |
| `createdAt`   | DateTime | Creation timestamp                |
| `updatedAt`   | DateTime | Last update timestamp             |

### Session

| Field        | Type     | Description                |
| ------------ | -------- | -------------------------- |
| `id`         | ObjectId | Unique identifier          |
| `userId`     | ObjectId | Reference to User          |
| `token`      | String   | Refresh token (hashed)     |
| `expiresAt`  | DateTime | Session expiration         |
| `deviceInfo` | String   | User agent / device info   |
| `ipAddress`  | String   | Client IP address          |
| `createdAt`  | DateTime | Session creation timestamp |

### Activity Log

| Field       | Type     | Description                                                |
| ----------- | -------- | ---------------------------------------------------------- |
| `id`        | ObjectId | Unique identifier                                          |
| `userId`    | ObjectId | Reference to User                                          |
| `action`    | String   | Action performed (e.g., `user.login`, `discussion.create`) |
| `entity`    | String   | Entity type affected                                       |
| `entityId`  | String   | Entity ID                                                  |
| `metadata`  | JSON     | Additional context                                         |
| `timestamp` | DateTime | When the action occurred                                   |

### Password History

| Field       | Type     | Description                |
| ----------- | -------- | -------------------------- |
| `id`        | ObjectId | Unique identifier          |
| `userId`    | ObjectId | Reference to User          |
| `hash`      | String   | Hashed password            |
| `createdAt` | DateTime | When this password was set |

### Term Policy

| Field       | Type     | Description                                       |
| ----------- | -------- | ------------------------------------------------- |
| `id`        | ObjectId | Unique identifier                                 |
| `content`   | JSON     | Multilingual content (`{ en: "...", vi: "..." }`) |
| `status`    | Enum     | `DRAFT`, `PUBLISHED`, `ARCHIVED`                  |
| `version`   | Number   | Policy version                                    |
| `createdAt` | DateTime | Creation timestamp                                |
| `updatedAt` | DateTime | Last update timestamp                             |

### API Key

| Field         | Type     | Description                  |
| ------------- | -------- | ---------------------------- |
| `id`          | ObjectId | Unique identifier            |
| `userId`      | ObjectId | Reference to User            |
| `key`         | String   | API key (hashed for storage) |
| `permissions` | String[] | Granted permissions          |
| `expiresAt`   | DateTime | Key expiration               |
| `createdAt`   | DateTime | Creation timestamp           |

### Country

| Field       | Type     | Description        |
| ----------- | -------- | ------------------ |
| `id`        | ObjectId | Unique identifier  |
| `name`      | String   | Country name       |
| `code`      | String   | ISO country code   |
| `createdAt` | DateTime | Creation timestamp |

## Prisma Schema Location

The Prisma schema file is at `be-agri/prisma/schema.prisma`.

## MongoDB Replica Set Requirement

MongoDB must be configured as a replica set for transactions to work:

```bash
mongod --replSet rs0 --dbpath /data/db
```

Then initialize:

```bash
mongosh --eval "rs.initiate()"
```

## Relevance to Frontend Features

| Frontend Feature        | Backend Entities Used                             |
| ----------------------- | ------------------------------------------------- |
| Auth (login/register)   | User, Session                                     |
| User profile            | User                                              |
| User management (admin) | User, Role                                        |
| Discussions             | (Not yet implemented — needs `Discussion` entity) |
| Comments                | (Not yet implemented — needs `Comment` entity)    |
| Teams                   | Role                                              |

## Entities Needed for Agriculture Features

The following entities would need to be added to the Prisma schema for agriculture-specific features:

- `Crop` — crop type, variety, growth stage
- `Field` — field plot, location, size, soil data
- `WeatherRecord` — weather data for fields
- `IrrigationRecord` — irrigation scheduling and history
- `HarvestRecord` — harvest tracking
- `Cooperative` — farming cooperative/group
- `CooperativeMember` — membership in cooperatives
- `Supplier` — input suppliers
- `Product` — products from suppliers
- `Order` — purchase orders
- `Analytics` — yield, cost, production metrics
