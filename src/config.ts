// config/config.ts
export default {
    DB_USER: Deno.env.get('DB_USER') || 'postgres',
    DB_NAME: Deno.env.get('DB_NAME') || 'mydatabase',
    DB_HOST: Deno.env.get('DB_HOST') || 'localhost',
    DB_PORT: parseInt(Deno.env.get('DB_PORT') || '5432'),
    DB_PASSWORD: Deno.env.get('DB_PASSWORD') || '',
}
