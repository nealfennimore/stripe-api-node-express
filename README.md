# Stripe API Express Server

A simple express api server for creating Stripe charges.

## Installation

```sh
npm install
npm install -g foreman # Install foreman globally
```

### .env File Example

Update your `.env` file to look similar.

```js
{
    "server": {
        "ip": "0.0.0.0",
        "port": 3000
    },
    "auth": {
        "secret": "",
        "algorithm": "HS256"
    },
    "stripe": {
        "publishable_key": "",
        "secret_key": ""
    }
}
```

### Generate Keys

We'll use a either a secret key or RSA public key for verifying using JSON Web Tokens for certain API requests.
Generate a private and public key using the below commands for RS256.

```sh
# RS256 key
openssl genrsa -out keys/priv.pem 1024
openssl rsa -pubout -in keys/priv.pem -out keys/pub.pem
```

## Get Access Token

Generate an access token and use it for authenticated API requests.

```js
# RS256
const privateKey = fs.readFileSync('keys/priv.pem');
const RS_256_ACCESS_TOKEN = jwt.sign({}, privateKey, { algorithm: 'RS256'})

# HS256
const HS256_ACCESS_TOKEN = jwt.sign({}, AUTH_SECRET);
```

The token should be in the `Authorization` Header.

```js
// Authorization: Bearer <token>
req.headers['authorization'];
```

## Starting API Server

```sh
npm run start
npm run develop # With nodemon
```