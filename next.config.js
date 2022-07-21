/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // API_URL: 'http://localhost:8000',
    API_URL: 'https://job-portal-django-api.herokuapp.com/',
    MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoidGltb285OSIsImEiOiJjbDVwa2FqbTQxbno3M2pxcmlsZzB4aWkxIn0.esUOwBr3u0OhgJDZqmhZuA',
  }
}

module.exports = nextConfig
