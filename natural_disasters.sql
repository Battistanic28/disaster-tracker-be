\echo 'Delete and recreate jobly db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE natural_disasters;
CREATE DATABASE natural_disasters;
\connect natural_disasters

\i natural_disasters-schema.sql
\i natural_disasters-seed.sql

\echo 'Delete and recreate jobly_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE natural_disasters_test;
CREATE DATABASE natural_disasters_test;
\connect natural_disasters_test

\i natural_disasters-schema.sql