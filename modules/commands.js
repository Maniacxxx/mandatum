const { CommandData, CommandVariable, CommandVariables, CommandArgument, CommandArguments } = require('../CommandData');

//#region //* Imports
//#region //* info
const HelpCommand = require('./info/help');
const AboutCommand = require('./info/about');
const SourceCommand = require('./info/source');
const WebsiteCommand = require('./info/website');
const GitHubCommand = require('./info/github');
//#endregion
//#region //* utility
const LinkCommand = require('./utility/link');
const UuidCommand = require('./utility/uuid');
const SearchCommand = require('./utility/search');
const UptimeCommand = require('./utility/uptime');
//#endregion
//#endregion

//#region //* Commands
//#region //* info
const helpCommand = new HelpCommand(new CommandData('help')
	.setCategory('info')
	.setDescription('Displays all the commands')
	.setArguments(new CommandArguments()
		.addArgument(new CommandArgument('command', 'command to view help for'))))
	.loadConfig();
const aboutCommand = new AboutCommand(new CommandData('about')
	.setCategory('info')
	.setDescription('Display info about Mandatum'))
	.loadConfig();
const sourceCommand = new SourceCommand(new CommandData('source')
	.setCategory('info')
	.setDescription('Provide link to Mandatum source code'))
	.loadConfig();
const websiteCommand = new WebsiteCommand(new CommandData('website')
	.setCategory('info')
	.setDescription('Provide link to my website'))
	.loadConfig();
const githubCommand = new GitHubCommand(new CommandData('github')
	.setCategory('info')
	.setDescription('Provide link to my GitHub'))
	.loadConfig();
//#endregion
//#region //* utility
const linkCommand = new LinkCommand(new CommandData('link')
	.setCategory('utility')
	.setDescription('Creates a clickable link')
	.setArguments(new CommandArguments()
		.addArgument(new CommandArgument('url', 'URL to linkify (all this does is add https://)', true))))
	.loadConfig();
const uuidCommand = new UuidCommand(new CommandData('uuid')
	.setCategory('utility')
	.setDescription('Generate a new v4 UUID'))
	.loadConfig();
const searchCommand = new SearchCommand(new CommandData('search')
	.setCategory('utility')
	.setDescription('Search DuckDuckGo')
	.addNote('You can use [DuckDuckGo Bangs](https://duckduckgo.com/bang) to redirect your search')
	.setArguments(new CommandArguments()
		.addArgument(new CommandArgument('query', 'What to search for', true))))
	.loadConfig();
//const uptimeCommand = new UptimeCommand()
//#endregion
//#endregion

const commands = {
	//#region category test
	test: new (require('./test/test'))(
		new CommandData('test')
			.setCategory('admin')
			.setDescription('A test command')
			.setVariables(new CommandVariables()
				.addVariable(new CommandVariable('message', 'Hello bitch'))
				.addVariable(new CommandVariable('number', 55))))
		.loadConfig(),

	neoSetConfig: new (require('./test/neoSetConfig'))(
		new CommandData('neoSetConfig')
			.setCategory('admin')
			.setDescription('foo'))
		.loadConfig(),

	prefix: new (require('./test/prefix'))(
		new CommandData('prefix')
			.setCategory('admin')
			.setDescription('Set the server prefix'))
		.loadConfig(),

	noexectest: new (require('./test/noexectest'))(
		new CommandData('noexectest')
			.setCategory('admin')
			.setDescription('test'))
		.loadConfig(),

	bad: new (require('./test/bad'))(
		new CommandData('bad')
			.setCategory('admin')
			.setDescription('another test'))
		.loadConfig(),

	argtest: new (require('./test/argtest'))(
		new CommandData('argtest')
			.setCategory('admin')
			.setDescription('another test')
			.setVariables(new CommandVariables()
				.addVariable(new CommandVariable('length', 30))
				.addVariable(new CommandVariable('max', 50)))
			.setArguments(new CommandArguments()
				.addArgument(new CommandArgument('length', 'Length to expand character to', false, 'length'))
				.addArgument(new CommandArgument('character', 'Character to expand', true))))
		.loadConfig(),

	//#endregion

	//#region //* info
	help: helpCommand,
	website: websiteCommand,
	github: githubCommand,
	source: sourceCommand,
	about: aboutCommand,
	//#endregion

	//#region //*utility
	link: linkCommand,
	uuid: uuidCommand,
	search: searchCommand
	//#endregion
};

module.exports = {
	getCommand: (command) => commands[command] ? commands[command] : null
};