const { Command } = require("commander");
const program = new Command();

class Leo {
   start() {
    // 版本
    program
      .version(require("./package.json").version)
      .option("-v, --version", "查看当前版本");

    // 项目初始化命令
    program.command("init")
        .description('初始化一个项目模板')
        .action(()=>{
            console.log(111);
        })

    // 查看模板列表命令
    program.command("list")
        .description( "查看所有的项目模板")
        .action(()=>{
            console.log(222);
        })

    program.parse(process.argv);
  }
}


new Leo().start();
