# edit a user

```bash
$ make mongo.cli
> use boiler
> db.users.update({
  email:'g@g.com'
}, {
  $set:{
    accesslevel:'superadmin'
  }
});
```