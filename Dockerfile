# vai instalar o node
FROM node 

# definir pasta onde as iformacoes estejam contidas
WORKDIR /usr/app

# copiar o pachage.json para o diretorio /usr/app
COPY package.json ./

RUN npm install

# copiando tudo para a pasta de destino
COPY . .

EXPOSE 3333

CMD [ "npm", "run", "dev" ]