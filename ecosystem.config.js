module.exports = {
  apps : [{
    name              : 'testApp',
    script            : 'testapp.js',
    instances         : 2,
    autorestart       : true,
    watch             : true,
    max_memory_restart: '0.5G',
    env_production    : {
      NODE_ENV: 'production'
    },
    {
      name              : 'unique.boda.vehicle',
      script            : 'unique.boda.vehicle.js',
      instances         : 2,
      autorestart       : true,
      watch             : true,
      max_memory_restart: '0.5G',
      env_production    : {
        NODE_ENV: 'production'
      }
  }],

  deploy : {
    production : {
      user         : 'root',
      host         : '165.22.79.250',
      ref          : 'origin/master',
      repo         : ['git@github.com:uniqueboda/testapp.git', 'git@github.com:uniqueboda/unique.boda.vehicle.git'],
      path         : '/var/applications/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      env          : {
        "NODE_ENV": "production"
      }
    }
  }
};
