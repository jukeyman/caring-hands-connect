module.exports = {
  apps: [
    {
      name: 'caring-hands',
      script: 'npx',
      args: 'wrangler pages dev dist --d1=caring-hands-db --local --ip 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
