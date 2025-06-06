const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Health check available at http://localhost:${PORT}/health`);
});