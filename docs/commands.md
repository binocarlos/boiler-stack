# storage commands

All of these commands require that you login to mongo first:

```bash
$ make mongo.cli
```

## find user

```bash
> db.users.find({
  email:'e@e.com'
});
```

## edit a user

```bash
> db.users.update({
  email:'e@e.com'
}, {
  $set:{
    accesslevel:'superadmin'
  }
});
```

## delete a user by email

```bash
> db.users.remove({
  email:'e@e.com'
});
```

## delete a user by id

```bash
> db.users.remove({
  _id:ObjectId('5823378e4f40778a486aec54')
});
```

## insert a new project

```bash
$ make mongo.cli
> db.projects.insert({
  name:'My First Project'
});
> db.projects.find({name:'My First Project'});
> db.users.find({email:'e@e.com'});
> db.collaborators.insert({
  projectid:'582339624f40778a486aec56',
  userid:'58226cab426437000123ac8b',
  permission:'owner'
});
```