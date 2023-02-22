const { SlashCommandBuilder } = require('discord.js');

//Exporta o comando com as informações(data) para o index.js
module.exports = {
    data: new SlashCommandBuilder()
        .setName('playlist')
        .setDescription('Playlist para estudos'),

    async execute(interaction) {
        await interaction.reply('https://open.spotify.com/album/4IGTs0cpVnm9qyGn02h1dB?si=lgFhkvwiSYeIgrGrdxjpXA');
    }
}