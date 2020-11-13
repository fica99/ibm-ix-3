FROM node

RUN mkdir -p /ibm-ix-3
RUN mkdir -p /ibm-ix-3/frontend

WORKDIR /ibm-ix-3/frontend

COPY . /ibm-ix-3/frontend/

EXPOSE 3000 

RUN npm i
RUN npm audit fix

