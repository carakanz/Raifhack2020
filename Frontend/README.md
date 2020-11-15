# Mango

Бизнес онлайн за 10 минут!

## Как запустить все

```shell script
npm run start:all
```

## Приложения

-   Админка - localhost:4202
-   Veryfood - veryfood.localhost:4200
-   МЕДСИ - medsi.localhost:4201

Чтобы это сработало, эти хосты должны быть прописаны в конфиге

```shell script
sudo nano /etc/hosts
```

```
127.0.0.1       localhost
127.0.0.1       veryfood.localhost
127.0.0.1       medsi.localhost
```

```shell script
dscacheutil -flushcache
```
