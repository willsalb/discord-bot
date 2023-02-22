const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, Component  } = require('discord.js');


const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder('Nada selecionado')
        .addOptions(
            {
                label: "JavaScript",
                description: "Documentação do JavaScript",
                value: "JavaScript"
            },
            {
                label: "Python",
                description: "Documentação do Python",
                value: "Python"
            },
            {
                label: "C#",
                description: "Documentação do C#",
                value: "csharp"
            },
            {
                label: "Java",
                description: "Documentação do Java",
                value: "Java"
            }
        )
    )


//Exporta o comando com as informações(data) para o index.js
module.exports = {
    data: new SlashCommandBuilder()
        .setName('docs')
        .setDescription('Acesse a documentação da linguagem que você quiser!'),

    async execute(interaction) {
        await interaction.reply({content:'Selecione uma das linguagens abaixo:', components: [row]});
    }
}