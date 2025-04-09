const figlet = require("figlet");
const app = require("./app");


//start server
app.listen(process.env.PORT || 5000, () => {
  console.log(figlet.textSync('social-media-api', {horizontalLayout:'full'}))
  console.log(`Server running on port ${process.env.PORT || 5000}`)
});