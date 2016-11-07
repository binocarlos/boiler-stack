# edit a user

```bash
$ make mongo.cli
> use auth
> db.users.update({
  email:'g@g.com'
}, {
  $set:{
    accesslevel:'superadmin'
  }
});
```