

npm install

generate secretkey = require('crypto').randomBytes(64).toString('hex')

To deploy this project run

```bash
  sequelize-auto -o "./models" -d db-test -h postgresql-88714-0.cloudclusters.net -u man -p 10742 -x aA0840454897 -e postgres
```

