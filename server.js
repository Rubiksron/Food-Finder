const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./'));

app.listen(PORT, function() {
  console.log(`This Server is running on port ${PORT}!` );
})
