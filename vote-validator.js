var Miso = require("miso.dataset");
var ds = new Miso.Dataset({
    importer: Miso.Dataset.Importers.GoogleSpreadsheet,
    parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
    key: "",
    worksheet: "1",
});

var url = "https://docs.google.com/spreadsheets/d/1UP3o3ea_2LTyyL1aAqTRKHzjbOqZO_Z0ZHoBrOB5Fnw/edit?usp=sharing";
module.exports = validateVote;

function validateVote(vote, callback) {

}