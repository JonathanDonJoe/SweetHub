createdb desserts-app
psql -f ./database/schema.sql desserts-app
psql -f ./database/seed.sql desserts-app