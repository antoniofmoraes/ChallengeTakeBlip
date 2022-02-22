const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  axios
    .get("https://api.github.com/users/takenet/repos")
    .then((response) => {
      const repositories = response.data;

      const csRepositories = repositories.filter((x) => x.language === "C#");

      const filteredRepositories = csRepositories.map((x) => {
        return {
          nome: x.full_name,
          descricao: x.description,
          avatar: x.owner.avatar_url,
        };
      });
      const sortedRepositories = filteredRepositories.sort((x) => x.created_at);
      const firstFiveRepositories = sortedRepositories.slice(0, 5);

      res.send(firstFiveRepositories);
    })
    .catch((err) => {
      if (err.response.status === 403) {
        res.send("Limite de busca da API do github excedida");
      } else {
        res.send("Houve um erro ao buscar os repositórios");
      }
      console.log(err);
      return;
    });
});

module.exports = router;
