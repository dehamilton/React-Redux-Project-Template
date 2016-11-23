/* eslint-disable */
var fs = require('fs');
var os = require('os');

function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files){
      var name = dir + '/' + files[i];
      if (fs.statSync(name).isDirectory()){
          getFiles(name, files_);
      } else {
          files_.push(name);
      }
  }
  return files_;
}

var modules = getFiles('./src/components').filter(f => f.indexOf('Action') > 0);

var output = '/* eslint-disable */' + os.EOL;
output += '// auto-generated. Do not alter' + os.EOL;
output += '// If you need to alter run the createModulesFile.js command' + os.EOL;
var registerCount = 0;

modules.forEach(f => {
  output += 'import { register as register' + registerCount + ' } from \'' + f.replace('./src/', '') + '\';' + os.EOL;
  registerCount += 1;
});

registerCount = 0;
output += 'const modules = {' + os.EOL;
modules.forEach(f => {
  output += '  ...register' + registerCount + ',' + os.EOL;
  registerCount += 1;
});
output += '};' + os.EOL;
output += 'export { modules };' + os.EOL;

fs.writeFile('./src/reducers/modules.js', output, function(err) {
  if (err) {
    return console.log(err);
  }

  console.log('modules created successfully.');
});
