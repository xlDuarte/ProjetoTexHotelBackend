import swaggerAutogen from "swagger-autogen";//autogen utilizado para capturar e montar o arquivo swagger.json contendo os endpoints

const outputFile = './swagger/swagger_output.json';//caminho e nome do arquivo gerado pelo autogen
const endpointsFiles = ['./routes/routes.js'];//constante contendo o caminho com todas as rotas do projeto

swaggerAutogen(outputFile, endpointsFiles);//função para o autogen gerar o arquivo do swagger.json