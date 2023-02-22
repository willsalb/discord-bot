//Aqui vai ser executado sempre que tiver um comando novo

const { REST, Routes } = require('discord.js')
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN, CLIENTE_ID, GUILD_ID } = process.env;

//Importação dos commands
const fs = require('node:fs'); //interage com os arquivos do sistema
const path = require('node:path'); //Modulos nativo do node para poder interagir com pastas

const commandsPath = path.join(__dirname, 'commands');
//Le o diretorio do caminho da commandsPath e filtrando os arquivos que terminam com '.js'
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const commands = [];

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    //Colocando os comandos no array
    commands.push(command.data.toJSON());
}

//Instânciando a REST
const rest = new REST({version: "10"}).setToken(TOKEN);

//Fazendo o deploy
(async () => {
    try {
        console.log(`Resetando ${commands.length} comandos...`)

        //Criando comandos especificamente para cada servidor; Para este servidor em que o bot está.
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENTE_ID, GUILD_ID),
            {body: commands}
        )

        console.log("Comandos registrados com sucesso!")

    } catch(error) {
        console.error(error);
    }
})()