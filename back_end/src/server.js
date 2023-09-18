const express = require('express');
const path = require('path')
const app = require('./configs/express');
const Routes = require('./routes/index.routes');
const PageRoutes = require('./routes/page.routes');
app.use('/api', Routes);
// app.use('', PageRoutes);

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server is running at http://${app.get('host')}:${app.get('port')}`);
});