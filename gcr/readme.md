Running the application
---
Add the following line to /etc/hosts
```
127.0.0.1       host.docker.internal
```
<br>

Start all services with
```docker-compose up```

- Postgres          =>  localhost:5432
- Hasura console    =>  http://localhost:9695
- Next application  =>  http://localhost:8081
- Graphql server    =>  http://localhost:8080