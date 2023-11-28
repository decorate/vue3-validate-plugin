projectDir = --project-directory ./.docker
dockerDir = ./.docker/
projectName = vue3-validate-plugin

opt = ${projectDir}

up:
	docker-compose ${opt} -f ${dockerDir}docker-compose.yml -p ${projectName} up -d
down:
	- docker-compose ${opt} -p ${projectName} -f ${dockerDir}docker-compose.yml  stop
	- docker-compose ${opt} -p ${projectName} -f ${dockerDir}docker-compose.yml  down
connect:
	docker exec -it ${projectName} ash
