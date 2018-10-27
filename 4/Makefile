init:
	@docker swarm init
	@docker service create --name registry --publish published=5000,target=5000 registry:2

start:
	@docker-compose build
	@docker-compose push
	@docker stack deploy --compose-file docker-compose.yml --prune dtask4

stop:
	@docker stack rm dtask4
