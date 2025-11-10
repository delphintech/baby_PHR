all:
	docker compose -f ./docker-compose.yml up -d

re :
	docker compose -f ./docker-compose.yml up -d --build

stop:
	docker compose -f ./docker-compose.yml down

term:
	@echo "Container name ?"; \
	read CONT; \
	docker exec -it $$CONT sh

state:
	docker compose ps

clean: stop
	docker compose -f ./docker-compose.yml rm -f -v

fclean: clean
	docker compose -f ./docker-compose.yml down -v
	docker compose -f ./docker-compose.yml down --rmi all

prune:
	docker system prune -a

.PHONY: clean fclean stop all prune
