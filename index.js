#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();
const getTemplates = require('./libs/getTemplates');
const inquirer = require('inquirer');
const chalk = require('chalk')
const ora = require('ora');
const logList = require('./libs/logList');
const { deleteRemote, clone } = require('./libs/gitApis');
class Leo {
   start() {
    // 版本
    program
      .version(require("./package.json").version)
      .option("-v, --version", "查看当前版本");

    // 项目初始化命令
    program.command("init")
        .description('初始化一个项目模板')
        .action(async ()=>{
          try {
            const branchs = await getTemplates();
            const searchRes = await inquirer.prompt([{
              type: 'list',
              message: '请选择模板:',
              name: 'template',
              choices: branchs,
            }])
            console.log(`您选择了模板: ${chalk.green(searchRes.template)}`);
            const spinner = ora('正在初始化中，请等待...');
            spinner.start();
            await clone(searchRes.template);
            spinner.stop();
            console.log(chalk.green(`初始化完毕，请自主修改项目目录名以及对应的package.json信息。`));
            await deleteRemote();
            process.exit();
          }catch (error) {
            console.error(error);
            console.error(chalk.yellow('获取远端模板列表失败，请检测网络环境是否友好。'));
            process.exit();
          }
        })

    // 查看模板列表命令
    program.command("list")
        .description( "查看所有的项目模板")
        .action(async ()=>{
          try {
            const branchs = await getTemplates();
            await deleteRemote();
            logList(branchs);
            process.exit();
          } catch (error) {
            console.log(error)
            console.error('获取远端模板列表失败，请检测网络环境是否友好。');
            process.exit();
          }
          
        })

    program.parse(process.argv);
  }
}


new Leo().start();
