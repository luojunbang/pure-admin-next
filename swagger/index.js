import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'


console.log('oj')

SwaggerUI({
  url: './swagger-config.yaml',
  dom_id: '#app-container',
})
