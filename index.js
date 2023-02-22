const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN, CLIENTE_ID, GUILD_ID } = process.env;

//Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});

//Importação dos commands
const fs = require('node:fs'); //interage com os arquivos do sistema
const path = require('node:path'); //Modulos nativo do node para poder interagir com pastas

const commandsPath = path.join(__dirname, 'commands');
//Le o diretorio do caminho da commandsPath e filtrando os arquivos que terminam com '.js'
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

//Guardando todos os commands do bot
client.commands = new Collection();

//Andando pelo array do commandFiles para trazer as informações de cada um dos arquivos
for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath);

    if('data' in command && 'execute' in command) {
        //Colocando os comandos dentro da collection, com o formate de chave e valor: "nome": "comando"
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando ${filePath} está com algum erro!`);
    }
}

//'c' for the event paramanter to keep it separate from the alredy 'client' defined
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
});

//Log in to discord with client's token
client.login(TOKEN);

//Listener para interagir com o bot
client.on(Events.InteractionCreate, async interaction => {

    //Verificando se a interação é com o menu
    if(interaction.isStringSelectMenu()) { 
        const selectValue = interaction.values[0];

        if(selectValue == "JavaScript") {
            await interaction.reply("Doc: https://developer.mozilla.org/en-US/docs/Web/JavaScript");
        } else if(selectValue == "Python") {
            await interaction.reply("Doc: https://docs.python.org/3/");
        } else if(selectValue == "csharp") {
            await interaction.reply("Doc: https://learn.microsoft.com/en-us/dotnet/csharp/");
        } else if(selectValue == "Java") {
            await interaction.reply("Doc: https://dev.java/learn/");
        }
    }


    //Validando só para receber inputs de comando
    if(!interaction.isChatInputCommand()) {
        return
    } else {
        //Pegando as informações do nome dos comandos do bot
        const command = interaction.client.commands.get(interaction.commandName);
        if(!command) { console.error('Comando não encontrado!'); return }

        //Executando o comando, caso ele foi encontrado
        try {
            await command.execute(interaction);
        } catch(error) {
            console.error(error);
            await interaction.reply("Houve um erro ao executar esse comando!");
        }
    }
})
