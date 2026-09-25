# User Api Spec

1c1abd5f-ecb9-4283-a1b7-1d62f36787f5

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "rifky",
  "password": "rahasia",
  "name": "Muhammad Rifky Ramadani"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "rifky",
    "name": "Muhammad Rifky Ramadani"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Response Body Error :

```json
{
  "username": "rifky",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "Muhammad Rifky Ramadani", //optional
  "password": "new password" //optional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "rifky",
    "name": "Muhammad Rifky Ramadani Lagi"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name Length Max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "rifky",
    "name": "Muhammad Rifky Ramadani"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```
