module.exports = {
    apps: [
      {
        name: 'agentEmailSender',
        script: 'agentEmailSender.js',
        cron_restart: '*/1 * * * *',
      },
    ],
  };
  