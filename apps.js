const yargs = require("yargs");
const commands = require('./commands')

let command = yargs.argv._[0];
let id = yargs.argv.id
let title = yargs.argv.title;
let body = yargs.argv.body;

if(command == 'add'){

  if(id && title && body){
    commands.add(id, title, body);
  }

} else if(command == 'delete') {
    if(id){
      commands.remove(id);
    }
}
