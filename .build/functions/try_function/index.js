const express = require('express');
const app = express();
const catalystSDK = require('zcatalyst-sdk-node');
app.use(express.json());

// Middleware to initialize Catalyst SDK
app.use((req, res, next) => {
    const catalyst = catalystSDK.initialize(req);
    res.locals.catalyst = catalyst;
    next();
});

// Route to fetch data from 'Second_Table' and format the response
app.get('/all', async (req, res) => {
    try {
        let { catalyst } = res.locals;
        let datastore =  catalyst.datastore();
        let table = datastore.table('Second_Table');
        let column = await table.getColumnDetails('Row_One');
        res.status(200).send({
            status: 'success',
            data: {
                column
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: 'failure',
            message: "We're unable to process the request."
        });
    }
});
app.post('/add',async (req,res)=>{
    try{
       let {catalyst} = res.locals;
       let{Body}  = req.body;
       let reqBody = req.body;
       let datastore = catalyst.datastore();
       let table = datastore.table('Second_Table');
       let insertRow =await table.insertRow(Body);
       res.status(200).send({status:'success',data:{reqBody}});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({status:'failure',message:'Unable to Fullfill request'});

    }
});
module.exports = app;
