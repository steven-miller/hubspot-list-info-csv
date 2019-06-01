const path = require('path')
const fs = require('fs')
const Json2csvparser = require('json2csv').Parser;

// json2csv settings
const fields = ['listId', 'metaData.size', 'createdAt', 'listType', 'name']; // technically dependent on HubSpot API
var csvArray = []; // json of lists from API will be here

csvArray.forEach((csvName) => {
  fs.readFile(path.join('json', csvName), 'utf8', function(err, data) {
    if (err) {  // catch
      console.log(err);
      return;
    }
    var json = JSON.parse(data); // set to correct format
    var lists = json.lists; // set list var for parsing

    var parseLists = new Json2csvparser({ fields });
    var csv = parseLists.parse(lists);
    var csvLoc = path.join('csv', csvName.substring(0, (csvName.length - 6)) + '.csv');
    fs.writeFile(csvLoc, csv, function(err) { // may need to stream? max lists per portal is 1k
      if (err) {
        console.log(err);
        return;
      }
    })
  })
})