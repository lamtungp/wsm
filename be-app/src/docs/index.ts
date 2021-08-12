import components from './config/components';
import basicInfo from './config/basicInfo';
import servers from './config/servers';
import tags from './config/tags';
import paths from './apis/index';

export default {
  swaggerDefinition: {
    ...basicInfo,
    servers,
    tags,
    components,
    paths,
  },
  apis: ['./apis/*.ts'],
};
