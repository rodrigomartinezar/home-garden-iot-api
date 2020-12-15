## API to fetch data from AWS - DynamoDB - UAI IoT Project

This project is an API to fetch data from a DynamoDB from AWS. To run the project, installation of nodeJS and npm is needed. Once installed, run the command

```sh
npm install
```

to install the required packages.
Then, export as env variables the credentials from AWS. These can be found on this [link](https://labs.vocareum.com/main/main.php?m=editor&nav=1&asnid=260536&stepid=260537) under **Account Details**. The command to export env variables on git bash is

```sh
export variable=value
```

Note that no spaces are needed. If you type a space is going to give an error. Setting your credentials will tell the program to fetch data from YOUR DynamoDB, so please check if you have an existing table.  
Finally, check that the table name is configured and execute

```sh
node main.js
```

to run the api. It will run on localhost:4000.  
There are two get methods.

### 'sensors-ids'

Fetches every unique sensor id

### 'city-data'.

Fetches data from a specific sensor. To specify the sensor, you have to give an id as a Query param
