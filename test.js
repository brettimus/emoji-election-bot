var Miso = require("miso");
var ds = new Miso.Dataset({
    importer: Miso.Dataset.Importers.GoogleSpreadsheet,
    parser: Miso.Dataset.Parsers.GoogleSpreadsheet,
    key: "1UP3o3ea_2LTyyL1aAqTRKHzjbOqZO_Z0ZHoBrOB5Fnw",
    worksheet: "1",
});

console.log(ds);