# Full-Stack Accessibility App

## Intro

This is a MERN (MongoDB, Express, React and Node) app.

## Server

The server is an express server.

### API Routes

Routes begin with `/api/v1/`. The models are sent as `application/json`

* GET `/api/v1/users` - gets all users
* GET `/api/v1/user/1234` - gets the user with an id of `1234`
* POST `/api/v1/signup` - adds a user
* PUT `/api/v1/users/1234` - updates the user with an id of `1234` with the data you send in the request body (only updated fields required) (404 if not found)
* DELETE `api/v1/user/1234`deletes the user with an id of`1234` (404 if not found)

## Auth0 Settings


Client settings are in: `/client/src/auth_config.json`.

## Auth0 Rules

### Add persistent attributes to the user

```javascript
function addPersistenceAttribute(user, context, callback) {
  const namespaces = ['http://localhost:3000', 'http://localhost:5000', 'https://portfolio-fs-app.herokuapp.com']; // <-- all domains go here
  user.app_metadata = user.app_metadata || {};
  user.app_metadata.admin = user.app_metadata.admin || false;
  
  if (context.idToken) {
    for (const namespace of namespaces) {
    	context.idToken[`${namespace}/admin`] = user.app_metadata.admin;
    }
  }
  // persist the app_metadata update
  auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
    .then(function(){
      callback(null, user, context);
    })
    .catch(function(err){
      callback(err);
    });
}
```

### Add user roles to tokens

```javascript
function(user, context, callback) {
  const namespaces = ['http://localhost:3000', 'http://localhost:5000', 'https://portfolio-fs-app.herokuapp.com'];

  if (context.authorization && context.authorization.roles) {
    const assignedRoles = context.authorization.roles;

    if (context.idToken) {
      const idTokenClaims = context.idToken;
      for (const namespace of namespaces){
      	idTokenClaims[`${namespace}/roles`] = assignedRoles;
      }
      context.idToken = idTokenClaims;
    }

    if (context.accessToken) {
      const accessTokenClaims = context.accessToken;
      for (const namespace of namespaces){
      	accessTokenClaims[`${namespace}/roles`] = assignedRoles;
      }
      context.accessToken = accessTokenClaims;
    }
  }

  callback(null, user, context);
}
```

### Push RBAC perms to id token

```javascript
function (user, context, callback) {
  console.log(context.request);
  const map = require('array-map');
  const ManagementClient = require('auth0@2.17.0').ManagementClient;
  const management = new ManagementClient({
    token: auth0.accessToken,
    domain: auth0.domain
  });
	const namespaces = ['http://localhost:3000', 'http://localhost:5000', 'https://portfolio-fs-app.herokuapp.com'];
  const params = { id: user.user_id, page: 0, per_page: 50, include_totals: true };
  management.getUserPermissions(params, function (err, permissions) {
    if (err) {
      // Handle error.
      console.log('err: ', err);
      callback(err);
    } else {
      const permissionsArr = map(permissions.permissions, function (permission) {
        return permission.permission_name;
      });
      console.log('permissionsArr', permissionsArr);
      for (const namespace of namespaces){
        context.idToken[`${namespace}/user_authorization`] = {
          permissions: permissionsArr
        };
      }
      console.log('context.idToken', context.idToken);
    }
    callback(null, user, context);
  });
}
```