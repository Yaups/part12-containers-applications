db.createUser({
  user: 'bloglist_db_username',
  pwd: 'bloglist_db_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'blogList',
    },
  ],
})

//db.createCollection('blogs')
//db.createCollection('users')
