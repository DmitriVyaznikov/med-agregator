# Агрегатор медицинских услуг

## Запуск проекта

- устанваливаем PostgreSQL:
для Ubuntu
```sudo apt-get -y install postgresql
для  остальных платформ - https://www.postgresql.org/download/

```git clone git@github.com:dkovalenko174/medical-services-aggregator.git

```cd server 
```npm install
```npx sequelize db:migrate;npx sequelize db:seed:all
```npm run dev

```cd client 
```npm install 
```npm start

http://localhost:3001
