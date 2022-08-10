# Step to run project

cd be-app


cp .env.sample .env

docker compose up

docker compose exec node npm run db:seed