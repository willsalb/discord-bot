const { SlashCommandBuilder } = require('discord.js');

//Exporta o comando com as informações(data) para o index.js
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),

    async execute(interaction) {
        await interaction.reply('Pong!');
    }
}